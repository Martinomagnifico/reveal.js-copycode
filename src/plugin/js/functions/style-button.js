export const styleButton = (button, options) => {

	let originalIconsvg = [];
	originalIconsvg.copy = '<svg aria-hidden="true" height="16" width="16" viewBox="0 0 16 16" version="1.1"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>'

	originalIconsvg.copied = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"><path d="M15.7,2.8c0.4,0.4,0.4,1,0,1.4L6,13.9c-0.4,0.4-1,0.4-1.4,0L0.3,9.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l3.6,3.6l9-9C14.7,2.4,15.3,2.4,15.7,2.8z"/></svg>'

	let copysvg = options.iconsvg && options.iconsvg.copy != "" ? options.iconsvg.copy : originalIconsvg.copy;
	let copiedsvg = options.iconsvg && options.iconsvg.copied != "" ? options.iconsvg.copied : originalIconsvg.copied;

	// If the button needs to be shown at all
	if ( button.dataset.cc != false && button.dataset.cc != "false" ) {


		// If icons are needed
		let theDisplay = button.dataset.ccDisplay || options.display;
		if (theDisplay == "icons" || theDisplay == "both") {

				button.innerHTML = `<span></span>`;
				button.textholder = button.getElementsByTagName("SPAN")[0];
				button.insertAdjacentHTML("afterbegin", copiedsvg);
				button.insertAdjacentHTML("afterbegin", copysvg);

				// If tooltip is wanted or not (global setting only)
				if ((button.dataset.ccDisplay && button.dataset.ccDisplay == "icons") && options.tooltip) {
					button.textholder.style.display = "flex"
				}
		}

		// If custom text, else the global text
		button.textholder.textContent = button.dataset.ccCopy ? button.dataset.ccCopy : (options.copy || options.text.copy);

	}
}