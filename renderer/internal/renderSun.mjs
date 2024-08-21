import { randomInt, randomFloat } from '../../utils/rng.mjs';
import { getContext } from './canvas/getContext.mjs';

const SUN_SIZE_MAX = 50;
const SUN_SIZE_MIN = 10;

/**
 * Draws a sun glow on the canvas.
 *
 * @param {CanvasRenderingContext2D} context - The rendering context of the canvas.
 * @param {number} x - The x-coordinate of the center of the sun glow.
 * @param {number} y - The y-coordinate of the center of the sun glow.
 * @param {number} size - The size of the sun glow.
 * @param {Color} color - The color of the sun glow.
 */
function drawSunGlow(context, x, y, size, color) {
    const glowSize = size * 1.2 + SUN_SIZE_MAX * 0.1;

    const gradient = context.createRadialGradient(
        x, y, 0,
        x, y, glowSize
    );

    gradient.addColorStop(0, color.clone().setAlpha(1).toRgbString());
    gradient.addColorStop(0.8, color.clone().setAlpha(0.5).toRgbString());
    gradient.addColorStop(1, color.clone().setAlpha(0).toRgbString());

    context.beginPath();
    context.arc(x, y, glowSize, 0, 2 * Math.PI);
    context.fillStyle = gradient;
    context.fill();
}

/**
 * Draws a sun on the canvas.
 *
 * @param {CanvasRenderingContext2D} context - The rendering context of the canvas.
 * @param {number} x - The x-coordinate of the center of the sun.
 * @param {number} y - The y-coordinate of the center of the sun.
 * @param {number} size - The size of the sun.
 * @param {Color} color - The color of the sun.
 */
function drawSunCore(context, x, y, size, color) {
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fillStyle = color.toRgbString();
    context.fill();
}

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

    const sunColors = [
        colors.sun.clone().spin(25),
        colors.sun.clone().spin(-20),
        colors.sun.clone().spin(0),
    ].sort(() => Math.random() - 0.5);

    const { width, height } = canvas;
    const context = getContext(canvas);

    for (let i = 0; i < state.sunCount; i++) {
        const x = randomInt(`sun_x_${i}`, 0, width);
        const y = randomInt(`sun_y_${i}`, 0, height);
        const size = randomInt(`sun_size_${i}`, SUN_SIZE_MIN, SUN_SIZE_MAX);

        drawSunGlow(context, x, y, size, sunColors[i % 3]);
        drawSunCore(context, x, y, size, sunColors[i % 3]);
    }
}
