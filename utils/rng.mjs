import { PRNG } from 'toosoon-prng';
import { getQueryParams } from './getQueryParams.mjs';
import { seeder } from './seeder.mjs';

const rng = new PRNG();
const params = getQueryParams();
export const seed = parseInt(params.get('planet') ?? seeder(), 10);

rng.setSeed(seed);

export const randomInt = rng.randomInt.bind(rng);
export const randomBool = rng.randomBoolean.bind(rng);
