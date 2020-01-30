# reveal.js-copycode
A simple plugin that automatically shows a 'copy' button in code blocks in [Reveal.js](https://revealjs.com)

[Demo](https://martinomagnifico.github.io/reveal.js-copycode/demo.html)

In Reveal.js presentations we can show blocks of code. This plugin for Reveal.js adds a 'copy' button to each of those. It's easy to set up. If your code blocks are set up like this:
```html
<pre>
  <code>
    Here is the code	
  </code>
</pre>
```
then install the plugin and it will work automatically.



## Installation

CopyCode.js needs another script to be able to function: [Clipboard.js](https://clipboardjs.com) by Zeno Rocha. This script handles all the copy functionality.

Copy the 'copycode' folder to the plugins folder of the reveal.js folder, like this: `plugin/copycode`. Now add it to the dependencies of Reveal.js. The script for Clipboard.js is on a CDN, we add it as a dependency as well.


```javascript
Reveal.initialize({
	// ...
	dependencies: [
		// ... 
		{ src: '//cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.4/clipboard.min.js'},
		{ src: 'assets/js/revealjs/plugin/copycode/copycode.js', async: false }
		// ... 
	]
});
```
Now add a link in your HTML to the stylesheet. Note that this example has an "assets" folder for resources. You can use whatever setup for the hierarchy, as long as the references are correct :-)

```html
<link rel="stylesheet" href="assets/js/revealjs/plugin/copycode/copycode.css">
```




## Configuration

There are a few options that you can change from the Reveal.js options. The values below are default and do not need to be set if they are not changed.

```javascript
Reveal.initialize({
  // ...
  copycode: {
    copy: "Copy",
    copied: "Copied!",
    timeout: 1000,
    copybg: "orange",
    copiedbg: "green",
    copycolor: "black",
    copiedcolor: "white"
  },
  dependencies: [
  // ... 
  ]
});
```

* 'copy': The text for each copy button.
* 'copied': The text for each copy button when the copy action is successful.
* 'timeout': The time in milliseconds for the "Copied!"-state to revert back to "Copy".
* 'copybg': The background color.
* 'copiedbg': The background color in the Copied state.
* 'copycolor': The text color.
* 'copiedcolor': The text color in the Copied state.



## Customize it per element

Turn off the button per element: 

```html
<pre data-cc="false">
  <code>
    Here is the code	
  </code>
</pre>
```
Or customize the button texts per element:
```html
<pre data-cc-copy="Copy HTML" data-cc-copied="Yes!">
  <code>
    Here is the code	
  </code>
</pre>
```




## Manual styling

Just change the provided stylesheet and do not override it from the config.




## Like it?

If you like it, please star this repo.




## License
MIT licensed

Copyright (C) 2020 Martijn De Jongh (Martino)
