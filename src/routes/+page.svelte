<script>
  import Button from "$lib/components/Button.svelte";
  import SocialIcon from "$lib/components/SocialIcon.svelte";
  import Rail from "$lib/components/Rail.svelte";
  import EndorsementMarquee from "$lib/components/EndorsementMarquee.svelte";
  // Priorities is hidden until the campaign finalizes the section copy. To unhide:
  // restore this import, swap <PoliciesSummary /> back to <Priorities /> below, and
  // (optionally) drop the PoliciesSummary import + component.
  // import Priorities from "$lib/components/Priorities.svelte";
  import PoliciesSummary from "$lib/components/PoliciesSummary.svelte";
  import Media from "$lib/components/Media.svelte";
  import { messages } from "$lib/i18n/locale";
  import { socialLinks } from "$lib/data/socialLinks";
</script>

<svelte:head>
  <title>Peter Crosby for Congress</title>
  <meta name="description" content={$messages.home.metaDescription} />
  <!-- Hero LCP: Peter portrait before CSS paints -->
  <link rel="preload" href="/images/peter.jpg" as="image" />
</svelte:head>

<main class="home-page">
  <!-- 1. Hero -->
  <section class="home-hero" aria-label={$messages.home.heroTitle}>
    <div class="home-hero-inner">
      <div class="home-hero-copy">
        <p class="home-hero-kicker">{$messages.home.heroKicker}</p>
        <h1 class="home-hero-title">{$messages.home.heroTitle}</h1>
        {#each $messages.home.heroLead as para}
          <p class="home-hero-lead">{para}</p>
        {/each}
        <a href="/events" class="home-hero-events-link">{$messages.home.heroEventsLink}</a>
        <div class="home-hero-cta">
          <Button href="https://secure.actblue.com/donate/peter-crosby-1"
            >{$messages.home.donate}</Button
          >
          <a href="/volunteer" class="home-btn-ghost"
            >{$messages.home.involveVolunteer}</a
          >
        </div>
      </div>
      <div class="home-hero-media">
        <Rail />
        <div class="home-hero-portrait-frame">
          <img
            src="/images/peter.jpg"
            alt="Peter Crosby"
            class="home-hero-portrait"
            width="1200"
            height="1800"
            fetchpriority="high"
            loading="eager"
            decoding="sync"
          />
        </div>
      </div>
      <div class="home-hero-social">
        <p class="home-hero-social-label">{$messages.home.followCampaign}</p>
        <div class="home-hero-social-row" aria-label={$messages.home.socialAria}>
          {#each socialLinks as link}
            <a
              href={link.href}
              class="home-hero-social-link"
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon name={link.icon} size={22} />
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- 1b. Endorsements marquee -->
  <EndorsementMarquee />

  <!-- 2. Priorities (hidden until campaign copy is ready — see import note above) -->
  <!-- <Priorities /> -->
  <PoliciesSummary />

  <!-- 3. Get involved -->
  <section class="home-section home-involve" aria-labelledby="involve-heading">
    <div class="home-wrap">
      <h2 id="involve-heading" class="home-section-title">
        {$messages.home.involveTitle}
      </h2>
      <p class="home-section-intro">{$messages.home.involveIntro}</p>
      <div class="home-involve-grid">
        <a
          href="https://secure.actblue.com/donate/peter-crosby-1"
          class="home-involve-card home-involve-card--accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="home-involve-label">{$messages.home.involveDonate}</span>
          <span class="home-involve-desc"
            >{$messages.home.involveDonateDesc}</span
          >
        </a>
        <a href="/volunteer" class="home-involve-card">
          <span class="home-involve-label"
            >{$messages.home.involveVolunteer}</span
          >
          <span class="home-involve-desc"
            >{$messages.home.involveVolunteerDesc}</span
          >
        </a>
        <a href="/events" class="home-involve-card">
          <span class="home-involve-label">{$messages.home.involveEvents}</span>
          <span class="home-involve-desc"
            >{$messages.home.involveEventsDesc}</span
          >
        </a>
        <a href="/contact" class="home-involve-card">
          <span class="home-involve-label">{$messages.home.involveContact}</span
          >
          <span class="home-involve-desc"
            >{$messages.home.involveContactDesc}</span
          >
        </a>
      </div>
    </div>
  </section>

  <!-- 4. Media -->
  <Media />

  <!-- 5. Community image -->
  <section class="home-community" aria-label={$messages.home.communityAria}>
    <Rail />
    <div class="home-community-img-wrap">
      <img
        src="/images/family_peter.png"
        alt={$messages.home.communityAlt}
        class="home-community-img"
        loading="lazy"
        decoding="async"
        sizes="100vw"
      />
    </div>
    <div class="home-community-caption">
      <p class="home-community-quote">{$messages.home.communityQuote}</p>
    </div>
  </section>

  <!-- 6. Footer note: global Footer in +layout -->
</main>

<style>
  main.home-page {
    padding: 0;
    background: var(--color-white);
  }

  .home-wrap {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1.5rem;
    box-sizing: border-box;
  }

  /* —— Hero —— */
  .home-hero {
    position: relative;
    min-height: min(78vh, 720px);
    display: flex;
    align-items: center;
    padding: 3.25rem 1.5rem 2.75rem;
    overflow: hidden;
    background: var(--ink-deep);
  }

  .home-hero-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    column-gap: clamp(2rem, 5vw, 4.5rem);
    row-gap: clamp(1.75rem, 4vw, 2.5rem);
    align-items: center;
    text-align: left;
    color: var(--paper);
  }

  .home-hero-social {
    grid-column: 1 / -1;
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid var(--line-d);
  }

  .home-hero-social-label {
    font-family: var(--display);
    font-style: italic;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--sky);
    margin: 0 0 0.85rem;
  }

  .home-hero-social-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;
  }

  .home-hero-social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    color: var(--paper);
    transition:
      background 0.2s ease,
      color 0.2s ease;
  }

  .home-hero-social-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--sky);
  }

  .home-hero-copy {
    min-width: 0;
  }

  /* Framed portrait with ridge-line stripe along the top */
  .home-hero-media {
    width: 100%;
    max-width: 420px;
    justify-self: end;
  }

  .home-hero-portrait-frame {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4 / 5;
    border: 1px solid var(--line-d);
    border-top: none;
    background: var(--ink-2);
  }

  .home-hero-portrait {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* peter.jpg is a full standing shot — anchor the top and zoom in so it
       frames chest-up without cropping the top of his head. */
    object-position: center top;
    transform: scale(1.35);
    transform-origin: center top;
    display: block;
  }

  .home-hero-kicker {
    font-family: var(--display);
    font-style: italic;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--sky);
    margin: 0 0 1rem;
  }

  .home-hero-title {
    font-family: var(--display);
    font-style: italic;
    font-size: clamp(2rem, 5.5vw, 3.25rem);
    font-weight: 900;
    line-height: 1.02;
    margin: 0 0 1.25rem;
    letter-spacing: -0.04em;
  }

  .home-hero-lead {
    font-family: var(--serif);
    font-size: clamp(1.0625rem, 2.2vw, 1.25rem);
    line-height: 1.5;
    margin: 0 0 1.75rem;
    opacity: 0.95;
    max-width: 32rem;
  }

  /* Tertiary text link to the events page — sits between the lede and the
     solid Donate/Volunteer CTAs. */
  .home-hero-events-link {
    display: inline-flex;
    align-items: center;
    margin: 0 0 1.75rem;
    font-family: var(--display);
    font-style: italic;
    font-size: 0.9375rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--sky);
    text-decoration: none;
  }

  .home-hero-events-link:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .home-hero-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: flex-start;
    align-items: center;
  }

  /* Both CTAs share one flex sizing so they always match width — whether side by
     side or wrapped/stacked (which happens whenever the copy column is narrow).
     border-box + a shared cap make the outer widths equal despite the Button's
     fixed width / different padding from the ghost link. */
  .home-hero-cta :global(.btn),
  .home-hero-cta .home-btn-ghost {
    box-sizing: border-box;
    flex: 1 1 11rem;
    width: auto;
    min-width: 11rem;
    max-width: 15rem;
  }

  /* Donate CTA: green fill (matching the nav) with white text for legibility on the dark hero. */
  .home-hero-cta :global(.btn-secondary) {
    background: var(--green);
    border-color: var(--green);
    color: var(--paper);
  }

  .home-hero-cta :global(.btn-secondary:hover:not(.disabled)) {
    background: #1d4a1f;
    border-color: #1d4a1f;
  }

  .home-btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 11rem;
    padding: 0.8rem 1.5rem;
    font-family: var(--display);
    font-style: italic;
    font-size: 0.8125rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-deep);
    background: var(--paper);
    text-decoration: none;
    border: 2px solid var(--paper);
    border-radius: 0;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;
  }

  .home-btn-ghost:hover {
    background: var(--sky);
    border-color: var(--sky);
    color: var(--ink-deep);
  }

  /* —— Sections —— */
  .home-section {
    padding: clamp(3.5rem, 8vw, 5.5rem) 0;
  }

  .home-section-title {
    font-family: var(--display);
    font-style: italic;
    font-size: clamp(1.625rem, 3.2vw, 2.25rem);
    font-weight: 900;
    color: var(--ink);
    text-align: center;
    margin: 0 0 0.75rem;
    line-height: 1.05;
    letter-spacing: -0.035em;
  }

  .home-section-intro {
    font-family: var(--serif);
    font-size: 1.125rem;
    line-height: 1.55;
    color: var(--ink-2);
    text-align: center;
    max-width: 36rem;
    margin: 0 auto 2.5rem;
  }

  /* Community */
  .home-community {
    padding: 0;
  }

  .home-community-img-wrap {
    width: 100%;
    max-height: min(70vh, 560px);
    overflow: hidden;
  }

  .home-community-img {
    width: 100%;
    height: min(70vh, 560px);
    object-fit: cover;
    object-position: center 25%;
    display: block;
  }

  /* As the frame widens, cover crops more off the top — bias the focal
     point upward so heads stay in frame on wide/widescreen viewports. */
  @media (min-width: 1150px) {
    .home-community-img {
      object-position: center 12%;
    }
  }

  @media (min-width: 1600px) {
    .home-community-img {
      object-position: center top;
    }
  }

  .home-community-caption {
    background: var(--ink);
    color: var(--paper);
    padding: 1.5rem 1.5rem 2rem;
    text-align: center;
  }

  .home-community-quote {
    font-family: var(--serif);
    font-style: italic;
    font-size: clamp(1.0625rem, 2.5vw, 1.375rem);
    font-weight: 400;
    line-height: 1.45;
    margin: 0;
    max-width: 36rem;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.95;
  }

  /* Get involved */
  .home-involve {
    background: var(--ink-deep);
    color: var(--paper);
    padding-bottom: clamp(4rem, 10vw, 6rem);
  }

  /* Dark-ground overrides for the (shared) section title + intro. */
  .home-involve .home-section-title {
    color: var(--paper);
  }

  .home-involve .home-section-intro {
    color: rgba(247, 250, 252, 0.8);
  }

  .home-involve-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .home-involve-card {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 1.5rem 1.25rem;
    border-radius: 0;
    border: 1px solid var(--line-d);
    text-decoration: none;
    color: inherit;
    transition:
      border-color 0.2s ease,
      background 0.2s ease;
    background: var(--ink-2);
  }

  .home-involve-card:hover {
    border-color: var(--sky);
    background: var(--ink-2);
  }

  .home-involve-card--accent {
    background: var(--green);
    border-color: var(--green);
    color: var(--paper);
  }

  .home-involve-card--accent:hover {
    background: #1d4a1f;
    border-color: #1d4a1f;
    color: var(--paper);
  }

  .home-involve-label {
    font-family: var(--display);
    font-style: italic;
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  .home-involve-desc {
    font-family: var(--font-primary);
    font-size: 0.875rem;
    line-height: 1.45;
    opacity: 0.92;
  }

  .home-involve-card--accent .home-involve-desc {
    opacity: 0.95;
  }

  @media (max-width: 768px) {
    /* Readable alignment vs layout-wide justified paragraphs */
    .home-page p {
      text-align: left;
    }

    .home-hero {
      width: 100vw;
      max-width: 100vw;
      margin-left: calc(-1 * var(--mobile-margin));
      margin-right: calc(-1 * var(--mobile-margin));
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      box-sizing: border-box;
    }

    .home-hero-inner {
      grid-template-columns: 1fr;
      gap: 2.25rem;
    }

    .home-hero-media {
      justify-self: center;
      max-width: 320px;
    }

    /* Stack the hero CTAs on mobile (matching the single-column hero). Reset the
       children's flex (in a column it would size their HEIGHT) so height stays
       content-sized; width comes from align-items: stretch, capped by max-width,
       which keeps the stacked buttons equal width and left-aligned. */
    .home-hero-cta {
      flex-direction: column;
      align-items: stretch;
    }

    .home-hero-cta :global(.btn),
    .home-hero-cta .home-btn-ghost {
      flex: 0 0 auto;
    }

    .home-wrap {
      padding-left: 0;
      padding-right: 0;
    }

    /* Dark section bleeds edge-to-edge on mobile (like the hero + community). */
    .home-involve {
      width: 100vw;
      max-width: 100vw;
      margin-left: calc(-1 * var(--mobile-margin));
      margin-right: calc(-1 * var(--mobile-margin));
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      box-sizing: border-box;
    }

    .home-involve-grid {
      grid-template-columns: 1fr;
    }

    .home-section-intro {
      margin-bottom: 2rem;
    }

    /* Family photo: full width, whole image fits on screen */
    .home-community {
      margin-left: calc(-1 * var(--mobile-margin));
      margin-right: calc(-1 * var(--mobile-margin));
      width: 100vw;
      max-width: 100vw;
      box-sizing: border-box;
    }

    .home-community-img-wrap {
      max-height: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-white);
    }

    .home-community-img {
      width: 100%;
      height: auto;
      max-height: min(92vh, 960px);
      object-fit: contain;
      object-position: center center;
    }
  }
</style>
