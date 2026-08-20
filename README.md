# Manthan Keim — Portfolio

Personal site and portfolio for [manthankeim.com](https://manthankeim.com), hosted on GitHub Pages.

## Stack

- Semantic HTML5, no build step
- Two-column layout inspired by [Brittany Chiang](https://brittanychiang.com) (sticky identity + scrolling content)
- Minimal vanilla JavaScript (section highlighting, pointer spotlight)
- Deploys directly from `master`

## Local preview

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

## Structure

- `index.html` — about, experience, projects, research, writing
- `blog/` — writing; each post is its own page
- `css/styles.css` — site styles
- `js/main.js` — section highlighting and pointer spotlight
- `Manthan_Keim_Resume.pdf` — resume download

Legacy routes (`about.html`, `work.html`, `contact.html`, `research.html`, `blog.html`) redirect to page sections or `/blog/`.

Last updated: August 2026.
