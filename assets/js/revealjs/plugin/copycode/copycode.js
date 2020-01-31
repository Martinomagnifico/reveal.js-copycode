/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * CopyCode.js for Reveal.js 1.0.0
 *
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js
 *  - Zeno Rocha, https://clipboardjs.com
 *  - JetBrains for the cool JetBrains Mono font
 ******************************************************************/
const CopyCode = window.CopyCode || function () {

    /**
     * Array.prototype.forEach() polyfill
     * @author Chris Ferdinandi
     * @license MIT
     */
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    let options = Reveal.getConfig().copycode || {};

    let defaultOptions = {
        timeout: 1000,
        copy: "Copy",
        copied: "Copied!",
        copybg: "orange",
        copiedbg: "green",
        copycolor: "black",
        copiedcolor: "white"
    };

    const defaults = function (options, defaultOptions) {
        for (let i in defaultOptions) {
            if (!options.hasOwnProperty(i)) {
                options[i] = defaultOptions[i];
            }
        }
    }

    const appendStyle = function (styles) {
        let css = document.createElement("style");
        css.type = "text/css";
        if (css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles));
        document.getElementsByTagName("head")[0].appendChild(css);
    }

    const buildStructure = function (element) {
        let copytext = "";
        let copiedtext = "";
        let wrapper = document.createElement("div");
        wrapper.classList.add("codeblock");
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
        let copybutton = document.createElement("button");

        if (element.getAttribute("data-cc-copy")) {
            copytext = element.getAttribute("data-cc-copy");
            element.removeAttribute("data-cc-copy");
        }
        if (element.getAttribute("data-cc-copied")) {
            copiedtext = element.getAttribute("data-cc-copied");
            element.removeAttribute("data-cc-copied");
        }

        copybutton.textContent = copytext || options.copy;
        copybutton.setAttribute("data-cc-copied", copiedtext || options.copied);

        wrapper.insertBefore(copybutton, element);
    }


    const init = function () {

        defaults(options, defaultOptions);

        let styles = `.codeblock > button { background:${options.copybg}; color:${options.copycolor}; } .codeblock > button[disabled] { background:${options.copiedbg}; color:${options.copiedcolor};}`;

        let codeblocks = document.querySelectorAll("pre");

        codeblocks.forEach(function (codeblock) {
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
                return trigger.nextElementSibling;
            }
        });

        appendStyle(styles);

        clipboard.on("success", function (e) {
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
    };

    return {
        init: init
    };
}();

Reveal.registerPlugin("copycode", CopyCode);
/* global Reveal */