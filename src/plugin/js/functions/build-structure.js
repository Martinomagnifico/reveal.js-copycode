import {styleButton} from "./style-button.js";

export const buildStructure = (preblock, options) => {

	let codeblock = null;
	let dataHolder = preblock;

	if (options.quarto && preblock.parentNode.matches(".sourceCode")) {
		// Running in Quarto
		codeblock = preblock.parentNode;
		dataHolder = codeblock;

	} else {
		// Not running in Quarto
		if (!preblock.parentNode.classList.contains("codeblock")) {
			codeblock = document.createElement("div");
			preblock.parentNode.insertBefore(codeblock, preblock);
		}
	}

	codeblock.classList.add("codeblock");

	if (dataHolder.dataset.cc && dataHolder.dataset.cc == "false") {
		return
	}

	// Put the pre inside the wrapper
	codeblock.appendChild(preblock);

	if (options.display == "icons" || options.display == "both") {
		dataHolder.dataset.ccDisplay = options.display;
	}

	if (preblock.classList.contains("fragment")) {
		codeblock.classList.add("fragment");
		preblock.classList.remove("fragment")
	}

	let button = document.createElement("button");
	button.title="Copy to Clipboard";
	button.textholder = button;

	if (options.button != "always" ) {
		button.dataset["cc"] = options.button;
	}

	let possibleAttributes = ["cc", "ccCopy", "ccCopied", "ccDisplay"];

	possibleAttributes.forEach(attribute => {
		if (dataHolder.dataset[attribute]) {
			button.dataset[attribute] = dataHolder.dataset[attribute];
			delete dataHolder.dataset[attribute];
		}
	} );

	let code = preblock.querySelectorAll('code')[0];
	if (code && code.innerText) {
		// Style the button
		styleButton(button, options);
		// Insert the button
		codeblock.insertBefore(button, preblock);
	}
}
