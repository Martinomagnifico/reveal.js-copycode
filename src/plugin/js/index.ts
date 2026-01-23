import "../css/index.scss";

import type { Api } from "reveal.js";
import { pluginDebug as debug, PluginBase, pluginCSS } from "reveal.js-plugintoolkit";
import type { Config } from "./config";
import { defaultConfig } from "./config.js";
import { main } from "./main";

const PLUGIN_ID = "copycode";

const init = async (plugin: PluginBase<Config>, deck: Api, config: Config): Promise<void> => {
	if (debug && config.debug) {
		debug.initialize(true, PLUGIN_ID);
	}

	await pluginCSS(plugin, config);
	await main(deck, config);
};

export default () => {
	const plugin = new PluginBase(PLUGIN_ID, init, defaultConfig);
	return plugin.createInterface();
};

export type { Config } from "./config";
