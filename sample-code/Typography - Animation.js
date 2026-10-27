/*
Assignment 2 — Animated Systems / Week 10 course reference
Route: Typography. Elapsed seconds drive sizeScale from 0.85 to 1.00
and back over one complete 6-second cycle, with cosine easing.
Intention: reveal the existing structure through a bounded change while
preserving the source palette, background, color rule and visual identity.
Student: replace this reference description with your own method and intention.
Week 11: add 2–3 sentences naming a specific real-time data input,
the parameter and response it would control, and its relevance to your work.
*/

// STUDENT SETTINGS
const PALETTE_NUMBER = 4; // Same palette as A
const REVERSE_TRANSITION = false;
const COLOR_SYSTEM = prepareTransition(PALETTE_NUMBER, REVERSE_TRANSITION);
// Week 05 Typography Template
// Completed Week 9 fill reference using the latest Week 5 template.
// Keep your completed word, spacing, and size curve.

const WORD = "HABIBI";
const SCRIPT = "latin";
const ROWS = 32;             // Density: integer, at least 2
const STEP_RATIO = 0.97;     // Tail spacing: 0 < value <= 1
const CURVE_STRENGTH = 1;    // Waist curvature: 1..12
const CURVE_CASE = 5;        // 5 = Bezier baseline, 1 = Power, 2 = Exponential

// Keep your completed composition settings.
const TOP_Y = 18;
const BOTTOM_Y = 758;
const LARGE_SIZE = 140;
const SMALL_SIZE = 3;

// Choose your Sketch B export name.
const OUTPUT_NAME = "animated-typography";
let arabicFont;

const LOOP_SECONDS = 6;
const RHYTHM = "cosine"; // "cosine" or "linear"
let animationStart = 0;
function motionAt(seconds, offset = 0) {
  const phase = ((seconds / LOOP_SECONDS + offset) % 1 + 1) % 1;
  if (RHYTHM === "linear") return 1 - Math.abs(2 * phase - 1);
  return 0.5 - 0.5 * Math.cos(2 * Math.PI * phase);
}
const MIN_SIZE_SCALE = 0.85;
const MAX_SIZE_SCALE = 1.00;

async function setup() {
  if (SCRIPT === "arabic") {
    arabicFont = await loadFont("assets/NotoSansArabic-Bold.ttf");
  }
  createCanvas(600, 800);
  describe("Typography composition: one bounded parameter changes in a six-second outward-and-return loop.");
  pixelDensity(2);
  animationStart = millis();
}

function draw() {
  background(COLOR_SYSTEM.background);
  const elapsed = (millis() - animationStart) / 1000;
  const motion = motionAt(elapsed);
  const sizeScale = lerp(MIN_SIZE_SCALE, MAX_SIZE_SCALE, motion);
  noStroke();
  fill(12);
  if (SCRIPT === "arabic") {
    textFont(arabicFont);
    textStyle(NORMAL); // The font file is already Bold.
    textDirection("rtl");
  } else {
    textFont("Arial");
    textStyle(BOLD);
    textDirection("ltr");
  }
  textAlign(CENTER, TOP);

  // Keep your completed Week 5 loop. Add the fill line.
  for (let row=0; row<ROWS; row+=1) {
    const position=rowPosition(row, ROWS, STEP_RATIO);
    const y=lerp(TOP_Y, BOTTOM_Y, position);
    const t=(y-TOP_Y)/(BOTTOM_Y-TOP_Y);
    const curve=taperCurve(t, CURVE_CASE, CURVE_STRENGTH);
    const size=lerp(SMALL_SIZE, LARGE_SIZE, curve);
    fill(COLOR_SYSTEM.colorAt(t));
    textSize(size * sizeScale);
    text(WORD, width/2, y);
  }
}

// Click the preview, then press S to export the current canvas.
function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas(OUTPUT_NAME, "png");
  }
}

// SUPPLIED HELPERS: read their purpose; keep their code unchanged.
// The guide supplies the loop. No STAGE or separate PLAY settings are needed.
function rowPosition(row, rows, ratio) {
  if (rows < 2 || !Number.isInteger(rows) || ratio <= 0 || ratio > 1) {
    throw new Error("Use integer ROWS >= 2 and 0 < STEP_RATIO <= 1.");
  }
  if (Math.abs(ratio - 1) < 0.000001) return row / (rows - 1);
  return (1 - Math.pow(ratio, row)) / (1 - Math.pow(ratio, rows - 1));
}

// t is actual height from 0 at TOP_Y to 1 at BOTTOM_Y.
// The returned width fraction decreases from 1 to 0.
function taperCurve(t, curveCase, strength) {
  t = Math.max(0, Math.min(1, t));
  const k = Math.max(1, Math.min(12, strength));
  switch (curveCase) {
    case 1: // POWER: progressively stronger inward curvature.
      return Math.pow(1 - t, k);

    case 2: { // EXPONENTIAL: rapid narrowing, then a long fine tail.
      const end = Math.exp(-k);
      return (Math.exp(-k * t) - end) / (1 - end);
    }

    case 5: { // BEZIER: editable shoulder and tail control points.
      // Curve starts at (0, 1) and ends at (1, 0).
      const x1 = 0.4 / k, y1 = 0.20;
      const x2 = 0.8 / k, y2 = 0.02;
      // Find u whose Bezier x coordinate equals the actual height t.
      // Using t directly as u would change the intended silhouette.
      let low = 0, high = 1;
      for (let i = 0; i < 32; i += 1) {
        const u = (low + high) / 2;
        const x = cubicBezier(u, 0, x1, x2, 1);
        if (x < t) low = u;
        else high = u;
      }
      return cubicBezier((low + high) / 2, 1, y1, y2, 0);
    }

    default:
      throw new Error("CURVE_CASE must be 1 (Power), 2 (Exponential), or 5 (Bezier).");
  }
}

function cubicBezier(u, p0, p1, p2, p3) {
  const v = 1 - u;
  return v * v * v * p0 + 3 * v * v * u * p1
    + 3 * v * u * u * p2 + u * u * u * p3;
}

