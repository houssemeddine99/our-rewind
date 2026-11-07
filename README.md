# Our Rewind — Yuki + Mimi

A personal surprise from Yuki to Mimi, together since 22 July 2023.

Includes 27 selected photos, eight H.264/AAC MP4 videos, a live day counter, a filterable scrapbook with a photo viewer, playful awards, and an envelope that reveals a love letter. No build or account is needed to view it. Videos load only when played, and only one plays at a time.

The scroll edition adds a pinned full-screen rewind chapter, an animated day count, photos that move with scrolling, a shifting lilac/pink background, staggered word and photo entrances, and chapter navigation. Scrolling stays native. Reduced-motion preferences receive the complete static story, and short landscape phone screens use a regular unpinned layout.

## Preview

Open `index.html` in Chrome, Edge, or Safari, or run the `preview.mjs` server in the parent workspace with Node.js. The local preview is at `http://localhost:4173` while that server is running.

## Publish on GitHub Pages

1. Create a GitHub repository, for example `our-rewind`.
2. Upload **the contents of this folder** to the repository root, including `assets/`, `.nojekyll`, and `.github/workflows/pages.yml`. Do not upload the parent workspace or the review folders.
3. Use `main` as the default branch.
4. In the repository's **Settings → Pages**, choose **GitHub Actions** under **Build and deployment → Source**.
5. In **Actions**, run **Publish our rewind**, or push another change to `main`.
6. Wait for deployment to succeed. Pages will show the final URL, usually `https://YOUR-USERNAME.github.io/our-rewind/`.

The included workflow deploys the repository root. All website asset URLs are relative, so a project URL works without code changes.

Official setup instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## QR code

Generate the QR only after the final published URL is known and verified. The QR should encode the public HTTPS website URL, not a local file or localhost preview. Changing content in the same repository will keep that URL and the QR working.

## Edit the surprise

- Main copy and love letter: `index.html`
- Photo captions, filters, and video titles: `app.js`
- Colors, layouts, and animations: `style.css`
- Scroll chapter styling: `motion.css` (scroll behavior lives in `app.js`)
- Photos and videos: `assets/`

The original Desktop files have not been modified. Website copies of photos were resized to a maximum of 1600 pixels and re-encoded without EXIF metadata. Selected videos were remuxed as MP4 with the original picture and sound; container metadata was removed.

The site requests search engines not to index it. This is not access control: visitors who have the URL can view the site and its media. Fonts load from Google Fonts with local fallback fonts if offline.
