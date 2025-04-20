import type { Api } from 'reveal.js';
import type { Config } from "./config";
import { defaultConfig } from './config.js'
import { PluginBase, pluginCSS, pluginDebug as debug } from 'reveal.js-plugintoolkit';
import { main } from './main';

// Import the CSS.
import "../css/index.scss";

const PLUGIN_ID = 'copycode';

const init = async (plugin: PluginBase<Config>, deck: Api, config: Config): Promise<void> => {

    if (debug && config.debug) {
        debug.initialize(true, PLUGIN_ID);
    }

    // Load CSS if needed
    if (config.cssautoload) {
        try {
            await pluginCSS({
                id: plugin.pluginId,
                cssautoload: config.cssautoload,
                csspath: config.csspath,
                debug: config.debug
            });
        } catch (err) {
            debug.warn('CSS loading failed, but plugin will continue:', err);
        }
    }
    await main(plugin, deck, config);
}

export default () => {
    const plugin = new PluginBase(PLUGIN_ID, init, defaultConfig);
    return plugin.createInterface();
};

export type { Config } from './config';