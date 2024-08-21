import { randomBool, randomInt } from '../../../utils/rng.mjs';

const isNight = () => randomBool('is_night');
const starCount = () => randomInt('star_count', 200, 400);
const sunCount = () => randomInt('sun_count', 1, 3);
const isSunVisible = () => !isNight() && sunCount() > 0;
const isPlanetVisible = () => !isSunVisible() && randomBool('is_planet_visible', 0.7);


export const state = {
    isNight: isNight(),
    starCount: starCount(),
    sunCount: sunCount(),
    isSunVisible: isSunVisible(),
    isPlanetVisible: isPlanetVisible(),
    isAtlasVisible: randomBool('is_atlas_visible', 0.6),
}