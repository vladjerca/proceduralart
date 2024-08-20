import { applyBuffer } from './canvas/applyBuffer.mjs';
import { readBuffer } from './canvas/readBuffer.mjs';
import { setPixel } from './canvas/setPixel.mjs';
import { colors } from './constants/colors.mjs';
import { calculateTerrainHeight } from './calculateTerrainHeight.mjs';
import { state } from './constants/state.mjs';
import tc from 'tinycolor2';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function renderSkyBackground(canvas) {
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