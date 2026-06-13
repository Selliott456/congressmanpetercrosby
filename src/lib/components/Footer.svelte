<script>
  import { messages } from "$lib/i18n/locale";
  import SocialIcon from "./SocialIcon.svelte";
  import Rail from "./Rail.svelte";
  import { socialLinks } from "$lib/data/socialLinks";
</script>

<footer class="footer">
  <Rail />
  <div class="footer-inner">
    <div class="footer-col">
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
      <a href="/contact" class="footer-faq-link">{$messages.footer.contactUs}</a>
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

    <p class="footer-copy">
      &copy; {new Date().getFullYear()}
      {$messages.footer.rights}
    </p>
    <p class="footer-credit">
      {$messages.footer.createdBy}
      {" "}
      <a
        href="https://elliottpeck.dev"
        class="footer-credit-link"
        target="_blank"
        rel="noopener noreferrer">{$messages.footer.createdByName}</a
      >
    </p>
    <p class="footer-disclaimer">{$messages.footer.paidForBy}</p>
  </div>
</footer>

<style>
  .footer {
    background: var(--paper-2);
    color: var(--ink);
    margin-top: auto;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    width: 100%;
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
    margin-top: 0.5rem;
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

  .footer-faq-link {
    font-family: var(--font-primary);
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--color-primary);
    text-decoration: none;
    margin-top: 0.75rem;
    display: inline-block;
    transition: opacity 0.2s ease;
  }

  .footer-faq-link:hover {
    opacity: 0.85;
    text-decoration: underline;
  }

  .footer-copy {
    font-family: var(--font-primary);
    font-size: 0.8125rem;
    color: var(--color-primary);
    opacity: 0.9;
    margin: 0;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(0, 35, 56, 0.15);
    width: 100%;
    max-width: 400px;
  }

  .footer-credit {
    font-family: var(--font-primary);
    font-size: 0.8125rem;
    color: var(--color-primary);
    opacity: 0.9;
    margin: 0;
    padding-top: 0.25rem;
  }

  .footer-credit-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.2s ease;
  }

  .footer-credit-link:hover {
    opacity: 0.85;
    text-decoration: underline;
  }

  .footer-disclaimer {
    font-family: var(--font-primary);
    font-size: 12pt;
    font-weight: 700;
    line-height: 1.4;
    color: #000000;
    margin: 0;
    padding-top: 0.75rem;
    width: 100%;
    max-width: 520px;
    text-align: center;
  }

  @media (max-width: 640px) {
    .footer-inner {
      padding: 2rem 1rem;
      gap: 1.25rem;
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
  }
</style>
