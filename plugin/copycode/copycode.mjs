 /*****************************************************************
 *
 * reveal.js-copycode for Reveal.js 
 * Version 1.3.1
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
var x, A;
function P() {
  if (A) return x;
  A = 1;
  var r = function(l) {
    return e(l) && !t(l);
  };
  function e(n) {
    return !!n && typeof n == "object";
  }
  function t(n) {
    var l = Object.prototype.toString.call(n);
    return l === "[object RegExp]" || l === "[object Date]" || i(n);
  }
  var o = typeof Symbol == "function" && Symbol.for, s = o ? Symbol.for("react.element") : 60103;
  function i(n) {
    return n.$$typeof === s;
  }
  function p(n) {
    return Array.isArray(n) ? [] : {};
  }
  function d(n, l) {
    return l.clone !== !1 && l.isMergeableObject(n) ? C(p(n), n, l) : n;
  }
  function y(n, l, c) {
    return n.concat(l).map(function(b) {
      return d(b, c);
    });
  }
  function u(n, l) {
    if (!l.customMerge)
      return C;
    var c = l.customMerge(n);
    return typeof c == "function" ? c : C;
  }
  function a(n) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(n).filter(function(l) {
      return Object.propertyIsEnumerable.call(n, l);
    }) : [];
  }
  function f(n) {
    return Object.keys(n).concat(a(n));
  }
  function m(n, l) {
    try {
      return l in n;
    } catch {
      return !1;
    }
  }
  function v(n, l) {
    return m(n, l) && !(Object.hasOwnProperty.call(n, l) && Object.propertyIsEnumerable.call(n, l));
  }
  function $(n, l, c) {
    var b = {};
    return c.isMergeableObject(n) && f(n).forEach(function(h) {
      b[h] = d(n[h], c);
    }), f(l).forEach(function(h) {
      v(n, h) || (m(n, h) && c.isMergeableObject(l[h]) ? b[h] = u(h, c)(n[h], l[h], c) : b[h] = d(l[h], c));
    }), b;
  }
  function C(n, l, c) {
    c = c || {}, c.arrayMerge = c.arrayMerge || y, c.isMergeableObject = c.isMergeableObject || r, c.cloneUnlessOtherwiseSpecified = d;
    var b = Array.isArray(l), h = Array.isArray(n), I = b === h;
    return I ? b ? c.arrayMerge(n, l, c) : $(n, l, c) : d(l, c);
  }
  C.all = function(l, c) {
    if (!Array.isArray(l))
      throw new Error("first argument should be an array");
    return l.reduce(function(b, h) {
      return C(b, h, c);
    }, {});
  };
  var w = C;
  return x = w, x;
}
var q = P();
const H = /* @__PURE__ */ L(q);
var B = Object.defineProperty, N = (r, e, t) => e in r ? B(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, g = (r, e, t) => N(r, typeof e != "symbol" ? e + "" : e, t);
const R = () => {
  const r = typeof window < "u", e = typeof document < "u", t = r && typeof location < "u" && /localhost|127\.0\.0\.1/.test(location.hostname);
  let o = !1;
  try {
    o = new Function('return typeof module !== "undefined" && !!module.hot')();
  } catch {
  }
  let s = !1;
  try {
    s = new Function('return typeof import.meta !== "undefined" && typeof import.meta.env !== "undefined" && import.meta.env.DEV === true')();
  } catch {
  }
  const i = r && typeof navigator < "u" && /vite|localhost|127\.0\.0\.1/.test(location.origin) && /AppleWebKit|Chrome|Vite/.test(navigator.userAgent), p = e && !!document.querySelector('script[type="module"]');
  let d = !1;
  try {
    d = new Function('return typeof process !== "undefined" && process.env && (process.env.ROLLUP_WATCH === "true" || process.env.NODE_ENV === "development")')();
  } catch {
  }
  let y = !1;
  try {
    y = new Function('return typeof define === "function" && !!define.amd')();
  } catch {
  }
  return {
    isDevServer: t,
    isWebpackHMR: o,
    isVite: s,
    isVitePreview: i,
    hasModuleScripts: p,
    isModuleBundler: d,
    isAMD: y,
    isBundlerEnvironment: o || s || i || p || d || y || t
  };
};
class _ {
  // Create a new plugin instance
  constructor(e, t, o) {
    g(this, "defaultConfig"), g(this, "pluginInit"), g(this, "pluginId"), g(this, "mergedConfig", null), g(this, "userConfigData", null), g(this, "data", {}), g(this, "getEnvironmentInfo", () => R()), typeof e == "string" ? (this.pluginId = e, this.pluginInit = t, this.defaultConfig = o || {}) : (this.pluginId = e.id, this.pluginInit = e.init, this.defaultConfig = e.defaultConfig || {});
  }
  // Initialize plugin configuration by merging default and user settings
  initializeConfig(e) {
    const t = this.defaultConfig, o = e.getConfig()[this.pluginId] || {};
    this.userConfigData = o, this.mergedConfig = H(t, o, {
      arrayMerge: (s, i) => i,
      clone: !0
    });
  }
  // Get the current plugin configuration
  getCurrentConfig() {
    if (!this.mergedConfig)
      throw new Error("Plugin configuration has not been initialized");
    return this.mergedConfig;
  }
  // Get plugin data if any exists
  getData() {
    return Object.keys(this.data).length > 0 ? this.data : void 0;
  }
  get userConfig() {
    return this.userConfigData || {};
  }
  // Initialize the plugin
  init(e) {
    if (this.initializeConfig(e), this.pluginInit)
      return this.pluginInit(this, e, this.getCurrentConfig());
  }
  // Create the plugin interface containing all exports
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
const F = (r) => {
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
}, T = "data-css-id", U = (r, e) => new Promise((t, o) => {
  const s = document.createElement("link");
  s.rel = "stylesheet", s.href = e, s.setAttribute(T, r);
  const i = setTimeout(() => {
    s.parentNode && s.parentNode.removeChild(s), o(new Error(`[${r}] Timeout loading CSS from: ${e}`));
  }, 5e3);
  s.onload = () => {
    clearTimeout(i), t();
  }, s.onerror = () => {
    clearTimeout(i), s.parentNode && s.parentNode.removeChild(s), o(new Error(`[${r}] Failed to load CSS from: ${e}`));
  }, document.head.appendChild(s);
}), O = (r) => document.querySelectorAll(`[${T}="${r}"]`).length > 0, z = (r) => new Promise((e) => {
  if (t())
    return e(!0);
  setTimeout(() => {
    e(t());
  }, 50);
  function t() {
    if (O(r)) return !0;
    try {
      return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${r}`).trim() !== "";
    } catch {
      return !1;
    }
  }
}), M = async (r) => {
  const {
    id: e,
    cssautoload: t = !0,
    csspath: o = "",
    debug: s = !1
  } = r;
  if (t === !1 || o === !1) return;
  if (O(e)) {
    s && console.log(`[${e}] CSS already loaded, skipping`);
    return;
  }
  const i = [];
  typeof o == "string" && o.trim() !== "" && i.push(o);
  const p = F(e);
  if (p) {
    const y = `${p}${e}.css`;
    i.push(y);
  }
  const d = `plugin/${e}/${e}.css`;
  i.push(d);
  for (const y of i)
    try {
      await U(e, y);
      let u = "CSS";
      o && y === o ? u = "user-specified CSS" : p && y === `${p}${e}.css` ? u = "CSS (auto-detected from script location)" : u = "CSS (standard fallback)", s && console.log(`[${e}] ${u} loaded successfully from: ${y}`);
      return;
    } catch {
      s && console.log(`[${e}] Failed to load CSS from: ${y}`);
    }
  console.warn(`[${e}] Could not load CSS from any location`);
};
async function V(r, e) {
  if ("getEnvironmentInfo" in r && e) {
    const t = r, o = t.getEnvironmentInfo();
    if (await z(t.pluginId)) {
      e.debug && console.log(`[${t.pluginId}] CSS already imported, skipping`);
      return;
    }
    if ("cssautoload" in t.userConfig ? e.cssautoload : !o.isBundlerEnvironment)
      return M({
        id: t.pluginId,
        cssautoload: !0,
        csspath: e.csspath,
        debug: e.debug
      });
    o.isBundlerEnvironment && console.warn(`[${t.pluginId}] CSS autoloading is disabled in bundler environments. Please import the CSS manually, using import.`);
    return;
  }
  return M(r);
}
class k {
  constructor() {
    g(this, "debugMode", !1), g(this, "label", "DEBUG"), g(this, "groupDepth", 0), g(this, "group", (...e) => {
      this.debugLog("group", ...e), this.groupDepth++;
    }), g(this, "groupCollapsed", (...e) => {
      this.debugLog("groupCollapsed", ...e), this.groupDepth++;
    }), g(this, "groupEnd", () => {
      this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"));
    }), g(this, "error", (...e) => {
      const t = this.debugMode;
      this.debugMode = !0, this.formatAndLog(console.error, e), this.debugMode = t;
    }), g(this, "table", (e, t, o) => {
      if (this.debugMode)
        try {
          typeof e == "string" && t !== void 0 && typeof t != "string" ? (this.groupDepth === 0 ? console.log(`[${this.label}]: ${e}`) : console.log(e), o ? console.table(t, o) : console.table(t)) : (this.groupDepth === 0 && console.log(`[${this.label}]: Table data`), typeof t == "object" && Array.isArray(t) ? console.table(e, t) : console.table(e));
        } catch (s) {
          console.error(`[${this.label}]: Error showing table:`, s), console.log(`[${this.label}]: Raw data:`, e);
        }
    }), g(this, "formatAndLog", (e, t) => {
      if (this.debugMode)
        try {
          this.groupDepth > 0 ? e.call(console, ...t) : t.length > 0 && typeof t[0] == "string" ? e.call(console, `[${this.label}]: ${t[0]}`, ...t.slice(1)) : e.call(console, `[${this.label}]:`, ...t);
        } catch (o) {
          console.error(`[${this.label}]: Error in logging:`, o), console.log(`[${this.label}]: Original log data:`, ...t);
        }
    });
  }
  // Initializes the debug utility with custom settings.
  initialize(e, t = "DEBUG") {
    this.debugMode = e, this.label = t;
  }
  // Core method that handles calling console methods with proper formatting.
  // - Adds label prefix to messages outside of groups
  // - Skips label prefix for messages inside groups to avoid redundancy
  // - Always adds label prefix to group headers
  // - Error messages are always shown regardless of debug mode
  // @param methodName - Name of the console method to call
  // @param args - Arguments to pass to the console method
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
const G = (r) => new Proxy(r, {
  get: (e, t) => {
    if (t in e)
      return e[t];
    const o = t.toString();
    if (typeof console[o] == "function")
      return (...s) => {
        e.debugLog(o, ...s);
      };
  }
}), j = G(new k()), W = (r, e) => {
  const t = (o, s) => o === void 0 || o === "" && String(s) === "0" ? !1 : String(o) !== String(s);
  t(e.style.copybg, S.style.copybg) && r.style.setProperty("--cc-copy-bg", e.style.copybg), t(e.style.copiedbg, S.style.copiedbg) && r.style.setProperty("--cc-copied-bg", e.style.copiedbg), t(e.style.copycolor, S.style.copycolor) && r.style.setProperty("--cc-copy-color", e.style.copycolor), t(e.style.copiedcolor, S.style.copiedcolor) && r.style.setProperty("--cc-copied-color", e.style.copiedcolor), t(e.style.scale, S.style.scale) && r.style.setProperty("--cc-scale", String(e.style.scale)), t(e.style.offset, S.style.offset) && r.style.setProperty("--cc-offset", String(e.style.offset)), t(e.style.radius, S.style.radius) && r.style.setProperty("--cc-radius", String(e.style.radius)), t(e.style.copyborder, S.style.copyborder) && e.style.copyborder !== "" && r.style.setProperty("--cc-copyborder", e.style.copyborder), t(e.style.copiedborder, S.style.copiedborder) && e.style.copiedborder !== "" && r.style.setProperty("--cc-copiedborder", e.style.copiedborder);
}, E = {
  copy: '<svg aria-hidden="true" height="16" width="16" viewBox="0 0 16 16" version="1.1"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>',
  copied: '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"><path d="M15.7,2.8c0.4,0.4,0.4,1,0,1.4L6,13.9c-0.4,0.4-1,0.4-1.4,0L0.3,9.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l3.6,3.6l9-9C14.7,2.4,15.3,2.4,15.7,2.8z"/></svg>'
}, Z = (r, e) => {
  var i, p, d;
  const t = (i = e.iconsvg) != null && i.copy && e.iconsvg.copy !== "" ? e.iconsvg.copy : E.copy, o = (p = e.iconsvg) != null && p.copied && e.iconsvg.copied !== "" ? e.iconsvg.copied : E.copied, s = r.dataset.ccDisplay || e.display;
  s === "icons" || s === "both" ? (r.innerHTML = "<span></span>", r.textholder = r.querySelector("span"), r.insertAdjacentHTML("afterbegin", o), r.insertAdjacentHTML("afterbegin", t), r.dataset.ccDisplay === "icons" && e.tooltip && (r.textholder.style.display = "flex")) : (r.innerHTML = "<span></span>", r.textholder = r.querySelector("span")), r.textholder && (r.textholder.textContent = r.dataset.ccCopy ? r.dataset.ccCopy : ((d = e.text) == null ? void 0 : d.copy) || "Copy");
}, K = async (r, e) => {
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
        for (const f of a)
          f.style.display = "none";
        o = Array.from(s.querySelectorAll("td.hljs-ln-code")).map((f) => f.textContent).join(`
`);
      } else
        o = t.innerText;
      const p = `
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
			`, d = new Blob([p], { type: "text/html" }), y = new Blob([o], { type: "text/plain" }), u = new ClipboardItem({
        "text/html": d,
        "text/plain": y
      });
      await navigator.clipboard.write([u]);
    } catch (t) {
      console.error("Rich text clipboard error:", t), await navigator.clipboard.writeText(r.innerText);
    }
}, Y = (r) => {
  const e = document.querySelectorAll(".codeblock > button:not(.code-copy-button)");
  for (const t of e)
    t.addEventListener("click", async () => {
      console.log("Button clicked");
      const o = t, s = o.nextElementSibling;
      if (!s || !(s instanceof HTMLElement)) {
        console.error("Could not find pre element");
        return;
      }
      const i = s.querySelector("code");
      if (!i || !(i instanceof HTMLElement)) {
        console.error("Could not find code element");
        return;
      }
      try {
        console.log("Attempting to copy from:", i), await K(i, r), console.log("doClipboard completed successfully"), J(o, r);
      } catch (p) {
        console.error("Error copying code:", p);
      }
    });
}, J = (r, e) => {
  r.textholder && (r.dataset.textOriginal = r.textholder.innerHTML, r.textholder.innerHTML = r.dataset.ccCopied || e.text.copied), r.setAttribute("disabled", "true"), setTimeout(() => {
    r.textholder && (r.dataset.ccDisplay !== "icons" || !r.dataset.ccDisplay) && (r.textholder.innerHTML = r.dataset.textOriginal || ""), delete r.dataset.textOriginal, r.removeAttribute("disabled");
  }, e.timeout);
}, Q = async (r, e, t) => {
  var y;
  const o = e.getRevealElement(), s = 'pre:not([data-cc="false"]) > code', i = document.querySelector("[name=generator]"), p = ((y = i == null ? void 0 : i.getAttribute("content")) == null ? void 0 : y.includes("quarto")) ?? !1;
  let d = [];
  if (o && (W(o, t), d = Array.from(o.querySelectorAll(s)).map((u) => u.parentElement).filter((u) => u instanceof HTMLPreElement)), d.length > 0) {
    j.log(`${d.length} code blocks found`, d);
    for (const u of d) {
      let a = null, f = null;
      const m = u.parentElement;
      if (p && (m != null && m.matches(".sourceCode")) ? (a = m, f = a, m.dataset.did = "quartoblock") : (f = u, m != null && m.classList.contains("codeblock") || (a = document.createElement("div"), m == null || m.insertBefore(a, u))), a && f) {
        a.classList.add("codeblock"), a.appendChild(u), (t.display === "icon" || t.display === "icons" || t.display === "both") && f && (f.dataset.ccDisplay = t.display), u.classList.contains("fragment") && (a.classList.add("fragment"), u.classList.remove("fragment"));
        const v = document.createElement("button");
        v.dataset.cc = "true", v.title = "Copy to Clipboard", t.button !== "always" && (v.dataset.cc = t.button);
        const $ = ["cc", "ccCopy", "ccCopied", "ccDisplay"];
        for (const w of $)
          f.dataset[w] && (v.dataset[w] = f.dataset[w], delete f.dataset[w]);
        const C = u.querySelectorAll("code")[0];
        C != null && C.innerText && (Z(v, t), a.insertBefore(v, u));
      }
    }
    Y(t);
  }
}, D = "copycode", X = async (r, e, t) => {
  j && t.debug && j.initialize(!0, D), await V(r, t), await Q(r, e, t);
}, ee = () => new _(D, X, S).createInterface();
export {
  ee as default
};
