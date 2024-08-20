/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @returns 
 */
export function readBuffer(canvas) {
    return canvas
        .getContext('2d', { willReadFrequently: true })
        .getImageData(0, 0, canvas.width, canvas.height);
}