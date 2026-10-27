/*
Assignment 2 — Animated Systems / Week 10 course reference
Route: Randomization. Elapsed seconds drive lengthScale from 0.55 to 1.00
and back over one complete 6-second cycle, with cosine easing.
Intention: reveal the existing structure through a bounded change while
preserving the source palette, background, color rule and visual identity.
Student: replace this reference description with your own method and intention.
Week 11: add 2–3 sentences naming a specific real-time data input,
the parameter and response it would control, and its relevance to your work.
*/
const MEMBER_OPTIONS = {
  1: [2], 2: [1, 3], 3: [0, 2, 4],
  4: [0, 1, 3, 4], 5: [0, 1, 2, 3, 4]
};
function selectFamilyMembers(families, count) {
  return families.map(family =>
    MEMBER_OPTIONS[count].map(index => family[index]));
}
function makeColorRandom(seed) {
  let state = seed >>> 0;
  return function () {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
function pickFamilyIndex(r) {
  if (r < 0.40) return 0;
  if (r < 0.65) return 1;
  if (r < 0.85) return 2;
  if (r < 0.95) return 3;
  return 4;
}
function pickFamilyColor(activeFamilies, nextColor) {
  const family = activeFamilies[pickFamilyIndex(nextColor())];
  const member = floor(nextColor() * family.length);
  return family[member];
}
// Cool with a Warm Accent: five families, five members each.
const backgroundHex = '#EDF1F2';
const colorFamilies = [
  [
    "#182D3C",
    "#20394C",
    "#29465B",
    "#2F4F65",
    "#36576F"
  ],
  [
    "#235064",
    "#2C5E74",
    "#356B83",
    "#3C748D",
    "#437D97"
  ],
  [
    "#3A5B57",
    "#476B66",
    "#547A75",
    "#5D847F",
    "#678E89"
  ],
  [
    "#475372",
    "#546182",
    "#626F91",
    "#6C799B",
    "#7683A5"
  ],
  [
    "#B54321",
    "#C54D29",
    "#D45732",
    "#DE5E38",
    "#E8663F"
  ]
];
const MEMBERS_PER_FAMILY = 1;
const activeFamilies = selectFamilyMembers(
  colorFamilies, MEMBERS_PER_FAMILY);
const activePalette = activeFamilies.flat();
// Educational study after Manfred Mohr, P-38, “Rotor” (1970).
// Part 2: reuse the Part 1 rule as a function and build the full composition.
// Source exercise: W06 Circular Composition

let seed = 1970;
let thickChance = 0.22;

const SIGN_COUNT = 120;
const FIELD_RADIUS = 230;
const SIGN_SIZE = 44;

const LOOP_SECONDS = 6;
const RHYTHM = "cosine"; // "cosine" or "linear"
let animationStart = 0;
function motionAt(seconds, offset = 0) {
  const phase = ((seconds / LOOP_SECONDS + offset) % 1 + 1) % 1;
  if (RHYTHM === "linear") return 1 - Math.abs(2 * phase - 1);
  return 0.5 - 0.5 * Math.cos(2 * Math.PI * phase);
}
const MIN_LENGTH_SCALE = 0.05;
const MAX_LENGTH_SCALE = 4.00;

function setup() {
  const canvas = createCanvas(600, 600);
  describe("Randomization composition: one bounded parameter changes in a six-second outward-and-return loop.");
  stroke(0);
  animationStart = millis();
}

function draw() {
  background(backgroundHex);
  const elapsed = (millis() - animationStart) / 1000;
  const motion = motionAt(elapsed);
  const lengthScale = lerp(MIN_LENGTH_SCALE, MAX_LENGTH_SCALE, motion);
  randomSeed(seed);
  const nextColor = makeColorRandom(808);

  for (let i = 0; i < SIGN_COUNT; i += 1) {
    const angle = random(TWO_PI);
    const radius = sqrt(random()) * (FIELD_RADIUS - SIGN_SIZE);
    const cx = width / 2 + cos(angle) * radius;
    const cy = height / 2 + sin(angle) * radius;

    stroke(pickFamilyColor(activeFamilies, nextColor));
    drawRandomSign(cx, cy, SIGN_SIZE, lengthScale);
  }
}

function drawRandomSign(cx, cy, size, lengthScale) {
  const left = cx - size / 2;
  const top = cy - size / 2;

  for (let i = 0; i < 15; i += 1) {
    const x1 = random(left, left + size);
    const y1 = random(top, top + size);
    const x2 = random(left, left + size);
    const y2 = random(top, top + size);

    const styleRoll = random();
    strokeWeight(styleRoll < thickChance ? 2.2 : 0.75);

    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    line(mx + (x1 - mx) * lengthScale,
         my + (y1 - my) * lengthScale,
         mx + (x2 - mx) * lengthScale,
         my + (y2 - my) * lengthScale);
  }
}
