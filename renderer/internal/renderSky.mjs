
import { randomColor, randomFloat, noise, randomBool, randomInt } from '../../utils/rng.mjs';
import { colors } from './constants/colors.mjs';
import { state } from './constants/state.mjs';
import { setPixel } from './canvas/setPixel.mjs';
import { toRGB } from './toRGB.mjs';
import { readBuffer } from './canvas/readBuffer.mjs';
import { applyBuffer } from './canvas/applyBuffer.mjs';
import { renderSkyBackground } from './renderSkyBackground.mjs';
import { renderStars } from './renderStars.mjs';
import { renderSun } from './renderSun.mjs';
import { renderPlanet } from './renderPlanet.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function renderSky(canvas) {
    renderSkyBackground(canvas);
    renderStars(canvas);
    renderSun(canvas);
    renderPlanet(canvas);
}

/*
    function drawSky() {
    // ... (existing code)
    drawAtlasIfPresent();
    drawCloudsIfNotNight();
    drawStarships();
    }
*/