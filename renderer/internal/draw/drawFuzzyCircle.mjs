import { randomFloat } from '../../../utils/rng.mjs';
import { drawPath } from './drawPath.mjs';

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 * @param {number} fuzzFactor
 * @param {string} color 
 */
export function drawFuzzyCircle(context, x, y, radius, fuzzFactor, color) {
    const numPoints = 60;
    const corePoints = Array(numPoints).fill()
        .map((_, i) => {
            const angle = (i / numPoints) * 2 * Math.PI;
            const fuzzyRadius = radius + randomFloat(`fuzzy_${i}`, 0, 1) * fuzzFactor - fuzzFactor / 2;

            const pointX = x + fuzzyRadius * Math.cos(angle);
            const pointY = y + fuzzyRadius * Math.sin(angle);

            return [pointX, pointY];
        });

    drawPath(context, corePoints, color);
}