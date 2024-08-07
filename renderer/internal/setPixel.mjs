/**
 * 
 * @param {CanvasImageData} data 
 * @param {number} x 
 * @param {number} y 
 * @param {{r: number, g: number, b: number }} color 
 */
export function setPixel(data, x, y, color) {
    const index = (y * data.width + x) * 4;

    data.data[index] = color.r;
    data.data[index + 1] = color.g;
    data.data[index + 2] = color.b;
    data.data[index + 3] = 255;
}