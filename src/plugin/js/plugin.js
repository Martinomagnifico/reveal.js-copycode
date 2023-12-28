import { mergeDeep, pluginPath, loadResource } from './helpers';

import { getPreBlocks } from './functions/get-pre-blocks';
import { doClipboard } from './functions/do-clipboard';

const Plugin = () => {

	let options = {};

	/**
	* The main function of the plugin
	* @param {object} deck - The deck object
	* @param {object} options - The options object
	* @param {string} es5Filename - The name of the file that will be used
	*/
	const CopyCodeStart = function (deck, options, es5Filename) {

		let thePath = pluginPath(es5Filename);
		let pluginBaseName = es5Filename.replace(/\.[^/.]+$/, "");

		let ClipboardJSPath = options.clipboardjspath != "" ? options.clipboardjspath : null || "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js"
		let CopyCodeStylePath = options.csspath ? options.csspath : null || `${thePath}${pluginBaseName}.css` || `plugin/${pluginBaseName}/${pluginBaseName}.css`
		let preblocks = Array.prototype.map.call(deck.getRevealElement().querySelectorAll("pre > code"))

		if (typeof ClipboardJS != "function") {
			loadResource(ClipboardJSPath, 'script', () => {
				if (typeof ClipboardJS === "function") {
					if (preblocks.length > 0) {
						loadResource(CopyCodeStylePath, 'stylesheet', () => {
							getPreBlocks(preblocks, options, deck);
							doClipboard(options);
						});
					}
				} else {
					console.log("Clipboard.js did not load");
				}
			});
		} else {
			if (preblocks.length > 0) {
				loadResource(CopyCodeStylePath, 'stylesheet', () => {
					getPreBlocks(preblocks, options, deck);
					doClipboard(options);
				});
			}
		}
	};


	/**
	* Initialize the plugin
	* @param {object} deck - The deck object
	*/
	const init = function (deck) {

		let defaultOptions = {
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
			csspath: "",
			clipboardjspath: ""
		};

		options = mergeDeep(defaultOptions, deck.getConfig().copycode || {});

		CopyCodeStart(deck, options, "copycode.js");
	};

	return { id: 'copycode', init: init };
};

export default Plugin;
