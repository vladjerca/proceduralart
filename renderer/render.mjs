import { clearCanvas } from './internal/canvas/clearCanvas.mjs';
import { renderSky } from './internal/renderSky.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function render(canvas) {
    clearCanvas(canvas);

    renderSky(canvas);
}