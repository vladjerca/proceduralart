import { applyBuffer } from './canvas/applyBuffer.mjs';
import { readBuffer } from './canvas/readBuffer.mjs';
import { setPixel } from './canvas/setPixel.mjs';
import { calculateTerrainHeight } from './calculateTerrainHeight.mjs';

/**
 * Renders the sky background on the canvas.
 * 
 * @param {Object} options - The options for rendering the sky background.
 * @param {HTMLCanvasElement} options.canvas - The canvas element to render on.
 * @param {Object} options.colors - The colors used for rendering.
 * @param {Object} options.state - The state of the renderer.
 */
export function renderSkyBackground({
    canvas,
    colors,
    state,
}) {
    const data = readBuffer(canvas);

    const width = canvas.width;
    const height = canvas.height;

    for (let x = 0; x < width; x++) {
        const maxTerrainHeight = height * Math.min(
            ...calculateTerrainHeight(x, width)
        );

        for (let y = 0; y < maxTerrainHeight; y++) {
            const relativeHeight = y / maxTerrainHeight;
            const sunWeight = state.isNight
                ? relativeHeight
                : 1 - relativeHeight;

            const skyColor = colors.sky
                .clone()
                .darken(state.isNight ? 32.5 : 0)
                .spin(Math.cos(sunWeight * Math.PI) * 10)
                .lighten(sunWeight);


            setPixel(data, x, y, skyColor.toRgb());
        }
    }

    applyBuffer(canvas, data);
}