/**
 * Will cleanup canvas and return a 2d context
 * @param {HTMLCanvasElement} canvas 
 * @returns 
 */
export function setupCanvas(canvas) {
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio;

    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr, dpr);

    return ctx;
}