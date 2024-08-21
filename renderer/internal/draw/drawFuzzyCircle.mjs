import { randomColor, randomFloat, noise, randomBool, randomInt } from '../../../utils/rng.mjs';


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
    context.fillStyle = color;
    context.beginPath();

    const numPoints = 80;

    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        const fuzzyRadius = radius + noise(i) * fuzzFactor - fuzzFactor / 2;

        const pointX = x + fuzzyRadius * Math.cos(angle);
        const pointY = y + fuzzyRadius * Math.sin(angle);

        if (i === 0) {
            context.moveTo(pointX, pointY);
        } else {
            context.lineTo(pointX, pointY);
        }
    }

    context.closePath(); // Close the path to complete the shape
    context.fill();
}