export const doClipboard = (options) => {

	let clipboard = options.plaintextonly == true ?
	new ClipboardJS(".codeblock > button", {
		text: function(trigger) {
			let code = trigger.nextElementSibling.querySelectorAll('code')[0];

			var table = code.querySelector('table');
			if (table == null) {
				return code.innerText.replace(/^\s+|\s+$/g, "")
			}

			var result = "";

			for (let row of table.rows) {
				for (let cell of row.cells) {
					if (cell.className.match("hljs-ln-numbers")) {
						continue
					} else {
						result += (cell.innerText + "\n");
					}
				}
			}

			return result
		}}) :
	new ClipboardJS(".codeblock > button", {
		target({nextElementSibling}) {
			return nextElementSibling.nextElementSibling.querySelectorAll('code')[0]
		}}) ;


	clipboard.on("success", e => {

		let button = e.trigger;
		e.clearSelection();
	
		button.dataset["textOriginal"] =  button.textholder.innerHTML;
		button.textholder.innerHTML = button.dataset["ccCopied"] ? button.dataset["ccCopied"] : (options.copied || options.text.copied);

		button.setAttribute("disabled", true);
	
		setTimeout(() => {
			if ( (button.dataset.ccDisplay && button.dataset.ccDisplay != "icons") || (!button.dataset.ccDisplay) ) {
				button.textholder.innerHTML = button.getAttribute("data-text-original");
			}
			button.removeAttribute("data-text-original");
			button.removeAttribute("disabled");
	
		}, options.timeout);
	});

	clipboard.on('error', e => {
		console.error('There was an error copying the code: ', e.action);
	});
}