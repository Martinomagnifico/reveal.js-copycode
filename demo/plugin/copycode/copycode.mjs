 /*****************************************************************
 *
 * reveal.js-copycode for Reveal.js 
 * Version 1.3.0
 * 
 * @link
 * https://github.com/martinomagnifico/reveal.js-copycode
 * 
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/martinomagnifico
 *
 * @license 
 * MIT
 * 
 * Copyright (C) 2025 Martijn De Jongh (Martino)
 *
 ******************************************************************/


const S = {
  button: "always",
  display: "text",
  text: {
    copy: "Copy",
    copied: "Copied!"
  },
  plaintextonly: !0,
  timeout: 1e3,
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
  tooltip: !0,
  iconsvg: {
    copy: "",
    // User can paste <svg>…</svg> code here
    copied: ""
    // User can paste <svg>…</svg> code here
  },
  cssautoload: !0,
  csspath: ""
};
function L(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var A, M;
function D() {
  if (M) return A;
  M = 1;
  var r = function(i) {
    return e(i) && !t(i);
  };
  function e(l) {
    return !!l && typeof l == "object";
  }
  function t(l) {
    var i = Object.prototype.toString.call(l);
    return i === "[object RegExp]" || i === "[object Date]" || c(l);
  }
  var o = typeof Symbol == "function" && Symbol.for, s = o ? Symbol.for("react.element") : 60103;
  function c(l) {
    return l.$$typeof === s;
  }
  function h(l) {
    return Array.isArray(l) ? [] : {};
  }
  function p(l, i) {
    return i.clone !== !1 && i.isMergeableObject(l) ? C(h(l), l, i) : l;
  }
  function f(l, i, n) {
    return l.concat(i).map(function(m) {
      return p(m, n);
    });
  }
  function d(l, i) {
    if (!i.customMerge)
      return C;
    var n = i.customMerge(l);
    return typeof n == "function" ? n : C;
  }
  function a(l) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(l).filter(function(i) {
      return Object.propertyIsEnumerable.call(l, i);
    }) : [];
  }
  function u(l) {
    return Object.keys(l).concat(a(l));
  }
  function g(l, i) {
    try {
      return i in l;
    } catch {
      return !1;
    }
  }
  function x(l, i) {
    return g(l, i) && !(Object.hasOwnProperty.call(l, i) && Object.propertyIsEnumerable.call(l, i));
  }
  function w(l, i, n) {
    var m = {};
    return n.isMergeableObject(l) && u(l).forEach(function(y) {
      m[y] = p(l[y], n);
    }), u(i).forEach(function(y) {
      x(l, y) || (g(l, y) && n.isMergeableObject(i[y]) ? m[y] = d(y, n)(l[y], i[y], n) : m[y] = p(i[y], n));
    }), m;
  }
  function C(l, i, n) {
    n = n || {}, n.arrayMerge = n.arrayMerge || f, n.isMergeableObject = n.isMergeableObject || r, n.cloneUnlessOtherwiseSpecified = p;
    var m = Array.isArray(i), y = Array.isArray(l), O = m === y;
    return O ? m ? n.arrayMerge(l, i, n) : w(l, i, n) : p(i, n);
  }
  C.all = function(i, n) {
    if (!Array.isArray(i))
      throw new Error("first argument should be an array");
    return i.reduce(function(m, y) {
      return C(m, y, n);
    }, {});
  };
  var $ = C;
  return A = $, A;
}
var I = D();
const q = /* @__PURE__ */ L(I);
var P = Object.defineProperty, H = (r, e, t) => e in r ? P(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, b = (r, e, t) => H(r, typeof e != "symbol" ? e + "" : e, t);
class N {
  /**
   * Create a new plugin instance
   * @param idOrOptions Plugin ID string or options object
   * @param init Optional initialization function
   * @param defaultConfig Optional default configuration
   */
  constructor(e, t, o) {
    b(this, "defaultConfig"), b(this, "pluginInit"), b(this, "pluginId"), b(this, "mergedConfig", null), b(this, "data", {}), typeof e == "string" ? (this.pluginId = e, this.pluginInit = t, this.defaultConfig = o || {}) : (this.pluginId = e.id, this.pluginInit = e.init, this.defaultConfig = e.defaultConfig || {});
  }
  /**
   * Initialize plugin configuration by merging default and user settings
   */
  initializeConfig(e) {
    const t = this.defaultConfig, o = e.getConfig()[this.pluginId] || {};
    this.mergedConfig = q(t, o, {
      arrayMerge: (s, c) => c,
      clone: !0
    });
  }
  /**
   * Get the current plugin configuration
   */
  getCurrentConfig() {
    if (!this.mergedConfig)
      throw new Error("Plugin configuration has not been initialized");
    return this.mergedConfig;
  }
  /**
   * Get plugin data if any exists
   */
  getData() {
    return Object.keys(this.data).length > 0 ? this.data : void 0;
  }
  /**
   * Initialize the plugin
   */
  init(e) {
    if (this.initializeConfig(e), this.pluginInit)
      return this.pluginInit(this, e, this.getCurrentConfig());
  }
  /**
   * Create the plugin interface containing all exports
   */
  createInterface(e = {}) {
    return {
      id: this.pluginId,
      init: (t) => this.init(t),
      getConfig: () => this.getCurrentConfig(),
      getData: () => this.getData(),
      ...e
    };
  }
}
const B = (r) => {
  const e = document.querySelector(
    `script[src$="${r}.js"], script[src$="${r}.min.js"], script[src$="${r}.mjs"]`
  );
  if (e != null && e.src) {
    const t = e.getAttribute("src") || "", o = t.lastIndexOf("/");
    if (o !== -1)
      return t.substring(0, o + 1);
  }
  try {
    if (typeof import.meta < "u" && import.meta.url)
      return import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);
  } catch {
  }
  return `plugin/${r}/`;
}, T = "data-css-id", R = (r, e) => new Promise((t, o) => {
  const s = document.createElement("link");
  s.rel = "stylesheet", s.href = e, s.setAttribute(T, r);
  const c = setTimeout(() => {
    s.parentNode && s.parentNode.removeChild(s), o(new Error(`[${r}] Timeout loading CSS from: ${e}`));
  }, 5e3);
  s.onload = () => {
    clearTimeout(c), t();
  }, s.onerror = () => {
    clearTimeout(c), s.parentNode && s.parentNode.removeChild(s), o(new Error(`[${r}] Failed to load CSS from: ${e}`));
  }, document.head.appendChild(s);
}), _ = (r) => document.querySelectorAll(`[${T}="${r}"]`).length > 0, U = async (r) => {
  const {
    id: e,
    cssautoload: t = !0,
    csspath: o = "",
    debug: s = !1
  } = r;
  if (t === !1 || o === !1) return;
  if (_(e)) {
    s && console.log(`[${e}] CSS already loaded, skipping`);
    return;
  }
  const c = [];
  typeof o == "string" && o.trim() !== "" && c.push(o);
  const h = B(e);
  if (h) {
    const f = `${h}${e}.css`;
    c.push(f);
  }
  const p = `plugin/${e}/${e}.css`;
  c.push(p);
  for (const f of c)
    try {
      await R(e, f);
      let d = "CSS";
      o && f === o ? d = "user-specified CSS" : h && f === `${h}${e}.css` ? d = "CSS (auto-detected from script location)" : d = "CSS (standard fallback)", s && console.log(`[${e}] ${d} loaded successfully from: ${f}`);
      return;
    } catch {
      s && console.log(`[${e}] Failed to load CSS from: ${f}`);
    }
  console.warn(`[${e}] Could not load CSS from any location`);
};
class z {
  constructor() {
    b(this, "debugMode", !1), b(this, "label", "DEBUG"), b(this, "groupDepth", 0), b(this, "group", (...e) => {
      this.debugLog("group", ...e), this.groupDepth++;
    }), b(this, "groupCollapsed", (...e) => {
      this.debugLog("groupCollapsed", ...e), this.groupDepth++;
    }), b(this, "groupEnd", () => {
      this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"));
    }), b(this, "error", (...e) => {
      const t = this.debugMode;
      this.debugMode = !0, this.formatAndLog(console.error, e), this.debugMode = t;
    }), b(this, "table", (e, t, o) => {
      if (this.debugMode)
        try {
          typeof e == "string" && t !== void 0 && typeof t != "string" ? (this.groupDepth === 0 ? console.log(`[${this.label}]: ${e}`) : console.log(e), o ? console.table(t, o) : console.table(t)) : (this.groupDepth === 0 && console.log(`[${this.label}]: Table data`), typeof t == "object" && Array.isArray(t) ? console.table(e, t) : console.table(e));
        } catch (s) {
          console.error(`[${this.label}]: Error showing table:`, s), console.log(`[${this.label}]: Raw data:`, e);
        }
    }), b(this, "formatAndLog", (e, t) => {
      if (this.debugMode)
        try {
          this.groupDepth > 0 ? e.call(console, ...t) : t.length > 0 && typeof t[0] == "string" ? e.call(console, `[${this.label}]: ${t[0]}`, ...t.slice(1)) : e.call(console, `[${this.label}]:`, ...t);
        } catch (o) {
          console.error(`[${this.label}]: Error in logging:`, o), console.log(`[${this.label}]: Original log data:`, ...t);
        }
    });
  }
  /**
   * Initializes the debug utility with custom settings.
   * 
   * @param isDebug - Whether debug output should be enabled
   * @param label - Custom label to prefix all debug messages with
   */
  initialize(e, t = "DEBUG") {
    this.debugMode = e, this.label = t;
  }
  /**
   * Core method that handles calling console methods with proper formatting.
   * - Adds label prefix to messages outside of groups
   * - Skips label prefix for messages inside groups to avoid redundancy
   * - Always adds label prefix to group headers
   * - Error messages are always shown regardless of debug mode
   * 
   * @param methodName - Name of the console method to call
   * @param args - Arguments to pass to the console method
   */
  debugLog(e, ...t) {
    const o = console[e];
    if (!this.debugMode && e !== "error" || typeof o != "function") return;
    const s = o;
    if (e === "group" || e === "groupCollapsed") {
      t.length > 0 && typeof t[0] == "string" ? s.call(console, `[${this.label}]: ${t[0]}`, ...t.slice(1)) : s.call(console, `[${this.label}]:`, ...t);
      return;
    }
    if (e === "groupEnd") {
      s.call(console);
      return;
    }
    if (e === "table") {
      t.length === 1 ? this.table(t[0]) : t.length === 2 ? typeof t[0] == "string" ? this.table(t[0], t[1]) : this.table(t[0], t[1]) : t.length >= 3 && this.table(
        t[0],
        t[1],
        t[2]
      );
      return;
    }
    this.groupDepth > 0 ? s.call(console, ...t) : t.length > 0 && typeof t[0] == "string" ? s.call(console, `[${this.label}]: ${t[0]}`, ...t.slice(1)) : s.call(console, `[${this.label}]:`, ...t);
  }
}
function F(r) {
  return new Proxy(r, {
    get: (e, t) => {
      if (t in e)
        return e[t];
      const o = t.toString();
      if (typeof console[o] == "function")
        return (...s) => {
          e.debugLog(o, ...s);
        };
    }
  });
}
const j = F(new z()), k = (r, e) => {
  const t = (o, s) => o === void 0 || o === "" && String(s) === "0" ? !1 : String(o) !== String(s);
  t(e.style.copybg, S.style.copybg) && r.style.setProperty("--cc-copy-bg", e.style.copybg), t(e.style.copiedbg, S.style.copiedbg) && r.style.setProperty("--cc-copied-bg", e.style.copiedbg), t(e.style.copycolor, S.style.copycolor) && r.style.setProperty("--cc-copy-color", e.style.copycolor), t(e.style.copiedcolor, S.style.copiedcolor) && r.style.setProperty("--cc-copied-color", e.style.copiedcolor), t(e.style.scale, S.style.scale) && r.style.setProperty("--cc-scale", String(e.style.scale)), t(e.style.offset, S.style.offset) && r.style.setProperty("--cc-offset", String(e.style.offset)), t(e.style.radius, S.style.radius) && r.style.setProperty("--cc-radius", String(e.style.radius)), t(e.style.copyborder, S.style.copyborder) && e.style.copyborder !== "" && r.style.setProperty("--cc-copyborder", e.style.copyborder), t(e.style.copiedborder, S.style.copiedborder) && e.style.copiedborder !== "" && r.style.setProperty("--cc-copiedborder", e.style.copiedborder);
}, v = {
  copy: '<svg aria-hidden="true" height="16" width="16" viewBox="0 0 16 16" version="1.1"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>',
  copied: '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"><path d="M15.7,2.8c0.4,0.4,0.4,1,0,1.4L6,13.9c-0.4,0.4-1,0.4-1.4,0L0.3,9.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l3.6,3.6l9-9C14.7,2.4,15.3,2.4,15.7,2.8z"/></svg>'
}, G = (r, e) => {
  var c, h, p;
  const t = (c = e.iconsvg) != null && c.copy && e.iconsvg.copy !== "" ? e.iconsvg.copy : v.copy, o = (h = e.iconsvg) != null && h.copied && e.iconsvg.copied !== "" ? e.iconsvg.copied : v.copied, s = r.dataset.ccDisplay || e.display;
  s === "icons" || s === "both" ? (r.innerHTML = "<span></span>", r.textholder = r.querySelector("span"), r.insertAdjacentHTML("afterbegin", o), r.insertAdjacentHTML("afterbegin", t), r.dataset.ccDisplay === "icons" && e.tooltip && (r.textholder.style.display = "flex")) : (r.innerHTML = "<span></span>", r.textholder = r.querySelector("span")), r.textholder && (r.textholder.textContent = r.dataset.ccCopy ? r.dataset.ccCopy : ((p = e.text) == null ? void 0 : p.copy) || "Copy");
}, Z = async (r, e) => {
  if (e.plaintextonly) {
    let t;
    const o = r.querySelector("table.hljs-ln");
    o ? t = Array.from(o.querySelectorAll("td.hljs-ln-code")).map((s) => s.textContent).join(`
`) : t = r.innerText.replace(/^\s+|\s+$/g, ""), await navigator.clipboard.writeText(t);
  } else
    try {
      const t = r.cloneNode(!0);
      let o;
      const s = t.querySelector("table.hljs-ln");
      if (s) {
        const a = s.querySelectorAll("td.hljs-ln-numbers");
        for (const u of a)
          u.style.display = "none";
        o = Array.from(s.querySelectorAll("td.hljs-ln-code")).map((u) => u.textContent).join(`
`);
      } else
        o = t.innerText;
      const h = `
				<style>
					${Array.from(document.styleSheets).flatMap((a) => {
        try {
          return Array.from(a.cssRules);
        } catch {
          return [];
        }
      }).filter((a) => a.cssText.includes(".hljs") || a.cssText.includes("pre code") || a.cssText.includes("code[class") || a.cssText.includes(".language-") || a.cssText.includes("pre") || a.cssText.includes("code")).map((a) => a.cssText).join(`
`)}
					pre, code, .hljs, .hljs-ln-code {
						white-space: pre !important;
						font-family: monospace !important;
					}
				</style>
				<div>
					${t.outerHTML}
				</div>
			`, p = new Blob([h], { type: "text/html" }), f = new Blob([o], { type: "text/plain" }), d = new ClipboardItem({
        "text/html": p,
        "text/plain": f
      });
      await navigator.clipboard.write([d]);
    } catch (t) {
      console.error("Rich text clipboard error:", t), await navigator.clipboard.writeText(r.innerText);
    }
}, K = (r) => {
  const e = document.querySelectorAll(".codeblock > button:not(.code-copy-button)");
  for (const t of e)
    t.addEventListener("click", async () => {
      console.log("Button clicked");
      const o = t, s = o.nextElementSibling;
      if (!s || !(s instanceof HTMLElement)) {
        console.error("Could not find pre element");
        return;
      }
      const c = s.querySelector("code");
      if (!c || !(c instanceof HTMLElement)) {
        console.error("Could not find code element");
        return;
      }
      try {
        console.log("Attempting to copy from:", c), await Z(c, r), console.log("doClipboard completed successfully"), Y(o, r);
      } catch (h) {
        console.error("Error copying code:", h);
      }
    });
}, Y = (r, e) => {
  r.textholder && (r.dataset.textOriginal = r.textholder.innerHTML, r.textholder.innerHTML = r.dataset.ccCopied || e.text.copied), r.setAttribute("disabled", "true"), setTimeout(() => {
    r.textholder && (r.dataset.ccDisplay !== "icons" || !r.dataset.ccDisplay) && (r.textholder.innerHTML = r.dataset.textOriginal || ""), delete r.dataset.textOriginal, r.removeAttribute("disabled");
  }, e.timeout);
}, J = async (r, e, t) => {
  var f;
  const o = e.getRevealElement(), s = 'pre:not([data-cc="false"]) > code', c = document.querySelector("[name=generator]"), h = ((f = c == null ? void 0 : c.getAttribute("content")) == null ? void 0 : f.includes("quarto")) ?? !1;
  let p = [];
  if (o && (k(o, t), p = Array.from(o.querySelectorAll(s)).map((d) => d.parentElement).filter((d) => d instanceof HTMLPreElement)), p.length > 0) {
    j.log(`${p.length} code blocks found`, p);
    for (const d of p) {
      let a = null, u = null;
      const g = d.parentElement;
      if (h && (g != null && g.matches(".sourceCode")) ? (a = g, u = a, g.dataset.did = "quartoblock") : (u = d, g != null && g.classList.contains("codeblock") || (a = document.createElement("div"), g == null || g.insertBefore(a, d))), a && u) {
        a.classList.add("codeblock"), a.appendChild(d), (t.display === "icon" || t.display === "icons" || t.display === "both") && u && (u.dataset.ccDisplay = t.display), d.classList.contains("fragment") && (a.classList.add("fragment"), d.classList.remove("fragment"));
        const x = document.createElement("button");
        x.dataset.cc = "true", x.title = "Copy to Clipboard", t.button !== "always" && (x.dataset.cc = t.button);
        const w = ["cc", "ccCopy", "ccCopied", "ccDisplay"];
        for (const $ of w)
          u.dataset[$] && (x.dataset[$] = u.dataset[$], delete u.dataset[$]);
        const C = d.querySelectorAll("code")[0];
        C != null && C.innerText && (G(x, t), a.insertBefore(x, d));
      }
    }
    K(t);
  }
}, E = "copycode", Q = async (r, e, t) => {
  if (j && t.debug && j.initialize(!0, E), t.cssautoload)
    try {
      await U({
        id: r.pluginId,
        cssautoload: t.cssautoload,
        csspath: t.csspath,
        debug: t.debug
      });
    } catch (o) {
      j.warn("CSS loading failed, but plugin will continue:", o);
    }
  await J(r, e, t);
}, V = () => new N(E, Q, S).createInterface();
export {
  V as default
};
