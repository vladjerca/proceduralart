import { randomInt } from '../../utils/rng.mjs';
import { getContext } from './canvas/getContext.mjs';

/**
 * Renders the sun on the canvas.
 * 
 * @param {Object} options - The options for rendering the sun.
 * @param {HTMLCanvasElement} options.canvas - The canvas element to render on.
 * @param {Object} options.colors - The colors to use for rendering.
 * @param {Object} options.state - The state of the sun.
 */
export function renderSun({
    canvas,
    colors,
    state,
}) {
    if (!state.isSunVisible) {
        return;
    }

    const { width, height } = canvas;
    const context = getContext(canvas);

    for (let i = 0; i < state.sunCount; i++) {
        const x = randomInt(`sun_x_${i}`, 0, width);
        const y = randomInt(`sun_y_${i}`, 0, height);
        const size = randomInt(`sun_size_${i}`, 10, 50);

        context.beginPath();
        context.arc(x, y, size * 1.1, 0, 2 * Math.PI);
        context.fillStyle = colors.sun.clone()
            .setAlpha(.25)
            .toRgbString();
        context.fill();

        context.beginPath();
        context.arc(x, y, size, 0, 2 * Math.PI);
        context.fillStyle = colors.sun.toRgbString();
        context.fill();
    }
}
