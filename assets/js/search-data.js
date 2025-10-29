// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-people",
          title: "people",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-seminars",
          title: "seminars",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/seminars/";
          },
        },{id: "news-a-priori-error-analysis-of-the-proximal-galerkin-method-speaker-rami-masri-brown-university-date-september-24-2025-time-11-00-12-00-est-abstract-the-proximal-galerkin-pg-method-is-a-finite-element-method-for-solving-variational-problems-with-inequality-constraints-it-has-several-advantages-including-constraint-preserving-approximations-and-mesh-independence-this-talk-presents-the-first-abstract-a-priori-error-analysis-of-the-pg-method-providing-a-general-framework-to-establish-convergence-and-error-estimates-as-applications-of-the-framework-we-demonstrate-optimal-convergence-rates-for-both-the-obstacle-and-signorini-problems-using-various-finite-element-subspaces-location-170-hope-st-room-108-providence-ri-zoom-zoom-link-add-to-calendar",
          title: 'A priori error analysis of the proximal Galerkin method Speaker: Rami Masri (Brown...',
          description: "",
          section: "News",},{id: "news-shocks-without-tracking-or-capturing-exceeding-1-quadrillion-degrees-of-freedom-via-inviscid-regularization-of-the-compressible-navier-stokes-speaker-spencer-bryngelson-georgia-institute-of-technology-date-october-29-2025-time-11-00-12-00-est-abstract-a-method-for-solving-multi-species-and-shock-laden-flow-at-unprecedented-problem-sizes-and-time-to-solution-is-presented-the-first-inviscid-regularization-of-the-navier-stokes-like-pde-is-performed-this-enables-linear-and-well-conditioned-numerics-suitable-for-mixed-precision-computation-a-unified-memory-implementation-is-crafted-for-tightly-coupled-cpu-gpu-and-apu-architectures-e-g-mi250x-gh200-mi300a-now-standard-on-flagship-machines-like-el-capitan-and-frontier-with-this-trio-we-improve-on-state-of-the-art-cfd-techniques-with-order-of-magnitude-improvements-along-computational-cost-and-memory-footprint-axes-the-reduced-memory-footprint-compared-to-baselines-enables-for-example-25-times-larger-simulations-here-shown-to-exceed-1-quadrillion-degrees-of-freedom-200t-grid-points-with-per-grid-point-cost-speedups-the-method-strong-scales-from-8-nodes-to-the-full-systems-amp-gt-10k-nodes-with-better-than-50-efficiency-this-enables-for-example-a-typical-200b-grid-point-cfd-simulation-in-less-than-one-wall-clock-minute-on-olcf-frontier-early-results-suggest-increased-robustness-compared-to-eno-limiter-type-shock-capturing-schemes-for-high-mach-flows-and-strong-discontinuities-results-are-shown-for-a-mach-14-many-rocket-engine-configuration-that-nominally-matches-the-spacex-super-heavy-location-virtual-zoom-zoom-zoom-link-add-to-calendar-recordings-zoom-recording",
          title: 'Shocks without tracking or capturing: Exceeding 1 quadrillion degrees of freedom via inviscid...',
          description: "",
          section: "News",},{id: "people-yuri-bazilevs",
          title: 'Yuri Bazilevs',
          description: "Co-PI",
          section: "People",handler: () => {
              window.location.href = "/people/bazilevs_yuri/";
            },},{id: "people-spencer-bryngelson",
          title: 'Spencer Bryngelson',
          description: "Co-PI",
          section: "People",handler: () => {
              window.location.href = "/people/bryngelson_spencer/";
            },},{id: "people-jerome-darbon",
          title: 'Jerome Darbon',
          description: "Co-PI",
          section: "People",handler: () => {
              window.location.href = "/people/darbon_jerome/";
            },},{id: "people-dohyun-kim",
          title: 'Dohyun Kim',
          description: "Postdoctoral Researcher",
          section: "People",handler: () => {
              window.location.href = "/people/dohyun_kim/";
            },},{id: "people-brendan-keith",
          title: 'Brendan Keith',
          description: "Director",
          section: "People",handler: () => {
              window.location.href = "/people/keith_brendan/";
            },},{id: "people-noe-reyes-rivas",
          title: 'Noe Reyes Rivas',
          description: "PhD Student",
          section: "People",handler: () => {
              window.location.href = "/people/noe_reyes_rivas/";
            },},{id: "people-rami-masri",
          title: 'Rami Masri',
          description: "Postdoctoral Researcher",
          section: "People",handler: () => {
              window.location.href = "/people/rami_masri/";
            },},{id: "people-florian-schäfer",
          title: 'Florian Schäfer',
          description: "Co-Director",
          section: "People",handler: () => {
              window.location.href = "/people/schaefer_florian/";
            },},{id: "people-qi-tang",
          title: 'Qi Tang',
          description: "Co-PI",
          section: "People",handler: () => {
              window.location.href = "/people/tang_qi/";
            },},{id: "people-molei-tao",
          title: 'Molei Tao',
          description: "Co-PI",
          section: "People",handler: () => {
              window.location.href = "/people/tao_molei/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
