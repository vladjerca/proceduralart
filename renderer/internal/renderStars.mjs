import { randomInt } from '../../utils/rng.mjs';
import { setPixel } from './canvas/setPixel.mjs';
import { readBuffer } from './canvas/readBuffer.mjs';
import { applyBuffer } from './canvas/applyBuffer.mjs';
import { calculateTerrainHeight } from './calculateTerrainHeight.mjs';

/**
 * Renders stars on the canvas based on the provided state.
 * 
 * @param {Object} options - The options for rendering stars.
 * @param {HTMLCanvasElement} options.canvas - The canvas element to render stars on.
 * @param {Object} options.colors - The colors to use for rendering stars.
 * @param {Object} options.state - The state object containing information about the current state.
 */
export function renderStars({
    canvas,
    colors,
    state,
}) {
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

        setPixel(data, x, y, colors.star.toRgb());
    }

    applyBuffer(canvas, data);
}