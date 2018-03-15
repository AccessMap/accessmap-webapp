import chroma from 'chroma-js';


const SIDEWALK_COLOR_SCALE = chroma.scale([
  chroma('lime'),
  chroma('yellow'),
  chroma('red'),
].map(c => c.brighten(1.5))).mode('lab');

const SIDEWALK_FLAT = SIDEWALK_COLOR_SCALE(0).hex();
const SIDEWALK_MID = SIDEWALK_COLOR_SCALE(0.5).hex();
const SIDEWALK_STEEP = SIDEWALK_COLOR_SCALE(1).hex();


export { SIDEWALK_FLAT, SIDEWALK_MID, SIDEWALK_STEEP };
