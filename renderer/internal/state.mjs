import { randomBool, randomInt } from "../../utils/rng.mjs";

const isNight = () => randomBool('is_night');
const starCount = () => randomInt('star_count', 200, 400);
const sunCount = () => randomInt('sun_count', 1, 3);


export const state = {
    isNight: isNight(),
    starCount: starCount(),
    sunCount: sunCount(),
    isSunVisible: !isNight() && sunCount() > 0,
}