<script>
  import Button from "$lib/components/Button.svelte";
  import SocialIcon from "$lib/components/SocialIcon.svelte";
  import Rail from "$lib/components/Rail.svelte";
  import EndorsementMarquee from "$lib/components/EndorsementMarquee.svelte";
  import Priorities from "$lib/components/Priorities.svelte";
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
        <p class="home-hero-lead">{$messages.home.heroLead}</p>
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
    </div>
  </section>

  <!-- 1b. Endorsements marquee -->
  <EndorsementMarquee />

  <!-- 2. Priorities -->
  <Priorities />

  <!-- 5. Community image -->
  <section class="home-community" aria-label={$messages.home.communityAria}>
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

  <!-- 6. Get involved -->
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
      <div class="home-social-block">
        <p class="home-social-label">{$messages.home.followCampaign}</p>
        <div class="home-social" aria-label={$messages.home.socialAria}>
          {#each socialLinks as link}
            <a
              href={link.href}
              class="home-social-link"
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

  <!-- 7. Footer note: global Footer in +layout -->
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
    gap: clamp(2rem, 5vw, 4.5rem);
    align-items: center;
    text-align: left;
    color: var(--paper);
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
    object-position: center top;
    display: block;
    transform: scale(1.55);
    transform-origin: center 26%;
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

  .home-hero-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: flex-start;
    align-items: center;
  }

  .home-hero-cta :global(.btn) {
    min-width: 11rem;
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
    color: var(--paper);
    text-decoration: none;
    border: 2px solid rgba(255, 255, 255, 0.85);
    border-radius: 0;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
  }

  .home-btn-ghost:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: var(--paper);
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
    background: var(--color-white);
    padding-bottom: clamp(4rem, 10vw, 6rem);
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
    border: 1px solid var(--line-l);
    text-decoration: none;
    color: inherit;
    transition:
      border-color 0.2s ease,
      background 0.2s ease;
    background: var(--color-white);
  }

  .home-involve-card:hover {
    border-color: var(--ink);
    background: var(--paper-2);
  }

  .home-involve-card--accent {
    background: var(--ink);
    border-color: var(--ink);
    color: var(--paper);
  }

  .home-involve-card--accent:hover {
    background: var(--ink-2);
    border-color: var(--ink-2);
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

  .home-social-block {
    text-align: center;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(0, 35, 56, 0.08);
  }

  .home-social-label {
    font-family: var(--display);
    font-style: italic;
    font-size: 0.8125rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--blue);
    margin: 0 0 1rem;
  }

  .home-social {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }

  .home-social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    color: var(--ink);
    border-radius: 0;
    transition: background 0.2s ease;
  }

  .home-social-link:hover {
    background: rgba(15, 37, 69, 0.08);
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

    .home-wrap {
      padding-left: 0;
      padding-right: 0;
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
