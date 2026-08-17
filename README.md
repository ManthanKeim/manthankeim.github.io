# Manthan Keim — Portfolio

Personal site and portfolio for [manthankeim.com](https://manthankeim.com), hosted on GitHub Pages.

## Stack

- Semantic HTML5 single-page layout
- Modern CSS (custom properties, responsive grid, light/dark theme)
- Minimal vanilla JavaScript (theme toggle, mobile nav, section highlighting)
- No build step required — deploys directly from `master`

## Local preview

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

## Structure

- `index.html` — main portfolio page (about, experience, projects, research, blog, contact)
- `blog/` — writing; each post is its own page
- `css/styles.css` — site styles
- `js/main.js` — theme, mobile nav, and section highlighting
- `Manthan_Keim_Resume.pdf` — resume download

Legacy routes (`about.html`, `work.html`, `contact.html`, `research.html`, `blog.html`) redirect to page sections or `/blog/`.

Last updated: August 2026.
