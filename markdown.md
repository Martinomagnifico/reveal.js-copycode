# CopyCode 
### for Reveal.js

```js
let why = `Because we always want to copy code 
           during our presentations, right?`
```

Using Markdown
<!-- .element: class="small" -->

---

## Works out of the box
```js []
const http = require("http");
http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
}).listen(8081);
```

A 'Copy' button is automatically added to any `pre` code block.
<!-- .element: class="small" -->

---

## Setup

----

### Basics

There are really only three steps:

1. Install CopyCode
2. Copy your code from a code block
2. Paste your code somewhere

----

### Install CopyCode

Copy the `copycode` folder to the plugins folder of the reveal.js folder, like this: `plugin/copycode`. Now load the script and make a reference to it in the Reveal plugin options:
<!-- .element: class="small" -->


``` html []
<script src="plugin/copycode/copycode.js"></script>
<script>
    Reveal.initialize({
        plugins: [ CopyCode ]
    });
</script>
```

---

### Now change it

You can change the visibility, icon use 
or texts easily per element:

----

### Change the visibility per element
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

### Change the display of icons per element

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

### Change the display of text per element

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