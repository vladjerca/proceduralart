/**
 * Renders the sky background on the canvas.
 * 
 * @param {Object} options - The options for rendering the sky background.
 * @param {HTMLCanvasElement} options.canvas - The canvas element to render on.
 * @param {Object} options.colors - The colors used for rendering.
 * @param {Object} options.state - The state of the renderer.
 */
export function renderSkyBackground({
    canvas,
    colors,
    state,
}) {
    const context = canvas.getContext('2d');
    const { width, height } = canvas;

    const gradient = context.createLinearGradient(0, 0, 0, height);

    const highPointColor = colors
        .sky
        .clone()
        .darken(state.isNight ? 32.5 : 0)
        .spin(Math.cos(0) * 10);
    const lowPointColor = colors
        .sky
        .clone()
        .darken(state.isNight ? 32.5 : 0)
        .spin(Math.cos(Math.PI) * 10);

    gradient.addColorStop(0, highPointColor.toRgbString());
    gradient.addColorStop(1, lowPointColor.toRgbString())

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
}