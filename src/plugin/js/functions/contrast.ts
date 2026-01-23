export const getContrastColor = (rgbString: string): "black" | "white" => {
	// Handle cases where the string might be empty or not a color
	if (!rgbString || rgbString === "transparent") {
		return "white";
	}

	// Extract numbers from rgb() or rgba() strings
	const match = rgbString.match(/\d+(\.\d+)?/g);

	if (!match || match.length < 3) {
		return "white"; // Fallback
	}

	const r = parseFloat(match[0]);
	const g = parseFloat(match[1]);
	const b = parseFloat(match[2]);

	// HSP (Highly Sensitive Pooled) equation
	// http://alienryderflex.com/hsp.html
	const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

	// Using 127.5 as the midpoint for 0-255 range
	return hsp > 127.5 ? "black" : "white";
};
