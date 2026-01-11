import { createSignal, For, Show } from 'solid-js';
import { plugins, categories } from './data/plugins';
import { PluginCard } from './components/PluginCard';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = createSignal<string>('all');
  const [expandedPlugin, setExpandedPlugin] = createSignal<string | null>(null);

  const filteredPlugins = () => {
    const category = selectedCategory();
    if (category === 'all') return plugins;
    return plugins.filter(p => p.categories.includes(category));
  };

  const togglePlugin = (name: string) => {
    setExpandedPlugin(prev => prev === name ? null : name);
  };

  return (
    <div class="app">
      <header class="header">
        <h1>OpenCode Plugin Marketplace</h1>
        <p>Discover and contribute plugins for OpenCode</p>
      </header>

      <div class="container">
        <aside class="sidebar">
          <h2>Categories</h2>
          <ul class="category-list">
            <li>
              <button
                class={selectedCategory() === 'all' ? 'active' : ''}
                onClick={() => setSelectedCategory('all')}
              >
                All Plugins ({plugins.length})
              </button>
            </li>
            <For each={categories}>
              {(category) => {
                const count = plugins.filter(p => p.categories.includes(category)).length;
                return (
                  <li>
                    <button
                      class={selectedCategory() === category ? 'active' : ''}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category} ({count})
                    </button>
                  </li>
                );
              }}
            </For>
          </ul>
        </aside>

        <main class="main">
          <Show
            when={filteredPlugins().length > 0}
            fallback={<p class="no-results">No plugins found in this category.</p>}
          >
            <div class="plugin-grid">
              <For each={filteredPlugins()}>
                {(plugin) => (
                  <PluginCard
                    plugin={plugin}
                    expanded={expandedPlugin() === plugin.name}
                    onToggle={() => togglePlugin(plugin.name)}
                  />
                )}
              </For>
            </div>
          </Show>
        </main>
      </div>

      <footer class="footer">
        <p>
          Want to contribute? Visit our{' '}
          <a href="https://github.com/your-org/opencode-plugin-marketplace" target="_blank" rel="noopener noreferrer">
            GitHub repository
          </a>{' '}
          and submit a PR with your plugin JSON file.
        </p>
      </footer>
    </div>
  );
}

export default App;
