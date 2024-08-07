/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}