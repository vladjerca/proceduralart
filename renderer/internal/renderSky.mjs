import { randomColor } from '../../utils/rng.mjs';
import { setPixel } from './setPixel.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function renderSky(canvas) {
    const colors = {
        sky_primary: randomColor('sky_primary'),
        sky_secondary: randomColor('sky_secondary'),
    }

    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height, { willReadFrequently: true });

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            setPixel(data, x, y, colors.sky_primary);
        }
    }

    ctx.putImageData(data, 0, 0);
}