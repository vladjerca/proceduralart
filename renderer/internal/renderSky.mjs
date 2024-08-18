import { randomColor, randomFloat, noise, randomBool, randomInt } from '../../utils/rng.mjs';
import { setPixel } from './setPixel.mjs';
import { toRGB } from './toRGB.mjs';
import { readBuffer } from './readBuffer.mjs';
import { applyBuffer } from './applyBuffer.mjs';
import { renderSkyBackground } from './renderSkyBackground.mjs';
import { calculateTerrainHeight } from './calculateTerrainHeight.mjs';

function renderStars(canvas) {
    const isNight = randomBool();

    if (!isNight) {
        return;
    }

    const data = readBuffer(canvas);
    const starCount = randomInt('star_count', 100, 300);

    applyBuffer(canvas, data);
}

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function renderSky(canvas) {
    renderSkyBackground(canvas);
    renderStars(canvas);
}

/*
    function drawSky() {
    // ... (existing code)

    drawSkyBackground();
    drawStars();
    drawSunOrPlanet();
    drawAtlasIfPresent();
    drawCloudsIfNotNight();
    drawStarships();
    }
*/