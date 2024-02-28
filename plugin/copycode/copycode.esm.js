/*****************************************************************
 *
 * CopyCode for Reveal.js 
 * Version 1.1.8
 * 
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/martinomagnifico
 *
 * @license 
 * MIT licensed
 * 
 * Copyright (C) 2024 Martijn De Jongh (Martino)
 *
 ******************************************************************/
const e=e=>e&&"object"==typeof e&&!Array.isArray(e),t=(o,...c)=>{if(!c.length)return o;const a=c.shift();if(e(o)&&e(a))for(const c in a)e(a[c])?(o[c]||Object.assign(o,{[c]:{}}),t(o[c],a[c])):Object.assign(o,{[c]:a[c]});return t(o,...c)},o=(e,t,o)=>{let c,a=document.querySelector("head"),r=!1;if("script"===t?document.querySelector(`script[src="${e}"]`)?r=!0:(c=document.createElement("script"),c.type="text/javascript",c.src=e):"stylesheet"===t&&(document.querySelector(`link[href="${e}"]`)?r=!0:(c=document.createElement("link"),c.rel="stylesheet",c.href=e)),!r){const e=()=>{"function"==typeof o&&(o.call(),o=null)};c.onload=e,c.onreadystatechange=function(){"loaded"===this.readyState&&e()},a.appendChild(c)}},c=(e,t,o)=>{let c=o.getRevealElement();c.style.setProperty("--cc-copy-bg",t.copybg||t.style.copybg),c.style.setProperty("--cc-copy-color",t.copycolor||t.style.copycolor),c.style.setProperty("--cc-copied-bg",t.copiedbg||t.style.copiedbg),c.style.setProperty("--cc-copied-color",t.copiedcolor||t.style.copiedcolor),c.style.setProperty("--cc-scale",t.scale||t.style.scale),c.style.setProperty("--cc-offset",t.offset||t.style.offset),c.style.setProperty("--cc-radius",t.radius||t.style.radius),c.style.setProperty("--cc-copyborder",t.copyborder||t.style.copyborder),c.style.setProperty("--cc-copiedborder",t.copiedborder||t.style.copiedborder),e.forEach((e=>((e,t)=>{let o=null,c=e;if(t.quarto&&e.parentNode.matches(".sourceCode")?(o=e.parentNode,c=o):e.parentNode.classList.contains("codeblock")||(o=document.createElement("div"),e.parentNode.insertBefore(o,e)),(!c.dataset.cc||"false"!=c.dataset.cc)&&o){o.classList.add("codeblock"),o.appendChild(e),"icons"!=t.display&&"both"!=t.display||(c.dataset.ccDisplay=t.display),e.classList.contains("fragment")&&(o.classList.add("fragment"),e.classList.remove("fragment"));let a=document.createElement("button");a.title="Copy to Clipboard",a.textholder=a,"always"!=t.button&&(a.dataset.cc=t.button),["cc","ccCopy","ccCopied","ccDisplay"].forEach((e=>{c.dataset[e]&&(a.dataset[e]=c.dataset[e],delete c.dataset[e])}));let r=e.querySelectorAll("code")[0];r&&r.innerText&&(((e,t)=>{let o=[];o.copy='<svg aria-hidden="true" height="16" width="16" viewBox="0 0 16 16" version="1.1"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>',o.copied='<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"><path d="M15.7,2.8c0.4,0.4,0.4,1,0,1.4L6,13.9c-0.4,0.4-1,0.4-1.4,0L0.3,9.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l3.6,3.6l9-9C14.7,2.4,15.3,2.4,15.7,2.8z"/></svg>';let c=t.iconsvg&&""!=t.iconsvg.copy?t.iconsvg.copy:o.copy,a=t.iconsvg&&""!=t.iconsvg.copied?t.iconsvg.copied:o.copied;if(0!=e.dataset.cc&&"false"!=e.dataset.cc){let o=e.dataset.ccDisplay||t.display;"icons"!=o&&"both"!=o||(e.innerHTML="<span></span>",e.textholder=e.getElementsByTagName("SPAN")[0],e.insertAdjacentHTML("afterbegin",a),e.insertAdjacentHTML("afterbegin",c),e.dataset.ccDisplay&&"icons"==e.dataset.ccDisplay&&t.tooltip&&(e.textholder.style.display="flex")),e.textholder.textContent=e.dataset.ccCopy?e.dataset.ccCopy:t.copy||t.text.copy}})(a,t),o.insertBefore(a,e))}})(e,t)))},a=e=>{let t=1==e.plaintextonly?new ClipboardJS(".codeblock > button",{text:function(e){return e.nextElementSibling.querySelectorAll("code")[0].innerText.replace(/^\s+|\s+$/g,"")}}):new ClipboardJS(".codeblock > button",{target:({nextElementSibling:e})=>e.nextElementSibling.querySelectorAll("code")[0]});t.on("success",(t=>{let o=t.trigger;t.clearSelection(),o.dataset.textOriginal=o.textholder.innerHTML,o.textholder.innerHTML=o.dataset.ccCopied?o.dataset.ccCopied:e.copied||e.text.copied,o.setAttribute("disabled",!0),setTimeout((()=>{(o.dataset.ccDisplay&&"icons"!=o.dataset.ccDisplay||!o.dataset.ccDisplay)&&(o.textholder.innerHTML=o.getAttribute("data-text-original")),o.removeAttribute("data-text-original"),o.removeAttribute("disabled")}),e.timeout)})),t.on("error",(e=>{console.error("There was an error copying the code: ",e.action)}))},r=()=>{let e={};const r=function(e,t,r){let s=(e=>{let t,o=document.querySelector(`script[src$="${e}"]`);return t=o?o.getAttribute("src").slice(0,-1*e.length):import.meta.url.slice(0,import.meta.url.lastIndexOf("/")+1),t})(r),l=r.replace(/\.[^/.]+$/,""),i=""!=t.clipboardjspath?t.clipboardjspath:"https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js",n=t.csspath?t.csspath:`${s}${l}.css`||`plugin/${l}/${l}.css`;const d=document.querySelector("[name=generator]");t.quarto=!(!d||!d.content.includes("quarto"));let p=[];Array.from(e.getRevealElement().querySelectorAll("code")).forEach((e=>{"PRE"===e.parentNode.tagName&&(p=[...new Set([...p,e.parentNode])])})),"function"!=typeof ClipboardJS?o(i,"script",(()=>{"function"==typeof ClipboardJS?p.length>0&&o(n,"stylesheet",(()=>{c(p,t,e),a(t)})):console.log("Clipboard.js did not load")})):p.length>0&&(t.quarto?(c(p,t,e),a(t)):o(n,"stylesheet",(()=>{c(p,t,e),a(t)})))};return{id:"copycode",init:function(o){e=t({button:"always",display:"text",text:{copy:"Copy",copied:"Copied!"},plaintextonly:!0,timeout:1e3,style:{copybg:"orange",copiedbg:"green",copycolor:"black",copiedcolor:"white",copyborder:"",copiedborder:"",scale:1,offset:0,radius:0},tooltip:!0,iconsvg:{copy:"",copied:""},csspath:"",clipboardjspath:""},o.getConfig().copycode||{}),r(o,e,"copycode.js")}}};export{r as default};
