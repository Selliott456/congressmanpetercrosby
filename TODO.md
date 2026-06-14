# TODO

Running list of open items to review and decide on. Not commitments — discussion notes.

---

## Pull the 3 most recent Instagram posts into the homepage "Media" section

**Status:** Feasibility discussed, not started. To review with the campaign manager /
comms director before any build.

**Short answer:** Yes, it's doable — but there's no "fetch a URL and get the latest
posts" path anymore. Instagram requires authentication and (realistically) server-side
caching.

### Why it's not trivial

- There's **no public/unauthenticated API**. Scraping the profile page violates Meta's
  ToS, breaks whenever they change markup, and gets rate-limited / login-walled.
- The old easy consumer route, the **Instagram Basic Display API, was shut down by Meta
  on Dec 4, 2024**. So that option is gone.
- The supported route today is the **Instagram Graph API**, which has a hard
  prerequisite: the campaign's account must be a **Business or Creator account linked to a
  Facebook Page**, with a **Meta developer app** and an access token. (Verify the account
  type first — this is a campaign-side setup task, not a code task, and it gates
  everything.)

### Three realistic paths

| | Approach | Effort | Brand control | Maintenance | Cost |
|---|---|---|---|---|---|
| **A** | Third-party widget (Behold.so, LightWidget, Curator) | Lowest | Low–Med | They handle tokens/refresh | Free→~$5–15/mo |
| **B** | DIY: Graph API + Netlify scheduled function caching to JSON, render in our own `MediaCard` style | Medium | **Full** | We own token refresh | Free |
| **C** | Official per-post embed of hand-picked posts | Low | Low | Manual | Free |

Path **C** is out — it doesn't auto-pull "3 most recent," you pick posts by hand.

### Recommendation

Given the carefully branded Media section (`MediaCard`, dark cards, the Rail motif), avoid
a vendor widget that injects its own iframe/styling. Two good options:

1. **Behold.so's JSON API (hybrid)** — Behold handles the painful parts (auth, the
   **60-day token that will silently expire and break the feed mid-campaign**, caching,
   rate limits) and gives a clean JSON feed. We fetch that server-side and render the 3
   posts in our *own* branded cards. Best effort-to-quality ratio, minimal maintenance
   risk.
2. **Full DIY (Path B)** — Meta app + token, a Netlify Scheduled Function that pulls every
   few hours into Netlify Blobs (or a cached JSON), refreshes the long-lived token, and
   the homepage reads the cache. Zero third-party dependency and fully on-brand, but *we*
   own the token-refresh job — and on a campaign timeline, a forgotten token expiry is the
   classic failure.

Either way the integration is the same on our side: map IG posts (image/reel thumbnail,
caption, permalink) into the existing `MediaItem`-style shape, add a small "From
Instagram" sub-row beneath the homepage Media section, fetch **server-side** (token never
touches the client), and **fail gracefully** (hide the row if the feed is unavailable so
it never blocks the hero LCP).

### What's needed before building

1. **Is the campaign IG a Business/Creator account linked to a Facebook Page?** If not,
   that conversion has to happen first.
2. Comfort level with a **third-party service** (Behold) vs. **self-hosted token
   maintenance** (DIY).

---

## Wire real videos into the Policies page (replace placeholders)

**Status:** Placeholders built and live on `/policies`. Awaiting Peter's clips.

Each policy section on [`/policies`](src/routes/policies/+page.svelte) currently shows a
**static branded video placeholder** on the right (16:9 navy thumb, Rail stripe, play
triangle, "VIDEO COMING SOON" badge) — one per policy position. These are decorative; they
don't play anything yet.

**When the real clips exist**, the natural next step:

1. Give each policy item a `youtubeId` (added to the i18n `items`, or a small parallel data
   array keyed by position).
2. Swap the placeholder for the existing on-site **`VideoLightbox`** flow that the Media
   section already uses (`MediaCard` → `VideoLightbox`), so policy videos open in the same
   branded modal rather than linking out.
3. Keep a graceful fallback: any position without a clip keeps the current placeholder.

**Needed:** the video files / YouTube IDs, one per policy position (currently 4 positions).

---

## Get real endorsements from the campaign (replace placeholders)

**Status:** Page and marquee built with **placeholder** names/orgs. Awaiting real data.

The `/endorsements` page (People + Businesses & organizations sections) and the homepage
scrolling **EndorsementMarquee** both read from the same source
([`src/lib/data/endorsements.ts`](src/lib/data/endorsements.ts)) — currently filled with
placeholder names. Real endorsements flow into both automatically once the data is updated.

**Needed from the campaign:** the list of endorsers, each with name, category
(person vs. business/organization), optional title/role (e.g. "Mayor, Kaysville"), and
optional photo/logo. Spanish role translations too, where applicable.

---

## Comms direction on media content (YouTube + print)

**Status:** Media section is **placeholder** (videos point at a stand-in clip; article
links go to outlet homepages). Awaiting direction.

Need the comms director to give clear direction on:

1. The campaign's **YouTube channel** — which videos to feature, and their IDs/URLs.
2. Any **print media** (op-eds, interviews, endorsements in papers) I should know about to
   fill in the media content.

This feeds [`src/lib/data/media.ts`](src/lib/data/media.ts) (home Media section + `/media`
archive). Relates to the Instagram item above if we also pull social posts.
