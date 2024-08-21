import { getContext } from './getContext.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function clearCanvas(canvas) {
    const ctx = getContext(canvas);
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}