/*
 * Theme JS entry point. The modules in `kopi/` are copied from the kopi theme
 * (https://github.com/bect/kopi, MIT -- see LICENSES/kopi.txt); its search,
 * radio player, bookmark/library and PWA (service worker) modules were left
 * behind. `vendor/` holds Hotwire Turbo 8.0.20, unmodified from npm.
 *
 * A site adds its own scripts by putting an `assets/js/site.js` that exports
 * `initSite` in its own repo, which replaces the empty one here. It runs on
 * every Turbo page load, after the theme's modules.
 */
import { initNavigation } from './kopi/navigation.js';
import { initTheme } from './modules/theme.js';
import { initInteractions } from './kopi/interactions.js';
import { initPrefetch } from './kopi/prefetch.js';
import { initSite } from './site.js';
import './vendor/turbo.es2017-umd.js';

document.addEventListener('turbo:load', () => {
    initNavigation();
    initTheme();
    initInteractions();
    initPrefetch();
    initSite();
});
