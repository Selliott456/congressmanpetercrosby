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

---

## Forms & Netlify access — constraints and the hosting question

**Status:** Working today, but management is gated by account access. Plan a path off it.

**How the form works now:** Netlify Forms detects the schema at deploy from
[`static/netlify-form-detection.html`](static/netlify-form-detection.html) (form named
`contact`). The volunteer [server action](src/routes/volunteer/+page.server.ts) validates
input, then POSTs it server-side to that detection path, where Netlify captures it.
Submissions, notifications, spam settings, exports, and build env vars all live in the
**Netlify dashboard**.

**Access situation (clarified):**
- The site is hosted on the **previous website owner's personal Netlify account**. They
  could no longer maintain the site, but their **spouse is still actively engaged in the
  campaign** — so there is **no immediate fear of the setup being orphaned**.
- **The campaign IS receiving form submissions today** — so the earlier "submissions may be
  invisible" concern does not apply. Delivery is working.
- What we still can't do without dashboard access: change notification routing, spam
  settings, exports, or set build env vars / API secrets.

**What this limits in code:**
- Form **UX/behavior** (fields, validation, layout, success/error states, conditional
  logic, merging contact + volunteer) — fully in our control, repo/client side.
- `netlify.toml` (redirects, headers) — in our control (deploys from repo).
- Form **delivery destination** and notifications — NOT in our control (dashboard-gated).
- Any server approach needing a **private API key** (e.g. Resend/SendGrid email) — blocked,
  since build env vars are dashboard-gated.

**If we ever want delivery independent of the Netlify account:** move to a form service that
accepts a client-side POST with a *public* access key (Formspree, Basin, Web3Forms,
Formspark, Getform). Campaign owns the inbox/dashboard; no host access or server secrets
needed. Swap the server action's Netlify POST for the service endpoint and drop the
detection HTML; keep all existing validation/UX. Not urgent while delivery works — listed
as the unblock path.

> **CALLOUT — move to campaign-owned hosting.** The campaign should migrate the site to a
> **campaign-owned hosting/Netlify account** (current owner initiates a Netlify site
> transfer, or we redeploy fresh on a campaign account). Even though there's no immediate
> orphaning risk, owning the hosting eliminates all of these access hurdles — submission
> management, notifications, env vars, spam settings, deploy control — in one move. Decide
> and schedule this with the campaign manager.

---

## Three form types + forwarding emails needed

**Status:** Volunteer form exists; two more wanted. Awaiting destination emails per form.

The campaign wants **three** distinct forms:

1. **Volunteer** — already exists ([`/volunteer`](src/routes/volunteer/+page.svelte)).
   Destination is **changing** (see below).
2. **Media contacts / requests** — new (press inquiries, interview requests).
3. **General contacts / requests** — new (catch-all questions/messages).

**Needed from the campaign:** the **forwarding/destination email for each of the three
forms**. Right now **all submissions go to Peter (the candidate)** — the campaign wants
these routed to the appropriate person/inbox per form instead.

**Notes / dependencies:**
- Routing per form depends on the delivery setup. With the **current Netlify Forms** flow,
  per-form notification routing is **dashboard-gated** (we don't have access). With a
  **campaign-owned form service** (see the Netlify/forms item above), each form can have its
  own destination set in an account the campaign controls — so this is another reason the
  delivery-migration path matters.
- Each new form needs: UI page + validation/UX (in our control), a Netlify detection entry
  or service form id, and en+es copy. Likely a shared form component to avoid duplicating
  the volunteer form's markup three times.

---

## Upgrade Formspree & finish the RSVP round-trip on a Pro account

**Status:** RSVP → Formspree is built and working on the **free** Formspree account
(endpoint `https://formspree.io/f/xnjylwar`). Form lives on the Events page
([`RsvpModal.svelte`](src/lib/components/RsvpModal.svelte) → `EventCard` → events page).

**To do once the campaign buys the Professional tier:**
1. **Upgrade the Formspree account to Professional** (free tier caps at ~50
   submissions/month — too low for live RSVP volume).
2. **Confirm the form** in Formspree (first real submission triggers an owner-verification
   email) so submissions stop being held.
3. **Enable the autoresponse / confirmation email** to the submitter (the success message
   already promises "We emailed a confirmation to you" — the `email` field is sent as
   reply-to, so this just needs turning on in the form settings).
4. **Complete a real end-to-end round-trip test:** submit an RSVP, confirm the campaign
   receives the submission AND the submitter receives the confirmation email, with the
   event name/date showing correctly (sent as `event`, `eventDate`, `_subject`).
5. Consider per-form routing once the other forms (Volunteer, Media, General — see the
   "Three form types" item) move to Formspree too.

---

## Finalize the event category list with the campaign

**Status:** Filtering is built and working; the category taxonomy is a first draft.

The events page now filters by `type` ([`EventType`](src/lib/data/events.ts) →
`'town-hall' | 'rally' | 'meet-greet' | 'volunteer' | 'other'`), with filter chips for
**All · Town hall · Meet & greet · Rally · Volunteer training** (default All). The
**Next Event** highlight intentionally skips `volunteer` events to stay voter-facing.

**Needs campaign input — refine and finalize the categories:**
- The four named types don't cover everything in the real/placeholder data. ~13 events
  (caucuses, conventions, TikTok/virtual lives, social events like happy hours, potlucks,
  awards dinners) are currently typed **`other`**, which has **no filter chip** — they show
  only under "All."
- Decide the final category set: e.g. add an **"Other"** chip so everything is reachable,
  and/or add real categories like **Caucus/Convention** and **Virtual / Live**.
- Confirm the **labels** (and Spanish translations) for each category.
- Confirm the **Next Event exclusion** rule (currently: skip volunteer training — open to
  excluding other internal/organizing event types too).

Once finalized: update the `EventType` union, re-tag events, and add chips + en/es labels.
