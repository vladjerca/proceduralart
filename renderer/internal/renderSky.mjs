
import { randomColor, randomFloat, noise, randomBool, randomInt } from '../../utils/rng.mjs';
import { colors } from './colors.mjs';
import { state } from './state.mjs';
import { setPixel } from './setPixel.mjs';
import { toRGB } from './toRGB.mjs';
import { readBuffer } from './readBuffer.mjs';
import { applyBuffer } from './applyBuffer.mjs';
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