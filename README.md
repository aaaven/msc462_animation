# Week 10 — Animation

Designing Media Messages / MSC462. Assignment 2 — Animated Systems.

## Live teaching artifacts

- **Week 10 - Animation - Slides.pptx**: 18 editable slides. Slides 1–15 are the 25-minute Tuesday teaching sequence; 16–18 are the 10-minute Thursday support sequence. Chinese teaching notes include timing, source and live-demo cues. Student-facing content is English.
- **Week 10 - Animation - Lab Guide.docx**: 9-page step-by-step guide. Shared preparation and clock, then one of four routes. Page 4 Contour, 5 Randomization, 6 Typography, 7 Grid. Explicit insert/replace instructions, copyable blocks, predictions, checkpoints, troubleshooting and opening-comment example.
- **Week 10 - Animation - Lab Guide.md**: editable content companion for the same guide.
- **sample-code/index.html**: local launcher for four runnable references. Choose one matching a completed color work. The routes are alternatives, not four exercises. Each has a live preview, viewable JavaScript, and local dependencies.
- **Week 10 - Animation - Sample Code.zip**: portable copy of the same sample-code folder, including p5.js 2.3.2, the color helper and optional Arabic font/license.

## Teaching sequence

Tuesday: 5 opening + 25 teaching + 40 hands-on + 5 save = 75 minutes.
Thursday: 5 opening + 10 support + 45 studio/tutorials + 10 peer check + 5 save = 75 minutes.

Students duplicate one existing color work and develop their submission directly. Keep palette, exact background, color rule and visual identity. All routes use elapsed time, a 6-second full outward-and-return cycle, and cosine ping-pong by default. Contour uses the current diamond–profile–square portrait, with contraction 0–0.25. Randomization scales each segment about its midpoint from .55–1. Typography scales original size from .85–1. Grid scales original angle from .25–1 while keeping displacement fixed.

Week 11 continues this same sketch: compare amplitude, duration and rhythm, select a final setting, then add 2–3 sentences about a specific real-time data input, its parameter/response and relevance. Week 10 only previews that extension. One runnable p5.js link with viewable code is the final submission. No second animation, API implementation, separate report, storyboard or video. Deadline is announced by the instructor. Assignment brief/rubric are managed separately.

## Running the references

Open sample-code/index.html. See sample-code/README.md for p5 editor setup. All dependencies are local. A local server is recommended if a browser restricts font loading: `python3 -m http.server 8000` from sample-code, then open http://localhost:8000/ . For Grid retain the canvas-holder div, or remove its parent call in an editor copy. For Arabic retain the supplied font and right-to-left settings.

## Validation and boundaries

The four routes were run in Chrome using the supplied p5.js 2.3.2. Continuous runs exceeded two full cycles. Exact browser drawing records at 0, 1.5, 3, 4.5, 6 and 12 seconds confirmed bounded motion, original geometry at the expected extreme, return at 6/12 seconds, stable colors and widths, 61 contours, 1800 stable line midpoints and 264 stable grid centers. Arabic font loading was checked. Minimum/midpoint/maximum/return canvas views were visually inspected. On this machine the Latin typography reference ran near 30 fps; other routes near 60 fps. Elapsed time preserves the 6-second cycle; performance depends on the device.

All 18 final PPTX slides were independently rendered through bundled LibreOffice and visually inspected. Package integrity, slide geometry, font policy, editable chart/workbook and import checks passed with zero findings. Notes total 25 minutes Tuesday and 10 Thursday. All 9 guide pages were rendered and visually inspected; headings, table headers, links and image alt text passed accessibility audit with zero findings. Delivered files match staged validated files by SHA-256.

These are production-validated references, not a claim of classroom testing or native PowerPoint application testing. Private builds, rendered evidence and audit scripts remain in `.codex-build/week10-animation-20261008/`. Week 10–11 review drafts, Weeks 02–09 completed materials and Assignment 2 brief/rubric were not modified.

## Artifact status register

| Artifact | Status | Canonical path |
| --- | --- | --- |
| Week 10 lecture/support slides | Built and validated | Week 10 - Animation - Slides.pptx |
| Week 10 lab guide | Built and validated | Week 10 - Animation - Lab Guide.docx |
| Four alternative runnable references | Browser validated | sample-code/ |
| Week 11 formal teaching package | Outside this production scope | Continue from review plan |

Keep these live filenames stable. Before future replacements, archive the previous live file in the nearest archive folder and validate the revision in a temporary build.
