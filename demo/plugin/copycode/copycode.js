/*****************************************************************
 *
 * CopyCode for Reveal.js 
 * Version 1.1.4
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
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).CopyCode=t()}(this,(function(){"use strict";var e="undefined"!=typeof document?document.currentScript:null;const t=e=>e&&"object"==typeof e&&!Array.isArray(e),o=(e,...c)=>{if(!c.length)return e;const s=c.shift();if(t(e)&&t(s))for(const c in s)t(s[c])?(e[c]||Object.assign(e,{[c]:{}}),o(e[c],s[c])):Object.assign(e,{[c]:s[c]});return o(e,...c)},c=(e,t,o)=>{let c,s=document.querySelector("head");"script"===t?(c=document.createElement("script"),c.type="text/javascript",c.src=e):"stylesheet"===t&&(c=document.createElement("link"),c.rel="stylesheet",c.href=e);const a=()=>{"function"==typeof o&&(o.call(),o=null)};c.onload=a,c.onreadystatechange=function(){"loaded"===this.readyState&&a()},s.appendChild(c)},s=(e,t,o)=>{const c=document.querySelector("[name=generator]");t.quarto=!(!c||!c.content.includes("quarto"));let s=o.getRevealElement();s.style.setProperty("--cc-copy-bg",t.copybg||t.style.copybg),s.style.setProperty("--cc-copy-color",t.copycolor||t.style.copycolor),s.style.setProperty("--cc-copied-bg",t.copiedbg||t.style.copiedbg),s.style.setProperty("--cc-copied-color",t.copiedcolor||t.style.copiedcolor),s.style.setProperty("--cc-scale",t.scale||t.style.scale),s.style.setProperty("--cc-offset",t.offset||t.style.offset),s.style.setProperty("--cc-radius",t.radius||t.style.radius),s.style.setProperty("--cc-copyborder",t.copyborder||t.style.copyborder),s.style.setProperty("--cc-copiedborder",t.copiedborder||t.style.copiedborder),e.forEach((e=>((e,t)=>{let o=null,c=e;if(t.quarto&&e.parentNode.matches(".sourceCode")?(o=e.parentNode,c=o):e.parentNode.classList.contains("codeblock")||(o=document.createElement("div"),e.parentNode.insertBefore(o,e)),o.classList.add("codeblock"),c.dataset.cc&&"false"==c.dataset.cc)return;o.appendChild(e),"icons"!=t.display&&"both"!=t.display||(c.dataset.ccDisplay=t.display),e.classList.contains("fragment")&&(o.classList.add("fragment"),e.classList.remove("fragment"));let s=document.createElement("button");s.title="Copy to Clipboard",s.textholder=s,"always"!=t.button&&(s.dataset.cc=t.button),["cc","ccCopy","ccCopied","ccDisplay"].forEach((e=>{c.dataset[e]&&(s.dataset[e]=c.dataset[e],delete c.dataset[e])})),((e,t)=>{let o=[];o.copy='<svg aria-hidden="true" height="16" width="16" viewBox="0 0 16 16" version="1.1"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>',o.copied='<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"><path d="M15.7,2.8c0.4,0.4,0.4,1,0,1.4L6,13.9c-0.4,0.4-1,0.4-1.4,0L0.3,9.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l3.6,3.6l9-9C14.7,2.4,15.3,2.4,15.7,2.8z"/></svg>';let c=t.iconsvg&&""!=t.iconsvg.copy?t.iconsvg.copy:o.copy,s=t.iconsvg&&""!=t.iconsvg.copied?t.iconsvg.copied:o.copied;if(0!=e.dataset.cc&&"false"!=e.dataset.cc){let o=e.dataset.ccDisplay||t.display;"icons"!=o&&"both"!=o||(e.innerHTML="<span></span>",e.textholder=e.getElementsByTagName("SPAN")[0],e.insertAdjacentHTML("afterbegin",s),e.insertAdjacentHTML("afterbegin",c),e.dataset.ccDisplay&&"icons"==e.dataset.ccDisplay&&t.tooltip&&(e.textholder.style.display="flex")),e.textholder.textContent=e.dataset.ccCopy?e.dataset.ccCopy:t.copy||t.text.copy}})(s,t),o.insertBefore(s,e)})(e,t)))},a=e=>{let t=1==e.plaintextonly?new ClipboardJS(".codeblock > button",{text:function(e){return e.nextElementSibling.firstChild.innerText.replace(/^\s+|\s+$/g,"")}}):new ClipboardJS(".codeblock > button",{target:({nextElementSibling:e})=>e.firstChild});t.on("success",(t=>{let o=t.trigger;t.clearSelection(),o.dataset.textOriginal=o.textholder.innerHTML,o.textholder.innerHTML=o.dataset.ccCopied?o.dataset.ccCopied:e.copied||e.text.copied,o.setAttribute("disabled",!0),setTimeout((()=>{(o.dataset.ccDisplay&&"icons"!=o.dataset.ccDisplay||!o.dataset.ccDisplay)&&(o.textholder.innerHTML=o.getAttribute("data-text-original")),o.removeAttribute("data-text-original"),o.removeAttribute("disabled")}),e.timeout)})),t.on("error",(e=>{console.error("There was an error copying the code: ",e.action)}))};return()=>{let t={};const i=function(t,o,i){let r=(t=>{let o,c=document.querySelector(`script[src$="${t}"]`);return o=c?c.getAttribute("src").slice(0,-1*t.length):("undefined"==typeof document&&"undefined"==typeof location?require("url").pathToFileURL(__filename).href:"undefined"==typeof document?location.href:e&&e.src||new URL("copycode.js",document.baseURI).href).slice(0,("undefined"==typeof document&&"undefined"==typeof location?require("url").pathToFileURL(__filename).href:"undefined"==typeof document?location.href:e&&e.src||new URL("copycode.js",document.baseURI).href).lastIndexOf("/")+1),o})(i),n=i.replace(/\.[^/.]+$/,""),l=""!=o.clipboardjspath?o.clipboardjspath:"https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js",d=o.csspath?o.csspath:`${r}${n}.css`||`plugin/${n}/${n}.css`,p=t.getRevealElement().querySelectorAll("pre");"function"!=typeof ClipboardJS?c(l,"script",(()=>{"function"==typeof ClipboardJS?p.length>0&&c(d,"stylesheet",(()=>{s(p,o,t),a(o)})):console.log("Clipboard.js did not load")})):p.length>0&&c(d,"stylesheet",(()=>{s(p,o,t),a(o)}))};return{id:"copycode",init:function(e){t=o({button:"always",display:"text",text:{copy:"Copy",copied:"Copied!"},plaintextonly:!0,timeout:1e3,style:{copybg:"orange",copiedbg:"green",copycolor:"black",copiedcolor:"white",copyborder:"",copiedborder:"",scale:1,offset:0,radius:0},tooltip:!0,iconsvg:{copy:"",copied:""},csspath:"",clipboardjspath:""},e.getConfig().copycode||{}),i(e,t,"copycode.js")}}}}));
//# sourceMappingURL=copycode.js.map
