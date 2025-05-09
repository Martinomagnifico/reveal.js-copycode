import type { Api } from 'reveal.js';
import type { Config } from './config';
import { pluginDebug as debug} from 'reveal.js-plugintoolkit';

import { applyCustomStyles } from './functions/style-global'; // Import the new function
import { styleIndividualButtons } from './functions/style-button';
import { setupCopyHandlers } from './functions/copy-handler';

export const main = async (deck: Api, config: Config): Promise<void> => {

	const revealEl = deck.getRevealElement();
	const preblockSelector = 'pre:not([data-cc="false"]) > code';

	const generator = document.querySelector('[name=generator]');
	const quarto = generator?.getAttribute('content')?.includes('quarto') ?? false;

	let preblocks: HTMLPreElement[] = [];

	if (revealEl) {

		applyCustomStyles(revealEl, config);

		preblocks = Array.from(revealEl.querySelectorAll(preblockSelector))
			.map((e) => e.parentElement)
			.filter((e): e is HTMLPreElement => e instanceof HTMLPreElement);
	}

	if (preblocks.length > 0 && revealEl) {

		debug.log(`${preblocks.length} code blocks found`, preblocks);

		for (const preblock of preblocks) {

			let codeblock = null;
			let dataHolder = null;
			const preParent = preblock.parentElement;

			if (quarto && preParent?.matches('.sourceCode')) {
				// Running in Quarto
				codeblock = preParent;
				dataHolder = codeblock;
				preParent.dataset.did = "quartoblock"
			} else {
				dataHolder = preblock;
				// Not running in Quarto
				if (!preParent?.classList.contains('codeblock')) {
					codeblock = document.createElement('div');
					preParent?.insertBefore(codeblock, preblock);
				}
			}

			if (codeblock && dataHolder) {
				codeblock.classList.add("codeblock");
				codeblock.appendChild(preblock);

				if (config.display === "icon" ||  config.display === "icons" || config.display === "both") {
					if (dataHolder) {
						dataHolder.dataset.ccDisplay = config.display;
					}
				}

				if (preblock.classList.contains("fragment")) {
					codeblock.classList.add("fragment");
					preblock.classList.remove("fragment")
				}

				const button = document.createElement("button");
				button.dataset.cc = "true";
				button.title="Copy to Clipboard";


				if (config.button !== "always" ) {
					button.dataset.cc = config.button;
				}

				const possibleAttributes = ["cc", "ccCopy", "ccCopied", "ccDisplay"];

				for (const attribute of possibleAttributes) {
					if (dataHolder.dataset[attribute]) {
						button.dataset[attribute] = dataHolder.dataset[attribute];
						delete dataHolder.dataset[attribute];
					}
				}

				const code = preblock.querySelectorAll('code')[0];
				if (code?.innerText) {
					// Style the button
					styleIndividualButtons(button, config);
					// Insert the button
					codeblock.insertBefore(button, preblock);
				}
			}
		}

		setupCopyHandlers(revealEl, config);
	}
};