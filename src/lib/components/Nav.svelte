<script>
  import { page } from "$app/stores";
  import { afterNavigate } from "$app/navigation";
  import Rail from "./Rail.svelte";
  import { messages } from "$lib/i18n/locale";
  import { openYardSign as openYardSignModal } from "$lib/stores/yardSign";

  const donateHref = "https://secure.actblue.com/donate/peter-crosby-1";

  /**
   * @typedef {{ label: string; href: string; desc?: string; isNew?: boolean }} NavLink
   * @typedef {{ label: string; href?: string; children?: NavLink[] }} NavItem
   */

  /**
   * NEWSROOM groups the campaign's public record — coverage, its own releases, and
   * the Data Room — under one header item, since the link row has no room for more.
   */
  $: newsroomChildren = /** @type {NavLink[]} */ ([
    {
      label: $messages.nav.newsroom.media,
      desc: $messages.nav.newsroom.mediaDesc,
      href: "/media",
    },
    {
      label: $messages.nav.newsroom.press,
      desc: $messages.nav.newsroom.pressDesc,
      href: "/media#press",
    },
    {
      label: $messages.nav.newsroom.data,
      desc: $messages.nav.newsroom.dataDesc,
      href: "/data-room",
      // Launch flag for the Data Room; drop it once the page has been live a while.
      isNew: true,
    },
  ]);

  /** @type {NavItem[]} */
  let links = [];
  $: links = [
    { label: $messages.nav.home, href: "/" },
    { label: $messages.nav.about, href: "/about" },
    { label: $messages.nav.policies, href: "/policies" },
    { label: $messages.nav.newsroom.label, children: newsroomChildren },
    { label: $messages.nav.events, href: "/events" },
    { label: $messages.nav.endorsements, href: "/endorsements" },
    { label: $messages.nav.contact, href: "/contact" },
  ];

  $: path = $page.url.pathname;
  $: isActive = (/** @type {string} */ href) =>
    path === href || (href !== "/" && path.startsWith(href));
  /** Press releases list on /media but each one lives under /press/, so /media itself
      counts as Media coverage and a release page counts as Press releases. */
  $: isCurrentChild = (/** @type {NavLink} */ child) =>
    child.href === "/media#press" ? path.startsWith("/press") : isActive(child.href);
  /** Any Newsroom page lights the group in the header. */
  $: groupActive = ["/media", "/press", "/data-room"].some((p) => path.startsWith(p));

  // ── Desktop dropdown ───────────────────────────────────────────────
  let groupOpen = false;
  /** True while the pointer, not a click, is holding the panel open. */
  let openedByHover = false;
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let hoverTimer;
  /** @type {HTMLElement | undefined} */
  let groupEl;
  /** @type {HTMLButtonElement | undefined} */
  let groupToggle;
  function openGroup(byHover = false) {
    clearTimeout(hoverTimer);
    groupOpen = true;
    openedByHover = byHover;
  }

  function closeGroup() {
    clearTimeout(hoverTimer);
    groupOpen = false;
    openedByHover = false;
  }

  function onToggleClick() {
    // Clicking a panel the pointer already opened pins it, rather than closing it
    // out from under the reader.
    if (groupOpen && openedByHover) {
      openedByHover = false;
      return;
    }
    if (groupOpen) closeGroup();
    else openGroup(false);
  }

  /**
   * Hover and focus-leave handling for the group. Hover is a pointer-only shortcut —
   * the button is the real control, and keyboard users get the same panel from it —
   * so these listeners are attached here rather than as element handlers on the
   * list item.
   * @param {HTMLElement} node
   */
  function groupBehavior(node) {
    groupEl = node;
    const canHover = () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const enter = () => {
      if (canHover() && (!groupOpen || openedByHover)) openGroup(true);
    };
    const leave = () => {
      if (openedByHover) hoverTimer = setTimeout(closeGroup, 200);
    };
    /** @param {FocusEvent} e */
    const focusOut = (e) => {
      const next = /** @type {Node | null} */ (e.relatedTarget);
      if (groupOpen && !(next && node.contains(next))) closeGroup();
    };
    node.addEventListener("mouseenter", enter);
    node.addEventListener("mouseleave", leave);
    node.addEventListener("focusout", focusOut);
    return {
      destroy() {
        clearTimeout(hoverTimer);
        node.removeEventListener("mouseenter", enter);
        node.removeEventListener("mouseleave", leave);
        node.removeEventListener("focusout", focusOut);
      },
    };
  }

  /** @param {MouseEvent} e */
  function onWindowClick(e) {
    if (groupOpen && groupEl && !groupEl.contains(/** @type {Node} */ (e.target)))
      closeGroup();
  }

  /** @param {KeyboardEvent} e */
  function onWindowKeydown(e) {
    if (e.key !== "Escape" || !groupOpen) return;
    const hadFocus = groupEl?.contains(document.activeElement) ?? false;
    closeGroup();
    if (hadFocus) groupToggle?.focus();
  }

  // ── Collapsed (phone/tablet) menu ─────────────────────────────────
  let menuOpen = false;
  let menuGroupOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    // Opened on a Newsroom page, the group starts expanded so the current page shows.
    if (menuOpen) menuGroupOpen = groupActive;
  }

  afterNavigate(() => {
    menuOpen = false;
    closeGroup();
  });

  /** Close the collapsed menu, then open the shared yard-sign request modal. */
  function openYardSign() {
    menuOpen = false;
    openYardSignModal();
  }
</script>

<svelte:window on:click={onWindowClick} on:keydown={onWindowKeydown} />

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
        {#if link.children}
          <li class="nav-group" use:groupBehavior>
            <button
              type="button"
              class="nav-link nav-group-toggle"
              class:active={groupActive}
              aria-expanded={groupOpen}
              aria-controls="nav-newsroom-panel"
              bind:this={groupToggle}
              on:click={onToggleClick}
            >
              <span class="nav-link-inner">{link.label}</span>
              <svg
                class="nav-caret"
                class:open={groupOpen}
                viewBox="0 0 10 6"
                width="10"
                height="6"
                aria-hidden="true"
              >
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" />
              </svg>
            </button>
            <!-- Sits just under its toggle. Always rendered (hidden when closed) so the
                 toggle's aria-controls always points at a real element. -->
            <div id="nav-newsroom-panel" class="nav-dropdown" hidden={!groupOpen}>
              <Rail height="3px" />
              <ul class="nav-dropdown-list">
                {#each link.children as child}
                  <li>
                    <a
                      href={child.href}
                      class="nav-dropdown-link"
                      class:current={isCurrentChild(child)}
                      aria-current={isCurrentChild(child) ? "page" : undefined}
                      on:click={closeGroup}
                    >
                      <span class="nav-dropdown-label">
                        {child.label}
                        {#if child.isNew}<span class="nav-new">{$messages.nav.newsroom.newTag}</span>{/if}
                      </span>
                      {#if child.desc}
                        <span class="nav-dropdown-desc">{child.desc}</span>
                      {/if}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          </li>
        {:else if link.href}
          <li>
            <a href={link.href} class="nav-link" class:active={isActive(link.href)}>
              <span class="nav-link-inner">{link.label}</span>
            </a>
          </li>
        {/if}
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
        {#if link.children}
          <li>
            <button
              type="button"
              class="nav-menu-link nav-menu-group-toggle"
              class:active={groupActive}
              aria-expanded={menuGroupOpen}
              aria-controls="nav-menu-newsroom"
              on:click={() => (menuGroupOpen = !menuGroupOpen)}
            >
              <span class="nav-menu-link-inner">{link.label}</span>
              <svg
                class="nav-caret"
                class:open={menuGroupOpen}
                viewBox="0 0 10 6"
                width="12"
                height="7"
                aria-hidden="true"
              >
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" />
              </svg>
            </button>
            <ul id="nav-menu-newsroom" class="nav-menu-sub" hidden={!menuGroupOpen}>
              {#each link.children as child}
                <li>
                  <a
                    href={child.href}
                    class="nav-menu-sublink"
                    class:active={isCurrentChild(child)}
                    aria-current={isCurrentChild(child) ? "page" : undefined}
                    on:click={() => (menuOpen = false)}
                  >
                    {child.label}
                    {#if child.isNew}<span class="nav-new">{$messages.nav.newsroom.newTag}</span>{/if}
                  </a>
                </li>
              {/each}
            </ul>
          </li>
        {:else if link.href}
          <li>
            <a
              href={link.href}
              class="nav-menu-link"
              class:active={isActive(link.href)}
              on:click={() => (menuOpen = false)}
            >
              <span class="nav-menu-link-inner">{link.label}</span>
            </a>
          </li>
        {/if}
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

  /* ── Newsroom dropdown ─────────────────────────────────────────── */
  .nav-group-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: transparent;
    border: 0;
    line-height: inherit;
    cursor: pointer;
  }

  .nav-group-toggle[aria-expanded="true"] {
    background: rgba(255, 255, 255, 0.15);
  }

  .nav-caret {
    flex: none;
    transition: transform 0.15s ease;
  }

  .nav-caret.open {
    transform: rotate(180deg);
  }

  /* Positioning context for the panel, so it opens just under its own toggle
     rather than at the bottom of the (tall, logo-driven) bar. */
  .nav-group {
    position: relative;
  }

  .nav-dropdown {
    position: absolute;
    top: calc(100% + 0.375rem);
    left: 0;
    z-index: 10;
    min-width: 19rem;
    background: var(--ink-deep);
    border: 1px solid rgba(247, 250, 252, 0.14);
    border-top: 0;
  }

  /* Both Newsroom lists stay in the DOM (so aria-controls resolves) and are toggled
     with `hidden`; their own display rules would otherwise override it. */
  .nav-dropdown[hidden],
  .nav-menu-sub[hidden] {
    display: none;
  }

  /* An invisible bridge over the gap between the toggle and the panel, so moving
     the pointer down to the panel doesn't count as leaving the menu. */
  .nav-dropdown::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
    height: 0.5rem;
  }

  .nav-dropdown-list {
    list-style: none;
    margin: 0;
    padding: 0.5rem;
    display: grid;
    gap: 2px;
  }

  .nav-dropdown-link {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.7rem 0.85rem;
    text-decoration: none;
    color: var(--paper);
    transition: background 0.15s ease;
  }

  .nav-dropdown-link:hover,
  .nav-dropdown-link:focus-visible {
    background: rgba(255, 255, 255, 0.08);
  }

  .nav-dropdown-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--display);
    font-style: italic;
    font-weight: 800;
    font-size: 0.8125rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .nav-dropdown-link.current .nav-dropdown-label {
    color: var(--sky);
  }

  .nav-dropdown-desc {
    font-family: var(--sans);
    font-size: 0.8rem;
    line-height: 1.4;
    color: var(--paper-3);
  }

  .nav-new {
    flex: none;
    padding: 0.1rem 0.35rem;
    font-family: var(--mono);
    font-style: normal;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: var(--sky);
    color: var(--ink-deep);
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

  /* Newsroom in the collapsed menu: an accordion row with its links indented under it. */
  .nav-menu-group-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: transparent;
    border: 0;
    text-align: left;
    cursor: pointer;
  }

  .nav-menu-sub {
    list-style: none;
    margin: 0.15rem 0 0.5rem 1rem;
    padding: 0 0 0 0.75rem;
    border-left: 1px solid rgba(247, 250, 252, 0.18);
    display: grid;
    gap: 0.15rem;
  }

  .nav-menu-sublink {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.75rem;
    font-family: var(--display);
    font-style: italic;
    font-weight: 700;
    font-size: 0.875rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(247, 250, 252, 0.88);
    text-decoration: none;
    transition:
      background 0.2s ease,
      color 0.2s ease;
  }

  .nav-menu-sublink:hover {
    background: rgba(255, 255, 255, 0.12);
    color: var(--paper);
  }

  .nav-menu-sublink.active {
    color: var(--sky);
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

  @media (max-width: 1179px) {
    /* Below 1180px the link row collapses to the hamburger; the header reduces
       to logo (left) + persistent Donate CTA + toggle (right). Donate stays
       visible at every breakpoint per the campaign; Volunteer moves into the
       open menu. With NEWSROOM ▾ in place of MEDIA the 7-item row needs ~1140px
       in English (at 1120 it overlapped Volunteer by 20px); collapsing below 1180
       keeps ~40px of breathing room. */
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

  @media (min-width: 1180px) {
    .nav-menu {
      display: none !important;
    }
  }
</style>
