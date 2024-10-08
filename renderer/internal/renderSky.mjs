
import { colors } from './constants/colors.mjs';
import { state } from './constants/state.mjs';
import { renderSkyBackground } from './renderSkyBackground.mjs';
import { renderStars } from './renderStars.mjs';
import { renderSun } from './renderSun.mjs';
import { renderPlanet } from './renderPlanet.mjs';

import { renderAtlas } from './renderAtlas.mjs';
import { renderClouds } from './renderClouds.mjs';
import { renderStarships } from './renderStarships.mjs';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function renderSky(canvas) {
    renderSkyBackground({ canvas, colors, state });
    renderStars({ canvas, colors, state });
    renderSun({ canvas, colors, state });
    /**
     * hide until we figure out a prettier way to render the planet
        renderPlanet({ canvas, colors, state });
     */
    renderAtlas({ canvas, colors, state });
    renderClouds({ canvas, colors, state });
    renderStarships({ canvas, colors, state });
}