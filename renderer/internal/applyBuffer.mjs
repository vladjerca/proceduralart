/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {ImageData} buffer 
 */
export function applyBuffer(canvas, buffer) {
    canvas
        .getContext('2d')
        .putImageData(buffer, 0, 0);
}