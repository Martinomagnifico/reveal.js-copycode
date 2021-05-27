
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * CopyCode.js for Reveal.js 
 * Version 1.0.2
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
	(global = global || self, global.CopyCode = factory());
}(this, (function () { 'use strict';

	var Plugin = function Plugin() {
	  var getCodeBlocks = function getCodeBlocks(codeblocks, options) {
	    var styleButton = function styleButton(button, codeblock) {
	      var codeblockData = codeblock.dataset;
	      button.textContent = codeblockData.ccCopy ? codeblockData.ccCopy : options.copy;
	      button.setAttribute("data-cc-copied", codeblockData.ccCopied ? codeblockData.ccCopied : options.copied);
	      ["data-cc-copy", "data-cc-copied"].forEach(function (attribute) {
	        return codeblock.removeAttribute(attribute);
	      });
	      button.style.backgroundColor = options.copybg;
	      button.style.color = options.copycolor;
	    };

	    var buildStructure = function buildStructure(codeblock) {
	      var wrapper = document.createElement("div");
	      wrapper.classList.add("codeblock");
	      codeblock.parentNode.insertBefore(wrapper, codeblock);
	      wrapper.appendChild(codeblock);
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
	        //-return trigger.nextElementSibling;
	        return trigger.nextElementSibling.firstChild;
	      }
	    });
	    clipboard.on("success", function (e) {
	      var button = e.trigger;
	      e.clearSelection();
	      button.setAttribute("data-text-original", button.innerHTML);
	      button.innerHTML = button.getAttribute("data-cc-copied");
	      button.style.backgroundColor = options.copiedbg;
	      button.style.color = options.copiedcolor;
	      button.setAttribute("disabled", true);
	      setTimeout(function () {
	        button.style.backgroundColor = options.copybg;
	        button.style.color = options.copycolor;
	        button.innerHTML = button.getAttribute("data-text-original");
	        button.removeAttribute("disabled");
	      }, options.timeout);
	    });
	  };

	  var init = function init(deck) {
	    var defaultOptions = {
	      timeout: 1000,
	      copy: "Copy",
	      copied: "Copied!",
	      copybg: "orange",
	      copiedbg: "green",
	      copycolor: "black",
	      copiedcolor: "white"
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

	    if (typeof ClipboardJS === "function") {
	      var codeblocks = deck.getRevealElement().querySelectorAll("pre");

	      if (codeblocks.length > 0) {
	        getCodeBlocks(codeblocks, options);
	      }
	    } else {
	      console.log("Clipboard.js did not load");
	    }
	  };

	  return {
	    id: 'copycode',
	    init: init
	  };
	};

	return Plugin;

})));
