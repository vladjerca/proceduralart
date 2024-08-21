import { noise } from '../../utils/rng.mjs';

/**
 * 
 * @param {number} x 
 * @returns number
 */
function calculateTerrain1Height(x) {
    return 1 - 0.5 * noise(x / 200) / 0.8;
}

/**
 * 
 * @param {number} x 
 * @param {number} xMax
 * @returns number
 */
function calculateTerrain2Height(x, xMax) {
    return (
        0.75 +
        0.25 * (
            1 -
            Math.abs(noise(x / 600)) -
            0.3 * Math.pow((x - xMax / 2) / (xMax / 2), 2)
        )
    );
}

/**
 * 
 * @param {number} x 
 * @param {number} xMax 
 * @returns [number, number]
 */
export function calculateTerrainHeight(x, xMax) {
    return [
        calculateTerrain1Height(x),
        calculateTerrain2Height(x, xMax)
    ];
}