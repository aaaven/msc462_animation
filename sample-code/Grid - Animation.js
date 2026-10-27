/*
Assignment 2 — Animated Systems / Week 10 course reference
Route: Grid. Elapsed seconds drive angleScale from 0.25 to 1.00
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
// Educational study after Georg Nees, Schotter (1968–1970).
// The documented rule begins with a row of 12 ordered squares, then increases
// random displacement and rotation as the rows move downward.

const COLS = 12;
const ROWS = 22;
const CELL = 39; // Grid spacing and original disturbance scale
const BLOCK_SCALE = 0.72; // Visible gaps between filled modules
const START_X = 126;
const START_Y = 58;

let seed = 1968;

const LOOP_SECONDS = 6;
const RHYTHM = "cosine"; // "cosine" or "linear"
let animationStart = 0;
function motionAt(seconds, offset = 0) {
  const phase = ((seconds / LOOP_SECONDS + offset) % 1 + 1) % 1;
  if (RHYTHM === "linear") return 1 - Math.abs(2 * phase - 1);
  return 0.5 - 0.5 * Math.cos(2 * Math.PI * phase);
}
const MIN_ANGLE_SCALE = 0.25;
const MAX_ANGLE_SCALE = 1.00;

function setup() {
  const canvas = createCanvas(720, 960);
  describe("Grid composition: one bounded parameter changes in a six-second outward-and-return loop.");
  canvas.parent('canvas-holder');
  pixelDensity(2);
  rectMode(CENTER);
  noStroke();
  animationStart = millis();
}

function draw() {
  background(COLOR_SYSTEM.background);
  const elapsed = (millis() - animationStart) / 1000;
  const motion = motionAt(elapsed);
  const angleScale = lerp(MIN_ANGLE_SCALE, MAX_ANGLE_SCALE, motion);
  randomSeed(seed);

  for (let row = 0; row < ROWS; row += 1) {
    // One normalized variable drives two transformations. The first row is
    // perfectly ordered; the last has the largest allowed disturbance.
    const progress = row / (ROWS - 1);
    const maxShift = progress * CELL * 0.95;
    const maxAngle = progress * radians(42);

    for (let col = 0; col < COLS; col += 1) {
      const baseX = START_X + col * CELL;
      const baseY = START_Y + row * CELL;
      const dx = random(-maxShift, maxShift);
      const dy = random(-maxShift, maxShift);
      const angle = random(-maxAngle, maxAngle);

      const t = col / (COLS - 1);
      push();
      translate(baseX + dx, baseY + dy);
      rotate(angle * angleScale);
      fill(COLOR_SYSTEM.colorAt(t));
      square(0, 0, CELL * BLOCK_SCALE);
      pop();
    }
  }

  window.__SKETCH_READY = true;
}

// Click the canvas, then press S to save the current still.
function keyPressed() {
  if (key === 's' || key === 'S') saveCanvas('animated-grid', 'png');
}
