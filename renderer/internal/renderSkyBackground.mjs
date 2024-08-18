import { applyBuffer } from './applyBuffer.mjs';
import { readBuffer } from './readBuffer.mjs';
import { setPixel } from './setPixel.mjs';
import { toRGB } from './toRGB.mjs';
import { colors } from './colors.mjs';
import { calculateTerrainHeight } from './calculateTerrainHeight.mjs';


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
            const relativeHeight = 1.0 * y / maxTerrainHeight;

            const hsv = {
                h: colors.primary_sky.h * relativeHeight + (1 - relativeHeight) * colors.secondary_sky.h,
                s: colors.primary_sky.s,
                v: colors.primary_sky.v * relativeHeight + (1 - relativeHeight) * colors.primary_sky.v
            };

            const skyColor = toRGB(hsv);

            setPixel(data, x, y, skyColor);
        }
    }

    applyBuffer(canvas, data);
}