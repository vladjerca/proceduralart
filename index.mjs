import { render } from './renderer/render.mjs';
import { seed } from './utils/rng.mjs';

const canvas = document.getElementById('canvas');
const permalink = document.getElementById('permalink');

permalink
    .href = `/?planet=${seed}`;

render(canvas);