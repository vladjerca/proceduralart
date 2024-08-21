import { state } from './state.mjs';
import { randomFloat } from '../../../utils/rng.mjs';
import tc from 'tinycolor2';

export const colors = {
    sky: tc.fromRatio({
        h: randomFloat('sky_hue'),
        s: randomFloat('sky_saturation', 0.7, 0.9),
        v: randomFloat('sky_value_1', 0.6, 0.85)
    }),
    planet: tc.fromRatio({
        h: randomFloat('sky_hue'),
        s: randomFloat('planet_saturation', 0.5, 1),
        v: state.isNight ? 0.4 : 0.8,
    }),
    star: tc.fromRatio({
        h: randomFloat('sky_hue'),
        s: .2,
        v: .8,
    }),
    sun: tc.fromRatio({
        h: randomFloat('sky_hue'),
        s: 0.5,
        v: 0.8,
    }),
    exhaust: tc.fromRatio({
        h: randomFloat('sky_hue') * 0.25,
        s: 1,
        v: 1,
    }),
};
