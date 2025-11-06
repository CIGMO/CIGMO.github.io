---
layout: post
date: 2025-11-07 11:00:00-0500
inline: true
related_posts: false
---

#### _Efficient optimization-based invariant-domain-preserving limiters for gas dynamics equations_

- **Speaker**: [Xiangxiong Zhang](https://www.math.purdue.edu/~zhan1966/) (Purdue University)
- **Date**: November 7, 2025
- **Time**: 11:00 -- 12:00 (EST)

- **Abstract**:
  I will present effective splitting methods for implementing optimization-based limiters to enforce the invariant domain defined by positive density and positive internal energy. Both L2 and L1 norm minimization limiters will be considered. The key ingredients include an efficient explicit formulation of the projection onto the invariant domain set, and also proper applications of the classical Douglas-Rachford splitting and its more recent extension Davis-Yin splitting.
  Such an optimization-based approach can be applied to many numerical schemes to construct high order accurate, globally conservative, and invariant-domain-preserving schemes for compressible flow equations.
  As a demonstration, we apply it to high order discontinuous Galerkin schemes with non-SSP Runge-Kutta and test it on demanding benchmarks to validate the robustness and performance.  Unlike L1 minimization in many other applications, the L1 minimization does not produce a significantly more sparse solution than L2 minimization in this context of limiters. On the other hand, for special problems such as high speed astrophysical jets, L1-norm limiter is triggered less during the time evolution than L2-norm limiter, thus L1-norm limiter seems better for these problems.
- **Location**:
  Virtual (Zoom)

- **Zoom**: [Zoom Link](https://brown.zoom.us/j/99596594185?pwd=jOoshVgvAbX6xSWR7ODaWnspqU5SNX.1&jst=2)
- [**Add to Calendar**](/assets/calendar/seminar_3.ics)
