# CopyCode 
### for Reveal.js, using MarkDown
<br>

```js []
let why = `Because we always want to copy code 
           during our presentations, right?`
```

---

### Works out of the box
```js []
const http = require("http");
http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
}).listen(8081);
```

A 'Copy' button is automatically added to any `<pre>` code block.
<!-- .element: class="small" -->

---

## Setup

----

### Basics

There are really only three steps:

1. Install and set up CopyCode
2. Copy your code from a code block
2. Paste your code somewhere

----

### Install CopyCode

Copy the `copycode` folder to the plugins folder of the reveal.js folder, like this: `plugin/copycode`. Now load the script and make a reference to it in the Reveal plugin options:
<!-- .element: class="small" -->


``` html [2,5]
<script src="plugin/markdown/markdown.js"></script>
<script src="plugin/copycode/copycode.js"></script>
<script>
    Reveal.initialize({
        plugins: [ RevealMarkdown, CopyCode ]
    });
</script>
```

This plugin is also published to, and can be installed from, npm.
<!-- .element: class="small" -->


## Now change it

You can change the visibility, the icon use or button texts easily per element:

----

#### Change the visibility per element
Turn it off
<!-- .element: class="small" -->

````md [6]
```html []
<code>
	Here is the code
</code>
```
<!-- .element: data-cc="false" -->
````
<!-- .element: data-cc="false" -->

Or show only on hover over the code block
<!-- .element: class="small" -->

````md [6]
```html []
<code>
	Here is the code
</code>
```
<!-- .element: data-cc="hover" -->
````
<!-- .element: data-cc="hover" -->

This can also be set globally. See the options in the [regular (HTML) demo](demo.html#/options). Hover-only codeblocks will ***always*** show the copy button on touch devices.
<!-- .element: class="small" -->

----

#### Change the display of icons per element

````md [6]
```html []
<code>
	Here is the code
</code>
```
<!-- .element: data-cc-display="icons" -->
````
<!-- .element: data-cc-display="icons" -->

````md [6]
```html []
<code>
	Here is the code
</code>
```
<!-- .element: data-cc-display="both" -->
````
<!-- .element: data-cc-display="both" -->

This can also be set globally. See the options in the [regular (HTML) demo](demo.html#/options).
<!-- .element: class="small" -->

----

#### Change the display of text per element

````md [6]
```html []
<code>
    Here is the code
</code>
```
<!-- .element: data-cc-copy="Copy HTML" data-cc-copied="Done" -->
````
<!-- .element: data-cc-copy="Copy HTML" data-cc-copied="Done" -->

This can also be set globally. See the options in the [regular (HTML) demo](demo.html#/options).
<!-- .element: class="small" -->

---

### Using global options

The global options (see [regular (HTML) demo](demo.html#/options)) make CopyCode very customizable. For example, to make all buttons look more like the standard GitHub copy-buttons, you can tweak the configuration like this:
<!-- .element: class="small" -->

```json
copycode: { timeout: 1200, button: "hover", display: "icons", style: { copybg: "rgba(255,255,255,128)", copiedbg: "white", copyborder: "2px solid gray", copiedborder: "2px solid green", copiedcolor: "green", offset: 0.5, radius: 0.2} }
```