# Personal site

This is my website built with [Hugo](https://gohugo.io/), using the PaperMod theme.

## Prerequisites

- Hugo Extended Version (recommended v0.100.0 or newer)
- Git

## Local Development

1. Clone this repository:
```bash
git clone --recursive https://github.com/dtutila/dtutila.github.io.git
cd dtutdtutila.github.io.gitila
```

2. Start the Hugo development server:
```bash
hugo server -D
```

The site will be available at http://localhost:1313/

## Building for Production

To build the site for production:
```bash
hugo --minify
```

The built site will be in the `public/` directory.

## Content Management

- Images and other static files go in `/static/`
- Site configuration is in `hugo.yaml`

## Theme

This site uses the PaperMod theme. Theme documentation can be found at:
https://github.com/adityatelange/hugo-PaperMod 