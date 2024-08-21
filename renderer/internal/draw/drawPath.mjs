/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {Array<[number, number]} points 
 * @param {string} color 
 */
export function drawPath(context, points, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) {
        context.lineTo(...points[i]);
    }
    context.closePath();
    context.fill();
}