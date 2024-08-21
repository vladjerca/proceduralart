/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @returns 
 */
export function getContext(canvas) {
    return canvas.getContext('2d', { willReadFrequently: true });
}