# Whitney Fest — complete GitHub + Vercel website

## Upload to GitHub / deploy to Vercel

Upload **the contents of this folder** into the directory Vercel uses as its Root Directory. Keep `index.html` and `api/` together. Your previous root directory was `Hamilton_Weekend_Vercel_Saturday_Updated` — replace the contents of that folder on GitHub or update Vercel’s Root Directory to the new folder.

## Required Vercel environment variables

1. `LAKSHANA_PASSWORD` — your existing Lakshana password (keep secret; do not commit it).
2. `WEEKEND_SESSION_SECRET` — a different, randomly generated secret (at least 32 random bytes).
3. `UPSTASH_REDIS_REST_URL` — from an Upstash Redis database connected to your Vercel project.
4. `UPSTASH_REDIS_REST_TOKEN` — from the same Upstash Redis database.

To add Redis, in Vercel project go to **Storage / Marketplace**, choose Upstash Redis, create/connect a database, then make sure the URL/token variables are configured for Production. Redeploy after adding/changing environment variables. In some Vercel integrations, the equivalents are `KV_REST_API_URL` and `KV_REST_API_TOKEN`; this project supports either naming scheme.

No database credentials means the manual reveal feature **cannot save anything**. Friend Mode will indicate the server feature is unavailable. An error will appear in Lakshana Mode's control panel. This is safer than pretending a browser-local switch is shared with friends.

## How release works

- On first launch, every day is **hidden**.
- Sign in to Lakshana Mode, then use **Reveal / Hide** next to each day or **Reveal all / Hide all**.
- Changes are saved in Redis and shared across all devices. Friends will see the latest changes when they switch days or refresh.
- The `/api/itinerary` endpoint never returns a hidden day's private itinerary to unauthenticated visitors.
- Existing shopping list checkmarks and choices are still per-browser, as before.

## Security

Keep GitHub repository private. The password has no hardcoded fallback in `api/_auth.js`; after deploying, set your existing password as a Vercel environment variable. The website uses a signed HttpOnly session cookie. Avoid sharing the Lakshana password.

## Latest itinerary

Updated with the latest user-supplied `api/_data.js` content: The Arrival of Agh, Friday arrival information, PARTYTIME on Saturday, Cowabunga+ at 30 Vine St for Saturday lunch, and the complete Sunday activities, restaurants and shopping list. Headline summaries are hidden in both viewing modes.

## Repository layout

Upload the files at the root of this ZIP to the existing Vercel Root Directory (`Hamilton_Weekend_Vercel_Saturday_Updated`), or set the project Root Directory to the location containing `index.html`, `api/` and `vercel.json`. Do not upload the ZIP as a single file to GitHub.

## Fix for “Unexpected token 'T' ... is not valid JSON”
This error indicates an API request returned text/HTML instead of JSON. In the new version, the UI shows the endpoint and HTTP status rather than a confusing parse error. Check `https://YOUR-DOMAIN.vercel.app/api/health`. The output should be JSON with `ok: true`; it also reports (without exposing values) whether authentication and Redis settings are configured. If `/api/health` itself gives 404/HTML, check the Vercel Root Directory and ensure `api/` was committed beside `index.html`, then redeploy. A 401/403 can mean deployment protection. If Redis is not configured, Friend Mode keeps all unreleased days locked and Lakshana Mode explains why publishing controls cannot save.
