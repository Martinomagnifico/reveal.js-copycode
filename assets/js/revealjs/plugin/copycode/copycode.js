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
const CopyCode=window.CopyCode||function(){
/**
	 * Array.prototype.forEach() polyfill
	 * @author Chris Ferdinandi
	 * @license MIT
	*/
Array.prototype.forEach||(Array.prototype.forEach=function(t,e){e=e||window;for(var o=0;o<this.length;o++)t.call(e,this[o],o,this)});let t=Reveal.getConfig().copycode||{},e={timeout:1e3,copy:"Copy",copied:"Copied!",copybg:"orange",copiedbg:"green",copycolor:"black",copiedcolor:"white"};return{init:function(){!function(t,e){for(let o in e)t.hasOwnProperty(o)||(t[o]=e[o])}(t,e);let o=`.codeblock > button { background:${t.copybg}; color:${t.copycolor}; } .codeblock > button[disabled] { background:${t.copiedbg}; color:${t.copiedcolor};}`;document.querySelectorAll("pre").forEach((function(e){e.getAttribute("data-cc")&&"false"===e.getAttribute("data-cc")||e.parentNode.classList.contains("codeblock")||function(e){let o="",c="",i=document.createElement("div");i.classList.add("codeblock"),e.parentNode.insertBefore(i,e),i.appendChild(e);let n=document.createElement("button");e.getAttribute("data-cc-copy")&&(o=e.getAttribute("data-cc-copy"),e.removeAttribute("data-cc-copy")),e.getAttribute("data-cc-copied")&&(c=e.getAttribute("data-cc-copied"),e.removeAttribute("data-cc-copied")),n.textContent=o||t.copy,n.setAttribute("data-cc-copied",c||t.copied),i.insertBefore(n,e)}(e)}));let c=new ClipboardJS(".codeblock > button",{target:function(t){return t.nextElementSibling}});!function(t){let e=document.createElement("style");e.type="text/css",e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t)),document.getElementsByTagName("head")[0].appendChild(e)}(o),c.on("success",(function(e){let o=e.trigger;e.clearSelection(),o.setAttribute("data-text-original",o.innerHTML),o.innerHTML=o.getAttribute("data-cc-copied"),o.setAttribute("disabled",!0),setTimeout((function(){o.innerHTML=o.getAttribute("data-text-original"),o.removeAttribute("disabled")}),t.timeout)}))}}}();Reveal.registerPlugin("copycode",CopyCode);