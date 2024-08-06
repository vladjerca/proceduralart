import { draw } from './planet.mjs';
import rng from './utils/rng.mjs';

const canvas = document.getElementById('canvas');
const permalink = document.getElementById('permalink');

permalink
    .href = `/?planet=${rng.seed}`;

draw(canvas, rng.seed);