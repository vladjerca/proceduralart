// http://stackoverflow.com/a/17243070/895589

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
export function getRGB(h, s, v) {
    while (h > 1) h -= 1;
    while (h < 0) h += 1;

    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}

export function getInt(seed, max, pivot) {
	return (seed % pivot) % max;
}

export function getBool(pivot) {
	return getInt(2, pivot) == 1;
}

export function getFloat(seed, pivot, from, to) {
	if (!from)
		from = 0;
	if (!to)
		to = 1;
	var x = (seed % pivot) % 100000 / 100000;
	return from + (to - from) * x;
}

// TODO: remove this function and replace with toosoon-prng
export function getPivot(text) {
	var myrng = new Math.seedrandom(text);
	return Math.round(myrng() * 100000000);
}

export function simplex(x, y, octaves, lowercap, uppercap) {
	if (!octaves) octaves = 6;
	if (!lowercap) lowercap = 0;
	if (!uppercap) uppercap = 1;
	
	var v = 0;
	for (var i = 1; i <= octaves; i++) {
		var s = noise.simplex2(x * Math.pow(2, i-1),y * Math.pow(2, i-1)) / 2 + 0.5;
		v += s * Math.pow(2, -i);
	}
	
	if (v < lowercap)
		return 0;
	if (v > uppercap)
		return 1;
	return (v - lowercap) / (uppercap - lowercap);
}

export function getColorString(color, alpha) {
	if (alpha === undefined) 
		alpha = 1;
	return 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + alpha + ')';
}