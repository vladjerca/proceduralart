import { clearCanvas } from './internal/canvas/clearCanvas.mjs';
import { renderSky } from './internal/renderSky.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function draw(canvas) {
    clearCanvas(canvas);

    renderSky(canvas);
}