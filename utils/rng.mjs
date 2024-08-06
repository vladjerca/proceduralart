import { PRNG } from 'toosoon-prng';
import { getQueryParams } from './getQueryParams.mjs';
import { seeder } from './seeder.mjs';

const rng = new PRNG();
const params = getQueryParams();
const seed = params.get('planet') ?? seeder();

rng.setSeed(seed);

export default rng;