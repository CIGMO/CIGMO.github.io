# Updating the publications page

The [publications page](https://cigmo.github.io/publications/) lists papers by CIGMO members that
acknowledge CIGMO's funding: the PSAAP-IV Focused Investigatory Center, DOE/NNSA Award
**DE-NA0004261**. The grant started in 2025, so nothing earlier can qualify.

| What                                 | Where                                                            |
| ------------------------------------ | ---------------------------------------------------------------- |
| The papers                           | `_bibliography/papers.bib`                                       |
| Page text                            | `_pages/publications.md`                                         |
| Names that get underlined            | `scholar.members` in `_config.yml`                               |
| Underlining logic                    | `_layouts/bib.liquid` (look for `author_full_name`)              |
| Search script                        | `bin/find_cigmo_publications.py`                                 |

## What counts

A paper is included if **its acknowledgments name CIGMO or the award number DE-NA0004261**.
A bare mention of "PSAAP" is not enough, because there are several PSAAP centers: check those by
hand.

## 1. Find new papers

From the repo root:

```bash
pip install pypdf     # once
python3 bin/find_cigmo_publications.py --since 2026-01-01 --scholar
```

`--since` is the earliest arXiv submission or publication date to search. It defaults to
2025-01-01; a date a few months before the last update is enough. A full run from 2025 takes
about 15 minutes, mostly because arXiv asks for slow request rates.

The script:

1. Reads everyone in `_people/` and lists their arXiv papers submitted since `--since`.
2. Searches each paper's full text (arXiv HTML, else the PDF) for the acknowledgment. If a paper
   has several versions and the latest doesn't match, it also checks v1, since later versions
   sometimes drop the acknowledgments (e.g. anonymized for a conference).
3. Asks Crossref for journal articles whose funding metadata lists DE-NA0004261. This catches
   papers that are not on arXiv.
4. With `--scholar`, searches Google Scholar for the award number and the center name. Scholar
   sometimes answers with a CAPTCHA; the script then skips it. You can also run these searches
   in a browser, with "Since 2025" set:
   - [`"DE-NA0004261"`](https://scholar.google.com/scholar?q=%22DE-NA0004261%22&as_ylo=2025)
   - [`"Information Geometric Mechanics and Optimization"`](https://scholar.google.com/scholar?q=%22Information+Geometric+Mechanics+and+Optimization%22&as_ylo=2025)

Papers already in `papers.bib` are skipped. The output has four parts:

- **CONFIRMED**: papers naming CIGMO or DE-NA0004261, with the matching text.
- **PSAAP ONLY**: check the acknowledgment by hand; add only if it is CIGMO's award.
- **GOOGLE SCHOLAR**: Scholar hits the other searches missed; check by hand.
- **BibTeX** for the confirmed papers, ready to paste.

## 2. Add them to `papers.bib`

Paste the generated entries into `_bibliography/papers.bib`. Before committing, check:

- **Author names.** Multi-word surnames need the form `Reyes Rivas, Noe`. The script handles
  CIGMO members' names but not co-authors', so check those.
- **Duplicate keys.** Keys are `firstauthorlastname` + `year` + first title word; rename one if
  two collide.
- **Published versions.** The script looks up the journal version of arXiv papers on Crossref.
  When a preprint already on the page is published later, update its entry: replace
  `journal = {arXiv preprint ...}` with the journal, add `volume`, `pages`, `doi`, keep `arxiv`.

To leave a paper out on purpose (for example, a false positive in Crossref's funding metadata),
add its DOI or arXiv id to `EXCLUDED` at the top of the script so it isn't flagged again.

## 3. Underlined names

CIGMO members are underlined in the author lists. An author is underlined when their
`First Last` name, exactly as written in `papers.bib`, appears in `scholar.members` in
`_config.yml`.

- **When someone joins CIGMO**, add their name to `scholar.members`. The script warns about
  people in `_people/` who are missing from the list.
- **If a member's name appears in a paper differently** (middle initial, accents), add that
  spelling too, e.g. both `Spencer Bryngelson` and `Spencer H. Bryngelson`.

## 4. Preview and publish

```bash
bundle exec jekyll serve     # then open http://localhost:4000/publications/
```

Commit and push to `main`; GitHub Actions deploys the site.

## Re-running with Claude Code

Asking Claude Code to "update the publications page following PUBLICATIONS.md" is enough. It
should run the script, check any PSAAP-only and Scholar hits by hand, add the new entries, and
build the site to check it.
