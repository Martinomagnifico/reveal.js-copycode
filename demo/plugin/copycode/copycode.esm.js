
/*****************************************************************
 *
 * CopyCode for Reveal.js 
 * Version 1.1.5
 * 
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/martinomagnifico
 *
 * @license 
 * MIT licensed
 * 
 * Copyright (C) 2023 Martijn De Jongh (Martino)
 *
 ******************************************************************/

/**
 * Check if a given string is valid JSON.
 * @param {string} str - The string to be checked.
 * @returns {boolean} `true` if the string is valid JSON, otherwise `false`.
 */

/**
 * Check if the given item is an object and not an array.
 * @param {*} item - The item to be checked.
 * @returns {boolean} `true` if the item is an object and not an array, otherwise `false`.
 */
const isObject = item => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Deep merge multiple objects into a target object.
 * @param {Object} target - Target object to merge values into.
 * @param {...Object} sources - Source objects to merge from.
 * @returns {Object} The merged object.
 */
const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {
          [key]: {}
        });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }
  return mergeDeep(target, ...sources);
};

/**
 * Dynamically loads a resource from the specified URL and calls a callback function when it's loaded.
 * Will not load the resource if it has already been loaded.
 *
 * @param {string} url - The URL of the resource to load.
 * @param {string} type - The type of resource to load.
 * @param {Function} callback - A callback function to be called when the resource is loaded.
 */

const loadResource = (url, type, callback) => {
  let head = document.querySelector('head');
  let resource;
  let alreadyExists = false;
  if (type === 'script') {
    if (!document.querySelector(`script[src="${url}"]`)) {
      resource = document.createElement('script');
      resource.type = 'text/javascript';
      resource.src = url;
    } else {
      alreadyExists = true;
    }
  } else if (type === 'stylesheet') {
    if (!document.querySelector(`link[href="${url}"]`)) {
      resource = document.createElement('link');
      resource.rel = 'stylesheet';
      resource.href = url;
    } else {
      alreadyExists = true;
    }
  }
  if (!alreadyExists) {
    const finish = () => {
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
};

/**
 * Retrieves the path of a JavaScript file based on its filename.
 *
 * @param {string} fileName - The filename of the script.
 * @returns {string} The path to the plugin's location.
 */
const pluginPath = fileName => {
  let path;
  let pluginScript = document.querySelector(`script[src$="${fileName}"]`);
  if (pluginScript) {
    path = pluginScript.getAttribute("src").slice(0, -1 * fileName.length);
  } else {
    path = import.meta.url.slice(0, import.meta.url.lastIndexOf('/') + 1);
  }
  return path;
};

const styleButton = (button, options) => {
  let originalIconsvg = [];
  originalIconsvg.copy = '<svg aria-hidden="true" height="16" width="16" viewBox="0 0 16 16" version="1.1"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>';
  originalIconsvg.copied = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"><path d="M15.7,2.8c0.4,0.4,0.4,1,0,1.4L6,13.9c-0.4,0.4-1,0.4-1.4,0L0.3,9.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l3.6,3.6l9-9C14.7,2.4,15.3,2.4,15.7,2.8z"/></svg>';
  let copysvg = options.iconsvg && options.iconsvg.copy != "" ? options.iconsvg.copy : originalIconsvg.copy;
  let copiedsvg = options.iconsvg && options.iconsvg.copied != "" ? options.iconsvg.copied : originalIconsvg.copied;

  // If the button needs to be shown at all
  if (button.dataset.cc != false && button.dataset.cc != "false") {
    // If icons are needed
    let theDisplay = button.dataset.ccDisplay || options.display;
    if (theDisplay == "icons" || theDisplay == "both") {
      button.innerHTML = `<span></span>`;
      button.textholder = button.getElementsByTagName("SPAN")[0];
      button.insertAdjacentHTML("afterbegin", copiedsvg);
      button.insertAdjacentHTML("afterbegin", copysvg);

      // If tooltip is wanted or not (global setting only)
      if (button.dataset.ccDisplay && button.dataset.ccDisplay == "icons" && options.tooltip) {
        button.textholder.style.display = "flex";
      }
    }

    // If custom text, else the global text
    button.textholder.textContent = button.dataset.ccCopy ? button.dataset.ccCopy : options.copy || options.text.copy;
  }
};

const buildStructure = (preblock, options) => {
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
    return;
  }

  // Put the pre inside the wrapper
  codeblock.appendChild(preblock);
  if (options.display == "icons" || options.display == "both") {
    dataHolder.dataset.ccDisplay = options.display;
  }
  if (preblock.classList.contains("fragment")) {
    codeblock.classList.add("fragment");
    preblock.classList.remove("fragment");
  }
  let button = document.createElement("button");
  button.title = "Copy to Clipboard";
  button.textholder = button;
  if (options.button != "always") {
    button.dataset["cc"] = options.button;
  }
  let possibleAttributes = ["cc", "ccCopy", "ccCopied", "ccDisplay"];
  possibleAttributes.forEach(attribute => {
    if (dataHolder.dataset[attribute]) {
      button.dataset[attribute] = dataHolder.dataset[attribute];
      delete dataHolder.dataset[attribute];
    }
  });
  let code = preblock.querySelectorAll('code')[0];
  if (code && code.innerText) {
    // Style the button
    styleButton(button, options);
    // Insert the button
    codeblock.insertBefore(button, preblock);
  }
};

const getPreBlocks = (preblocks, options, deck) => {
  const generator = document.querySelector('[name=generator]');
  options.quarto = generator && generator.content.includes("quarto") ? true : false;
  let revealEl = deck.getRevealElement();
  revealEl.style.setProperty('--cc-copy-bg', options.copybg || options.style.copybg);
  revealEl.style.setProperty('--cc-copy-color', options.copycolor || options.style.copycolor);
  revealEl.style.setProperty('--cc-copied-bg', options.copiedbg || options.style.copiedbg);
  revealEl.style.setProperty('--cc-copied-color', options.copiedcolor || options.style.copiedcolor);
  revealEl.style.setProperty('--cc-scale', options.scale || options.style.scale);
  revealEl.style.setProperty('--cc-offset', options.offset || options.style.offset);
  revealEl.style.setProperty('--cc-radius', options.radius || options.style.radius);
  revealEl.style.setProperty('--cc-copyborder', options.copyborder || options.style.copyborder);
  revealEl.style.setProperty('--cc-copiedborder', options.copiedborder || options.style.copiedborder);
  preblocks.forEach(preblock => buildStructure(preblock, options));
};

const doClipboard = options => {
  let clipboard = options.plaintextonly == true ? new ClipboardJS(".codeblock > button", {
    text: function (trigger) {
      let code = trigger.nextElementSibling.querySelectorAll('code')[0];
      return code.innerText.replace(/^\s+|\s+$/g, "");
    }
  }) : new ClipboardJS(".codeblock > button", {
    target({
      nextElementSibling
    }) {
      return nextElementSibling.nextElementSibling.querySelectorAll('code')[0];
    }
  });
  clipboard.on("success", e => {
    let button = e.trigger;
    e.clearSelection();
    button.dataset["textOriginal"] = button.textholder.innerHTML;
    button.textholder.innerHTML = button.dataset["ccCopied"] ? button.dataset["ccCopied"] : options.copied || options.text.copied;
    button.setAttribute("disabled", true);
    setTimeout(() => {
      if (button.dataset.ccDisplay && button.dataset.ccDisplay != "icons" || !button.dataset.ccDisplay) {
        button.textholder.innerHTML = button.getAttribute("data-text-original");
      }
      button.removeAttribute("data-text-original");
      button.removeAttribute("disabled");
    }, options.timeout);
  });
  clipboard.on('error', e => {
    console.error('There was an error copying the code: ', e.action);
  });
};

const Plugin = () => {
  let options = {};

  /**
  * The main function of the plugin
  * @param {object} deck - The deck object
  * @param {object} options - The options object
  * @param {string} es5Filename - The name of the file that will be used
  */
  const CopyCodeStart = function (deck, options, es5Filename) {
    let thePath = pluginPath(es5Filename);
    let pluginBaseName = es5Filename.replace(/\.[^/.]+$/, "");
    let ClipboardJSPath = options.clipboardjspath != "" ? options.clipboardjspath : "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js";
    let CopyCodeStylePath = options.csspath ? options.csspath : `${thePath}${pluginBaseName}.css` || `plugin/${pluginBaseName}/${pluginBaseName}.css`;
    let preblocks = [];
    let codes = Array.from(deck.getRevealElement().querySelectorAll("code"));
    codes.forEach(code => {
      if (code.parentNode.tagName === "PRE") {
        preblocks.push(code.parentNode);
      }
    });
    if (typeof ClipboardJS != "function") {
      loadResource(ClipboardJSPath, 'script', () => {
        if (typeof ClipboardJS === "function") {
          if (preblocks.length > 0) {
            loadResource(CopyCodeStylePath, 'stylesheet', () => {
              getPreBlocks(preblocks, options, deck);
              doClipboard(options);
            });
          }
        } else {
          console.log("Clipboard.js did not load");
        }
      });
    } else {
      if (preblocks.length > 0) {
        loadResource(CopyCodeStylePath, 'stylesheet', () => {
          getPreBlocks(preblocks, options, deck);
          doClipboard(options);
        });
      }
    }
  };

  /**
  * Initialize the plugin
  * @param {object} deck - The deck object
  */
  const init = function (deck) {
    let defaultOptions = {
      button: "always",
      display: "text",
      text: {
        copy: "Copy",
        copied: "Copied!"
      },
      plaintextonly: true,
      timeout: 1000,
      style: {
        copybg: "orange",
        copiedbg: "green",
        copycolor: "black",
        copiedcolor: "white",
        copyborder: "",
        copiedborder: "",
        scale: 1,
        offset: 0,
        radius: 0
      },
      tooltip: true,
      iconsvg: {
        copy: '',
        // User can paste <svg>…</svg> code here
        copied: '' // User can paste <svg>…</svg> code here
      },

      csspath: "",
      clipboardjspath: ""
    };
    options = mergeDeep(defaultOptions, deck.getConfig().copycode || {});
    CopyCodeStart(deck, options, "copycode.js");
  };
  return {
    id: 'copycode',
    init: init
  };
};

export { Plugin as default };
//# sourceMappingURL=copycode.esm.js.map
