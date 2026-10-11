# Land of Shadow

A dark, Elden Ring–flavoured Hugo theme: ash-black and Erdtree gold by default, parchment and umber
in light mode, set in Cinzel and EB Garamond. It is the look of
[scadustats.com](https://scadustats.com/) ([source](https://github.com/adri0/scadustats-site)).

It started from the [kopi](https://github.com/bect/kopi) theme (MIT). Only the parts in use were
kept (`assets/css/kopi/`, `assets/js/kopi/`, `layouts/404.html`, `static/favicon.ico`; see
`LICENSES/kopi.txt`), and kopi's search, radio player, bookmarks, PWA, cookie banner, taxonomy pages
and Markdown render hooks were left out. Page navigation uses [Hotwire Turbo](https://turbo.hotwired.dev/)
8.0.20 (MIT, © 37signals), in `assets/js/vendor/` unmodified from its npm release.

## Using it

Requires Hugo **Extended** >= 0.157 and Go. Import it as a Hugo module:

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/adri0/land-of-shadow"
```

```sh
hugo mod init github.com/you/your-site
hugo mod get github.com/adri0/land-of-shadow@latest
```

The theme gives you `baseof.html`, `page.html` (with a table of contents built from the `##`
headings), `section.html`, `404.html` and the head, header, footer and breadcrumb partials. It
doesn't have a home page layout: add your own `layouts/home.html`.

### Params

| Param | Used for |
|---|---|
| `description` | `<meta name="description">`, and the footer text unless you override `hooks/footer-about.html` |
| `homeTitle` | The home page's `<title>` (default: the site title) |
| `logo` | An image under `assets/`: the header mark, favicon, touch icon and `og:image` |
| `wordmark`, `wordmarkAlt` | An image of the site's name, white on transparent, shown after the logo (inverted in light mode). Without it, the header shows the site title as text |
| `subtitle` | A small line after the brand in the header |
| `repo` | A GitHub repo URL: the footer's GitHub link and the "[edit this page]" links (to its `main` branch) |
| `disclaimer` | A line at the bottom of the footer |
| `htmlAttributes` | A table of extra attributes for `<html>` |

Menus: `main` is the header navigation, `footer` the footer links.

### Extending it

Put a file at the same path in your site to fill in these, which the theme leaves empty:

- `layouts/_partials/hooks/head-end.html`: tags at the end of `<head>` (analytics, early scripts).
- `layouts/_partials/hooks/header-actions.html`: header buttons before the dark-mode toggle.
- `layouts/_partials/hooks/footer-about.html`: the footer's text under the site title.
- `layouts/_partials/sidebar.html`: the 404 page's sidebar.
- `assets/css/_site.scss`: your styles, imported after the theme's. kopi's mixins (`@include md`)
  and the tokens below are available.
- `assets/js/site.js`: export an `initSite()` function, which runs on every Turbo page load after
  the theme's modules.

### Tokens

kopi's tokens (`--bg-body`, `--bg-card`, `--text-main`, `--text-muted`, `--accent`, `--border`,
`--radius-*`) are re-pointed at the palette in `assets/css/_land-of-shadow.scss`. It adds
`--surface`/`--surface-strong`, `--gold-soft`/`--gold-glow`, `--link`, `--font-display` and
`--font-body`. Each has a light value and a `[data-theme="dark"]` one.

The site is dark by default: the inline script in `head.html` only switches to light when the
visitor picked it with the toggle (`localStorage.theme`), and it ignores the OS colour scheme.

## Working on it with a site

Point the site at a local checkout:

```sh
HUGO_MODULE_REPLACEMENTS="github.com/adri0/land-of-shadow -> /path/to/land-of-shadow" hugo server
```

Releases are git tags (`vX.Y.Z`). Sites update with `hugo mod get github.com/adri0/land-of-shadow@vX.Y.Z`.
