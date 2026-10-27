// WEEK 09 POSITION-BASED COLOR TRANSITION
// Supplied support library: load before sketch.js. Students keep this file closed.
// H is an angle, S is a radius, and B is interpolated separately.
// Uses Math radians and HEX output so your sketch's colorMode stays unchanged.
const TRANSITION_PRESETS = [
  {
    "name": "Soft Analogous",
    "background": "#F4F1EA",
    "start": "#526F68",
    "end": "#697A94",
    "startFamily": 4,
    "endFamily": 5
  },
  {
    "name": "Bright Multicolor",
    "background": "#F7F2E8",
    "start": "#2455A4",
    "end": "#7B49A0",
    "startFamily": 1,
    "endFamily": 4
  },
  {
    "name": "Cool with a Warm Accent",
    "background": "#EDF1F2",
    "start": "#29465B",
    "end": "#D45732",
    "startFamily": 1,
    "endFamily": 5
  },
  {
    "name": "Light Colors on Dark",
    "background": "#171B2A",
    "start": "#80C7CE",
    "end": "#E6988D",
    "startFamily": 1,
    "endFamily": 5
  }
];

function hexToHSB(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error('Use a six-digit HEX color.');
  const rgb = [1,3,5].map(i => parseInt(hex.slice(i,i+2),16) / 255);
  const [r,g,b] = rgb, hi = Math.max(...rgb), lo = Math.min(...rgb), d = hi-lo;
  let h = 0;
  if (d > 0) {
    if (hi === r) h = 60 * (((g-b)/d) % 6);
    else if (hi === g) h = 60 * ((b-r)/d + 2);
    else h = 60 * ((r-g)/d + 4);
  }
  return {h:(h+360)%360, s:hi === 0 ? 0 : 100*d/hi, b:100*hi};
}
function hsbToHex(h,s,b) {
  const v=b/100, sat=s/100;
  const channel = n => {
    const k=(n+h/60)%6;
    return Math.round(255*(v-v*sat*Math.max(0,Math.min(k,4-k,1))))
      .toString(16).padStart(2,'0');
  };
  return ('#'+channel(5)+channel(3)+channel(1)).toUpperCase();
}
function makeColorPath(startHex,endHex) {
  const a=hexToHSB(startHex), b=hexToHSB(endHex);
  const point = c => {
    const radians=c.h*Math.PI/180;
    return {x:c.s*Math.cos(radians),y:c.s*Math.sin(radians)};
  };
  return {startHex,endHex,a,b,p0:point(a),p1:point(b)};
}
function hsbOnPath(path,t) {
  if (!Number.isFinite(t)) throw new Error('Position t must be a finite number.');
  t=Math.max(0,Math.min(1,t));
  const x=path.p0.x+(path.p1.x-path.p0.x)*t;
  const y=path.p0.y+(path.p1.y-path.p0.y)*t;
  const s=Math.hypot(x,y);
  // At the center hue is undefined. A stable fallback has no visible effect at S=0.
  const h=s<1e-8 ? path.a.h : (Math.atan2(y,x)*180/Math.PI+360)%360;
  return {h,s:s<1e-8 ? 0 : Math.min(100,s),b:path.a.b+(path.b.b-path.a.b)*t,x,y};
}
function colorOnPath(path,t) {
  const c=hsbOnPath(path,t);
  if (t<=0) return path.startHex;
  if (t>=1) return path.endHex;
  return hsbToHex(c.h,c.s,c.b);
}

// Student interface: choose a palette, then pass position t to colorAt.
function prepareTransition(paletteNumber, reversed=false) {
  if (!Number.isInteger(paletteNumber) || paletteNumber<1 || paletteNumber>4)
    throw new Error('PALETTE_NUMBER must be 1, 2, 3, or 4.');
  const preset=TRANSITION_PRESETS[paletteNumber-1];
  const start=reversed ? preset.end : preset.start;
  const end=reversed ? preset.start : preset.end;
  const path=makeColorPath(start,end);
  return Object.freeze({name:preset.name,background:preset.background,start,end,
    colorAt:t=>colorOnPath(path,t)});
}
