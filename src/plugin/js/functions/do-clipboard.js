export const doClipboard = (options) => {

	let clipboard = options.plaintextonly == true ? 
	new ClipboardJS(".codeblock > button", {
		text: function(trigger) { 
			return trigger.nextElementSibling.firstChild.innerText.replace(/^\s+|\s+$/g, "");
		}}) : 
	new ClipboardJS(".codeblock > button", {
		target({nextElementSibling}) {
			return nextElementSibling.firstChild;
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