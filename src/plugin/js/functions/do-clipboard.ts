import type { Config } from '../config';

export const doClipboard = async (codeBlock: HTMLElement, config: Config): Promise<void> => {
	if (config.plaintextonly) {

		let content: string;
		
		// Check for hljs line number table
		const hljsTable = codeBlock.querySelector('table.hljs-ln');
		if (hljsTable) {
			// Extract only code content, not line numbers
			content = Array.from(hljsTable.querySelectorAll('td.hljs-ln-code'))
				.map(cell => cell.textContent)
				.join('\n');
		} else {
			// Regular code block
			content = codeBlock.innerText.replace(/^\s+|\s+$/g, "");
		}
		
		await navigator.clipboard.writeText(content);
	} else {
		try {

			const clone = codeBlock.cloneNode(true) as HTMLElement;
			let plainText: string;
			const hljsTable = clone.querySelector('table.hljs-ln');
			
			if (hljsTable) {
				const lineNumCells = hljsTable.querySelectorAll('td.hljs-ln-numbers');
				for (const cell of lineNumCells) {
			(cell as HTMLElement).style.display = 'none';
				}
				
				plainText = Array.from(hljsTable.querySelectorAll('td.hljs-ln-code'))
					.map(cell => cell.textContent)
					.join('\n');
			} else {
				// Regular code block
				plainText = clone.innerText;
			}
			
			// Get syntax highlighting styles
			const styles = Array.from(document.styleSheets)
				.flatMap(sheet => {
					try {
						return Array.from(sheet.cssRules);
					} catch (e) {
						return [];
					}
				})
				.filter(rule => {
					// Include all potentially relevant code styling
					return rule.cssText.includes('.hljs') || 
						rule.cssText.includes('pre code') || 
						rule.cssText.includes('code[class') ||
						rule.cssText.includes('.language-') ||
						rule.cssText.includes('pre') ||
						rule.cssText.includes('code');
				})
				.map(rule => rule.cssText)
				.join('\n');
			

			// Keep indents
			const htmlContent = `
				<style>${styles}pre, code, .hljs, .hljs-ln-code { white-space: pre !important; font-family: monospace !important;}</style>
				<div>${clone.outerHTML}</div>
			`;
			
			// Create clipboard data
			const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
			const textBlob = new Blob([plainText], { type: 'text/plain' });
			
			const clipboardItem = new ClipboardItem({
				'text/html': htmlBlob,
				'text/plain': textBlob
			});
			
			await navigator.clipboard.write([clipboardItem]);
		} catch (err) {
			console.error('Rich text clipboard error:', err);
			await navigator.clipboard.writeText(codeBlock.innerText);
		}
	}
};