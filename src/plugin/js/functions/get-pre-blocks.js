import {buildStructure} from "./build-structure.js";

export const getPreBlocks = (preblocks, options, deck) => {

	let revealEl = deck.getRevealElement();

	revealEl.style.setProperty('--cc-copy-bg',  options.copybg || options.style.copybg );
	revealEl.style.setProperty('--cc-copy-color', options.copycolor || options.style.copycolor);
	revealEl.style.setProperty('--cc-copied-bg', options.copiedbg || options.style.copiedbg);
	revealEl.style.setProperty('--cc-copied-color', options.copiedcolor || options.style.copiedcolor);
	revealEl.style.setProperty('--cc-scale', options.scale || options.style.scale);
	revealEl.style.setProperty('--cc-offset', options.offset || options.style.offset);
	revealEl.style.setProperty('--cc-radius', options.radius || options.style.radius);
	revealEl.style.setProperty('--cc-copyborder', options.copyborder || options.style.copyborder);
	revealEl.style.setProperty('--cc-copiedborder', options.copiedborder || options.style.copiedborder);

	preblocks.forEach(preblock => buildStructure(preblock, options) );

}