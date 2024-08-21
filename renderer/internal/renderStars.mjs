import { randomBool, randomInt } from '../../utils/rng.mjs';
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

        const size = randomInt(`star_size_${i}`, 1, 3);
        const isLensFlared = randomBool(`star_lens_flare_${i}`, 0.3);


        for (let dx = -size; dx <= size; dx++) {
            for (let dy = -size; dy <= size; dy++) {
                if (Math.hypot(dx, dy) <= size) {
                    setPixel(data, x + dx, y + dy, colors.star.toRgb());
                }
            }
        }

        if (isLensFlared) {
            for (let angle = 15; angle < 360; angle += 90) {
                const radians = angle * (Math.PI / 180);
                const lineLength = size * 2;

                for (let dist = 0; dist < lineLength; dist++) {
                    const dx = Math.round(dist * Math.cos(radians));
                    const dy = Math.round(dist * Math.sin(radians));
                    setPixel(data, x + dx, y + dy, colors.star.toRgb());
                }
            }
        }

        setPixel(data, x, y, colors.star.toRgb());
    }

    applyBuffer(canvas, data);
}