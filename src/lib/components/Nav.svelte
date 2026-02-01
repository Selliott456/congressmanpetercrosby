<script>
	import { page } from '$app/stores';

	const links = [
		{ label: 'HOME', href: '/' },
		{ label: 'ABOUT', href: '/about' },
		{ label: 'DONATE', href: '/donate' },
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
						class:active={$page.url.pathname === link.href || (link.href !== '/' && $page.url.pathname.startsWith(link.href))}
					>
						{link.label}
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
						class:active={$page.url.pathname === link.href || (link.href !== '/' && $page.url.pathname.startsWith(link.href))}
						on:click={() => (menuOpen = false)}
					>
						{link.label}
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
