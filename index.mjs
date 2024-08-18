import { draw } from './renderer/draw.mjs';
import { seed } from './utils/rng.mjs';

const canvas = document.getElementById('canvas');
const permalink = document.getElementById('permalink');

permalink
    .href = `/?planet=${seed}`;

draw(canvas);