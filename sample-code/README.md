# Week 10 — runnable animation references

Choose one route; continue your own completed color work. These are full reference solutions, not four required exercises.

## Run locally
Open `index.html` in a browser. All JavaScript and the optional Arabic font are local. If your browser restricts local font loading, serve this directory with `python3 -m http.server 8000` and open http://localhost:8000/ .

## Use in the p5.js editor
Create a duplicate of your own color sketch and follow the Lab Guide. To run a supplied reference, replace sketch.js with one `… - Animation.js` file. Contour and Randomization are self-contained. Typography and Grid also need `Color Transition.js`, loaded before sketch.js in index.html. Use p5.js 2.3.2, matching the supplied local runtime; Typography uses the 2.x textDirection API. For Arabic, retain assets/NotoSansArabic-Bold.ttf and its OFL license. For Grid, retain `<div id="canvas-holder"></div>` or remove only the canvas.parent call in your duplicate.

## Teaching controls
All routes use LOOP_SECONDS=6 and RHYTHM="cosine". The clock starts after setup preparation. Keep positive duration. Do not add a second setup or draw. S saves a still. Grid seed-changing controls have been removed from this animation reference so its composition stays fixed.

Contour: contraction 0–0.25; 61 contours retain the complete color sequence. Randomization: lengthScale .55–1; the original 1800 line segments keep their midpoints, directions, widths and colors. Typography: sizeScale .85–1, preserving actual row-position color. Grid: angleScale .25–1; 264 modules retain centers, displacement, size and column color.

Only one p5.js sketch link is submitted, with viewable code and an opening comment. Week 11 adds the 2–3 sentence data idea in that comment. No API implementation is required.
