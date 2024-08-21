/**
 * 
 * @param {CanvasImageData} data 
 * @param {number} x 
 * @param {number} y 
 * @param {{r: number, g: number, b: number }} color 
 */
export function setPixel(data, x, y, color) {
    const alpha = color.a ?? 1;
    if (alpha < 0) {
        return;
    }

    const index = (y * data.width + x) * 4;

    if (alpha === 1) {
        data.data[index] = color.r;
        data.data[index + 1] = color.g;
        data.data[index + 2] = color.b;
        data.data[index + 3] = 255;
        return;
    }

    const alphaInverse = 1 - alpha;
    
    data.data[index] = color.r * alpha + data.data[index] * alphaInverse;
    data.data[index + 1] = color.g * alpha + data.data[index + 1] * alphaInverse;
    data.data[index + 2] = color.b * alpha + data.data[index + 2] * alphaInverse;
    data.data[index + 3] = 255;
}