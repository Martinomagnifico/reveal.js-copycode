import type { Api } from 'reveal.js';
import type { Config } from '../config';
import type { PluginBase } from 'reveal.js-plugintoolkit';

// button-setup.ts
export const setupButtons = async (plugin: PluginBase<Config>, deck: Api, config: Config) => {
    //const buttons = document.querySelectorAll('.copy-button');
    const buttons = document.querySelectorAll('h3');
    // Do setup stuff
    return buttons;
};