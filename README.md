# My Website - Cinephile (Improved)

This folder contains a simple static site showcasing movies and series. I added UI improvements: search, filters, favorites (localStorage), modal details, pagination, accessibility tweaks, and performance tweaks (image lazy-loading). Posters and `data.js` are unchanged.

How to preview locally

- Option A: Open `index.html` directly in the browser (double-click). Some features (e.g., relative asset loading) work without a server.

- Option B: Run a simple static server (recommended):

  PowerShell:

  ```powershell
  # from inside the my-website-main folder
  python -m http.server 3000; Start-Sleep -s 1
  ```

  Or using Node (if installed):

  ```powershell
  npx http-server -p 3000
  ```

Then open `http://localhost:3000` in your browser.

Notes

- I did not modify `data.js` or any files inside `posters/` as requested.
- Favorites are stored in `localStorage` under the key `cine_favorites`.

Next steps (optional)

- Add tags/genres to `data.js` and UI filters.
- Add deployment steps (Netlify/Vercel) and metadata (OG tags).
- Implement server-side search for large datasets.
