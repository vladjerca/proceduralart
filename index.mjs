import { getQueryParams } from './utils/getQueryParams.mjs';
import { seeder } from './utils/seeder.mjs';
import { draw } from './planet.mjs';

const params = getQueryParams();
const seed = params.get('planet') ?? seeder();

const canvas = document.getElementById('canvas');
const permalink = document.getElementById('permalink');

permalink
    .href = `/?planet=${seed}`;

draw(canvas, seed);