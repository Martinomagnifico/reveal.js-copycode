
import "../css/index.scss";

import type { Api } from 'reveal.js';
import type { Config } from "./config";
import { defaultConfig } from './config.js'
import { PluginBase, pluginCSS, pluginDebug as debug } from 'reveal.js-plugintoolkit';
import { main } from './main';


const PLUGIN_ID = 'copycode';

const init = async (plugin: PluginBase<Config>, deck: Api, config: Config): Promise<void> => {

    if (debug && config.debug) {
        debug.initialize(true, PLUGIN_ID);
    }

    await pluginCSS(plugin, config);
    await main(deck, config);
}

export default () => {
    const plugin = new PluginBase(PLUGIN_ID, init, defaultConfig);
    return plugin.createInterface();
};

export type { Config } from './config';