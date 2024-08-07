import { clearCanvas } from './internal/clearCanvas.mjs';
import { setupCanvas } from './internal/setupCanvas.mjs';
import { renderSky } from './internal/renderSky.mjs';

export function draw(canvas) {
    setupCanvas(canvas);
    clearCanvas(canvas);

    renderSky(canvas);
}