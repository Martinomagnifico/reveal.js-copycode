import type { Config } from '../config';
import { defaultConfig } from '../config';

/**
 * Applies custom CSS variables to the Reveal element
 * Only sets variables that differ from defaults
 */

export const applyCustomStyles = (revealEl: HTMLElement, config: Config): void => {
	// Helper function to compare values
	const isDifferentFromDefault = (value: string | number | undefined, defaultValue: string | number): boolean => {
		if (value === undefined) return false;
		if (value === '' && String(defaultValue) === '0') return false;
		return String(value) !== String(defaultValue);
	};

	// Check each property against default and apply if different
	if (isDifferentFromDefault(config.style.copybg, defaultConfig.style.copybg)) {
		revealEl.style.setProperty('--cc-copy-bg', config.style.copybg);
	}
	
	if (isDifferentFromDefault(config.style.copiedbg, defaultConfig.style.copiedbg)) {
		revealEl.style.setProperty('--cc-copied-bg', config.style.copiedbg);
	}
	
	if (isDifferentFromDefault(config.style.copycolor, defaultConfig.style.copycolor)) {
		revealEl.style.setProperty('--cc-copy-color', config.style.copycolor);
	}
	
	if (isDifferentFromDefault(config.style.copiedcolor, defaultConfig.style.copiedcolor)) {
		revealEl.style.setProperty('--cc-copied-color', config.style.copiedcolor);
	}
	
	if (isDifferentFromDefault(config.style.scale, defaultConfig.style.scale)) {
		revealEl.style.setProperty('--cc-scale', String(config.style.scale));
	}
	
	if (isDifferentFromDefault(config.style.offset, defaultConfig.style.offset)) {
		revealEl.style.setProperty('--cc-offset', String(config.style.offset));
	}
	
	if (isDifferentFromDefault(config.style.radius, defaultConfig.style.radius)) {
		revealEl.style.setProperty('--cc-radius', String(config.style.radius));
	}
	
	if (isDifferentFromDefault(config.style.copyborder, defaultConfig.style.copyborder) && config.style.copyborder !== '') {
		revealEl.style.setProperty('--cc-copyborder', config.style.copyborder);
	}
	
	if (isDifferentFromDefault(config.style.copiedborder, defaultConfig.style.copiedborder) && config.style.copiedborder !== '') {
		revealEl.style.setProperty('--cc-copiedborder', config.style.copiedborder);
	}
};