import { clearCanvas } from './internal/clearCanvas.mjs';
import { setupCanvas } from './internal/setupCanvas.mjs';
import { renderSky } from './internal/renderSky.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function draw(canvas) {
    setupCanvas(canvas);
    clearCanvas(canvas);

    renderSky(canvas);
}