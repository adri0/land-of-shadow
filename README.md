# Land of Shadow

A dark, Elden Ring–flavoured Hugo theme: ash-black and Erdtree gold by default, parchment and umber
in light mode, set in Cinzel and EB Garamond. It is the look of
[scadustats.com](https://scadustats.com/) ([source](https://github.com/adri0/scadustats-site)).

![The scadustats.com home page in Land of Shadow's dark mode: the header, the hero, the latest news and the sidebar's stat widgets](https://raw.githubusercontent.com/adri0/land-of-shadow/main/images/screenshot-home-dark.png)

It started from the [kopi](https://github.com/bect/kopi) theme (MIT) (see
[How it differs from kopi](#how-it-differs-from-kopi)). Only the parts in use were
kept (`assets/css/kopi/`, `assets/js/kopi/`, `layouts/404.html`, `static/favicon.ico`; see
`LICENSES/kopi.txt`), and kopi's search, radio player, bookmarks, PWA, cookie banner, taxonomy pages
and Markdown render hooks were left out. Page navigation uses [Hotwire Turbo](https://turbo.hotwired.dev/)
8.0.20 (MIT, © 37signals), in `assets/js/third_party/` unmodified from its npm release. (Not `vendor/`: Go module
zips, which Hugo downloads modules as, leave out any directory named `vendor`.)

## Using it

Requires Hugo **Extended** >= 0.158 and Go. Import it as a Hugo module:

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
headings), `section.html`, `404.html`, a home page and the head, header, footer and breadcrumb
partials.

### Home page

The theme's `home.html` shows a hero (`logo` and `wordmark`, or the site title, then `subtitle` and
the text of `content/_index.md`), the latest news, and a card for each other section with its
`description` or summary. For your own home page, add `layouts/home.html` to your site: the hero
classes (`.hero`, `.hero-title`, `.hero-logo`, `.hero-wordmark`, `.hero-subtitle`, `.hero-body`) and
the `latest-news.html` partial are there to reuse.

### News

Put posts in `content/news/` (with a `_index.md` for the section's title) and the theme lists them,
newest first, at `/news/`. `hugo new content news/2026-10-11-my-post.md` starts a post from the
theme's archetype, which takes the title from the file name without the date. Front matter:

| Field | Used for |
|---|---|
| `title`, `date` | The post's heading and date |
| `summary` | The text on the post's card in the list (default: the start of the post) |
| `author` | `{name, url}`, signed at the end of the post, linked when `url` is set. A plain string is a name without a link |

To show the latest posts on your home page, call the partial from `layouts/home.html`:

```go-html-template
{{ partial "latest-news.html" (dict "count" 3) }}
```

It shows each post's date, title and first sentence, under a heading linking to `/news/`, and
nothing when there are no posts. Every key is optional: `count` (3), `section` (`"news"`),
`title` (`"News"`) and `more` (`"All news →"`, the link's text). For a section with another name,
pass `section` and give the section `cascade: {type: news}` in its `_index.md`, so its pages use the
news layouts.

The list uses `.card-list` and `.link-card`, which you can use for your own card grids too.

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

Menus: `main` is the header navigation, `footer` the footer links. A footer entry's `pre` goes
before its name, e.g. an inline SVG icon, sized like the GitHub one.

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

## How it differs from kopi

kopi is a blog and magazine theme with a dark mode, a two-column layout and Turbo page
transitions. Land of Shadow keeps its layout grid, base components, dark-mode toggle and Turbo, and
turns it from a blog into a site of reference pages:

- **Its own look:** a new palette (ash-black and Erdtree gold, parchment and umber in light mode),
  Cinzel and EB Garamond in place of kopi's system sans-serif, gold ornaments, gradient rules and
  card glows. It's dark by default, whatever the OS setting.
- **Pages as well as posts:** the page layout has a sticky table of contents built from the `##`
  headings, "[edit this page]" links to the source on GitHub, and a full-width banner block under
  the header. Tables and headings are styled for data pages.
- **A news section** with a card list, signed posts, an archetype and a latest-news block for the
  home page. The home page has a hero with logo and wordmark.
- **Extension points:** hook partials for `<head>`, the header buttons and the footer, and a site
  stylesheet and script that the theme loads last.
- **Less:** kopi's search, radio player, bookmarks, PWA, cookie banner, taxonomy pages, share
  buttons and Markdown render hooks are gone.

## Working on it with a site

Point the site at a local checkout:

```sh
HUGO_MODULE_REPLACEMENTS="github.com/adri0/land-of-shadow -> /path/to/land-of-shadow" hugo server
```

Releases are git tags (`vX.Y.Z`). Sites update with `hugo mod get github.com/adri0/land-of-shadow@vX.Y.Z`.
