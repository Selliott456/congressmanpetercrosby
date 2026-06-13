<script>
  import { page } from "$app/stores";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import Rail from "./Rail.svelte";
  import { messages } from "$lib/i18n/locale";

  const donateHref = "https://secure.actblue.com/donate/peter-crosby-1";

  $: links = [
    { label: $messages.nav.home, href: "/" },
    { label: $messages.nav.about, href: "/about" },
    { label: $messages.nav.contact, href: "/contact" },
    { label: $messages.nav.events, href: "/events" },
    { label: $messages.nav.pastInterviews, href: "/past-interviews" },
    { label: $messages.nav.policies, href: "/faq" },
  ];

  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
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
      <a
        href={donateHref}
        class="nav-link nav-link-donate"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="nav-link-inner">{$messages.nav.donate}</span>
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
      <LanguageSwitcher />
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
  </div>
</nav>

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
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .nav-start {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  .nav-logo-img {
    height: 72px;
    width: auto;
    display: block;
  }

  .nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-width: 0;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    font-family: var(--display);
    font-style: italic;
    font-size: 0.75rem;
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
    padding: 0.5rem 1rem;
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
    font-size: 0.8125rem;
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

  @media (max-width: 900px) {
    .nav-links {
      display: none;
    }

    .nav-inner {
      flex-wrap: wrap;
      row-gap: 0.5rem;
    }

    .nav-start {
      flex: 1;
      min-width: 0;
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

  @media (min-width: 901px) {
    .nav-menu {
      display: none !important;
    }
  }
</style>
