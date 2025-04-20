export interface Config {
	button: "always" | "hover" | "click";
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
	tooltip: boolean;
	iconsvg: {
		copy: string;
		copied: string;
	};
	cssautoload: boolean;
	csspath: string;
	// The values below are from the older version of the plugin
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
		radius: 0
	},
	tooltip: true,
	iconsvg: {
		copy: '',   // User can paste <svg>…</svg> code here
		copied: ''  // User can paste <svg>…</svg> code here
	},
	cssautoload: true,
	csspath: ''
};

export { defaultConfig };