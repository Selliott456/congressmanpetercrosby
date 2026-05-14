<script>
  import ButtonSecondary from "$lib/components/ButtonSecondary.svelte";
  import { messages } from "$lib/i18n/locale";

  const socialLinks = [
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@petercrosbyforcongress?is_from_webapp=1&sender_device=pc",
      icon: "tiktok",
      label: "TikTok",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@PeterCrosbyforCongress",
      icon: "youtube",
      label: "YouTube",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/petercrosbyut/",
      icon: "instagram",
      label: "Instagram",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/people/Peter-Crosby-for-Congress/61583498494612/",
      icon: "facebook",
      label: "Facebook",
    },
    {
      name: "Substack",
      href: "https://substack.com/@petercrosbyforcongress?r=3en65r&utm_medium=ios&utm_source=profile",
      icon: "substack",
      label: "Substack",
    },
  ];

  const prioritySrcs = [
    "/images/better.svg",
    "/images/expensive.svg",
    "/images/inflation.svg",
    "/images/law.svg",
    "/images/safe.svg",
    "/images/save_lake.svg",
  ];

  $: pillars = $messages.home.pillars;
  $: priorities = $messages.home.priorities.map((p, i) => ({
    ...p,
    src: prioritySrcs[i],
  }));
</script>

<svelte:head>
  <title>Peter Crosby for Congress</title>
  <meta name="description" content={$messages.home.metaDescription} />
  <!-- Hero LCP: background photo + logo before CSS paints -->
  <link rel="preload" href="/images/trees.jpg" as="image" />
  <link
    rel="preload"
    href="/images/brand_strategy_square_cropped_transparent_bg_blue_002338.svg"
    as="image"
    type="image/svg+xml"
  />
</svelte:head>

<main class="home-page">
  <!-- 1. Hero -->
  <section class="home-hero" aria-label={$messages.home.heroTitle}>
    <div class="home-hero-bg" />
    <div class="home-hero-inner">
      <img
        src="/images/brand_strategy_square_cropped_transparent_bg_blue_002338.svg"
        alt="Peter Crosby for Congress"
        class="home-hero-logo"
        width="280"
        height="280"
        fetchpriority="high"
        loading="eager"
        decoding="sync"
      />
      <p class="home-hero-kicker">{$messages.home.heroKicker}</p>
      <h1 class="home-hero-title">{$messages.home.heroTitle}</h1>
      <p class="home-hero-lead">{$messages.home.heroLead}</p>
      <div class="home-hero-cta">
        <ButtonSecondary href="https://secure.actblue.com/donate/peter-crosby-1"
          >{$messages.home.donate}</ButtonSecondary
        >
        <a href="/volunteer" class="home-btn-ghost"
          >{$messages.home.involveVolunteer}</a
        >
        <a href="/about" class="home-btn-ghost">{$messages.home.meetPeter}</a>
      </div>
    </div>
  </section>

  <!-- 2. Values / trust pillars -->
  <section class="home-section home-pillars" aria-labelledby="pillars-heading">
    <div class="home-wrap">
      <h2 id="pillars-heading" class="home-section-title">
        {$messages.home.pillarsTitle}
      </h2>
      <p class="home-section-intro">{$messages.home.pillarsIntro}</p>
      <ul class="home-pillar-grid">
        {#each pillars as pillar}
          <li class="home-pillar-card">
            <h3 class="home-pillar-title">{pillar.title}</h3>
            <p class="home-pillar-text">{pillar.text}</p>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- 3. Why he’s running -->
  <section class="home-section home-why" aria-labelledby="why-heading">
    <div class="home-wrap home-why-grid">
      <div class="home-why-visual">
        <img
          src="/images/meet.svg"
          alt=""
          class="home-why-img"
          role="presentation"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="home-why-copy">
        <h2
          id="why-heading"
          class="home-section-title home-section-title--left"
        >
          {$messages.home.whyTitle}
        </h2>
        <p class="home-prose">{$messages.home.whyProse}</p>
        <a href="/faq" class="home-text-link">{$messages.home.whyLink}</a>
      </div>
    </div>
  </section>

  <!-- 4. Priorities / issues -->
  <section
    class="home-section home-priorities"
    aria-labelledby="priorities-heading"
  >
    <div class="home-wrap">
      <h2 id="priorities-heading" class="home-section-title">
        {$messages.home.prioritiesTitle}
      </h2>
      <p class="home-section-intro">{$messages.home.prioritiesIntro}</p>
      <ul class="home-priority-grid">
        {#each priorities as item}
          <li class="home-priority-item">
            <div class="home-priority-image-wrap">
              <img
                src={item.src}
                alt=""
                class="home-priority-img"
                role="presentation"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p class="home-priority-label">{item.label}</p>
          </li>
        {/each}
      </ul>
    </div>
  </section>

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
              {#if link.icon === "tiktok"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  ><path
                    d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                  /></svg
                >
              {:else if link.icon === "youtube"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  ><path
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  /></svg
                >
              {:else if link.icon === "instagram"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  ><path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                  /></svg
                >
              {:else if link.icon === "facebook"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  ><path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  /></svg
                >
              {:else if link.icon === "substack"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  ><path
                    d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
                  /></svg
                >
              {/if}
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
    justify-content: center;
    padding: 3.25rem 1.5rem 2.75rem;
    overflow: hidden;
  }

  .home-hero-bg {
    position: absolute;
    inset: 0;
    background-image: url("/images/trees.jpg");
    background-size: cover;
    background-position: center;
  }

  .home-hero-bg::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 35, 56, 0.55) 0%,
      rgba(0, 35, 56, 0.72) 50%,
      rgba(0, 35, 56, 0.85) 100%
    );
  }

  .home-hero-inner {
    position: relative;
    z-index: 1;
    max-width: 40rem;
    text-align: center;
    color: var(--color-white);
  }

  .home-hero-logo {
    width: min(200px, 42vw);
    height: auto;
    margin: 0 auto 1.25rem;
    display: block;
    filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.25));
  }

  .home-hero-kicker {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 0 0 1rem;
    opacity: 0.9;
  }

  .home-hero-title {
    font-family: var(--font-primary);
    font-size: clamp(1.875rem, 5vw, 2.75rem);
    font-weight: 700;
    line-height: 1.15;
    margin: 0 0 1.25rem;
    letter-spacing: -0.02em;
  }

  .home-hero-lead {
    font-family: var(--font-primary);
    font-size: clamp(1.0625rem, 2.2vw, 1.1875rem);
    line-height: 1.65;
    margin: 0 0 1.5rem;
    opacity: 0.95;
    max-width: 36rem;
    margin-left: auto;
    margin-right: auto;
  }

  .home-hero-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
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
    padding: 0.75rem 1.5rem;
    font-family: var(--font-primary);
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-white);
    text-decoration: none;
    border: 2px solid rgba(255, 255, 255, 0.85);
    border-radius: 8px;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
  }

  .home-btn-ghost:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: var(--color-white);
  }

  /* —— Sections —— */
  .home-section {
    padding: clamp(3.5rem, 8vw, 5.5rem) 0;
  }

  .home-section-title {
    font-family: var(--font-primary);
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    color: var(--color-primary);
    text-align: center;
    margin: 0 0 0.75rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .home-section-title--left {
    text-align: left;
  }

  .home-section-intro {
    font-family: var(--font-primary);
    font-size: 1.0625rem;
    line-height: 1.6;
    color: var(--color-primary);
    text-align: center;
    max-width: 36rem;
    margin: 0 auto 2.5rem;
    opacity: 0.88;
  }

  /* Pillars */
  .home-pillars {
    background: linear-gradient(180deg, #f5f8fa 0%, var(--color-white) 100%);
  }

  .home-pillar-grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .home-pillar-card {
    background: var(--color-white);
    border: 1px solid rgba(0, 35, 56, 0.08);
    border-radius: 12px;
    padding: 1.75rem 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 35, 56, 0.04);
  }

  .home-pillar-title {
    font-family: var(--font-primary);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-primary);
    margin: 0 0 0.65rem;
    line-height: 1.3;
  }

  .home-pillar-text {
    font-family: var(--font-primary);
    font-size: 0.9875rem;
    line-height: 1.65;
    color: var(--color-primary);
    margin: 0;
    opacity: 0.9;
  }

  /* Why */
  .home-why {
    background: var(--color-white);
  }

  .home-why-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }

  .home-why-visual {
    display: flex;
    justify-content: center;
  }

  .home-why-img {
    width: min(280px, 100%);
    height: auto;
  }

  .home-why-copy .home-section-title {
    margin-bottom: 1rem;
  }

  .home-prose {
    font-family: var(--font-primary);
    font-size: 1.0625rem;
    line-height: 1.75;
    color: var(--color-primary);
    margin: 0 0 1.25rem;
    max-width: 38rem;
  }

  .home-text-link {
    font-family: var(--font-primary);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-secondary);
    text-decoration: none;
  }

  .home-text-link:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* Priorities */
  .home-priorities {
    background: var(--color-accent);
    background: linear-gradient(
      135deg,
      #d4e4ed 0%,
      var(--color-accent) 50%,
      #e8eef4 100%
    );
  }

  .home-priority-grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .home-priority-item {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 0;
    overflow: hidden;
    border: 1px solid rgba(0, 35, 56, 0.06);
    min-height: 0;
  }

  .home-priority-image-wrap {
    flex: 1 1 auto;
    width: 100%;
    aspect-ratio: 1;
    min-height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.55);
  }

  .home-priority-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.75rem;
    box-sizing: border-box;
    display: block;
  }

  .home-priority-label {
    font-family: var(--font-primary);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-primary);
    line-height: 1.35;
    text-align: center;
    margin: 0;
    padding: 0.875rem 0.75rem 1rem;
    flex-shrink: 0;
    border-top: 1px solid rgba(0, 35, 56, 0.06);
    background: rgba(255, 255, 255, 0.85);
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
    background: var(--color-primary);
    color: var(--color-white);
    padding: 1.5rem 1.5rem 2rem;
    text-align: center;
  }

  .home-community-quote {
    font-family: var(--font-primary);
    font-size: clamp(1rem, 2.5vw, 1.1875rem);
    font-weight: 500;
    line-height: 1.5;
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
    border-radius: 12px;
    border: 1px solid rgba(0, 35, 56, 0.12);
    text-decoration: none;
    color: inherit;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
    background: var(--color-white);
  }

  .home-involve-card:hover {
    border-color: var(--color-secondary);
    box-shadow: 0 8px 28px rgba(0, 35, 56, 0.08);
    transform: translateY(-2px);
  }

  .home-involve-card--accent {
    background: var(--color-secondary);
    border-color: var(--color-secondary);
    color: var(--color-white);
  }

  .home-involve-card--accent:hover {
    background: #1d4a1f;
    border-color: #1d4a1f;
    color: var(--color-white);
  }

  .home-involve-label {
    font-family: var(--font-primary);
    font-size: 1.125rem;
    font-weight: 700;
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
    font-family: var(--font-primary);
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-primary);
    opacity: 0.75;
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
    color: var(--color-primary);
    border-radius: 10px;
    transition: background 0.2s ease;
  }

  .home-social-link:hover {
    background: rgba(0, 35, 56, 0.08);
  }

  @media (max-width: 900px) {
    .home-pillar-grid {
      grid-template-columns: 1fr;
      max-width: 28rem;
      margin: 0 auto;
    }

    .home-priority-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .home-why-grid {
      grid-template-columns: 1fr;
    }

    .home-why-copy .home-section-title {
      text-align: center;
    }

    .home-why-copy .home-prose,
    .home-text-link {
      text-align: left;
      display: block;
    }

    .home-why-copy {
      text-align: center;
    }

    .home-text-link {
      margin-top: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    /* Readable alignment vs layout-wide justified paragraphs */
    .home-page p,
    .home-page li {
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

    /* Priorities: no blue/accent band on mobile */
    .home-priorities {
      background: var(--color-white);
    }

    .home-priorities .home-section-intro {
      display: none;
    }

    .home-priorities .home-section-title {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    /* Override .home-page p left-align for labels under priority images */
    .home-priorities .home-priority-label {
      text-align: center;
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

  @media (max-width: 480px) {
    .home-priority-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
