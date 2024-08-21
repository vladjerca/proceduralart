import { getContext } from './getContext.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @returns 
 */
export function readBuffer(canvas) {
    return getContext(canvas)
        .getImageData(0, 0, canvas.width, canvas.height);
}