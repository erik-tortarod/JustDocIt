export function generateRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export function generateContrastingTextColor(backgroundColor: string) {
	const rgb = backgroundColor.match(
		/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
	);
	if (!rgb) return "#000000";

	const r = parseInt(rgb[1], 16);
	const g = parseInt(rgb[2], 16);
	const b = parseInt(rgb[3], 16);

	// Calcular el brillo de la imagen
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	return brightness > 128 ? "#000000" : "#FFFFFF";
}
