# Relay Node Theme

An industrial sci-fi Zola theme designed for SSH/Telnet ASCII cinema sites. Features a dark aesthetic with customizable accent colors, CRT scanline effects, and support for dynamic content.

## Features

- **Dark Industrial Aesthetic** - Dark backgrounds with vibrant accent colors
- **Color Scheme Presets** - Orange, Cyan, Green, and Magenta themes with live switching
- **Animated Scanlines** - Optional CRT-style scanline overlay effect
- **Built-in Search** - Full-text search using Zola's elasticlunr.js
- **SEO & OpenGraph** - Complete meta tags for social sharing
- **Tag Taxonomy** - Tag pages with counts and filtering
- **Custom 404 Page** - Themed error page with glitch effect
- **Now Streaming Page** - API-driven live stream display
- **Dynamic Charts** - PostgreSQL-backed data visualization
- **Responsive Design** - Mobile-friendly layouts
- **GitHub Actions CI** - Automated build and deployment

### Blog Features

- **Reading Time** - Estimated reading time on posts
- **Word Count** - Word count display on posts
- **Table of Contents** - Auto-generated TOC for posts with headings
- **Previous/Next Navigation** - Links to adjacent posts
- **Breadcrumb Navigation** - Path-style navigation
- **Last Updated Date** - Shows when posts were modified
- **Syntax Highlighting** - Code blocks with Dracula theme
- **Copy Code Button** - One-click copy for code blocks
- **Reading Progress Bar** - Shows scroll progress at top of page
- **Related Posts** - Shows similar posts based on shared tags
- **Social Sharing** - Terminal-styled share buttons (Twitter, LinkedIn, HN, copy)
- **Series Support** - Group posts into multi-part series

### Utilities

- **Back to Top Button** - Floating button for long pages
- **Archive Page** - Posts grouped by year/month
- **RSS Feed Link** - Visible feed link in navigation
- **Print Stylesheet** - Clean output for printing
- **Favicon Support** - Configurable favicon, SVG icon, and Apple touch icon
- **Shortcodes** - Alert boxes, terminal blocks, ASCII art, callouts
- **Anchor Links** - Click heading `#` to copy permalink
- **Image Lightbox** - Click images to enlarge in modal
- **Keyboard Shortcuts** - `Ctrl+K` or `/` to focus search
- **Glitch Effect** - Subtle glitch animation on headings

## Requirements

- Zola 0.19.0 or higher (tested with 0.22.1)

## Installation

### As a Git Submodule

```bash
cd your-zola-site
git submodule add https://github.com/yourusername/relay-node-theme themes/relay-node
```

### Manual Download

Download the theme and extract it to your `themes/relay-node` directory.

## Configuration

Add to your `config.toml`:

```toml
theme = "relay-node"
compile_sass = true
build_search_index = true
generate_feeds = true
feed_filenames = ["atom.xml"]

[search]
index_format = "elasticlunr_json"

[[taxonomies]]
name = "tags"
feed = true

[markdown]
[markdown.highlighting]
enabled = true
theme = "dracula"

[extra]
# Branding
accent = "#ff6a1a"
hero_title = "Relay"
hero_subtitle = "Your Network Tagline"

# Features
enable_scanlines = true
enable_theme_switcher = true
enable_search = true
enable_streaming = false
enable_archive = true
enable_rss_link = true

# Color scheme: orange | cyan | green | magenta
color_scheme = "orange"

# Favicon (optional)
favicon = "/favicon.ico"
favicon_svg = "/favicon.svg"
apple_touch_icon = "/apple-touch-icon.png"

# API endpoints (optional)
[extra.api]
streaming_endpoint = "https://api.example.com/streams"
streaming_refresh = 30000
charts_endpoint = "https://api.example.com/stats"

# SEO
[extra.seo]
og_image = "/images/og-default.png"
twitter_handle = "@yourhandle"
```

## Content Setup

### Required Pages

Create these content files:

**content/search.md**
```markdown
+++
title = "Search"
path = "search"
template = "search.html"
+++
```

**content/about.md**
```markdown
+++
title = "About"
path = "about"
+++

Your about page content...
```

### Blog Posts

Create a blog section with `content/blog/_index.md`:

```markdown
+++
title = "Blog"
sort_by = "date"
paginate_by = 10
template = "blog/list.html"
+++
```

The `paginate_by` option enables pagination with automatic prev/next navigation.

Create posts in `content/blog/`:

```markdown
+++
title = "Post Title"
date = 2024-01-15
template = "blog/single.html"

[taxonomies]
tags = ["tag1", "tag2"]
+++

Post content...
```

### Series (Multi-Part Posts)

Group posts into a series by adding `series` and `series_part` to frontmatter:

```markdown
+++
title = "Building a CLI Tool - Part 1"
date = 2024-01-15

[extra]
series = "Building a CLI Tool"
series_part = 1
+++
```

Posts in the same series will show navigation to other parts.

### Archive Page (Optional)

**content/archive.md**
```markdown
+++
title = "Archive"
path = "archive"
template = "archive.html"
description = "All posts by date"
+++
```

### Streaming Page (Optional)

**content/streaming.md**
```markdown
+++
title = "Now Streaming"
path = "streaming"
template = "streaming.html"

[extra]
show_charts = true
+++
```

## Color Schemes

The theme includes four color presets:

| Scheme | Accent Color | Best For |
|--------|--------------|----------|
| Orange | `#ff6a1a` | Default, warm industrial |
| Cyan | `#00d4ff` | Cool cyberpunk |
| Green | `#8aff80` | Matrix/terminal |
| Magenta | `#ff00ff` | Neon synthwave |

Users can switch themes in real-time when `enable_theme_switcher = true`.

## API Integration

### Streaming Endpoint

The streaming page expects this JSON format:

```json
{
  "streams": [
    {
      "name": "node-alpha",
      "title": "Star Wars ASCII",
      "status": "active",
      "viewers": 42,
      "runtime": 3600,
      "connect_command": "ssh viewer@node.example.com"
    }
  ]
}
```

### Charts Endpoint

The charts component expects:

```json
{
  "labels": ["Mon", "Tue", "Wed", "Thu", "Fri"],
  "values": [120, 150, 180, 90, 200]
}
```

## Shortcodes

### Alert Box

```markdown
{{/* alert(type="info", title="Note") */}}
This is an informational message.
{{/* end */}}
```

Types: `info`, `warning`, `danger`, `success`

### Terminal Block

```markdown
{{/* terminal(title="bash") */}}
npm install zola-theme
{{/* end */}}
```

### ASCII Art Box (Simple)

```markdown
{{/* ascii_box() */}}
+------------------+
|  ASCII ART HERE  |
+------------------+
{{/* end */}}
```

### ASCII Art (Full Featured)

```markdown
{{/* ascii_art(title="Robot", caption="A friendly robot", class="glow") */}}
    ___
   [o_o]
   /| |\
   _| |_
{{/* end */}}
```

Options:
- `title` - Header text above the art
- `caption` - Caption below the art
- `class` - Style variants: `centered`, `large`, `small`, `no-border`, `glow`
- `align` - Text alignment: `left`, `center`, `right`

### Callout

```markdown
{{/* callout(icon="!", title="Important") */}}
Don't forget to configure your API keys.
{{/* end */}}
```

## Templates

| Template | Purpose |
|----------|---------|
| `base.html` | Base layout with SEO, scripts |
| `index.html` | Homepage |
| `page.html` | Standard pages |
| `section.html` | Section listings |
| `search.html` | Search page |
| `archive.html` | Archive by year/month |
| `streaming.html` | Live streams |
| `404.html` | Error page |
| `blog/list.html` | Blog archive |
| `blog/single.html` | Blog post |
| `tags/list.html` | All tags |
| `tags/single.html` | Tag page |

## Development

### Quick Start

Use the included Makefile for common tasks:

```bash
make setup    # Create theme symlink in exampleSite
make serve    # Run development server (0.0.0.0:1111)
make build    # Build the example site
make test     # Build and check for errors
make clean    # Remove build artifacts
make lint     # Check SCSS syntax
make watch    # Serve with drafts enabled
```

### Manual Setup

If not using the Makefile:

```bash
cd exampleSite
mkdir -p themes
ln -s ../.. themes/relay-node
zola serve --interface 0.0.0.0
```

### SCSS Structure

```
sass/
├── main.scss          # Imports
├── print.scss         # Print stylesheet
├── _variables.scss    # Colors, CSS properties
├── _base.scss         # Typography, reset
├── _components.scss   # Panels, buttons, TOC, breadcrumbs, etc.
├── _scanlines.scss    # CRT effect
├── _search.scss       # Search UI
├── _charts.scss       # Chart styles
├── _streaming.scss    # Streaming page
├── _404.scss          # Error page
├── _theme-picker.scss # Theme switcher
└── themes/            # Color schemes
```

### Project Structure

```
relay-node-theme/
├── .github/workflows/ci.yml   # GitHub Actions CI
├── exampleSite/               # Demo site
│   ├── config.toml
│   └── content/
├── sass/                      # SCSS styles
├── static/js/                 # JavaScript
│   ├── theme-switcher.js
│   ├── search.js
│   ├── streaming.js
│   ├── charts.js
│   ├── back-to-top.js
│   ├── copy-code.js
│   ├── reading-progress.js
│   ├── anchor-links.js
│   ├── lightbox.js
│   └── search-shortcut.js
├── templates/                 # Zola templates
│   ├── partials/
│   ├── shortcodes/
│   └── tags/
├── Makefile
├── theme.toml
└── README.md
```

## License

MIT License
