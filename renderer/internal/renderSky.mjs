import { randomColor, randomFloat, noise } from '../../utils/rng.mjs';
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

    function terrain1at(x) {
        var v = noise(x / 200) / 0.8;
        const bumpWidth = 8;

        for (var i = x - bumpWidth / 2; i < x + bumpWidth / 2; i++) {
            if (noise(i / 5) > 0.7 + 0.1) {
                var peak = noise(i / 200);
                v = Math.max(v, Math.min(peak, 1) * (1.0 - Math.pow(Math.sin((x - i) / (bumpWidth / 2) * (3.1415 / 2)), 2)));
            }
        }

        return canvas.height * (1 - 0.5 * v);
    }

    function terrain2at(x) {
        return canvas.height * (0.75 + 0.25 * (1 - noise(x / 600) - 0.3 * Math.pow((x - canvas.width / 2) / (canvas.width / 2), 2)));
    }

    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
        { willReadFrequently: true }
    );

    for (let x = 0; x < canvas.width; x++) {
        const terrain1 = terrain1at(x) - 50;
        const terrain2 = terrain2at(x);
        console.log(terrain1, terrain2);
        for (let y = 0; y < (terrain1 + terrain2) / 2; y++) {
            const color = colors.sky_primary
                .clone()
                .brighten(randomFloat(`sky_noise_${x}_${y}`, -5, 5))
                .toRgb();

            setPixel(data, x, y, color);
        }
    }

    ctx.putImageData(data, 0, 0);
}