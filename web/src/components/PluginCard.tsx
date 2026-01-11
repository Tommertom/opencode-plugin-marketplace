import { Show } from 'solid-js';
import { SolidMarkdown } from 'solid-markdown';
import type { Plugin } from '../data/types';

interface PluginCardProps {
  plugin: Plugin;
  expanded: boolean;
  onToggle: () => void;
}

export function PluginCard(props: PluginCardProps) {
  return (
    <article class="plugin-card">
      <div class="plugin-header">
        <div>
          <h3>{props.plugin.displayName}</h3>
          <p class="plugin-description">{props.plugin.description}</p>
        </div>
        <div class="plugin-badges">
          <span class={`badge ${props.plugin.maintained ? 'maintained' : 'unmaintained'}`}>
            {props.plugin.maintained ? '✓ Maintained' : '⚠ Unmaintained'}
          </span>
        </div>
      </div>

      <div class="plugin-meta">
        <div class="meta-item">
          <strong>Categories:</strong>
          <div class="category-tags">
            {props.plugin.categories.map((cat) => <span class="tag">{cat}</span>)}
          </div>
        </div>

        <div class="meta-item">
          <strong>Authors:</strong>
          {props.plugin.authors.map((author) => (
            <a href={author.url} target="_blank" rel="noopener noreferrer">
              {author.name}
            </a>
          ))}
        </div>

        <div class="meta-item">
          <strong>License:</strong> {props.plugin.license}
        </div>

        <div class="meta-item">
          <strong>Last Updated:</strong> {props.plugin.lastUpdated}
        </div>

        <div class="meta-item">
          <strong>OpenCode:</strong> {props.plugin.opencode.minimumVersion}
          {props.plugin.opencode.maximumVersion && ` - ${props.plugin.opencode.maximumVersion}`}
        </div>
      </div>

      <div class="plugin-links">
        <a href={props.plugin.links.repository} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          Repository
        </a>
        <Show when={props.plugin.links.homepage}>
          <a href={props.plugin.links.homepage} target="_blank" rel="noopener noreferrer" class="btn">
            Homepage
          </a>
        </Show>
        <Show when={props.plugin.links.documentation}>
          <a href={props.plugin.links.documentation} target="_blank" rel="noopener noreferrer" class="btn">
            Documentation
          </a>
        </Show>
      </div>

      <div class="plugin-expandable">
        <button class="expand-btn" onClick={props.onToggle}>
          {props.expanded ? '▼' : '▶'} Installation & Usage
        </button>

        <Show when={props.expanded}>
          <div class="plugin-details">
            <section>
              <h4>Installation</h4>
              <p class="installation-summary">{props.plugin.installation.summary}</p>
              <div class="markdown-content">
                <SolidMarkdown children={props.plugin.installation.markdown} />
              </div>
            </section>

            <Show when={props.plugin.usage?.markdown}>
              <section>
                <h4>Usage</h4>
                <div class="markdown-content">
                  <SolidMarkdown children={props.plugin.usage!.markdown} />
                </div>
              </section>
            </Show>
          </div>
        </Show>
      </div>
    </article>
  );
}
