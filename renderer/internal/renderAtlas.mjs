import { randomFloat, randomInt } from '../../utils/rng.mjs';
import { getContext } from './canvas/getContext.mjs';
import { drawPath } from './draw/drawPath.mjs';
import { drawFuzzyCircle } from './draw/drawFuzzyCircle.mjs';

const ATLAS_SIZE = randomInt('atlas_size', 50, 100);
const ATLAS_X_OFFSET = 0.2;
const ATLAS_X_SCALE = 0.6;
const ATLAS_Y_OFFSET = 0.1;
const ATLAS_Y_SCALE = 0.3;
const ATLAS_CORE_ACTIVITY = randomFloat('atlas_core_activity', 5, 20);
const ATLAS_CORE_COLOR_RGB_STRING = 'rgb(254, 0, 0)';

/**
 * Renders the atlas on the canvas.
 * 
 * @param {Object} options - The options for rendering the atlas.
 * @param {HTMLCanvasElement} options.canvas - The canvas element to render on.
 * @param {Object} options.colors - The colors used for rendering.
 * @param {Object} options.state - The state of the atlas.
 */
export function renderAtlas({
    canvas,
    colors,
    state,
}) {
    if (!state.isAtlasVisible) {
        return;
    }
    const { width, height } = canvas;
    const context = getContext(canvas);

    const x = width * (ATLAS_X_OFFSET + ATLAS_X_SCALE * randomFloat('atlas_x'));
    const y = height * (ATLAS_Y_OFFSET + ATLAS_Y_SCALE * randomFloat('atlas_y'));
    const primerColor = colors.sky
        .clone()
        .darken(30);

    const primerPoints = [
        [x, y - ATLAS_SIZE * 1.2],
        [x + ATLAS_SIZE, y],
        [x, y + ATLAS_SIZE * 2],
        [x - ATLAS_SIZE, y]
    ]
    drawPath(context, primerPoints, primerColor.toRgbString());

    drawFuzzyCircle(context, x, y, ATLAS_SIZE * 0.5, ATLAS_CORE_ACTIVITY, ATLAS_CORE_COLOR_RGB_STRING);

    const atmosphereColor = colors.sky
        .clone()
        .darken(10);

    const topRightPoints = [
        [x, y - ATLAS_SIZE * 1.2],
        [x + ATLAS_SIZE, y],
        [x, y - ATLAS_SIZE * 0.1]
    ];
    const topRightColor = atmosphereColor
        .setAlpha(.5);
    drawPath(context, topRightPoints, topRightColor.toRgbString());

    const topLeftPoints = [
        [x, y - ATLAS_SIZE * 1.2],
        [x - ATLAS_SIZE, y],
        [x, y - ATLAS_SIZE * 0.1]
    ];
    const topLeftColor = atmosphereColor
        .setAlpha(.9);
    drawPath(context, topLeftPoints, topLeftColor.toRgbString());

    const bottomLeftPoints = [
        [x, y + ATLAS_SIZE * 2],
        [x - ATLAS_SIZE, y],
        [x, y - ATLAS_SIZE * 0.1]
    ];
    const bottomLeftColor = atmosphereColor
        .setAlpha(.7);
    drawPath(context, bottomLeftPoints, bottomLeftColor.toRgbString());
}