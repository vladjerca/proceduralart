import { randomFloat } from '../../utils/rng.mjs';

export const colors = {
    primary_sky: {
        h: randomFloat('sky_hue'),
        s: randomFloat('sky_saturation', 0.7, 0.9),
        v: randomFloat('sky_value_1', 0.5, 0.7)
    },
    secondary_sky: {
        h: randomFloat('sky_hue') * 0.85,
        s: randomFloat('sky_saturation', 0.7, 0.9),
        v: randomFloat('sky_value_2', 0.5, 0.7)
    }
};
