import { ReactNode } from "react";

interface ThemeButtonProps {
	theme: string;
	label: string;
	isSelected: boolean;
	onClick: () => void;
}

const themeStyles: Record<
	string,
	{ bg: string; text: string; border: string; emoji: string }
> = {
	light: {
		bg: "bg-white",
		text: "text-gray-800",
		border: "border-gray-200",
		emoji: "☀️",
	},
	dark: {
		bg: "bg-gray-900",
		text: "text-gray-100",
		border: "border-gray-700",
		emoji: "🌙",
	},
	dim: {
		bg: "bg-gray-800",
		text: "text-indigo-200",
		border: "border-indigo-900",
		emoji: "🌫️",
	},
	autumn: {
		bg: "bg-orange-50",
		text: "text-orange-900",
		border: "border-orange-200",
		emoji: "🍂",
	},
	abyss: {
		bg: "bg-blue-950",
		text: "text-blue-200",
		border: "border-blue-800",
		emoji: "🌊",
	},
};

function ThemeButton({ theme, label, isSelected, onClick }: ThemeButtonProps) {
	const styles = themeStyles[theme] || themeStyles.light;

	return (
		<button
			onClick={onClick}
			className={`w-full p-3 rounded-lg transition-all ${styles.bg} ${
				styles.text
			} border-2 ${
				isSelected ? styles.border : "border-transparent hover:" + styles.border
			}`}
		>
			<span className="font-medium flex items-center gap-2">
				<span>{styles.emoji}</span>
				{label}
			</span>
		</button>
	);
}

export default ThemeButton;
