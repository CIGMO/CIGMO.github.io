#!/usr/bin/env python3
"""Find papers by CIGMO members that acknowledge CIGMO / PSAAP award DE-NA0004261.

Sources:
  1. arXiv: every paper by every person in _people/ submitted since --since;
     the full text (arXiv HTML, falling back to the PDF) is searched for the
     acknowledgment.
  2. Crossref: journal articles whose funder metadata lists DE-NA0004261.
  3. Google Scholar (optional, --scholar): full-text search for the award
     number and the center name. Scholar may answer with a CAPTCHA.

A paper counts only if it names CIGMO or DE-NA0004261. Papers that only say
"PSAAP" are listed for manual review, since there are several PSAAP centers.
Papers already in _bibliography/papers.bib (matched by arXiv id, DOI, or title)
and papers in EXCLUDED below are skipped. BibTeX for new confirmed papers is printed at the end; review it
before pasting it into papers.bib.

Usage (from the repo root):
  python3 bin/find_cigmo_publications.py [--since 2026-01-01] [--scholar]
Requires: pypdf (pip install pypdf), for papers without an arXiv HTML version.
"""

import argparse
import glob
import html
import io
import json
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

AWARD = "DE-NA0004261"
STRONG = re.compile(r"CIGMO|DE-?NA-?0004261|Information Geometric Mechanics and Optimization", re.I)
WEAK = re.compile(r"PSAAP|Predictive Science Academic Alliance", re.I)
UA = {"User-Agent": "cigmo-publications-scan (https://cigmo.github.io)"}
BROWSER_UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 "
              "(KHTML, like Gecko) Version/17.0 Safari/605.1.15"}
ATOM = "{http://www.w3.org/2005/Atom}"
ARXIV = "{http://arxiv.org/schemas/atom}"
STOPWORDS = {"a", "an", "the", "of", "for", "on", "in", "and", "with", "to"}

# Papers checked by hand and left out of papers.bib on purpose (arXiv id, DOI, or title -> reason)
EXCLUDED = {
    "10.1090/mcom/4218": "Crossref lists DE-NA0004261, but the paper does not seem to acknowledge PSAAP",
}


def log(*a):
    print(*a, file=sys.stderr, flush=True)


def get(url, headers=UA, tries=3):
    for i in range(tries):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=60).read()
        except Exception as e:
            err = e
            time.sleep(5 * (i + 1))
    raise err


def ascii_fold(s):
    return unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()


def norm(s):
    return re.sub(r"[^a-z0-9]", "", ascii_fold(s).lower())


# ---------------------------------------------------------------------------
# People and existing bibliography
# ---------------------------------------------------------------------------

def load_people():
    """(first, last) for everyone in _people/. Multi-word surnames that the
    first/last split gets wrong go in SURNAMES."""
    SURNAMES = {"Noe Reyes Rivas": ("Noe", "Reyes Rivas")}
    people = []
    for f in sorted(glob.glob("_people/*.markdown") + glob.glob("_people/*.md")):
        m = re.search(r"^title:\s*(.+)$", open(f, encoding="utf8").read(), re.M)
        if not m:
            continue
        name = re.sub(r"\s*\(.*?\)", "", m.group(1)).strip()  # "Yulong (Lewis) Pan" -> "Yulong Pan"
        first, last = SURNAMES.get(name, (name.rsplit(" ", 1)[0], name.rsplit(" ", 1)[1]))
        people.append((first, last))
    return people


def load_bib():
    bib = open("_bibliography/papers.bib", encoding="utf8").read()
    return {
        "arxiv": set(re.findall(r"arxiv\s*=\s*\{([^}]+)\}", bib, re.I)),
        "doi": {d.lower() for d in re.findall(r"doi\s*=\s*\{([^}]+)\}", bib, re.I)},
        "title": {norm(t) for t in re.findall(r"title\s*=\s*\{(.+)\},?\s*$", bib, re.I | re.M)},
    }


def check_members_list(people):
    """Warn about people missing from scholar.members (used for underlining)."""
    cfg = open("_config.yml", encoding="utf8").read()
    m = re.search(r"^  members:\s*\n(.*?)\]", cfg, re.M | re.S)
    members = {x.strip() for x in re.sub(r"#.*", "", m.group(1)).replace("[", "").split(",")} if m else set()
    missing = [f"{f} {l}" for f, l in people if f"{f} {l}" not in members]
    if missing:
        log("WARNING: not in scholar.members in _config.yml (won't be underlined):", ", ".join(missing))


# ---------------------------------------------------------------------------
# Full text
# ---------------------------------------------------------------------------

def arxiv_fulltext(aid):
    """Text of the latest version (versioned ids like 2507.08965v1 skip the HTML attempt)."""
    try:
        if re.search(r"v\d+$", aid):
            raise ValueError("versioned id, use the PDF")
        raw = get(f"https://arxiv.org/html/{aid}").decode("utf8", "ignore")
        if "ltx_document" in raw or "ltx_page" in raw:
            return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", raw)))
    except Exception:
        pass
    from pypdf import PdfReader
    r = PdfReader(io.BytesIO(get(f"https://arxiv.org/pdf/{aid}")))
    return re.sub(r"\s+", " ", " ".join((p.extract_text() or "") for p in r.pages))


def classify(text):
    """'strong', 'weak' (PSAAP only) or None, plus a snippet around the match."""
    for kind, pat in (("strong", STRONG), ("weak", WEAK)):
        m = pat.search(text)
        if m:
            return kind, text[max(0, m.start() - 250): m.end() + 250]
    return None, ""


# ---------------------------------------------------------------------------
# Sources
# ---------------------------------------------------------------------------

def scan_arxiv(people, since):
    start = since.replace("-", "") + "0000"
    papers = {}
    for first, last in people:
        f = ascii_fold(first.split()[0])
        lasts = {ascii_fold(last), last}
        if "ä" in last or "ö" in last or "ü" in last:
            lasts.add(last.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue"))
        lq = " OR ".join(f'au:"{l}"' for l in lasts)
        query = f"au:{f} AND ({lq}) AND submittedDate:[{start} TO 209912312359]"
        url = "https://export.arxiv.org/api/query?" + urllib.parse.urlencode(
            {"search_query": query, "max_results": 500, "sortBy": "submittedDate"})
        root = ET.fromstring(get(url))
        # the arXiv query matches first and last name anywhere in the author list, so check full names
        name_re = re.compile(rf"^{re.escape(norm(first.split()[0]))}.*({'|'.join(re.escape(norm(l)) for l in lasts)})$")
        n = 0
        for e in root.findall(f"{ATOM}entry"):
            authors = [a.find(f"{ATOM}name").text for a in e.findall(f"{ATOM}author")]
            if not any(name_re.match(norm(a)) for a in authors):
                continue
            aid_v = e.find(f"{ATOM}id").text.rsplit("/", 1)[-1]
            aid = re.sub(r"v\d+$", "", aid_v)
            doi = e.find(f"{ARXIV}doi")
            papers.setdefault(aid, {
                "arxiv": aid,
                "title": re.sub(r"\s+", " ", e.find(f"{ATOM}title").text).strip(),
                "authors": authors,
                "year": e.find(f"{ATOM}published").text[:4],
                "doi": doi.text if doi is not None else None,
                "versions": int(re.search(r"v(\d+)$", aid_v).group(1)) if re.search(r"v\d+$", aid_v) else 1,
            })
            n += 1
        log(f"arXiv: {first} {last}: {n} papers")
        time.sleep(3)  # arXiv asks for at most one request every 3 seconds
    return papers


def scan_crossref(since):
    url = (f"https://api.crossref.org/works?filter=award.number:{AWARD},from-pub-date:{since}"
           "&rows=500")
    items = json.loads(get(url))["message"]["items"]
    log(f"Crossref: {len(items)} works list {AWARD} as funding")
    return items


def scan_scholar(since):
    results = []
    for q in [f'"{AWARD}"', '"Information Geometric Mechanics and Optimization"']:
        for start in range(0, 100, 10):
            url = "https://scholar.google.com/scholar?" + urllib.parse.urlencode(
                {"q": q, "as_ylo": since[:4], "start": start})
            s = get(url, headers=BROWSER_UA).decode("utf8", "ignore")
            if "gs_captcha" in s or "unusual traffic" in s or "recaptcha" in s:
                log("Google Scholar: CAPTCHA, skipping the rest of the Scholar search")
                return results
            blocks = re.findall(r'<div class="gs_ri">(.*?)<div class="gs_fl', s, re.S)
            for blk in blocks:
                clean = lambda x: html.unescape(re.sub(r"<[^>]+>", "", x)).strip()
                t = re.search(r"<h3[^>]*>(.*?)</h3>", blk, re.S)
                a = re.search(r'<div class="gs_a">(.*?)</div>', blk, re.S)
                results.append((re.sub(r"^(\[\w+\]\s*)+", "", clean(t.group(1))), clean(a.group(1)) if a else ""))
            if len(blocks) < 10:
                break
            time.sleep(5)
    log(f"Google Scholar: {len(results)} results")
    return results


# ---------------------------------------------------------------------------
# BibTeX
# ---------------------------------------------------------------------------

def bib_key(last, year, title):
    word = next((w for w in re.findall(r"[a-z0-9]+", ascii_fold(title).lower()) if w not in STOPWORDS), "paper")
    return f"{norm(last)}{year}{word}"


def split_name(name, people):
    for first, last in people:  # keep multi-word surnames of members intact
        if name.endswith(" " + last):
            return last, name[: -len(last) - 1]
    first, _, last = name.rpartition(" ")
    return last, first


def bibtex(fields, people):
    key = bib_key(fields["first_last"], fields["year"], fields["title"])
    rows = [("title", fields["title"]), ("author", fields["author"]), ("journal", fields["journal"]),
            ("volume", fields.get("volume")), ("pages", fields.get("pages")), ("year", fields["year"]),
            ("doi", fields.get("doi")), ("arxiv", fields.get("arxiv")), ("bibtex_show", "true")]
    body = ",\n".join(f"  {k} = {{{v}}}" for k, v in rows if v)
    return f"@article{{{key},\n{body}\n}}"


def crossref_fields(item):
    year = str((item.get("published") or item["issued"])["date-parts"][0][0])
    return {
        "title": re.sub(r"<[^>]+>", "", item["title"][0]),
        "author": " and ".join(f"{a['family']}, {a.get('given', '')}".strip(", ") for a in item.get("author", [])),
        "first_last": item["author"][0]["family"] if item.get("author") else "anon",
        "journal": (item.get("container-title") or [""])[0],
        "volume": item.get("volume"),
        "pages": item.get("page") or item.get("article-number"),
        "year": year,
        "doi": item["DOI"],
    }


def published_version(title):
    """Journal version of an arXiv paper on Crossref (exact title match), if any."""
    q = urllib.parse.quote(title)
    items = json.loads(get(f"https://api.crossref.org/works?query.bibliographic={q}&rows=5"))["message"]["items"]
    for it in items:
        if it.get("type") == "journal-article" and norm((it.get("title") or [""])[0]) == norm(title):
            return it
    return None


# ---------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--since", default="2025-01-01", help="earliest date to search (YYYY-MM-DD), default 2025-01-01")
    ap.add_argument("--scholar", action="store_true", help="also search Google Scholar")
    args = ap.parse_args()

    people = load_people()
    bib = load_bib()
    check_members_list(people)

    excluded = {k.lower() for k in EXCLUDED}

    def known(arxiv=None, doi=None, title=None):
        if {x.lower() for x in (arxiv, doi, title) if x} & excluded:
            return True
        return (arxiv and arxiv in bib["arxiv"]) or (doi and doi.lower() in bib["doi"]) or (title and norm(title) in bib["title"])

    strong, weak, errors = [], [], []

    papers = scan_arxiv(people, args.since)
    new = {k: p for k, p in papers.items() if not known(p["arxiv"], p["doi"], p["title"])}
    log(f"arXiv: {len(papers)} papers, {len(new)} not yet in papers.bib; checking full texts")
    for aid, p in new.items():
        try:
            kind, snippet = classify(arxiv_fulltext(aid))
            if kind != "strong" and p["versions"] > 1:
                # later versions sometimes drop the acknowledgments (e.g. anonymized for review)
                kind_v1, snippet_v1 = classify(arxiv_fulltext(aid + "v1"))
                rank = {None: 0, "weak": 1, "strong": 2}
                if rank[kind_v1] > rank[kind]:
                    kind, snippet = kind_v1, "[in v1 only] " + snippet_v1
        except Exception as ex:
            errors.append(f"{aid} {p['title']}: {ex}")
            continue
        if kind:
            (strong if kind == "strong" else weak).append((p, snippet))
        time.sleep(1)

    for item in scan_crossref(args.since):
        f = crossref_fields(item)
        if not known(doi=f["doi"], title=f["title"]) and not any(norm(p["title"]) == norm(f["title"]) for p, _ in strong):
            strong.append(({"crossref": f, "title": f["title"]}, f"Crossref funder metadata lists {AWARD}"))

    scholar = scan_scholar(args.since) if args.scholar else []

    print("=" * 78)
    print(f"CONFIRMED (names CIGMO or {AWARD}), not yet in papers.bib: {len(strong)}")
    print("=" * 78)
    for p, snippet in strong:
        print(f"\n* {p['title']}\n  arXiv:{p.get('arxiv', '-')}\n  ...{snippet}...")

    print("\n" + "=" * 78)
    print(f"PSAAP ONLY, check by hand (may be another PSAAP center): {len(weak)}")
    print("=" * 78)
    for p, snippet in weak:
        print(f"\n* {p['title']}\n  https://arxiv.org/abs/{p['arxiv']}\n  ...{snippet}...")

    if scholar:
        print("\n" + "=" * 78)
        print("GOOGLE SCHOLAR results not in papers.bib or the list above (check by hand):")
        print("=" * 78)
        seen = {norm(p["title"]) for p, _ in strong + weak}
        for t, a in dict.fromkeys(scholar):
            if norm(t) not in bib["title"] and norm(t) not in seen:
                print(f"* {t}\n  {a}")

    if errors:
        print("\nCould not read full text for:\n  " + "\n  ".join(errors))

    print("\n" + "=" * 78)
    print("BibTeX for the confirmed papers (review before adding to _bibliography/papers.bib):")
    print("=" * 78 + "\n")
    for p, _ in strong:
        if "crossref" in p:
            f = p["crossref"]
        else:
            pub = published_version(p["title"])
            if pub:
                f = crossref_fields(pub)
            else:
                f = {"title": p["title"], "journal": f"arXiv preprint arXiv:{p['arxiv']}", "year": p["year"]}
            f["author"] = " and ".join("{}, {}".format(*split_name(a, people)) for a in p["authors"])
            f["first_last"] = split_name(p["authors"][0], people)[0]
            f["title"] = p["title"]
            f["arxiv"] = p["arxiv"]
        print(bibtex(f, people) + "\n")


if __name__ == "__main__":
    main()
