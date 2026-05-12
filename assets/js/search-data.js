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
          section: "News",},{id: "news-efficient-optimization-based-invariant-domain-preserving-limiters-for-gas-dynamics-equations-speaker-xiangxiong-zhang-purdue-university-date-november-7-2025-time-11-00-12-00-est-abstract-i-will-present-effective-splitting-methods-for-implementing-optimization-based-limiters-to-enforce-the-invariant-domain-defined-by-positive-density-and-positive-internal-energy-both-l2-and-l1-norm-minimization-limiters-will-be-considered-the-key-ingredients-include-an-efficient-explicit-formulation-of-the-projection-onto-the-invariant-domain-set-and-also-proper-applications-of-the-classical-douglas-rachford-splitting-and-its-more-recent-extension-davis-yin-splitting-such-an-optimization-based-approach-can-be-applied-to-many-numerical-schemes-to-construct-high-order-accurate-globally-conservative-and-invariant-domain-preserving-schemes-for-compressible-flow-equations-as-a-demonstration-we-apply-it-to-high-order-discontinuous-galerkin-schemes-with-non-ssp-runge-kutta-and-test-it-on-demanding-benchmarks-to-validate-the-robustness-and-performance-unlike-l1-minimization-in-many-other-applications-the-l1-minimization-does-not-produce-a-significantly-more-sparse-solution-than-l2-minimization-in-this-context-of-limiters-on-the-other-hand-for-special-problems-such-as-high-speed-astrophysical-jets-l1-norm-limiter-is-triggered-less-during-the-time-evolution-than-l2-norm-limiter-thus-l1-norm-limiter-seems-better-for-these-problems-location-virtual-zoom-zoom-zoom-link-add-to-calendar",
          title: 'Efficient optimization-based invariant-domain-preserving limiters for gas dynamics equations Speaker: Xiangxiong Zhang (Purdue University)...',
          description: "",
          section: "News",},{id: "news-mfem-accelerating-efficient-solution-of-pdes-at-exascale-speaker-tzanio-kolev-lawrence-livermore-national-laboratory-date-december-10-2025-time-11-00-12-00-est-abstract-high-order-finite-element-methods-provide-a-powerful-framework-for-solving-partial-differential-equations-on-unstructured-grids-these-methods-are-particularly-well-suited-for-exascale-architectures-with-gpu-accelerators-where-their-efficiency-and-scalability-rely-on-the-adoption-of-partially-assembled-algorithms-that-reduce-memory-data-motion-the-matrix-free-nature-of-partial-assembly-algorithms-enables-higher-efficiency-but-also-motivates-new-research-in-areas-such-as-preconditioning-and-monotonicity-in-this-talk-we-review-recent-work-on-gpu-oriented-algorithms-and-software-for-high-order-meshing-discretizations-and-solvers-and-demonstrate-their-impact-in-several-large-scale-applications-from-the-us-department-of-energy-many-of-these-developments-have-been-incorporated-in-mfem-https-mfem-org-a-scalable-library-for-high-order-finite-element-discretization-of-pdes-on-general-unstructured-grids-that-employs-partial-assembly-and-matrix-free-algorithms-to-power-a-wide-variety-of-hpc-applications-in-addition-to-discussing-mfem-s-capabilities-and-algorithms-we-also-report-on-some-of-the-work-in-related-projects-including-high-order-ale-compressible-hydrodynamics-in-llnl-s-blast-code-gpu-benchmarks-from-the-center-for-efficient-exascale-discretizations-in-the-us-exascale-computing-project-and-the-cascadia-project-for-acoustic-gravity-waves-in-tsunami-modeling-location-virtual-zoom-zoom-zoom-link-add-to-calendar-recordings-zoom-recording",
          title: 'MFEM: Accelerating Efficient Solution of PDEs at Exascale Speaker: Tzanio Kolev (Lawrence Livermore...',
          description: "",
          section: "News",},{id: "news-an-inexact-trust-region-method-for-nonsmooth-pde-constrained-optimization-speaker-drew-p-kouri-sandia-national-laboratories-date-february-23-2026-time-11-00-12-00-est-abstract-optimization-problems-constrained-by-partial-differential-equations-pdes-are-ubiquitous-in-science-and-engineering-arising-as-optimal-control-design-and-inverse-problems-these-problems-are-notoriously-challenging-to-solve-numerical-for-example-simply-evaluating-the-objective-function-requires-solving-a-large-scale-system-of-equations-resulting-from-the-discretized-pdes-this-exorbitant-cost-necessitates-the-use-of-rapidly-converging-optimization-routines-to-reduce-the-number-of-evaluations-of-the-objective-function-and-its-derivatives-unfortunately-this-expense-is-exacerbated-when-the-objective-function-involves-nonsmooth-terms-such-sparsifying-regularizers-traditional-nonsmooth-optimization-methods-converge-sub-linearly-often-requiring-many-iterations-to-achieve-marginal-accuracy-in-this-talk-we-discuss-a-proximal-trust-region-newton-method-for-minimizing-the-sum-of-a-smooth-nonconvex-function-and-a-nonsmooth-convex-function-in-hilbert-space-our-method-is-unique-in-that-it-permits-and-systematically-controls-inexact-objective-function-and-derivative-evaluations-we-prove-global-convergence-of-our-method-and-establish-under-mild-assumptions-that-it-converges-superlinearly-even-quadratically-we-demonstrate-the-efficiency-of-our-algorithm-on-various-examples-from-pde-constrained-optimization-location-virtual-zoom-zoom-zoom-link-add-to-calendar",
          title: 'An Inexact Trust-Region Method for Nonsmooth PDE-Constrained Optimization Speaker: Drew P. Kouri (Sandia...',
          description: "",
          section: "News",},{id: "news-geometric-methods-for-physics-simulation-speaker-oliver-gross-university-of-california-san-diego-date-march-9-2026-time-11-00-12-00-est-abstract-physical-laws-governing-phenomena-such-as-swirling-water-or-snake-locomotion-arise-from-the-symmetries-of-the-universe-while-tangles-knots-and-braids-appear-as-recurring-motifs-across-scales-in-physics-chemistry-and-biology-from-coiled-dna-strands-to-magnetic-field-lines-shaping-solar-coronal-loops-understanding-the-geometric-and-topological-structures-inherent-in-these-systems-is-crucial-for-developing-efficient-and-faithful-simulation-tools-in-this-talk-i-will-outline-how-to-craft-solar-atmospheres-tie-knots-in-plasma-and-optimize-a-snake-s-slithering-motion-all-in-the-language-of-conformal-and-sub-riemannian-geometry-beyond-geometric-modeling-i-will-show-how-these-perspectives-can-naturally-lead-to-structure-preserving-algorithms-that-bridge-mathematics-physics-and-computation-location-virtual-zoom-zoom-zoom-link-add-to-calendar",
          title: 'Geometric Methods for Physics Simulation Speaker: Oliver Gross (University of California, San Diego)...',
          description: "",
          section: "News",},{id: "news-structure-preserving-numerical-approximation-of-nonlinear-reaction-diffusion-systems-speaker-ilaria-perugia-university-of-vienna-vienna-austria-date-may-4-2026-time-11-00-12-00-est-abstract-applications-in-physics-biology-and-chemistry-often-involve-pde-systems-with-multiple-interacting-components-such-as-gas-mixtures-competing-populations-or-chemical-reactants-these-are-modeled-by-nonlinear-reaction-diffusion-systems-their-numerical-approximation-is-challenging-due-to-nonlinearity-coupling-the-need-to-preserve-positivity-and-boundedness-and-often-a-non-positive-definite-diffusion-matrix-motivated-by-the-boundedness-by-entropy-framework-introduced-by-a-jüngel-in-2015-we-present-numerical-methods-based-on-nonlinear-transformations-involving-entropy-variables-which-ensure-positivity-and-boundedness-of-solutions-we-focus-on-the-local-discontinuous-galerkin-method-where-auxiliary-variables-help-reformulate-the-problem-so-that-nonlinearities-do-not-appear-under-differential-operators-and-interface-terms-this-allows-for-a-parallel-evaluation-of-nonlinear-operators-supports-high-order-accuracy-and-provides-discrete-entropy-stability-these-results-were-obtained-in-collaboration-with-p-f-antonietti-m-corti-s-gómes-and-a-jüngel-location-virtual-zoom-zoom-zoom-link-add-to-calendar",
          title: 'Structure-preserving numerical approximation of nonlinear reaction-diffusion systems Speaker: Ilaria Perugia (University of Vienna,...',
          description: "",
          section: "News",},{id: "people-alex-albors",
          title: 'Alex Albors',
          description: "PhD student",
          section: "People",handler: () => {
              window.location.href = "/people/albors_alex/";
            },},{id: "people-alexey-izmailov",
          title: 'Alexey Izmailov',
          description: "PhD student",
          section: "People",handler: () => {
              window.location.href = "/people/alexey_izmailov/";
            },},{id: "people-yuri-bazilevs",
          title: 'Yuri Bazilevs',
          description: "Co-PI",
          section: "People",handler: () => {
              window.location.href = "/people/bazilevs_yuri/";
            },},{id: "people-biswajit-khara",
          title: 'Biswajit Khara',
          description: "Postdoctoral Researcher",
          section: "People",handler: () => {
              window.location.href = "/people/biswajit_khara/";
            },},{id: "people-spencer-bryngelson",
          title: 'Spencer Bryngelson',
          description: "Co-PI",
          section: "People",handler: () => {
              window.location.href = "/people/bryngelson_spencer/";
            },},{id: "people-ed-chen",
          title: 'Ed Chen',
          description: "PhD student",
          section: "People",handler: () => {
              window.location.href = "/people/chen_ed/";
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
            },},{id: "people-brook-eyob",
          title: 'Brook Eyob',
          description: "PhD Student",
          section: "People",handler: () => {
              window.location.href = "/people/eyob_brook/";
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
            },},{id: "people-thomas-surowiec",
          title: 'Thomas Surowiec',
          description: "Co-PI",
          section: "People",handler: () => {
              window.location.href = "/people/thomas_surowiec/";
            },},{id: "people-david-winters",
          title: 'David Winters',
          description: "PhD student",
          section: "People",handler: () => {
              window.location.href = "/people/winters_david/";
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
