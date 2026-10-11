/*
 * Adapted from kopi's theme.js. The site is dark by default and only goes light
 * when the visitor clicks the toggle, so the theme's prefers-color-scheme
 * listener (which switched themes along with the OS) is dropped. The initial
 * theme is set by the inline script in _partials/head.html.
 */
export function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            try { localStorage.setItem('theme', newTheme); } catch (e) {}
        });
    }
}
