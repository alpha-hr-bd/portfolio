# Alpha.HR — 3D Developer Portfolio

A responsive, static portfolio website for **Md. Alpha Hayat Rat (Alpha.HR)**, built with HTML, CSS and vanilla JavaScript.

## Included files

```text
AlphaHR-3D-Portfolio/
├── index.html      # Main portfolio page
├── style.css       # Layout, responsive styles and 3D visual effects
├── script.js       # Navigation, scroll progress, reveal and pointer interactions
├── builder.html    # Project idea builder
└── README.md       # Setup and deployment instructions
```

## Run locally

1. Download and extract the ZIP.
2. Open `index.html` in a modern browser.

No build tools, package installation, backend, or API key are required.

## Deploy with GitHub Pages

1. Open your `alpha-hr-bd/portfolio` repository.
2. Upload the five files from this folder to the repository root.
3. Commit the changes to your default branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select your default branch and the `/ (root)` folder, then save.
6. After GitHub Pages finishes deploying, open the Pages URL shown in that settings page.

## Customize

- Update text, project names and links in `index.html`.
- Change colors, spacing and layout in `style.css` (CSS variables are at the top).
- Update interactions in `script.js`.
- Change the contact email in `index.html` and `builder.html` if needed. The current placeholder contact address is `alpha.hayat.rat@gmail.com`.

## Notes

- The site is static and GitHub Pages compatible.
- Google Fonts are loaded from Google Fonts; a network connection is needed for those fonts. The page otherwise works without a backend.
- The project builder prepares an email draft in the visitor's email application; it does not submit or store form data.
- The portfolio project links are examples based on the Alpha.HR projects and can be edited at any time.
- Respect `prefers-reduced-motion`; animation effects are reduced for visitors who enable that accessibility setting.
