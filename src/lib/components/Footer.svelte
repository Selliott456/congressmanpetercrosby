<script>
	const email = 'petercrosbyforcongress@gmail.com';
	const socialLinks = [
		{
			name: 'TikTok',
			href: 'https://www.tiktok.com/@petercrosbyforcongress?is_from_webapp=1&sender_device=pc',
			icon: 'tiktok',
			label: 'TikTok'
		},
		{
			name: 'YouTube',
			href: 'https://www.youtube.com/@PeterCrosbyforCongress',
			icon: 'youtube',
			label: 'YouTube'
		},
		{
			name: 'Instagram',
			href: 'https://www.instagram.com/petercrosbyut/',
			icon: 'instagram',
			label: 'Instagram'
		},
		{
			name: 'Facebook',
			href: 'https://www.facebook.com/people/Peter-Crosby-for-Congress/61583498494612/',
			icon: 'facebook',
			label: 'Facebook'
		}
	];
</script>

<footer class="footer">
	<div class="footer-inner">
		<div class="footer-brand">
			<img src="/images/brand_strategy_square_cropped_transparent_bg_blue_002338.svg" alt="" class="footer-logo" />
			<p class="footer-tagline">Strengthening Northern Utah through Utah Values</p>
		</div>

		<a href="mailto:{email}" class="footer-email">{email}</a>

		<div class="footer-social" aria-label="Social media links">
			{#each socialLinks as link}
				<a
					href={link.href}
					class="footer-social-link"
					aria-label={link.label}
					target="_blank"
					rel="noopener noreferrer"
				>
					{#if link.icon === 'tiktok'}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
					{:else if link.icon === 'youtube'}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
					{:else if link.icon === 'instagram'}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
					{:else if link.icon === 'facebook'}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
					{/if}
				</a>
			{/each}
		</div>

		<nav class="footer-nav" aria-label="Footer navigation">
			<a href="/faq">FAQ / Policy</a>
		</nav>

		<p class="footer-copy">&copy; {new Date().getFullYear()} Peter Crosby for Congress. All rights reserved.</p>
	</div>
</footer>

<style>
	.footer {
		background: var(--color-accent);
		color: var(--color-primary);
		border-top: 1px solid rgba(0, 35, 56, 0.12);
		margin-top: auto;
	}

	.footer-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1.5rem;
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.footer-logo {
		height: 56px;
		width: auto;
		display: block;
	}

	.footer-tagline {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--color-primary);
		margin: 0;
		line-height: 1.4;
	}

	.footer-email {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-primary);
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.footer-email:hover {
		opacity: 0.85;
		text-decoration: underline;
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
		color: var(--color-primary);
		border-radius: 8px;
		transition: background 0.2s ease, color 0.2s ease;
	}

	.footer-social-link:hover {
		background: rgba(0, 35, 56, 0.1);
		color: var(--color-primary);
	}

	.footer-nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.5rem 1.25rem;
	}

	.footer-nav a {
		font-family: var(--font-primary);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--color-primary);
		text-decoration: none;
		padding: 0.25rem 0;
		border-radius: 4px;
		transition: color 0.2s ease, opacity 0.2s ease;
	}

	.footer-nav a:hover {
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

	@media (max-width: 640px) {
		.footer-inner {
			padding: 2rem 1rem;
			gap: 1.25rem;
		}

		.footer-logo {
			height: 44px;
		}

		.footer-tagline {
			font-size: 0.875rem;
		}

		.footer-email {
			font-size: 0.875rem;
			word-break: break-all;
		}

		.footer-social-link {
			width: 36px;
			height: 36px;
		}

		.footer-social-link svg {
			width: 20px;
			height: 20px;
		}

		.footer-nav a {
			font-size: 0.8125rem;
		}
	}
</style>
