const Plugin = () => {

	function loadResource(url, type, callback) {
		var head = document.querySelector('head');
		var resource;
	
		if (type === 'script') {
		  resource = document.createElement('script');
		  resource.type = 'text/javascript';
		  resource.src = url;
		} else if (type === 'stylesheet') {
		  resource = document.createElement('link');
		  resource.rel = 'stylesheet';
		  resource.href = url;
		}
		var finish = function () {
		  if (typeof callback === 'function') {
			callback.call();
			callback = null;
		  }
		};
		resource.onload = finish;
		resource.onreadystatechange = function () {
		  if (this.readyState === 'loaded') {
			finish();
		  }
		};
		head.appendChild(resource);
	}
	
	const getCodeBlocks = function (codeblocks, options) {

		const styleButton = function (button, codeblock) {
			let codeblockData = codeblock.dataset
			button.textContent = codeblockData.ccCopy ? codeblockData.ccCopy : options.copy;
			button.setAttribute("data-cc-copied", codeblockData.ccCopied ? codeblockData.ccCopied : options.copied);

			["data-cc-copy", "data-cc-copied"].forEach(attribute => codeblock.removeAttribute(attribute));

			button.style.setProperty('--copy-bg', options.copybg);
			button.style.setProperty('--copy-color', options.copycolor);
			button.style.setProperty('--copied-bg', options.copiedbg);
			button.style.setProperty('--copied-color', options.copiedcolor);
		}

		const buildStructure = function (codeblock) {
			let wrapper = document.createElement("div");
			wrapper.classList.add("codeblock");
			codeblock.parentNode.insertBefore(wrapper, codeblock);
			wrapper.appendChild(codeblock);
			if (codeblock.classList.contains("fragment")) {
				wrapper.classList.add("fragment");
				codeblock.classList.remove("fragment")
			}
			let button = document.createElement("button");
			styleButton(button, codeblock);
			wrapper.insertBefore(button, codeblock);
		}

		codeblocks.forEach(codeblock => {
			if (codeblock.getAttribute("data-cc") && codeblock.getAttribute("data-cc") === "false") {
				return
			} else {
				if (!codeblock.parentNode.classList.contains("codeblock")) {
					buildStructure(codeblock);
				}
			}
		});

		let clipboard = new ClipboardJS(".codeblock > button", {
			target: function (trigger) {
				return trigger.nextElementSibling.firstChild;
			}
		});

		function plaintextClipboard(copied) {
			const listener = function (ev) {
				let text = copied.replace(/^\s*\n/gm, "") 
				ev.preventDefault();
				if (ev.clipboardData && ev.clipboardData.getData) {
					ev.clipboardData.setData('text/plain', text);
				}
				else if (window.clipboardData && window.clipboardData.getData) {
					window.clipboardData.setData('text/plain', text);
				}
			};
			document.addEventListener('copy', listener);
			document.execCommand('copy');
			document.removeEventListener('copy', listener);
		}


		clipboard.on("success", function (e) {

			if (options.plaintextonly == true) {
				plaintextClipboard(e.text);
			}

			let button = e.trigger;
			e.clearSelection();

			button.setAttribute("data-text-original", button.innerHTML);
			button.innerHTML = button.getAttribute("data-cc-copied");
			button.setAttribute("disabled", true);

			setTimeout(function () {
				button.innerHTML = button.getAttribute("data-text-original");
				button.removeAttribute("disabled");
			}, options.timeout);
		});
	}

	const init = function (deck) {

		let es5Filename = "copycode.js"

		let defaultOptions = {
			plaintextonly: true,
			timeout: 1000,
			copy: "Copy",
			copied: "Copied!",
			copybg: "orange",
			copiedbg: "green",
			copycolor: "black",
			copiedcolor: "white",
			csspath: "",
			clipboardjspath: ""
		};

		const defaults = function (options, defaultOptions) {
			for ( let i in defaultOptions ) {
				if ( !options.hasOwnProperty( i ) ) {
					options[i] = defaultOptions[i];
				}
			}
		}

		let options = deck.getConfig().copycode || {};
		defaults(options, defaultOptions);

		function pluginPath() {
			let path;
			let pluginScript = document.querySelector(`script[src$="${es5Filename}"]`);
			if (pluginScript) {
				path = pluginScript.getAttribute("src").slice(0, -1 * (es5Filename.length));
			} else {
				path = import.meta.url.slice(0, import.meta.url.lastIndexOf('/') + 1);
			}
			return path;
		}

		let ClipboardJSPath = options.clipboardjspath != "" ? options.clipboardjspath : null || "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js"
		let CopyCodeStylePath = options.csspath ? options.csspath : null || `${pluginPath()}copycode.css` || 'plugin/copycode/copycode.css'

		loadResource(CopyCodeStylePath, 'stylesheet', function () {});
		loadResource(ClipboardJSPath, 'script', function () {
			if (typeof ClipboardJS === "function") { 
				let codeblocks = deck.getRevealElement().querySelectorAll("pre");
	
				if (codeblocks.length > 0) {
					getCodeBlocks(codeblocks, options);
				}
			} else {
				console.log("Clipboard.js did not load");
			}
		});
	};

	return {
		id: 'copycode',
		init: init
	};
};

export default Plugin;