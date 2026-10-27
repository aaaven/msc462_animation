/*
Assignment 2 — Animated Systems / Week 10 course reference
Route: Contour. Elapsed seconds drive contraction from 0 to 0.25
and back over one complete 6-second cycle, with cosine easing.
Intention: reveal the existing structure through a bounded change while
preserving the source palette, background, color rule and visual identity.
Student: replace this reference description with your own method and intention.
Week 11: add 2–3 sentences naming a specific real-time data input,
the parameter and response it would control, and its relevance to your work.
*/
/*
Assignment 1 Chromatic Systems — Sketch A
Name: [Your name]
Original exercise: Week 4 Return to Square
Palette: [name and background HEX]
Members per family: [1–5 and enabled member positions]
Color rule: [explain continuous contour grouping]
Visual intention: [explain the visible effect]
*/
// WEEK 08 COLOR SYSTEM
// Copy this whole file into the top of your duplicated sketch.js.
// Keep the supplied color data and helpers unchanged.
const PALETTES = [
  {
    "name": "Soft Analogous",
    "background": "#F4F1EA",
    "families": [
      [
        "#395163",
        "#455F73",
        "#526D82",
        "#5B778C",
        "#648096"
      ],
      [
        "#45626E",
        "#52707E",
        "#607F8D",
        "#6A8997",
        "#7493A1"
      ],
      [
        "#4F7476",
        "#5D8386",
        "#6C9295",
        "#769C9F",
        "#81A6A9"
      ],
      [
        "#37504A",
        "#446059",
        "#526F68",
        "#5C7972",
        "#66837C"
      ],
      [
        "#4D5D75",
        "#5B6B85",
        "#697A94",
        "#73849E",
        "#7E8EA8"
      ]
    ]
  },
  {
    "name": "Bright Multicolor",
    "background": "#F7F2E8",
    "families": [
      [
        "#164185",
        "#1D4B95",
        "#2455A4",
        "#295CAE",
        "#2F64B8"
      ],
      [
        "#AA2638",
        "#BA2F41",
        "#C9384B",
        "#D33F52",
        "#DD465A"
      ],
      [
        "#01605A",
        "#047068",
        "#087F77",
        "#0B8981",
        "#0F938A"
      ],
      [
        "#613481",
        "#6E3E91",
        "#7B49A0",
        "#8451AA",
        "#8D59B4"
      ],
      [
        "#995601",
        "#A96006",
        "#B86B0B",
        "#C2720F",
        "#CC7A14"
      ]
    ]
  },
  {
    "name": "Cool with a Warm Accent",
    "background": "#EDF1F2",
    "families": [
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
    ]
  },
  {
    "name": "Light Colors on Dark",
    "background": "#171B2A",
    "families": [
      [
        "#64A9AF",
        "#71B8BF",
        "#80C7CE",
        "#8AD1D8",
        "#95DBE2"
      ],
      [
        "#7F8FC6",
        "#8F9FD6",
        "#9FAFE5",
        "#AABAEF",
        "#B6C6F9"
      ],
      [
        "#A380B9",
        "#B290C9",
        "#C2A1D8",
        "#CDADE2",
        "#D8B9EC"
      ],
      [
        "#C9AA5E",
        "#D9B96B",
        "#E8C879",
        "#F2D283",
        "#FCDC8D"
      ],
      [
        "#C77A6F",
        "#D7897E",
        "#E6988D",
        "#F0A398",
        "#FAADA3"
      ]
    ]
  }
];

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

function setContourColor(index, total) {
  const group = min(activePalette.length - 1,
    floor(index * activePalette.length / total));
  stroke(activePalette[group]);
}

const PALETTE_NUMBER = 3; // Choose 1, 2, 3, or 4.
const MEMBERS_PER_FAMILY = 1; // Choose 1, 2, 3, 4, or 5.
const paletteSystem = PALETTES[PALETTE_NUMBER - 1];
const backgroundHex = paletteSystem.background;
const activeFamilies = selectFamilyMembers(
  paletteSystem.families, MEMBERS_PER_FAMILY);
const activePalette = activeFamilies.flat();

const INNER_STEPS = 50;
const OUTER_STEPS = 10;
const LOOP_SECONDS = 6;
const RHYTHM = "cosine"; // "cosine" or "linear"
let animationStart = 0;
function motionAt(seconds, offset = 0) {
  const phase = ((seconds / LOOP_SECONDS + offset) % 1 + 1) % 1;
  if (RHYTHM === "linear") return 1 - Math.abs(2 * phase - 1);
  return 0.5 - 0.5 * Math.cos(2 * Math.PI * phase);
}
const MIN_CONTRACTION = 0;
const MAX_CONTRACTION = 0.25;

function setup(){createCanvas(PAPER_WIDTH,PAPER_HEIGHT);
  describe("Contour composition: one bounded parameter changes in a six-second outward-and-return loop.");pixelDensity(2);returnToSquareTemplate=buildReturnToSquareTemplate();animationStart = millis();}
function draw(){background(backgroundHex);
  const elapsed = (millis() - animationStart) / 1000;
  const motion = motionAt(elapsed);
  const contraction = lerp(MIN_CONTRACTION, MAX_CONTRACTION, motion);noFill();strokeWeight(LINE_WEIGHT);strokeJoin(MITER);translate(CENTER_X,CENTER_Y);
  const totalContours = INNER_STEPS + 1 + OUTER_STEPS;
  for (let step = 0; step <= INNER_STEPS; step += 1) {
    const baseAmount = step / INNER_STEPS;
    const amount = lerp(baseAmount, 1, contraction);
    const contourIndex = step;
    setContourColor(contourIndex, totalContours);
    drawDiamondToProfile(amount);
  }
  for (let step = 1; step <= OUTER_STEPS; step += 1) {
    const baseAmount = step / OUTER_STEPS;
    const amount = baseAmount * (1 - contraction);
    const contourIndex = INNER_STEPS + step;
    setContourColor(contourIndex, totalContours);
    drawProfileToSquare(amount);
  }
}
// WEEK 04 — RETURN TO SQUARE — CLASS TEMPLATE ENGINE
// A p5.js classroom reconstruction informed by:
// Computer Technique Group (CTG), Return to Square (a), 1967/68.
// Idea: Masao Kohmura (also romanized Komura)
// Program: Kunio Yamanaka
//
// The original program and coordinate data do not survive. This sketch follows
// the documented geometric method: match points on a small diamond, a traced
// profile, and a large square; then interpolate between corresponding points.
// The 126 normalized PROFILE coordinates are adapted from a later digital trace:
// https://observablehq.com/@stwind/return-to-a-square


// KEEP THE FOLLOWING TEMPLATE ENGINE UNCHANGED.
// It stores and processes the 126 contour points for the class template.


// ---------- PAGE AND DRAWING FIELD ----------

const PAPER_WIDTH = 800;
const PAPER_HEIGHT = 1192;

const FIELD_SIZE = 700;
const CENTER_X = PAPER_WIDTH / 2;
const CENTER_Y = 380;

const INNER_DIAMOND_RADIUS = 10;
const OUTER_SQUARE_HALF = FIELD_SIZE / 2;
const LINE_WEIGHT = 0.8;

// ---------- RECONSTRUCTED PROFILE DATA — TEMPLATE ----------

// Each pair is [x, y], measured relative to the common center.
// The values are normalized to FIELD_SIZE and kept in outline order.
const PROFILE = [
  [-0.01597, -0.28258], [-0.03170, -0.29202], [-0.02960, -0.29621],
  [-0.01073, -0.31088], [-0.00549, -0.31508], [0.02281, -0.32661],
  [0.03749, -0.32346], [0.04168, -0.31822], [0.05006, -0.30460],
  [0.05531, -0.30460], [0.06788, -0.30564], [0.09095, -0.31088],
  [0.12554, -0.30460], [0.14755, -0.29097], [0.17166, -0.27629],
  [0.19472, -0.26371], [0.21673, -0.24485], [0.22600, -0.22600],
  [0.23665, -0.21864], [0.24608, -0.19034], [0.25656, -0.17566],
  [0.25971, -0.15575], [0.26180, -0.14422], [0.26285, -0.13793],
  [0.26914, -0.13478], [0.27124, -0.12745], [0.27124, -0.11487],
  [0.25761, -0.08866], [0.24818, -0.07294], [0.25132, -0.06455],
  [0.24608, -0.05617], [0.24503, -0.04673], [0.23245, -0.01738],
  [0.22826, -0.00480], [0.22407, 0.00358], [0.21988, 0.01511],
  [0.20939, 0.02979], [0.20625, 0.04027], [0.18843, 0.07591],
  [0.17795, 0.08639], [0.16222, 0.09897], [0.14545, 0.08744],
  [0.13602, 0.08534], [0.12658, 0.07591], [0.12239, 0.07591],
  [0.12239, 0.08325], [0.11820, 0.09058], [0.12868, 0.10631],
  [0.13916, 0.11993], [0.13400, 0.13400], [0.13497, 0.14299],
  [0.12973, 0.14823], [0.11715, 0.15348], [0.10877, 0.15243],
  [0.10248, 0.16081], [0.09514, 0.16605], [0.09095, 0.15977],
  [0.08466, 0.16710], [0.09723, 0.20065], [0.10562, 0.22580],
  [0.11086, 0.25201], [0.11296, 0.27507], [0.11715, 0.29918],
  [0.11505, 0.32643], [0.09095, 0.33587], [0.06684, 0.34216],
  [0.04168, 0.34740], [0.01757, 0.35054], [-0.00968, 0.35159],
  [-0.03589, 0.35054], [-0.06105, 0.34740], [-0.08620, 0.34425],
  [-0.11241, 0.33691], [-0.13233, 0.32958], [-0.12394, 0.32329],
  [-0.11346, 0.29499], [-0.10193, 0.28031], [-0.08725, 0.26564],
  [-0.08411, 0.25096], [-0.09773, 0.20065], [-0.10193, 0.17444],
  [-0.10926, 0.15243], [-0.11451, 0.13880], [-0.12000, 0.12000],
  [-0.12184, 0.10316], [-0.13023, 0.10316], [-0.16272, 0.10735],
  [-0.18998, 0.10526], [-0.20360, 0.10211], [-0.20989, 0.09582],
  [-0.21723, 0.08429], [-0.21723, 0.06543], [-0.21409, 0.05285],
  [-0.21618, 0.04761], [-0.22562, 0.04446], [-0.22562, 0.04236],
  [-0.22457, 0.03293], [-0.22142, 0.02769], [-0.20570, 0.01406],
  [-0.22876, 0.01092], [-0.21828, -0.00795], [-0.22247, -0.01738],
  [-0.24868, -0.03311], [-0.25077, -0.03835], [-0.24973, -0.04988],
  [-0.24448, -0.05302], [-0.22876, -0.07189], [-0.21618, -0.08761],
  [-0.21409, -0.09705], [-0.20780, -0.10019], [-0.20256, -0.10963],
  [-0.20256, -0.11801], [-0.20360, -0.12430], [-0.20256, -0.13374],
  [-0.20046, -0.14841], [-0.19836, -0.15889], [-0.19522, -0.16833],
  [-0.18400, -0.18400], [-0.18264, -0.19873], [-0.17530, -0.21340],
  [-0.15643, -0.22388], [-0.15539, -0.23646], [-0.14700, -0.25009],
  [-0.12708, -0.26476], [-0.10297, -0.27525], [-0.05790, -0.28258],
];


// ---------- PROGRAM LIFECYCLE — TEMPLATE ----------

let returnToSquareTemplate;

// ---------- CONTOUR ENGINE — TEMPLATE ----------

function buildReturnToSquareTemplate() {
  // Matching index numbers describe matching rays through all three shapes.
  const profilePoints = PROFILE.map(([x, y]) => ({
    x: x * FIELD_SIZE,
    y: y * FIELD_SIZE,
  }));

  const innerPoints = profilePoints.map((point) => pointOnDiamond(point));
  const outerPoints = profilePoints.map((point) => pointOnOuterSquare(point));

  return {
    drawDiamondToProfile(amount) {
      drawBetween(innerPoints, profilePoints, amount);
    },

    drawProfileToSquare(amount) {
      drawBetween(profilePoints, outerPoints, amount);
    },
  };
}

// ---------- SIMPLE COMMANDS USED BY sketch.js ----------

function drawDiamondToProfile(amount) {
  returnToSquareTemplate.drawDiamondToProfile(amount);
}

function drawProfileToSquare(amount) {
  returnToSquareTemplate.drawProfileToSquare(amount);
}

function pointOnDiamond(point) {
  // A diamond centered at (0, 0) follows |x| + |y| = radius.
  const projectionScale =
    INNER_DIAMOND_RADIUS / (abs(point.x) + abs(point.y));

  return {
    x: point.x * projectionScale,
    y: point.y * projectionScale,
  };
}

function pointOnOuterSquare(point) {
  // An upright square centered at (0, 0) follows max(|x|, |y|) = half-size.
  const projectionScale =
    OUTER_SQUARE_HALF / max(abs(point.x), abs(point.y));

  return {
    x: point.x * projectionScale,
    y: point.y * projectionScale,
  };
}

function drawBetween(startPoints, endPoints, amount) {
  beginShape();

  for (let index = 0; index < startPoints.length; index += 1) {
    const start = startPoints[index];
    const end = endPoints[index];

    const x = lerp(start.x, end.x, amount);
    const y = lerp(start.y, end.y, amount);

    // Straight vertex segments preserve the plotter-like polygonal contour.
    vertex(x, y);
  }

  endShape(CLOSE);
}


// Press S to export the finished still image.
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('animated-contour', 'png');
  }
}
