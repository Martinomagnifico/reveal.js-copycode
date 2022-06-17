
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * CopyCode.js for Reveal.js 
 * Version 1.0.4
 * 
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js 
 ******************************************************************/


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CopyCode = factory());
})(this, (function () { 'use strict';

	var Plugin = function Plugin() {
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

	    var finish = function finish() {
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

	  var getCodeBlocks = function getCodeBlocks(codeblocks, options) {
	    var styleButton = function styleButton(button, codeblock) {
	      var codeblockData = codeblock.dataset;
	      button.textContent = codeblockData.ccCopy ? codeblockData.ccCopy : options.copy;
	      button.setAttribute("data-cc-copied", codeblockData.ccCopied ? codeblockData.ccCopied : options.copied);
	      ["data-cc-copy", "data-cc-copied"].forEach(function (attribute) {
	        return codeblock.removeAttribute(attribute);
	      });
	      button.style.setProperty('--copy-bg', options.copybg);
	      button.style.setProperty('--copy-color', options.copycolor);
	      button.style.setProperty('--copied-bg', options.copiedbg);
	      button.style.setProperty('--copied-color', options.copiedcolor);
	    };

	    var buildStructure = function buildStructure(codeblock) {
	      var wrapper = document.createElement("div");
	      wrapper.classList.add("codeblock");
	      codeblock.parentNode.insertBefore(wrapper, codeblock);
	      wrapper.appendChild(codeblock);

	      if (codeblock.classList.contains("fragment")) {
	        wrapper.classList.add("fragment");
	        codeblock.classList.remove("fragment");
	      }

	      var button = document.createElement("button");
	      styleButton(button, codeblock);
	      wrapper.insertBefore(button, codeblock);
	    };

	    codeblocks.forEach(function (codeblock) {
	      if (codeblock.getAttribute("data-cc") && codeblock.getAttribute("data-cc") === "false") {
	        return;
	      } else {
	        if (!codeblock.parentNode.classList.contains("codeblock")) {
	          buildStructure(codeblock);
	        }
	      }
	    });
	    var clipboard = new ClipboardJS(".codeblock > button", {
	      target: function target(trigger) {
	        return trigger.nextElementSibling.firstChild;
	      }
	    });

	    function plaintextClipboard(copied) {
	      var listener = function listener(ev) {
	        var text = copied.replace(/^\s*\n/gm, "");
	        ev.preventDefault();

	        if (ev.clipboardData && ev.clipboardData.getData) {
	          ev.clipboardData.setData('text/plain', text);
	        } else if (window.clipboardData && window.clipboardData.getData) {
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

	      var button = e.trigger;
	      e.clearSelection();
	      button.setAttribute("data-text-original", button.innerHTML);
	      button.innerHTML = button.getAttribute("data-cc-copied");
	      button.setAttribute("disabled", true);
	      setTimeout(function () {
	        button.innerHTML = button.getAttribute("data-text-original");
	        button.removeAttribute("disabled");
	      }, options.timeout);
	    });
	  };

	  var init = function init(deck) {
	    var es5Filename = "copycode.js";
	    var defaultOptions = {
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

	    var defaults = function defaults(options, defaultOptions) {
	      for (var i in defaultOptions) {
	        if (!options.hasOwnProperty(i)) {
	          options[i] = defaultOptions[i];
	        }
	      }
	    };

	    var options = deck.getConfig().copycode || {};
	    defaults(options, defaultOptions);

	    function pluginPath() {
	      var path;
	      var pluginScript = document.querySelector("script[src$=\"".concat(es5Filename, "\"]"));

	      if (pluginScript) {
	        path = pluginScript.getAttribute("src").slice(0, -1 * es5Filename.length);
	      } else {
	        path = (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('copycode.js', document.baseURI).href)).slice(0, (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('copycode.js', document.baseURI).href)).lastIndexOf('/') + 1);
	      }

	      return path;
	    }

	    var ClipboardJSPath = options.clipboardjspath != "" ? options.clipboardjspath : "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js";
	    var CopyCodeStylePath = options.csspath ? options.csspath : "".concat(pluginPath(), "copycode.css") || 'plugin/copycode/copycode.css';
	    loadResource(CopyCodeStylePath, 'stylesheet', function () {});
	    loadResource(ClipboardJSPath, 'script', function () {
	      if (typeof ClipboardJS === "function") {
	        var codeblocks = deck.getRevealElement().querySelectorAll("pre");

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

	return Plugin;

}));
