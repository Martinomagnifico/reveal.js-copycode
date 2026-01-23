export interface WindowConfig {
	title?: string;
	controls?: "color" | "light" | "dark";
	controlsOpacity?: number;
	padding?: string;
}

export interface Config {
	button: "always" | "hover" | "false";
	debug?: boolean;
	display: "text" | "icon" | "icons" | "both";
	text: {
		copy: string;
		copied: string;
	};
	plaintextonly: boolean;
	timeout: number;
	style: {
		copybg: string;
		copiedbg: string;
		copycolor: string;
		copiedcolor: string;
		copyborder: string;
		copiedborder: string;
		scale: number;
		offset: number;
		radius: number;
	};
	window: boolean | WindowConfig;
	tooltip: boolean;
	iconsvg: {
		copy: string;
		copied: string;
	};
	cssautoload: boolean;
	csspath: string;

	// Legacy support
	copybg?: string;
	copiedbg?: string;
	copycolor?: string;
	copiedcolor?: string;
	copyborder?: string;
	copiedborder?: string;
	scale?: number;
	offset?: number;
	radius?: number;
}

const defaultConfig: Config = {
	button: "always",
	display: "text",
	text: {
		copy: "Copy",
		copied: "Copied!",
	},
	plaintextonly: true,
	timeout: 1000,
	style: {
		copybg: "orange",
		copiedbg: "green",
		copycolor: "black",
		copiedcolor: "white",
		copyborder: "",
		copiedborder: "",
		scale: 1,
		offset: 0,
		radius: 0,
	},
	window: false,
	tooltip: true,
	iconsvg: {
		copy: "",
		copied: "",
	},
	cssautoload: true,
	csspath: "",
};

export { defaultConfig };
