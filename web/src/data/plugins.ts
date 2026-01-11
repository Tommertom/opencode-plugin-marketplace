import type { Plugin } from './types';

const pluginModules = import.meta.glob('../../../plugins/*.plugin.json', { eager: true });

export const plugins: Plugin[] = Object.values(pluginModules).map((mod: any) => mod.default);

export const categories = Array.from(
  new Set(plugins.flatMap(p => p.categories))
).sort();
