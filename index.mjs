import { draw } from './planet.mjs';
import { seed } from './utils/rng.mjs';

const canvas = document.getElementById('canvas');
const permalink = document.getElementById('permalink');

permalink
    .href = `/?planet=${seed}`;

draw(canvas, seed);