import { randomInt } from '../../utils/rng.mjs';
import { colors } from './colors.mjs';
import { state } from './state.mjs';
import { setPixel } from './setPixel.mjs';
import { toRGB } from './toRGB.mjs';
import { readBuffer } from './readBuffer.mjs';
import { applyBuffer } from './applyBuffer.mjs';
import { calculateTerrainHeight } from './calculateTerrainHeight.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @returns 
 */
export function renderStars(canvas) {
    if (!state.isNight) {
        return;
    }

    const data = readBuffer(canvas);
    const { width, height } = canvas;

    for (let i = 0; i < state.starCount; i++) {
        const x = randomInt(`star_x_${i}`, 0, width);
        const y = randomInt(`star_y_${i}`, 0, height);

        const maxTerrainHeight = height * Math.min(
            ...calculateTerrainHeight(x, width)
        );

        if (y > maxTerrainHeight) {
            continue;
        }

        setPixel(data, x, y, toRGB(colors.star));

        applyBuffer(canvas, data);
    }
}