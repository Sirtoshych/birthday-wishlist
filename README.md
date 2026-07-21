# Birthday Wishlist

Static wishlist page with a "claim a gift" button and a builder page for
adding items, backed by Cloudflare Pages Functions + KV (all free tier).
KV binding is declared in `wrangler.jsonc`.

## Files

- `index.html` — public wishlist page, guests can claim/unclaim items
- `builder.html` — add/delete items (open to anyone with the link — no passcode)
- `functions/api/items.js` + `functions/api/items/[id].js` — the API (Cloudflare Pages Functions)
- KV storage holds the item list under the key `items`

## Deploy steps

### 1. Push to GitHub

```
cd birthday-wishlist
git init
git add .
git commit -m "Initial wishlist"
gh repo create birthday-wishlist --public --source=. --push
```

(Or create the repo on github.com and `git push` manually.)

### 2. Connect Cloudflare Pages

1. Go to the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick the `birthday-wishlist` repo.
3. Build settings: framework preset **None**, build command empty, output directory `/` (root).
4. Deploy. You'll get a URL like `https://birthday-wishlist-xyz.pages.dev`.

### 3. Create the KV namespace and bind it

1. Dashboard → **Workers & Pages** → **KV** → **Create namespace**, name it e.g. `wishlist_items`.
2. Go back to your Pages project → **Settings** → **Functions** → **KV namespace bindings** → **Add binding**.
   - Variable name: `ITEMS_KV`
   - KV namespace: `wishlist_items`
3. Redeploy (Settings changes require a new deployment — retrigger via **Deployments** → **Retry deployment**, or just push a new commit).

### 4. Share the link

- Send guests: `https://<your-project>.pages.dev/`
- Use `https://<your-project>.pages.dev/builder.html` yourself to add items.

### Optional: custom domain

Pages project → **Custom domains** → add a domain you own (free, just DNS).

### Note on the builder page

It's not password protected (by your choice) — anyone with the `/builder.html`
link can add or delete items. Don't post that link publicly; only use it yourself.
