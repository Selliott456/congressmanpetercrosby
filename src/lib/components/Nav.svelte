<script>
  import { page } from "$app/stores";
  import Rail from "./Rail.svelte";
  import YardSignModal from "./YardSignModal.svelte";
  import { messages } from "$lib/i18n/locale";

  const donateHref = "https://secure.actblue.com/donate/peter-crosby-1";

  $: links = [
    { label: $messages.nav.home, href: "/" },
    { label: $messages.nav.about, href: "/about" },
    { label: $messages.nav.policies, href: "/policies" },
    { label: $messages.nav.media, href: "/media" },
    { label: $messages.nav.events, href: "/events" },
    { label: $messages.nav.endorsements, href: "/endorsements" },
    { label: $messages.nav.contact, href: "/contact" },
  ];

  let menuOpen = false;

  /** Yard-sign request modal (opened from the bottom of the collapsed menu). */
  let showYardSign = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function openYardSign() {
    menuOpen = false;
    showYardSign = true;
  }
</script>

<nav class="nav">
  <Rail />
  <div class="nav-inner">
    <div class="nav-start">
      <a href="/" class="nav-logo" aria-label={$messages.nav.ariaHome}>
        <img
          src="/images/brand_strategy_logo_white.svg"
          alt=""
          class="nav-logo-img"
          width="200"
          height="72"
          fetchpriority="high"
          loading="eager"
          decoding="sync"
        />
      </a>
    </div>
    <ul class="nav-links">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="nav-link"
            class:active={$page.url.pathname === link.href ||
              (link.href !== "/" &&
                $page.url.pathname.startsWith(link.href))}
          >
            <span class="nav-link-inner">{link.label}</span>
          </a>
        </li>
      {/each}
    </ul>
    <div class="nav-right">
      <a href="/volunteer" class="nav-link nav-link-volunteer">
        <span class="nav-link-inner">{$messages.nav.volunteer}</span>
      </a>
      <a
        href={donateHref}
        class="nav-link nav-link-donate"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="nav-link-inner">{$messages.nav.donate}</span>
      </a>
      <button
        class="nav-toggle"
        aria-label={$messages.nav.menuToggle}
        aria-expanded={menuOpen}
        aria-controls="nav-menu"
        on:click={toggleMenu}
      >
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>
    </div>
  </div>
  <div
    id="nav-menu"
    class="nav-menu"
    class:open={menuOpen}
    aria-hidden={!menuOpen}
  >
    <ul class="nav-menu-links">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="nav-menu-link"
            class:active={$page.url.pathname === link.href ||
              (link.href !== "/" &&
                $page.url.pathname.startsWith(link.href))}
            on:click={() => (menuOpen = false)}
          >
            <span class="nav-menu-link-inner">{link.label}</span>
          </a>
        </li>
      {/each}
    </ul>
    <div class="nav-menu-actions">
      <button
        type="button"
        class="nav-menu-action nav-menu-action-yardsign"
        on:click={openYardSign}
      >
        {$messages.yardSign.requestButton}
      </button>
      <a
        href="/volunteer"
        class="nav-menu-action nav-menu-action-volunteer"
        on:click={() => (menuOpen = false)}
      >
        {$messages.nav.volunteer}
      </a>
    </div>
  </div>
</nav>

{#if showYardSign}
  <YardSignModal on:close={() => (showYardSign = false)} />
{/if}

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--color-primary);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  }

  .nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
    display: grid;
    /* Logo (auto) + links (1fr, left-aligned next to the logo) + actions (auto).
       Anchoring the links left of center instead of centering them frees the
       slack on the right, so the full nav survives down to 1024px before
       collapsing to the hamburger. */
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
  }

  .nav-start {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-self: start;
    min-width: 0;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-self: end;
    min-width: 0;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  .nav-logo-img {
    height: 88px;
    width: auto;
    display: block;
  }

  .nav-links {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    justify-self: start;
    min-width: 0;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    font-family: var(--display);
    font-style: italic;
    font-size: 0.875rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--paper);
    text-decoration: none;
    padding: 0.5rem 0.6rem;
    border-radius: 0;
    transition:
      background 0.2s ease,
      color 0.2s ease;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--paper);
  }

  .nav-link.active {
    background: transparent;
    color: var(--sky);
  }

  .nav-link-inner {
    position: relative;
    z-index: 1;
  }

  .nav-link.nav-link-donate {
    display: inline-block;
    position: relative;
    overflow: hidden;
    overflow: clip;
    border-radius: 0;
    background: var(--green);
    color: var(--paper);
    font-size: 0.8125rem;
    padding: 0.55rem 1.2rem;
  }

  .nav-link.nav-link-donate::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      105deg,
      transparent 0%,
      transparent 40%,
      rgba(255, 255, 255, 0.25) 50%,
      transparent 60%,
      transparent 100%
    );
    animation: nav-donate-shimmer 2.5s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  .nav-link.nav-link-donate:hover {
    background: #1d4a1f;
    color: var(--paper);
  }

  .nav-link.nav-link-donate:hover::after {
    animation-duration: 1.5s;
  }

  @keyframes nav-donate-shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(167%);
    }
  }

  .nav-link.nav-link-volunteer {
    display: inline-block;
    background: transparent;
    color: var(--paper);
    border: 1px solid rgba(247, 250, 252, 0.4);
    font-size: 0.8125rem;
    padding: 0.5rem 1.2rem;
    border-radius: 0;
  }

  .nav-link.nav-link-volunteer:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: var(--paper);
    color: var(--paper);
  }

  .nav-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    width: 44px;
    height: 44px;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 0;
    transition: background 0.2s ease;
  }

  .nav-toggle:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .nav-toggle-bar {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--paper);
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  .nav-menu {
    display: none;
    background: var(--color-primary);
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    padding: 1rem 1.5rem;
  }

  .nav-menu.open {
    display: block;
  }

  .nav-menu-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .nav-menu-link {
    font-family: var(--display);
    font-style: italic;
    font-size: 0.9375rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--paper);
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 0;
    display: block;
    transition:
      background 0.2s ease,
      color 0.2s ease;
  }

  .nav-menu-link:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--paper);
  }

  .nav-menu-link.active {
    background: transparent;
    color: var(--sky);
  }

  .nav-menu-link-inner {
    position: relative;
    z-index: 1;
  }

  /* Volunteer pinned to the bottom of the open menu, so it stays reachable at
     the narrow widths where it drops out of the header. (Donate stays in the
     header at all breakpoints, so it's not duplicated here.) */
  .nav-menu-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(247, 250, 252, 0.18);
  }

  .nav-menu-action {
    display: block;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    font-family: var(--display);
    font-style: italic;
    font-size: 0.9375rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.85rem 1rem;
    border-radius: 0;
    cursor: pointer;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;
  }

  .nav-menu-action-yardsign {
    background: transparent;
    color: var(--paper);
    border: 1px solid rgba(247, 250, 252, 0.4);
  }

  .nav-menu-action-yardsign:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: var(--paper);
    color: var(--paper);
  }

  .nav-menu-action-volunteer {
    background: var(--blue);
    color: var(--paper);
    border: 1px solid var(--blue);
  }

  .nav-menu-action-volunteer:hover {
    background: var(--sky);
    border-color: var(--sky);
    color: var(--ink-deep);
  }

  @media (max-width: 1119px) {
    /* Below 1120px the link row collapses to the hamburger; the header reduces
       to logo (left) + persistent Donate CTA + toggle (right). Donate stays
       visible at every breakpoint per the campaign; Volunteer moves into the
       open menu. The 7-link row (HOME…CONTACT incl. ENDORSEMENTS) needs ~1095px
       of inner width; collapsing at 1120 keeps ~40px of breathing room before
       CONTACT would touch the Donate button. */
    .nav-links {
      display: none;
    }

    .nav-link.nav-link-volunteer {
      display: none;
    }

    .nav-toggle {
      display: flex;
    }

    .nav-menu {
      display: none;
    }

    .nav-menu.open {
      display: block;
    }
  }

  @media (min-width: 1120px) {
    .nav-menu {
      display: none !important;
    }
  }
</style>
