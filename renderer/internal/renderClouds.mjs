import { randomColor, randomFloat, noise, randomBool, randomInt } from '../../utils/rng.mjs';

/**
 * Renders clouds on the canvas.
 * 
 * @param {Object} options - The options for rendering clouds.
 * @param {HTMLCanvasElement} options.canvas - The canvas element to render the clouds on.
 * @param {Object} options.colors - The colors to use for rendering the clouds.
 * @param {Object} options.state - The state of the clouds.
 */
export function renderClouds({
    canvas,
    colors,
    state,
}) {
    const { width, height } = canvas;
    const context = canvas.getContext('2d');
    const cloudColor = colors.sky.clone().lighten(100).setAlpha(0.8).toRgb
    const cloudCount = randomInt('cloud_count', 5, 10);

    for (let i = 0; i < cloudCount; i++) {
        const x = randomInt(`cloud_x_${i}`, 0, width);
        const y = randomInt(`cloud_y_${i}`, 0, height / 2); // Clouds typically in the upper half
        const size = randomInt(`cloud_size_${i}`, 50, 150);
        const waviness = randomFloat(`cloud_waviness_${i}`, 0.1, 0.3); // Adjust for desired waviness
        const numSegments = randomInt(`cloud_segments_${i}`, 3, 6); // Adjust for cloud complexity

        context.beginPath();
        context.moveTo(x, y);

        for (let j = 0; j <= numSegments; j++) {
            const segmentWidth = width / numSegments;
            const segmentX = x + j * segmentWidth;
            const segmentY = y + noise(segmentX / 50, i) * size * waviness; // Use noise for vertical displacement

            // Control points for smoother curves (optional)
            const control1X = segmentX - segmentWidth / 2;
            const control1Y = y + noise(control1X / 50, i + 0.5) * size * waviness;
            const control2X = segmentX;
            const control2Y = segmentY;

            context.bezierCurveTo(control1X, control1Y, control2X, control2Y, segmentX, segmentY);
        }

        context.lineTo(width, y); // Connect to the right edge
        context.lineTo(x, y);     // Close the path
        context.fillStyle = cloudColor;
        context.fill();
    }
}