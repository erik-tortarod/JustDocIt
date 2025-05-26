import { describe, it, expect } from "vitest";
import {
	generateRandomColor,
	generateContrastingTextColor,
} from "../generateRandomColor";

describe("generateRandomColor", () => {
	it("should generate a valid hex color", () => {
		const color = generateRandomColor();
		expect(color).toMatch(/^#[0-9a-f]{6}$/i);
	});

	it("should generate different colors on multiple calls", () => {
		const color1 = generateRandomColor();
		const color2 = generateRandomColor();
		expect(color1).not.toBe(color2);
	});
});

describe("generateContrastingTextColor", () => {
	it("should return black for light backgrounds", () => {
		expect(generateContrastingTextColor("#FFFFFF")).toBe("#000000");
		expect(generateContrastingTextColor("#F0F0F0")).toBe("#000000");
		expect(generateContrastingTextColor("#E0E0E0")).toBe("#000000");
	});

	it("should return white for dark backgrounds", () => {
		expect(generateContrastingTextColor("#000000")).toBe("#FFFFFF");
		expect(generateContrastingTextColor("#333333")).toBe("#FFFFFF");
		expect(generateContrastingTextColor("#666666")).toBe("#FFFFFF");
	});

	it("should handle hex colors with or without # prefix", () => {
		expect(generateContrastingTextColor("#FFFFFF")).toBe("#000000");
		expect(generateContrastingTextColor("FFFFFF")).toBe("#000000");
	});

	it("should return black for invalid hex colors", () => {
		expect(generateContrastingTextColor("invalid")).toBe("#000000");
		expect(generateContrastingTextColor("#12345")).toBe("#000000");
	});
});
