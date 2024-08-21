import { getContext } from './getContext.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {ImageData} buffer 
 */
export function applyBuffer(canvas, buffer) {
    getContext(canvas)
        .putImageData(buffer, 0, 0);
}