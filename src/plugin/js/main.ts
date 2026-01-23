import type { Api } from "reveal.js";
import { pluginDebug as debug } from "reveal.js-plugintoolkit";
import type { Config } from "./config";
import { getContrastColor } from "./functions/contrast";
import { setupCopyHandlers } from "./functions/copy-handler";
import { styleIndividualButtons } from "./functions/style-button";
import { applyCustomStyles } from "./functions/style-global";

export const main = async (deck: Api, config: Config): Promise<void> => {
	const revealEl = deck.getRevealElement();
	const preblockSelector = 'pre:not([data-cc="false"]) > code';

	const generator = document.querySelector("[name=generator]");
	const quarto = generator?.getAttribute("content")?.includes("quarto") ?? false;

	let preblocks: HTMLPreElement[] = [];

	if (revealEl) {
		applyCustomStyles(revealEl, config);

		preblocks = Array.from(revealEl.querySelectorAll(preblockSelector))
			.map((e) => e.parentElement)
			.filter((e): e is HTMLPreElement => e instanceof HTMLPreElement);
	}

	if (preblocks.length > 0 && revealEl) {
		debug.log(`${preblocks.length} code blocks found`, preblocks);

		// We add a single codeblock to the DOM to test the background color.
		revealEl.insertAdjacentHTML("beforeend", '<pre><code class="hljs"></code></pre>');
		const temp = revealEl.lastElementChild as HTMLElement;
		const bg = getComputedStyle(temp.firstElementChild as Element).backgroundColor;
		temp.remove();

		if (bg) {
			const contrastColor = getContrastColor(bg);
			revealEl.style.setProperty("--cc-code-bg", bg);
			revealEl.style.setProperty("--cc-window-title-color", contrastColor);
		}

		for (const preblock of preblocks) {
			let codeblock = null;
			let dataHolder = null;
			const preParent = preblock.parentElement;

			if (quarto && preParent?.matches(".sourceCode")) {
				// Running in Quarto
				codeblock = preParent;
				dataHolder = codeblock;
				preParent.dataset.did = "quartoblock";
			} else {
				dataHolder = preblock;
				// Not running in Quarto
				if (!preParent?.classList.contains("codeblock")) {
					codeblock = document.createElement("div");
					preParent?.insertBefore(codeblock, preblock);
				}
			}

			if (codeblock && dataHolder) {
				codeblock.classList.add("codeblock");
				codeblock.appendChild(preblock);

				if (
					config.display === "icon" ||
					config.display === "icons" ||
					config.display === "both"
				) {
					if (dataHolder) {
						dataHolder.dataset.ccDisplay = config.display;
					}
				}

				if (preblock.classList.contains("fragment")) {
					codeblock.classList.add("fragment");
					preblock.classList.remove("fragment");
				}

				const code = preblock.querySelectorAll("code")[0];

				if (code?.innerText) {
					// Determine button visibility behavior
					// Priority: data-cc-button > data-cc (legacy) > config.button
					const buttonAttr =
						dataHolder.getAttribute("data-cc-button") ||
						(dataHolder.dataset.cc !== "false" ? dataHolder.dataset.cc : null);

					// Check if button is explicitly disabled
					const buttonDisabled = buttonAttr === "false";

					let button: HTMLButtonElement | null = null;

					if (!buttonDisabled) {
						button = document.createElement("button");
						button.dataset.cc = "true";
						button.title = "Copy to Clipboard";

						// Set visibility behavior (always, hover, click)
						const buttonVisibility = buttonAttr || config.button;
						if (buttonVisibility !== "always") {
							button.dataset.cc = buttonVisibility;
						}

						const possibleAttributes = ["ccCopy", "ccCopied", "ccDisplay"];

						for (const attribute of possibleAttributes) {
							if (dataHolder.dataset[attribute]) {
								button.dataset[attribute] = dataHolder.dataset[attribute];
								delete dataHolder.dataset[attribute];
							}
						}

						// Style the button
						styleIndividualButtons(button, config);
					}

					// Clean up data attributes
					delete dataHolder.dataset.ccButton;

					// Values can be false, hover
					if (dataHolder.dataset.cc !== "false") {
						delete dataHolder.dataset.cc;
					}

					// Check if it needs a window frame
					const windowAttr = dataHolder.getAttribute("data-cc-window");
					const isWindow =
						windowAttr !== "false" && (windowAttr !== null || config.window !== false);

					if (isWindow && dataHolder.dataset.cc !== "false") {
						const shorthand = dataHolder.dataset.ccWindow;

						// Determine window title (priority: data-cc-window-title > shorthand > config default > empty)
						const configTitle =
							typeof config.window === "object" ? config.window.title : undefined;
						const windowTitle =
							dataHolder.getAttribute("data-cc-window-title") ??
							(shorthand && shorthand !== "true" ? shorthand : (configTitle ?? ""));

						const controls =
							dataHolder.getAttribute("data-cc-window-controls") ||
							(typeof config.window === "object" ? config.window.controls : "color");

						const controlsOpacity =
							dataHolder.getAttribute("data-cc-window-controls-opacity") ||
							(typeof config.window === "object"
								? (config.window.controlsOpacity?.toString() ?? "1")
								: "1");

						const padding =
							dataHolder.getAttribute("data-cc-window-padding") ||
							(typeof config.window === "object"
								? config.window.padding
								: undefined) ||
							"0.5rem";

						// Hoist to codeblock
						codeblock.classList.add(`cc-controls-${controls}`);
						codeblock.style.setProperty(
							"--cc-window-controls-opacity",
							controlsOpacity
						);
						codeblock.style.setProperty("--cc-window-padding", padding);

						// Clean up data attributes
						delete dataHolder.dataset.ccWindow;
						delete dataHolder.dataset.ccWindowTitle;
						delete dataHolder.dataset.ccWindowControls;
						delete dataHolder.dataset.ccWindowControlsOpacity;
						delete dataHolder.dataset.ccWindowPadding;

						const windowBar = document.createElement("div");
						windowBar.className = "cc-window-bar";

						windowBar.innerHTML = `
							<div class="cc-window-left"><div class="cc-controls"><span></span><span></span><span></span></div></div>
							<div class="cc-window-title">${windowTitle}</div>
							<div class="cc-window-right"></div>
						`;

						// Only append button if it exists
						if (button) {
							windowBar.querySelector(".cc-window-right")?.appendChild(button);
						}

						codeblock.dataset.ccWindow = "true";
						codeblock.insertBefore(windowBar, preblock);
					} else {
						// COPY BUTTON INSERTION (non-window mode)
						if (button && dataHolder.dataset.cc !== "false") {
							codeblock.insertBefore(button, preblock);
						}
					}
				}
			}
		}

		setupCopyHandlers(revealEl, config);
	}
};
