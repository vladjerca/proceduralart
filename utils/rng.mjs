import { PRNG } from 'toosoon-prng';
import { createNoise2D } from 'simplex-noise';
import { getQueryParams } from './getQueryParams.mjs';
import { seeder } from './seeder.mjs';

const rng = new PRNG();
const params = getQueryParams();
export const seed = parseInt(params.get('planet') ?? seeder(), 10);
const perlin = createNoise2D(() => rng.random(seed));
export const noise = (x, y) => Math.abs(perlin(x, y ?? x));

rng.setSeed(seed);

export const randomInt = (id, min, max) => rng.randomInt(id, min, max);
export const randomBool = (id, probability) => rng.randomBoolean(id, probability);
export const randomFloat = (id, min, max) => rng.randomFloat(id, min, max);

export const randomColor = (id) => {
    const r = randomInt(`red_${id}`, 0, 255);
    const g = randomInt(`green_${id}`, 0, 255);
    const b = randomInt(`blue_${id}`, 0, 255);

    return{
        r,
        g,
        b,
    };
}
