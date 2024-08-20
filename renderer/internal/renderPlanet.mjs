import { randomFloat, noise, randomInt } from '../../utils/rng.mjs';
import { colors } from './constants/colors.mjs';
import { state } from './constants/state.mjs';
import { setPixel } from './canvas/setPixel.mjs';
import { readBuffer } from './canvas/readBuffer.mjs';
import { applyBuffer } from './canvas/applyBuffer.mjs';

/**
 * 
 * @param {{x: number, y: number}} coordinates
 * @param {number} alpha 
 * @returns 
 */
function rotateVector({ x, y }, alpha) {
    return [
        x * Math.cos(alpha) - y * Math.sin(alpha),
        x * Math.sin(alpha) + y * Math.cos(alpha)
    ];
}

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function renderPlanet(canvas) {
    if (!state.isPlanetVisible) {
        return;
    }

    const x = randomInt('planet_x', 0, canvas.width);
    const y = randomInt('planet_y', 0, canvas.height);

    const radius = randomInt('planet_radius', 50, 150);
    const ringGap = randomInt('planet_ring_gap', 5, 10);

    const alpha = randomFloat('planet_alpha', -20, 20) * Math.PI / 180;
    const beta = randomFloat('planet_beta', -45, 45) * Math.PI / 180;

    const atmosphere = 0.03;
    const atmosphereRadius = radius * 1.03;
    const atmosphereColor = colors.planet
        .clone()
        .setAlpha(.6)
        .toRgb();

    const data = readBuffer(canvas);

    const startX = Math.max(0, x - atmosphereRadius);
    const endX = Math.min(canvas.width, x + atmosphereRadius);
    const startY = Math.max(0, y - atmosphereRadius);
    const endY = Math.min(canvas.height, y + atmosphereRadius);

    for (let a = Math.floor(startX); a < endX; a++) {
        for (let b = Math.floor(startY); b < endY; b++) {
            const originX = (a - x) / radius;
            const originZ = (b - y) / radius;

            const projectedRadius = Math.sqrt(originX ** 2 + originZ ** 2);

            const originY = Math.sqrt(1 - projectedRadius ** 2);

            const [, alphaZ] = rotateVector({ x: originX, y: originZ }, alpha);
            const [betaY, betaZ] = rotateVector({ x: originY, y: alphaZ }, beta);

            const theta = Math.acos(betaZ);
            const phi = Math.atan(betaY, betaZ);

            if (projectedRadius >= 1 && projectedRadius < 1 + atmosphere) {
                setPixel(data, a, b, atmosphereColor);
            }


            if (projectedRadius < 1) {
                const ringVariance = 1 -
                    (noise(theta * ringGap) + 0.5 * theta * phi);

                const surfaceColor = colors.planet
                    .clone()
                    .spin(theta * 5)
                    .darken(ringVariance * 25)
                    .toRgb();

                setPixel(data, a, b, surfaceColor);
            }
        }
    }

    applyBuffer(canvas, data);
}