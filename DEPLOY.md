# identiq-landing deployment

Marketing site for **tryidentiq.com**. The product app lives at **app.tryidentiq.com**.

## Local development

```bash
cd identiq-landing
npm install
cp .env.example .env.local
npm run dev
```

Runs on [http://localhost:3001](http://localhost:3001). Keep the main app on port 3000.

## Environment

| Variable | Example | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://tryidentiq.com` | Open Graph / metadata base |
| `NEXT_PUBLIC_APP_URL` | `https://app.tryidentiq.com` | Sign-in, start brand, privacy, terms links |

## Vercel (recommended)

1. Create a **second** Vercel project from this repo.
2. Set **Root Directory** to `identiq-landing`.
3. Add `NEXT_PUBLIC_APP_URL=https://app.tryidentiq.com`.
4. Attach domains: `tryidentiq.com` and redirect `www` → apex (or vice versa per your DNS).

The existing Identiq app project should use **Root Directory** `.` (repo root) and domain `app.tryidentiq.com`.

## Supabase / OAuth

Auth redirect URLs should target `https://app.tryidentiq.com/**` only. The marketing domain does not handle OAuth callbacks.
