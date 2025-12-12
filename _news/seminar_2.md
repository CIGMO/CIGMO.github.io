---
layout: post
date: 2025-10-29 11:00:00-0500
inline: true
related_posts: false
---

#### _Shocks without tracking or capturing: Exceeding 1 quadrillion degrees of freedom via inviscid regularization of the compressible Navier-Stokes_

- **Speaker**: [Spencer Bryngelson](https://comp-physics.group/) (Georgia Institute of Technology)
- **Date**: October 29, 2025
- **Time**: 11:00 -- 12:00 (EST)

- **Abstract**:
  A method for solving multi-species and shock-laden flow at unprecedented problem sizes and time-to-solution is presented. The first inviscid regularization of the Navier-Stokes-like PDE is performed. This enables linear and well-conditioned numerics suitable for mixed-precision computation. A unified memory implementation is crafted for tightly coupled CPU-GPU and APU architectures (e.g., MI250X, GH200, MI300A), now standard on flagship machines like El Capitan and Frontier. With this trio, we improve on state-of-the-art CFD techniques with order of magnitude improvements along computational cost and memory footprint axes. The reduced memory footprint compared to baselines enables, for example, 25-times larger simulations, here shown to exceed 1 quadrillion degrees of freedom (200T grid points) with per-grid-point cost speedups. The method strong scales from 8 nodes to the full systems (>10K nodes) with better than 50% efficiency. This enables, for example, a typical 200B grid point CFD simulation in less than one wall clock minute on OLCF Frontier. Early results suggest increased robustness compared to ENO/limiter-type shock capturing schemes for high-Mach flows and strong discontinuities. Results are shown for a Mach 14 many-rocket-engine configuration that nominally matches the SpaceX Super Heavy.

- **Location**:
  Virtual (Zoom)

- **Zoom**: [Zoom Link](https://brown.zoom.us/j/92988066475?pwd=xhn5ibHydwlXsnGdLyHGWwXsBUGaac.1)
- [**Add to Calendar**](/assets/calendar/seminar_2.ics)

- **Recordings**: [Zoom Recording](https://drive.google.com/file/d/1orQQGHZzirolxi5OfoH52FQqIMpoCrct/view?usp=sharing)
