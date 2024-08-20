import { randomInt } from '../../utils/rng.mjs';
import { colors } from './constants/colors.mjs';
import { state } from './constants/state.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function renderSun(canvas) {
    if (!state.isSunVisible) {
        return;
    }

    const { width, height } = canvas;
    const context = canvas.getContext('2d', { willReadFrequently: true });

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
