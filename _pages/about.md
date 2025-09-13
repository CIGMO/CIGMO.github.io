---
layout: about_custom
title: about
permalink: /
# subtitle: The Center for Information Geometric Mechanics and Optimization.

profile:
  align: left
  image: CIGMO-logo.png
  image_circular: false # crops the image to make it circular
  more_info: >

selected_papers: false # includes a list of papers marked as "selected={true}"
social: false # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` foldefals

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

CIGMO researches and develops a comprehensive numerical treatment of inequality-constrained problems in computational mechanics.
It targets active research areas central to the NNSA mission, including single- and multi-component flows in the high-Mach-number regime and the mechanical response of geometrically complex solids and structures under extreme loading (high strain rates and pressures).
This work provides the missing link between scientific computing and the information geometry of inequality constraints.
CIGMO is a collaboration among Brown University, the Courant Institute at New York University, and Georgia Tech.
It is funded by the U.S. Department of Energy and the National Nuclear Security Administration under the [PSAAP IV program](https://psaap.llnl.gov/).

Systematic geometric frameworks for equality constraints—such as incompressibility of materials, energy conservation, and targets in controlled systems—are landmark achievements of computational science and engineering (CSE).
Inequality constraints are equally important, arising from obstacles and contact of solids, positivity of probability distributions, irreversibility in fracture and plasticity, safety constraints in control, and entropy-driven mechanical systems.
Yet practitioners face a myriad of problem-specific procedures rather than a comprehensive treatment, hindering NNSA-relevant applications such as hypersonics, fracture, and optimal design.

CIGMO builds on recent works by co-directors Keith, Schäfer, and collaborators on proximal Galerkin methods and information geometric regularization (IGR), which use the information geometry of contact and shock formation to derive performant numerical methods.
Recognizing that this structure underlies virtually all inequality-constrained and entropy-driven problems in CSE, CIGMO develops a comprehensive geometric framework to unify and advance these methods.
Just as geometric methods for equality constraints enabled geometric hydrodynamics, variational integrators, and finite element exterior calculus, CIGMO aims to enable a similar step change for inequality-constrained problems essential to the NNSA mission.

CIGMO includes technical thrusts:

- Thermodynamics-based information geometry for simulating highly energetic, reacting, multi-phase flows, avoiding breakdown due to shocks, negative densities, or energies.
- Proximal Galerkin methods for solids in extreme conditions undergoing collision and fracture.
- Integration with information geometric optimization for topology optimization, risk-averse optimization, and generative modeling.

To maximize impact, CIGMO pursues two investment thrusts:

- Development and integration with DOE codes (e.g., MFEM) and open-source software (including [MFC](https://github.com/mflowcode/mfc))
- Workforce development and community outreach to train a new generation of experts in information geometric mechanics.

Two challenge problems catalyze convergence and integration of these thrusts:

- Optimal design of architected materials and structures under extreme loading scenarios, including blast loading in a fully coupled fluid–structure interaction (FSI) environment.
- Computation of quantities of interest—such as surface heating, thrust, and lift/drag—under extreme hypersonic conditions, using the HIFiRE‑5 and BOLT‑II geometries.