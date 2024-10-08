import './perlin.mjs';
import {
	randomBool,
	randomInt,
} from './utils/rng.mjs';

import { getColorString, getFloat, getInt, getPivot, getRGB, simplex } from './helpers.mjs';

var scene = {};

function getHue(seed) {
	const hue = randomBool('hue')
		? scene.skyhue
		: scene.terrainhue;

	return hue + 0.1 * randomInt(seed, 0, 3) - 1;
}

function setupCanvas(canvas) {
	scene.context = canvas.getContext("2d", { willReadFrequently: true });
	scene.context.fillStyle = 'black';

	scene.width = canvas.width;
	scene.height = canvas.height;

	scene.context.fillRect(0, 0, scene.width, scene.height);

	noise.seed(scene.seed % 10000);
}

function setupBuffer() {
	scene.imageData = scene.context.getImageData(0, 0, scene.width, scene.height);
	scene.buffer = scene.imageData.data;
}

function applyBuffer() {
	scene.context.putImageData(scene.imageData, 0, 0);
}

function setPixel(x, y, color, alpha) {
	setPixelRGB(x, y, color.r, color.g, color.b, alpha);
}

function setPixelRGB(x, y, r, g, b, alpha) {
	if (x >= scene.width || y >= scene.height || x < 0 || y < 0)
		return;
	x = Math.floor(x);
	y = Math.floor(y);
	if (alpha === undefined)
		alpha = 1;
	if (alpha <= 0)
		return;
	if (alpha > 1)
		alpha = 1;


	if (alpha == 1) {
		scene.buffer[(y * scene.width + x) * 4 + 0] = r;
		scene.buffer[(y * scene.width + x) * 4 + 1] = g;
		scene.buffer[(y * scene.width + x) * 4 + 2] = b;
	} else {
		scene.buffer[(y * scene.width + x) * 4 + 0] = Math.floor((1 - alpha) * scene.buffer[(y * scene.width + x) * 4 + 0] + alpha * r);
		scene.buffer[(y * scene.width + x) * 4 + 1] = Math.floor((1 - alpha) * scene.buffer[(y * scene.width + x) * 4 + 1] + alpha * g);
		scene.buffer[(y * scene.width + x) * 4 + 2] = Math.floor((1 - alpha) * scene.buffer[(y * scene.width + x) * 4 + 2] + alpha * b);
	}
}

function drawBrightStar(x, y, size) {
	applyBuffer();
	scene.context.fillStyle = "rgba(255,255,255,0.03)";
	scene.context.beginPath();
	scene.context.arc(x, y, size, 0, 2 * Math.PI);
	scene.context.fill();

	scene.context.fillStyle = "rgba(255,255,255,0.1)";
	scene.context.beginPath();
	scene.context.arc(x, y, size * 0.4, 0, 2 * Math.PI);
	scene.context.fill();

	scene.context.fillStyle = "rgba(255,255,255,1.0)";
	setupBuffer();

	setPixelRGB(x, y, 255, 255, 255, 1);
	setPixelRGB(x - 1, y + 1, 255, 255, 255, 0.8);
	setPixelRGB(x + 1, y + 1, 255, 255, 255, 0.8);
	setPixelRGB(x + 1, y - 1, 255, 255, 255, 0.8);
	setPixelRGB(x - 1, y - 1, 255, 255, 255, 0.8);

	var p = 0;
	var new_p;
	for (var i = -1; i <= 1; i += 0.05) {
		new_p = Math.floor(size * 0.6 * i);
		if (new_p == p)
			continue;
		p = new_p;
		setPixelRGB(x, y + p, 255, 255, 255, 1.001 - Math.abs(i));
		setPixelRGB(x + p, y, 255, 255, 255, 1.001 - Math.abs(i));
	}
}

function drawStarships(x, y) {
	var dx = randomInt('starship_direction', 0, 3);
	var dy = dx == 0 ? 1 : 0;
	var dx2 = dy;
	var dy2 = 1 - dy;
	var size = randomInt('starship_size', 5, 15);
	if (size % 2 == 0) size++;
	var count = Math.floor(Math.pow(getFloat(scene.seed, getPivot('starshipcount')), 3) * 4) + 1;
	var spread = getFloat(scene.seed, getPivot('starshipspread')) * 2;

	for (var i = 0; i < count; i++) {
		for (var j = 0; j < size; j++) {
			for (var k = 0; k < j; k++) {
				setPixelRGB(x + dx2 * i * size * 1.5 + dx * i * spread * size + j * dx + (k - j / 2) * dx2,
					y + dy2 * i * size * 1.5 + dy * i * spread * size + j * dy + (k - j / 2) * dy2, 0, 0, 0, 1);
				setPixelRGB(x - dx2 * i * size * 1.5 + dx * i * spread * size + j * dx + (k - j / 2) * dx2,
					y - dy2 * i * size * 1.5 + dy * i * spread * size + j * dy + (k - j / 2) * dy2, 0, 0, 0, 1);
			}
		}
	}

	var exhausthue = scene.skyhue + 0.5;
	if (exhausthue > 1)
		exhausthue -= 1;
	var exhaustlength = randomInt('exhaust_length', 3, 12) * size;

	for (var i = 0; i < count; i++) {
		for (var j = 0; j < exhaustlength; j++) {
			setPixel(x + dx2 * i * size * 1.5 + dx * i * spread * size + dx * (size + j) + dx2 * (size / 2 - 2),
				y + dy2 * i * size * 1.5 + dy * i * spread * size + dy * (size + j) + dy2 * (size / 2 - 2), getRGB(exhausthue, 1, 1), Math.pow(1.0 - (j / exhaustlength), 2.0));
			setPixel(x - dx2 * i * size * 1.5 + dx * i * spread * size + dx * (size + j) + dx2 * (size / 2 - 2),
				y - dy2 * i * size * 1.5 + dy * i * spread * size + dy * (size + j) + dy2 * (size / 2 - 2), getRGB(exhausthue, 1, 1), Math.pow(1.0 - (j / exhaustlength), 2.0));
			setPixel(x + dx2 * i * size * 1.5 + dx * i * spread * size + dx * (size + j) + dx2 * (-size / 2 + 2),
				y + dy2 * i * size * 1.5 + dy * i * spread * size + dy * (size + j) + dy2 * (-size / 2 + 2), getRGB(exhausthue, 1, 1), Math.pow(1.0 - (j / exhaustlength), 2.0));
			setPixel(x - dx2 * i * size * 1.5 + dx * i * spread * size + dx * (size + j) + dx2 * (-size / 2 + 2),
				y - dy2 * i * size * 1.5 + dy * i * spread * size + dy * (size + j) + dy2 * (-size / 2 + 2), getRGB(exhausthue, 1, 1), Math.pow(1.0 - (j / exhaustlength), 2.0));
		}
	}
}

function drawSun(x, y, size) {
	scene.context.fillStyle = "rgba(255,255,255,0.2)";
	scene.context.beginPath();
	scene.context.arc(x, y, size * 1.1, 0, 2 * Math.PI);
	scene.context.fill();

	scene.context.fillStyle = getColorString(getRGB(scene.skyhue, 0.2, 1));
	scene.context.beginPath();
	scene.context.arc(x, y, size, 0, 2 * Math.PI);
	scene.context.fill();
}

function drawClouds() {
	scene.cloudstart = getFloat(scene.seed, getPivot('cloudstart'), 0.5, 0.8);
	scene.cloudfuzzyness = Math.pow(getFloat(scene.seed, getPivot('cloudfuzzyness')), 2) * 0.4;
	for (var x = 0; x < scene.width; x++) {
		for (var y = 0; y < Math.min(terrain1at(x), terrain2at(x)); y++) {
			setPixelRGB(x, y, 255, 255, 255, simplex(x / 400, Math.pow(y / 150 + 1, 1.5), 5, scene.cloudstart, scene.cloudstart + scene.cloudfuzzyness) * (0.1 + scene.cloudfuzzyness / 0.35));
		}
	}
}

function drawAtlas() {
	var x = scene.width * (0.2 + 0.6 * getFloat(scene.seed, getPivot('atlasx')));
	var y = scene.height * (0.1 + 0.3 * getFloat(scene.seed, getPivot('atlasy')));
	var size = 30;

	applyBuffer();

	// Primer
	scene.context.fillStyle = getColorString(getRGB(scene.skyhue, 0.8, 0.15));
	scene.context.beginPath();
	scene.context.moveTo(x, y - size * 1.2);
	scene.context.lineTo(x + size, y);
	scene.context.lineTo(x, y + size * 2);
	scene.context.lineTo(x - size, y);
	scene.context.closePath();
	scene.context.fill();

	// Core
	scene.context.fillStyle = 'rgb(254, 0, 0)';
	scene.context.beginPath();
	scene.context.arc(x, y, size * 0.55, 0, 2 * Math.PI);
	scene.context.fill();

	// Top right
	scene.context.fillStyle = getColorString(getRGB(scene.skyhue, 0.8, 0.15), 0.7);
	scene.context.beginPath();
	scene.context.moveTo(x, y - size * 1.2);
	scene.context.lineTo(x + size, y);
	scene.context.lineTo(x, y - size * 0.1);
	scene.context.closePath();
	scene.context.fill();

	// Top left
	scene.context.fillStyle = getColorString(getRGB(scene.skyhue, 0.6, 0.2), 0.97);
	scene.context.beginPath();
	scene.context.moveTo(x, y - size * 1.2);
	scene.context.lineTo(x - size, y);
	scene.context.lineTo(x, y - size * 0.1);
	scene.context.closePath();
	scene.context.fill();

	// Bottom left
	scene.context.fillStyle = getColorString(getRGB(scene.skyhue, 0.33, 0.25), 0.9);
	scene.context.beginPath();
	scene.context.moveTo(x, y + size * 2);
	scene.context.lineTo(x - size, y);
	scene.context.lineTo(x, y - size * 0.1);
	scene.context.closePath();
	scene.context.fill();

	setupBuffer();
}

function drawSky() {
	var ry;

	scene.skyhue = getFloat(scene.seed, getPivot('skyhue'));
	scene.skyhue2 = getFloat(scene.seed, getPivot('skyhue')) * 0.16;
	scene.skyvalue1 = getFloat(scene.seed, getPivot('skyvalue1'), 0.6, 0.85);
	scene.skyvalue2 = getFloat(scene.seed, getPivot('skyvalue2'), 0.6, 0.85);
	scene.skynoise = getFloat(scene.seed, getPivot('skynoise'), 0, 0.05) + 0.05;
	scene.skysat = getFloat(scene.seed, getPivot('skysat'), 0.7, 0.9);
	scene.night = randomBool('night');

	scene.terrainhue = scene.skyhue + 0.5 * randomInt('terrain_hue', 2);
	scene.grasshue = getHue(getPivot('grasshue'))

	scene.showbumps = randomInt('show_bumps', 3) == 0;
	scene.bumpwidth = 8 + randomInt('bump_width', 15);
	scene.bumpslope = 2 * (1 + randomInt('bump_slope', 7));
	scene.bumpheight = 0.1 + 0.25 * getFloat(scene.seed, getPivot('bumpheight'));
	scene.bumpthreshhold = getFloat(scene.seed, getPivot('bumpthreshhold'));

	scene.mountainheight = 1;

	if (scene.terrainhue > 1)
		scene.terrainhue -= 1;

	scene.noiseseed = getFloat(scene.seed, getPivot('noiseSeed')) * 100;
	scene.terrainnoise = getFloat(scene.seed, getPivot('terrainnoise'), 0, 0.03);

	if (scene.night) {
		scene.skyvalue1 -= 0.6;
		scene.skyvalue2 -= 0.4;
		scene.starcount = 100 + randomInt('star_count', 300);
	}

	// Sky
	for (var x = 0; x < scene.width; x++) {
		for (var y = 0; y < Math.min(terrain1at(x), terrain2at(x)); y++) {
			ry = y / scene.height;
			ry = ry + getFloat(scene.seed, 1000000 + x * y + x + y, -scene.skynoise, scene.skynoise);
			setPixel(x, y, getRGB(scene.skyhue * ry + (1 - ry) * (scene.skyhue + scene.skyhue2), scene.skysat, scene.skyvalue1 * ry + (1 - ry) * scene.skyvalue2));
		}
	}

	// Stars
	if (scene.night) {
		for (var i = 0; i < scene.starcount; i++) {
			var color = getRGB(scene.skyhue, 0.2, 0.8);
			const starX = randomInt(`star_${i}_x`, 0, scene.width);
			const starY = randomInt(`star_${i}_y`, 0, scene.height);

			setPixel(
				starX,
				starY,
				color,
			);
		}
		scene.brightstars = Math.max(0, randomInt('bright_stars', 20) - 8);
		scene.starsize = randomInt('star_size', 5, 15);
		for (var i = 0; i < scene.brightstars; i++) {
			const starX = randomInt(`bright_star_${i}_x`, 0, scene.width);
			const starY = randomInt(`bright_star_${i}_y`, 0, scene.height);
			drawBrightStar(
				starX,
				starY,
				scene.starsize
			);
		}
	}

	// Sun
	var hasSun = !scene.night && randomBool('hasSun');
	if (hasSun) {
		const suns = randomInt('suns', 1, 3);

		for (var i = 0; i < suns; i++) {
			const sunX = randomInt(`sun_${i}_x`, 0, scene.width);
			const sunY = randomInt(`sun_${i}_y`, 0, scene.height);
			const sunSize = randomInt(`sun_${i}_size`, 10, 30);

			applyBuffer();
			drawSun(
				sunX,
				sunY,
				sunSize,
			);
			setupBuffer();
		}
	}

	// Planet
	const isPlanetVisible = !hasSun && randomBool('planet_visible');
	if (isPlanetVisible) {
		drawPlanet();
	}

	// Atlas
	const isAtlasVisible = randomBool('atlas_visible');
	if (isAtlasVisible) {
		drawAtlas();
	}
	// Clouds
	if (!scene.night) {
		drawClouds();
	}

	// Starships
	const starships = randomInt('starships', 0, 7);
	for (var i = 0; i < starships; i++) {
		const starshipX = randomInt(`starship_${i}_x`, 0, scene.width);
		const starshipY = randomInt(`starship_${i}_y`, 0, scene.height / 2);

		drawStarships(
			starshipX,
			starshipY
		);
	}
}

function terrain1color(x, y) {
	var miny = 1;
	for (var i = x - 10; i < x + 10; i++) {
		miny = Math.max(miny, terrain1at(i));
	}

	var p = y - miny;

	return getRGB(scene.terrainhue + getFloat(scene.seed, 1000000 + x * y + x + y, -scene.terrainnoise, scene.terrainnoise), 0.25, (p < 0 ? 0.99 : 0.87) - (scene.night ? 0.8 : 0));
}

function terrain1at(x, igonrebumps) {
	var v = scene.mountainheight * simplex(x / 200, scene.noiseseed, 5, 0, 1) / 0.8;

	if (scene.showbumps && !igonrebumps) {
		for (var i = x - scene.bumpwidth / 2; i < x + scene.bumpwidth / 2; i++) {
			if (simplex(i / 5, scene.noiseseed, 5) > 0.7 + 0.1 * scene.bumpthreshhold) {
				var terrainatpeakcenter = simplex(i / 200, scene.noiseseed, 5, 0, 1);
				v = Math.max(v, Math.min(terrainatpeakcenter + scene.bumpheight, 1) * (1.0 - Math.pow(Math.sin((x - i) / (scene.bumpwidth / 2) * (3.1415 / 2)), scene.bumpslope)));
			}
		}
	}

	return scene.height * (1 - 0.5 * v);
}

function terrain2at(x) {
	return scene.height * (0.75 + 0.25 * (1 - simplex(x / 600, scene.noiseseed + 100, 4, 0, 1) - 0.3 * Math.pow((x - scene.width / 2) / (scene.width / 2), 2)));
}

function drawWater() {
	scene.waterhue = getHue(getPivot('waterhue'));

	var wx = 0;
	for (var i = 0; i < scene.width; i++) {
		if (terrain2at(i) > terrain2at(wx)) {
			wx = i;
		}
	}

	var wy = terrain2at(wx);
	var waterangle = 1 + 1.0 * getFloat(scene.seed, getPivot('waterangle'));
	const coast = randomInt('coast', 20, 40);
	const coastp = randomInt('coastp', 0, 10) / 10;

	for (var y = wy - 10; y < scene.height; y++) {
		for (var x = wx - (y - wy) * waterangle - coast * simplex(y / 10, coastp, 4, 0, 1); x < wx + (y - wy) * waterangle + coast * simplex(y / 10, coastp + 42, 4, 0, 1); x++) {
			if (y >= terrain2at(x)) {
				var brightness = 0.6;

				var rx = Math.floor(Math.min(Math.max(0, x + 8 * Math.sin(y / 6 * 2 * 3.14159)), scene.width - 1));
				var ry = Math.floor(wy - 2 * (y - wy));

				setPixelRGB(x, y, Math.floor(scene.buffer[(ry * scene.width + rx) * 4 + 0] * brightness), Math.floor(scene.buffer[(ry * scene.width + rx) * 4 + 1] * brightness), Math.floor(scene.buffer[(ry * scene.width + rx) * 4 + 2] * brightness), 1);
				setPixel(x, y, getRGB(scene.waterhue, 0.9, scene.night ? 0.3 : 0.5), 0.7);
			}
		}
	}
}

function drawTerrain() {
	// Terrain 1
	for (var x = 0; x < scene.width; x++) {
		for (var y = terrain1at(x); y < terrain2at(x); y++) {
			setPixel(x, y, terrain1color(x, y), 1.0);
		}
	}

	// Base
	var maxbases = randomInt('max_bases', 0, 7);
	for (var i = 0; i < maxbases; i++) {
		drawBase();
	}

	// Terrain 2
	for (var x = 0; x < scene.width; x++) {
		for (var y = terrain2at(x); y < scene.height; y++) {
			setPixel(x, y, getRGB(scene.terrainhue, 0.35, scene.night ? 0.12 : 0.75), 1.0);
		}
	}

	// Grass
	const isGrassyPlanet = randomBool('has_grass', 0.97);
	if (isGrassyPlanet) {
		scene.grasssize = randomInt('grass_size', 50, 120);
		scene.grassstretchiness = randomInt('grass_stretchiness', 20, 45);

		for (var x = 0; x < scene.width; x++) {
			for (var y = terrain2at(x) - 2; y < scene.height; y++) {
				setPixel(x, y, getRGB(scene.grasshue, 0.8, scene.night ? 0.2 : 1.0), simplex(x / scene.grasssize, (y - scene.height * 0.25 * (1 - simplex(x / 600, scene.noiseseed + 100, 4, 0, 1))) / scene.grassstretchiness, 3, 0.57, 0.6));
			}
		}
	}
}

function drawBase() {
	var x0 = randomInt('base_x', 60, scene.width - 120);
	var d = 50;
	var highest = scene.height;
	var x = 0;
	for (var i = x0 - d; i < x0 + d; i++) {
		if (terrain1at(i) < highest) {
			highest = terrain1at(i, true);
			x = i;
		}
	}

	var y = terrain1at(x, true);
	var color = terrain1color(x, y);

	var bwidth = 55;
	for (var i = x - bwidth / 2; i < x + bwidth / 2; i++) {
		for (var j = y - 5; j < Math.min(scene.height, y - 5 + Math.pow((i - x) / bwidth * 6, -2)); j++) {
			setPixel(i, j, terrain1color(i, j));
		}
	}

	applyBuffer();

	scene.context.beginPath();
	scene.context.strokeStyle = getColorString(terrain1color(x, y));
	scene.context.moveTo(x, y + 5);
	scene.context.lineTo(x - bwidth / 3, y - 5);
	scene.context.stroke();
	scene.context.moveTo(x, y + 5);
	scene.context.lineTo(x + bwidth / 3, y - 5);
	scene.context.stroke();

	const hasBuilding = randomBool('has_building');

	if (hasBuilding) {
		scene.context.fillStyle = getColorString(terrain1color(x, y));
		const x0 = x + randomInt('building_x', -4, 4);
		const x1 = x0 + randomInt('building_width', 3, 8);
		const y0 = y - 8 - 5;
		const y1 = 8;
		scene.context.fillRect(
			x0,
			y0,
			x1,
			y1,
		);
	}

	setupBuffer();
}

function rotatevector(x, y, alpha) {
	var result = {};
	result.x = x * Math.cos(alpha) - y * Math.sin(alpha);
	result.y = x * Math.sin(alpha) + y * Math.cos(alpha);
	return result;
}

function drawPlanet() {
	var x = getInt(scene.seed, scene.width, getPivot('planetx'));
	var y = getInt(scene.seed, scene.height / 2, getPivot('planety'));
	var radius = 30 + 100 * Math.pow(getFloat(scene.seed, getPivot('planetradius')), 2);

	var planetsaturation = getFloat(scene.seed, getPivot('planetsaturation'));
	var continentsize = 0.5 + 1.5 * getFloat(scene.seed, getPivot('continentsize'));
	var continentdetail = 3 + getInt(scene.seed, 4, getPivot('continentdetail'));
	var covered = 0.4 + 0.3 * getFloat(scene.seed, getPivot('covered'));

	var alpha = (-30 + getInt(scene.seed, 60, getPivot('planetrotation1'))) * 3.1415 / 180; // rotational offset
	var beta = (- 20 - getInt(scene.seed, 30, getPivot('planetrotation2'))) * 3.1415 / 180; // rotational offset	

	var atmosphere = 0.03;

	for (var a = x - radius * (1 + atmosphere); a < x + radius * (1 + atmosphere); a++) {
		for (var b = y - radius * (1 + atmosphere); b < y + radius * (1 + atmosphere); b++) {
			var localx = (a - x) / radius;
			var localz = (b - y) / radius;

			var projectedradius = Math.sqrt(Math.pow(localx, 2) + Math.pow(localz, 2));

			var localy = Math.sqrt(1 - localx * localx - localz * localz);

			var rotated = rotatevector(localx, localz, alpha);
			localx = rotated.x;
			localz = rotated.y;

			var rotated = rotatevector(localy, localz, beta);
			localy = rotated.x;
			localz = rotated.y;


			var theta = Math.acos(localz);
			var phi = Math.atan(localy / localx);
			if (localx == 0) {
				phi = 3.14159 / 2 * (localy > 0 ? 1 : -1);
			}
			if (localx < 0) {
				phi += (localy >= 0 ? 1 : -1) * 3.14159;
			}

			if (projectedradius >= 1 && projectedradius < 1 + atmosphere) {
				setPixel(a, b, getRGB(scene.skyhue, 0.5, scene.night ? 0.3 : 1.0), 0.2);
			}

			if (projectedradius < 1) {
				var planettexture = simplex(theta * continentsize, phi * continentsize, continentdetail, covered, covered) * 0.08 + 0.4 + 0.5 * Math.floor((theta / 3.14159 * 10 + 0.4 * getFloat(scene.seed, a + b + a * b + 45345))) * 0.1;
				setPixel(a, b, getRGB(scene.skyhue + theta * 0.03, 0.5 + 0.4 * planetsaturation, (scene.night ? 0.32 : 1.0) * planettexture), 1.0);
			}
		}
	}
}

function drawTreeBlob(x, y, r, r_var, color, blobseed, stretchiness) {
	for (var a = x - r - r_var; a < x + r + r_var; a++) {
		for (var b = y - r - r_var; b < y + r + r_var; b++) {
			var localx = a - x;
			var localy = b - y;
			localy /= stretchiness;
			var localr = Math.sqrt(Math.pow(localx, 2) + Math.pow(localy, 2));

			var phi = Math.atan(localy / localx);
			if (localx == 0) {
				phi = 3.14159 / 2 * (localy > 0 ? 1 : -1);
			}
			if (localx < 0) {
				phi += (localy >= 0 ? 1 : -1) * 3.14159;
			}

			if (localr < r) {
				setPixel(a, b, color);
			} else if (localr - r < r_var * simplex(phi / 3, blobseed, 5)) {
				setPixel(a, b, color);
			}
		}
	}
}

function drawTree(x, y, leafcolor, treeseed) {
	var size = 3 + getInt(scene.seed, 5, getPivot('treesize'));
	var blobcount = 1 + getInt(scene.seed, 5, getPivot('treeblobcount'));
	var treeheight = 5 + getInt(scene.seed, 20, getPivot('treeblobcount'));
	var height_var = 10;

	applyBuffer();
	scene.context.strokeStyle = getColorString(getRGB(scene.terrainhue, 0.4, scene.night ? 0.05 : 0.1));

	var blobs = [];
	for (var i = 0; i < blobcount; i++) {
		var blob = {
			'x': x - size * (blobcount - 1) / 2 + i * size,
			'y': y - treeheight - getInt(scene.seed, height_var, treeseed * i + i + 122353)
		};
		blobs.push(blob);
	}

	var nodes = blobs;
	for (var step = 0; step < blobcount - 1; step++) {
		var x_offset = Math.floor(size * (-0.5 + getFloat(scene.seed, getPivot('tree_x_offset' + step + treeseed))));

		var eliminateIndex = getInt(scene.seed, nodes.length - 1, treeseed + step + 3464);
		var newNodes = [];
		for (var i = 0; i < eliminateIndex; i++) {
			newNodes.push({
				'x': x - size * (blobcount - 1 - step) / 2 + i * size + x_offset,
				'y': y - treeheight + treeheight * step / blobcount
			})
		}
		newNodes.push({
			'x': (nodes[eliminateIndex].x + nodes[eliminateIndex + 1].x) / 2 + x_offset,
			'y': y - treeheight + treeheight * step / blobcount
		});
		for (var i = eliminateIndex + 2; i < nodes.length; i++) {
			newNodes.push({
				'x': x - size * (blobcount - 1 - step) / 2 + i * size + x_offset,
				'y': y - treeheight + treeheight * step / blobcount
			})
		}

		for (var i = 0; i < nodes.length; i++) {
			scene.context.beginPath();
			scene.context.moveTo(nodes[i].x, nodes[i].y);
			if (i <= eliminateIndex) {
				scene.context.lineTo(newNodes[i].x, newNodes[i].y);
			} else {
				scene.context.lineTo(newNodes[i - 1].x, newNodes[i - 1].y);
			}

			scene.context.stroke();
		}

		nodes = newNodes;
	}

	scene.context.beginPath();
	scene.context.moveTo(nodes[0].x, nodes[0].y);
	scene.context.lineTo(x, y);
	scene.context.stroke();

	setupBuffer();

	for (var i = 0; i < blobcount; i++) {
		drawTreeBlob(blobs[i].x, blobs[i].y, 2, 10, leafcolor, treeseed + 232454 * i, 0.5);
	}
}

function drawTrees() {
	var treeCount = 10 + getInt(scene.seed, 50, getPivot('treecount'));
	var treelocations = [];

	var c = 0;
	while (treelocations.length < treeCount) {
		var x = getInt(scene.seed, scene.width, getPivot('tree_x' + c));
		var y = getInt(scene.seed, scene.height, getPivot('tree_y' + c));
		c++;

		if (terrain2at(x) < y
			&& simplex(x / 200, (y - scene.height * 0.25 * (1 - simplex(x / 600, scene.noiseseed + 150, 4, 0, 1))) / 70, 3, 0, 1) < 0.4) {
			treelocations.push({ 'x': x, 'y': y });
		}
	}

	var treehue = scene.terrainhue;

	treelocations.sort(function (a, b) { return a.y - b.y });

	for (var i = 0; i < treelocations.length; i++) {
		var hue = treehue;
		if (getInt(scene.seed, 100, getPivot('specialtree' + i)) < 3) {
			hue += 0.5;
		}
		drawTree(treelocations[i].x, treelocations[i].y, getRGB(hue, 0.9, (scene.night ? 0.3 : 0.5) - 0.03 + 0.06 * getFloat(scene.seed, getPivot('treehueoffset' + i))), getPivot('treeseed' + i));
	}
}

export function draw(canvas, seed) {
	scene.seed = seed;

	setupCanvas(canvas);

	setupBuffer();

	drawSky();
	drawTerrain();

	if (getInt(scene.seed, 100, getPivot('hastrees')) < 70) {
		drawTrees();
	}

	if (getInt(scene.seed, 100, getPivot('hasriver')) < 70) {
		drawWater();
	}

	applyBuffer();
}