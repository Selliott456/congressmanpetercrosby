<script>
  import { messages } from "$lib/i18n/locale";
  import SocialIcon from "./SocialIcon.svelte";
  import Rail from "./Rail.svelte";
  import YardSignModal from "./YardSignModal.svelte";
  import { socialLinks } from "$lib/data/socialLinks";

  const NEWSLETTER_ENDPOINT = "https://formspree.io/f/xjgqknqd";
  /** ActBlue "sponsor a yard sign" donation page. */
  const SPONSOR_URL = "https://secure.actblue.com/donate/peteryardsign";

  /** Yard-sign request modal (opened from the footer band). */
  let showYardSign = false;

  /** @type {'idle' | 'submitting' | 'success' | 'error'} */
  let newsletterStatus = "idle";

  /** @param {SubmitEvent} event */
  async function handleNewsletter(event) {
    event.preventDefault();
    const form = /** @type {HTMLFormElement} */ (event.currentTarget);
    newsletterStatus = "submitting";
    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        newsletterStatus = "success";
        form.reset();
      } else {
        newsletterStatus = "error";
      }
    } catch {
      newsletterStatus = "error";
    }
  }
</script>

<footer class="footer">
  <Rail />
  <div class="footer-inner">
    <div class="footer-connect">
      <div class="footer-brand">
        <img
          src="/images/brand_strategy_square_cropped_transparent_bg_blue_002338.svg"
          alt=""
          class="footer-logo"
          width="160"
          height="160"
          loading="lazy"
          decoding="async"
        />
      </div>
      <nav class="footer-links" aria-label={$messages.footer.navAria}>
        <a href="/endorsements" class="footer-faq-link">{$messages.footer.endorsements}</a>
        <a href="/contact" class="footer-faq-link">{$messages.footer.contactUs}</a>
      </nav>
      <div class="footer-social" aria-label={$messages.footer.socialAria}>
        {#each socialLinks as link}
          <a
            href={link.href}
            class="footer-social-link"
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon name={link.icon} size={24} />
          </a>
        {/each}
      </div>
    </div>

    <section class="footer-yardsign" aria-label={$messages.yardSign.footerHeading}>
      <div class="footer-news-rail" aria-hidden="true"><Rail height="3px" /></div>
      <div class="footer-yardsign-actions">
        <button
          type="button"
          class="footer-yardsign-btn"
          on:click={() => (showYardSign = true)}
        >
          {$messages.yardSign.requestButton}
        </button>
        <a
          class="footer-yardsign-sponsor"
          href={SPONSOR_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {$messages.yardSign.sponsorLink} ↗
        </a>
      </div>
    </section>

    <section class="footer-newsletter" aria-labelledby="footer-newsletter-title">
      <div class="footer-news-rail" aria-hidden="true"><Rail height="3px" /></div>
      {#if newsletterStatus === "success"}
        <div class="footer-news-success" role="status" aria-live="polite">
          <p class="footer-news-success-title">
            {$messages.footer.newsletter.successTitle}
          </p>
          <p class="footer-news-success-body">
            {$messages.footer.newsletter.successBody}
          </p>
        </div>
      {:else}
        <p id="footer-newsletter-title" class="footer-news-title">
          {$messages.footer.newsletter.title}
        </p>
        <p class="footer-news-blurb">{$messages.footer.newsletter.blurb}</p>
        <form class="footer-news-form" on:submit={handleNewsletter}>
          <input
            type="hidden"
            name="_subject"
            value="Newsletter signup (website)"
          />
          <!-- Honeypot: hidden from people; bots that fill it are silently dropped by Formspree. -->
          <div class="hp-field" aria-hidden="true">
            <label for="newsletter-hp">Leave this field empty</label>
            <input
              id="newsletter-hp"
              type="text"
              name="_gotcha"
              tabindex="-1"
              autocomplete="off"
            />
          </div>
          <div class="footer-news-names">
            <input
              id="newsletter-first"
              name="firstName"
              type="text"
              class="footer-news-input"
              placeholder={$messages.footer.newsletter.firstName}
              aria-label={$messages.footer.newsletter.firstName}
              required
              maxlength="80"
              autocomplete="given-name"
            />
            <input
              id="newsletter-last"
              name="lastName"
              type="text"
              class="footer-news-input"
              placeholder={$messages.footer.newsletter.lastName}
              aria-label={$messages.footer.newsletter.lastName}
              required
              maxlength="80"
              autocomplete="family-name"
            />
          </div>
          <div class="footer-news-row">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              class="footer-news-input"
              placeholder={$messages.footer.newsletter.emailPlaceholder}
              aria-label={$messages.footer.newsletter.emailLabel}
              required
              maxlength="254"
              autocomplete="email"
            />
            <button
              type="submit"
              class="footer-news-submit"
              disabled={newsletterStatus === "submitting"}
            >
              {newsletterStatus === "submitting"
                ? $messages.footer.newsletter.sending
                : $messages.footer.newsletter.submit}
            </button>
          </div>
          {#if newsletterStatus === "error"}
            <p class="footer-news-error" role="alert">
              {$messages.footer.newsletter.error}
            </p>
          {/if}
          <p class="footer-news-privacy">{$messages.footer.newsletter.privacy}</p>
        </form>
      {/if}
    </section>

    <div class="footer-legal">
      <p class="footer-copy">
        &copy; {new Date().getFullYear()}
        {$messages.footer.rights}
      </p>
      <p class="footer-disclaimer">{$messages.footer.paidForBy}</p>
    </div>
  </div>
</footer>

{#if showYardSign}
  <YardSignModal on:close={() => (showYardSign = false)} />
{/if}

<style>
  .footer {
    background: var(--paper-2);
    color: var(--ink);
    margin-top: auto;
  }

  /* Content column — three zones (connect · newsletter · legal) separated by
     hairline rules + proximity. */
  .footer-inner {
    max-width: 560px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-connect {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    width: 100%;
    padding: 2.75rem 0 2.25rem;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .footer-logo {
    height: 160px;
    width: auto;
    display: block;
  }

  .footer-social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .footer-social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: var(--ink);
    border-radius: 0;
    transition:
      background 0.2s ease,
      color 0.2s ease;
  }

  .footer-social-link:hover {
    background: rgba(15, 37, 69, 0.1);
    color: var(--ink);
  }

  .footer-links {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
  }

  .footer-faq-link {
    font-family: var(--font-primary);
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--color-primary);
    text-decoration: none;
    display: inline-block;
    transition: opacity 0.2s ease;
  }

  .footer-faq-link:hover {
    opacity: 0.85;
    text-decoration: underline;
  }

  /* ---- Yard-sign band (request modal trigger + sponsor link) ---- */
  .footer-yardsign {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    padding: 2.25rem 0;
    border-top: 1px solid rgba(15, 37, 69, 0.16);
  }

  .footer-yardsign-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.85rem 1.25rem;
  }

  .footer-yardsign-btn {
    font-family: var(--display);
    font-style: italic;
    font-weight: 800;
    font-size: 0.875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.7rem 1.5rem;
    border: 1px solid var(--ink);
    background: var(--ink);
    color: var(--paper);
    cursor: pointer;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
  }

  .footer-yardsign-btn:hover {
    background: var(--blue);
    border-color: var(--blue);
  }

  .footer-yardsign-sponsor {
    font-family: var(--font-primary);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--blue);
    text-decoration: none;
    white-space: nowrap;
  }

  .footer-yardsign-sponsor:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* ---- Newsletter signup (middle zone, set apart by a Rail + hairline) ---- */
  .footer-newsletter {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    padding: 2.25rem 0;
    border-top: 1px solid rgba(15, 37, 69, 0.16);
  }

  .footer-news-rail {
    width: 48px;
    margin: 0 auto 0.75rem;
  }

  .footer-news-title {
    margin: 0;
    font-family: var(--display);
    font-style: italic;
    font-weight: 800;
    font-size: 1.125rem;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .footer-news-blurb {
    margin: 0 0 0.5rem;
    font-family: var(--font-primary);
    font-size: 0.875rem;
    line-height: 1.4;
    color: var(--ink-2);
  }

  .footer-news-form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-news-names,
  .footer-news-row {
    display: flex;
    gap: 0.5rem;
    width: 100%;
  }

  .footer-news-input {
    flex: 1;
    min-width: 0;
    box-sizing: border-box;
    font-family: var(--font-primary);
    font-size: 0.9375rem;
    padding: 0.6rem 0.75rem;
    border: 1px solid var(--line-l);
    border-radius: 0;
    background: var(--color-white);
    color: var(--ink);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .footer-news-input:focus {
    outline: none;
    border-color: var(--blue);
    box-shadow: 0 0 0 2px rgba(46, 95, 160, 0.2);
  }

  .footer-news-submit {
    flex-shrink: 0;
    font-family: var(--display);
    font-style: italic;
    font-weight: 800;
    font-size: 0.8125rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.6rem 1.25rem;
    border: 1px solid var(--ink);
    background: var(--ink);
    color: var(--paper);
    cursor: pointer;
    white-space: nowrap;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
  }

  .footer-news-submit:hover {
    background: var(--ink-2);
    border-color: var(--ink-2);
  }

  .footer-news-submit:disabled {
    opacity: 0.6;
    cursor: progress;
  }

  .footer-news-privacy {
    margin: 0;
    font-family: var(--font-primary);
    font-size: 0.75rem;
    color: var(--ink-2);
    opacity: 0.8;
  }

  .footer-news-error {
    margin: 0;
    font-family: var(--font-primary);
    font-size: 0.8125rem;
    color: #6b1616;
  }

  .footer-news-success {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    border-left: 3px solid var(--green);
    padding: 0.25rem 0 0.25rem 1rem;
    text-align: left;
  }

  .footer-news-success-title {
    margin: 0;
    font-family: var(--display);
    font-style: italic;
    font-weight: 800;
    font-size: 1.0625rem;
    color: var(--ink);
  }

  .footer-news-success-body {
    margin: 0;
    font-family: var(--font-primary);
    font-size: 0.875rem;
    line-height: 1.4;
    color: var(--ink-2);
  }

  /* Honeypot — kept in the DOM (so bots fill it) but away from people and AT. */
  .hp-field {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  /* ---- Legal zone (quiet bottom band) ---- */
  .footer-legal {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.75rem 0 2.5rem;
    border-top: 1px solid rgba(15, 37, 69, 0.16);
  }

  .footer-copy {
    font-family: var(--font-primary);
    font-size: 0.8125rem;
    color: var(--color-primary);
    opacity: 0.9;
    margin: 0;
  }

  /* "Paid for by" — legally must stay conspicuous; keep it bold/dark. */
  .footer-disclaimer {
    font-family: var(--font-primary);
    font-size: 12pt;
    font-weight: 700;
    line-height: 1.4;
    color: #000000;
    margin: 0;
    width: 100%;
    max-width: 520px;
    text-align: center;
  }

  @media (max-width: 640px) {
    .footer-inner {
      padding: 0 1rem;
    }

    .footer-connect {
      padding: 2.25rem 0 1.75rem;
    }

    .footer-logo {
      height: 128px;
    }

    .footer-social-link {
      width: 36px;
      height: 36px;
    }

    .footer-social-link :global(svg) {
      width: 20px;
      height: 20px;
    }

    .footer-faq-link {
      font-size: 0.8125rem;
    }

    .footer-news-names,
    .footer-news-row {
      flex-direction: column;
    }

    .footer-news-submit {
      width: 100%;
    }
  }
</style>
