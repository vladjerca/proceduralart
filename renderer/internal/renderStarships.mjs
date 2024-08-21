import { randomFloat, randomInt } from '../../utils/rng.mjs';
import { readBuffer } from './canvas/readBuffer.mjs';
import { applyBuffer } from './canvas/applyBuffer.mjs';
import { setPixel } from './canvas/setPixel.mjs';
/**
 * Renders a starship on the canvas.
 * 
 * @param {Object} options - The options for rendering the starship.
 * @param {HTMLCanvasElement} options.canvas - The canvas element to render on.
 * @param {Object} options.colors - The colors for rendering the starship.
 * @param {Object} options.state - The state of the starship.
 */
export function renderStarships({
    canvas,
    colors,
}) {
    const data = readBuffer(canvas);

    const x = randomInt('starship_x', 0, canvas.width);
    const y = randomInt('starship_y', 0, canvas.height);

    const dx = randomInt('starship_direction', 0, 1);
    const dy = dx == 0 ? 1 : 0;

    const dx2 = dy;
    const dy2 = 1 - dy;

    const size = randomInt('starship_size', 20, 30);
    const count = randomInt('starship_count', 1, 3);
    const spread = randomFloat('starship_spread', 1, 3);
    const exhaustLength = randomInt('starship_exhaust_length', 50, 100);

    const renderSquadron = (x, y, size, dx, dy, dx2, dy2, spread, side) => {
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < size; j++) {
                for (var k = 0; k < j; k++) {
                    const shipX = x + side * dx2 * i * size * 1.5 + dx * i * spread * size + j * dx + (k - j / 2) * dx2;
                    const shipY = y + side * dy2 * i * size * 1.5 + dy * i * spread * size + j * dy + (k - j / 2) * dy2;
                    setPixel(
                        data,
                        Math.floor(shipX),
                        Math.floor(shipY),
                        {
                            r: 50,
                            g: 50,
                            b: 50,
                            a: 1
                        }
                    );
                }
            }
        }
    }

    const renderExhaust = (x, y, size, dx, dy, dx2, dy2, spread, side) => {
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < exhaustLength; j++) {
                const exhaustColor = colors.exhaust
                    .clone()
                    .setAlpha(1.0 - j / exhaustLength, 2)
                    .toRgb();

                const rightExhaustX = x + side * dx2 * i * size * 1.5 + dx * i * spread * size + dx * (size + j) + dx2 * (size / 2 - 6);
                const rightExhaustY = y + side * dy2 * i * size * 1.5 + dy * i * spread * size + dy * (size + j) + dy2 * (size / 2 - 6);
                setPixel(
                    data,
                    Math.floor(rightExhaustX),
                    Math.floor(rightExhaustY),
                    exhaustColor,
                );

                const leftExhaustX = x + side * dx2 * i * size * 1.5 + dx * i * spread * size + dx * (size + j) + dx2 * (-size / 2 + 6);
                const leftExhaustY = y + side * dy2 * i * size * 1.5 + dy * i * spread * size + dy * (size + j) + dy2 * (-size / 2 + 6);
                setPixel(
                    data,
                    Math.floor(leftExhaustX),
                    Math.floor(leftExhaustY),
                    exhaustColor,
                );
            }
        }
    }

    const spreadRight = 1;
    renderExhaust(x, y, size, dx, dy, dx2, dy2, spread, spreadRight);
    renderSquadron(x, y, size, dx, dy, dx2, dy2, spread, spreadRight);

    const spreadLeft = -1;
    renderExhaust(x, y, size, dx, dy, dx2, dy2, spread, spreadLeft);
    renderSquadron(x, y, size, dx, dy, dx2, dy2, spread, spreadLeft);


    applyBuffer(canvas, data);
}