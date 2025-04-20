import type { Config } from '../config';
import { doClipboard } from './do-clipboard';

interface CopyButtonElement extends HTMLElement {
  textholder?: HTMLElement;
  dataset: DOMStringMap & {
    ccCopied?: string;
    ccCopy?: string;
    ccDisplay?: string;
    textOriginal?: string;
  };
}


export const setupCopyHandlers = (config: Config): void => {
  const buttons = document.querySelectorAll('.codeblock > button:not(.code-copy-button)');

  for (const button of buttons) {
    button.addEventListener('click', async () => {
      console.log('Button clicked');
      const buttonEl = button as CopyButtonElement;
      
      // In Quarto, the code is in a pre element that's a sibling of our button
      const preElement = buttonEl.nextElementSibling;
      
      if (!preElement || !(preElement instanceof HTMLElement)) {
        console.error('Could not find pre element');
        return;
      }
      
      // Find the code element inside the pre
      const codeElement = preElement.querySelector('code');
      
      if (!codeElement || !(codeElement instanceof HTMLElement)) {
        console.error('Could not find code element');
        return;
      }
      
      try {
        console.log('Attempting to copy from:', codeElement);
        await doClipboard(codeElement, config);
        console.log('doClipboard completed successfully');
        handleSuccess(buttonEl, config);
      } catch (error) {
        console.error('Error copying code:', error);
      }
    });
  }
};

const handleSuccess = (button: CopyButtonElement, config: Config): void => {
  // Save original text
  if (button.textholder) {
    button.dataset.textOriginal = button.textholder.innerHTML;
    
    // Update text
    button.textholder.innerHTML = button.dataset.ccCopied || config.text.copied;
  }
  
  // Disable button
  button.setAttribute("disabled", "true");
  
  // Reset after timeout
  setTimeout(() => {
    if (button.textholder && 
        (button.dataset.ccDisplay !== "icons" || !button.dataset.ccDisplay)) {
      button.textholder.innerHTML = button.dataset.textOriginal || '';
    }
    
    // Clean up
    delete button.dataset.textOriginal;
    button.removeAttribute("disabled");
  }, config.timeout);
}


