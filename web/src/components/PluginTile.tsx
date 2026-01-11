import type { Plugin } from '../data/types';

interface PluginTileProps {
  plugin: Plugin;
  onClick: () => void;
}

export function PluginTile(props: PluginTileProps) {
  return (
    <article class="plugin-tile" onClick={props.onClick}>
      <div class="tile-header">
        <h3>{props.plugin.displayName}</h3>
        <span class={`tile-badge ${props.plugin.maintained ? 'maintained' : 'unmaintained'}`}>
          {props.plugin.maintained ? '✓' : '⚠'}
        </span>
      </div>
      
      <p class="tile-description">{props.plugin.description}</p>
      
      <div class="tile-categories">
        {props.plugin.categories.slice(0, 3).map((cat) => (
          <span class="tile-tag">{cat}</span>
        ))}
        {props.plugin.categories.length > 3 && (
          <span class="tile-tag-more">+{props.plugin.categories.length - 3}</span>
        )}
      </div>
      
      <div class="tile-footer">
        <span class="tile-author">{props.plugin.authors[0].name}</span>
        <span class="tile-updated">{props.plugin.lastUpdated}</span>
      </div>
    </article>
  );
}
