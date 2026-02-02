<script>
	import { page } from '$app/stores';

	const links = [
		{ label: 'DONATE', href: 'https://secure.actblue.com/donate/peter-crosby-1', external: true, donate: true },
		{ label: 'HOME', href: '/' },
		{ label: 'ABOUT', href: '/about' },
		{ label: 'EVENTS', href: '/events' },
		{ label: 'PAST INTERVIEWS', href: '/past-interviews' },
		{ label: 'CONTACT US', href: '/contact' }
	];

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<nav class="nav">
	<div class="nav-inner">
		<a href="/" class="nav-logo" aria-label="Congressman Peter Crosby - Home">
			<img src="/images/brand_strategy_logo_white.svg" alt="" class="nav-logo-img" />
		</a>
		<ul class="nav-links">
			{#each links as link}
				<li>
					<a
						href={link.href}
						class="nav-link"
						class:nav-link-donate={link.donate}
						class:active={!link.external && ($page.url.pathname === link.href || (link.href !== '/' && $page.url.pathname.startsWith(link.href)))}
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noopener noreferrer' : undefined}
					>
						<span class="nav-link-inner">{link.label}</span>
					</a>
				</li>
			{/each}
		</ul>
		<button
			class="nav-toggle"
			aria-label="Toggle menu"
			aria-expanded={menuOpen}
			aria-controls="nav-menu"
			on:click={toggleMenu}
		>
			<span class="nav-toggle-bar"></span>
			<span class="nav-toggle-bar"></span>
			<span class="nav-toggle-bar"></span>
		</button>
	</div>
	<div id="nav-menu" class="nav-menu" class:open={menuOpen} aria-hidden={!menuOpen}>
		<ul class="nav-menu-links">
			{#each links as link}
				<li>
					<a
						href={link.href}
						class="nav-menu-link"
						class:nav-menu-link-donate={link.donate}
						class:active={!link.external && ($page.url.pathname === link.href || (link.href !== '/' && $page.url.pathname.startsWith(link.href)))}
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noopener noreferrer' : undefined}
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
		gap: 1.5rem;
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
		gap: 0.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-link {
		font-family: var(--font-primary);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--color-white);
		text-decoration: none;
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		transition: background 0.2s ease, color 0.2s ease;
	}

	.nav-link:hover {
		background: rgba(255, 255, 255, 0.15);
		color: var(--color-white);
	}

	.nav-link.active {
		background: var(--color-accent);
		color: var(--color-primary);
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
		border-radius: 8px;
		background: var(--color-secondary);
		color: var(--color-white);
		padding: 0.5rem 1rem;
		font-weight: 500;
	}

	.nav-link.nav-link-donate::after {
		content: '';
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
		color: var(--color-white);
		box-shadow: 0 4px 12px rgba(35, 89, 38, 0.3);
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
		border-radius: 6px;
		transition: background 0.2s ease;
	}

	.nav-toggle:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.nav-toggle-bar {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--color-white);
		border-radius: 1px;
		transition: transform 0.2s ease, opacity 0.2s ease;
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
		font-family: var(--font-primary);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--color-white);
		text-decoration: none;
		padding: 0.75rem 1rem;
		border-radius: 6px;
		display: block;
		transition: background 0.2s ease, color 0.2s ease;
	}

	.nav-menu-link:hover {
		background: rgba(255, 255, 255, 0.15);
		color: var(--color-white);
	}

	.nav-menu-link.active {
		background: var(--color-accent);
		color: var(--color-primary);
	}

	.nav-menu-link-inner {
		position: relative;
		z-index: 1;
	}

	.nav-menu-link.nav-menu-link-donate {
		display: block;
		position: relative;
		overflow: hidden;
		overflow: clip;
		border-radius: 8px;
		background: var(--color-secondary);
		color: var(--color-white);
		font-weight: 500;
	}

	.nav-menu-link.nav-menu-link-donate::after {
		content: '';
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

	.nav-menu-link.nav-menu-link-donate:hover {
		background: #1d4a1f;
		color: var(--color-white);
		box-shadow: 0 4px 12px rgba(35, 89, 38, 0.3);
	}

	.nav-menu-link.nav-menu-link-donate:hover::after {
		animation-duration: 1.5s;
	}

	@media (max-width: 900px) {
		.nav-links {
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

	@media (min-width: 901px) {
		.nav-menu {
			display: none !important;
		}
	}
</style>
