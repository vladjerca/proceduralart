import { state } from './state.mjs';
import { randomFloat } from '../../utils/rng.mjs';

export const colors = {
    primary_sky: {
        h: randomFloat('sky_hue'),
        s: randomFloat('sky_saturation', 0.7, 0.9),
        v: randomFloat('sky_value_1', 0.6, 0.85)
    },
    secondary_sky: {
        h: randomFloat('sky_hue') * 0.85,
        s: randomFloat('sky_saturation', 0.7, 0.9),
        v: randomFloat('sky_value_2', 0.6, 0.85)
    },
    star: {
        h: randomFloat('sky_hue'),
        s: .2,
        v: .8,
    }
};

if (state.isNight) {
    colors.primary_sky.v -= .6;
    colors.secondary_sky.v -= .4;
}
