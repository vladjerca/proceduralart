import { PRNG } from 'toosoon-prng';
import { getQueryParams } from './getQueryParams.mjs';
import { seeder } from './seeder.mjs';

const rng = new PRNG();
const params = getQueryParams();
export const seed = parseInt(params.get('planet') ?? seeder(), 10);

rng.setSeed(seed);

export function randomInt(id, max) {
    return rng.randomInt(id, 0, max);
}

export function randomBool(id) {
    return rng.randomBoolean(id);
}
