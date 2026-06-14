<script>
	import { messages } from '$lib/i18n/locale';

	/** @type {import('$lib/data/endorsements').Endorsement} */
	export let item;

	$: override = $messages.endorsementsPage.byId[item.id];
	$: role = override?.role ?? item.role;
	$: initials = item.name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0])
		.join('')
		.toUpperCase();
</script>

<div class="endorsement-card">
	<div class="endorsement-photo endorsement-photo--{item.category}">
		{#if item.photo}
			<img src={item.photo} alt={item.name} loading="lazy" />
		{:else}
			<span class="endorsement-initials" aria-hidden="true">{initials}</span>
		{/if}
	</div>
	<p class="endorsement-name">{item.name}</p>
	{#if role}
		<p class="endorsement-role">{role}</p>
	{/if}
</div>

<style>
	.endorsement-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.endorsement-photo {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;
		display: grid;
		place-items: center;
		overflow: hidden;
		background: linear-gradient(150deg, var(--ink) 0%, var(--ink-deep) 100%);
		border: 1px solid var(--line-l);
	}

	.endorsement-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Organization logos sit on a light ground and are contained, not cropped. */
	.endorsement-photo--organization {
		background: var(--paper);
		border-color: var(--line-l);
	}

	.endorsement-photo--organization img {
		object-fit: contain;
		padding: 1.25rem;
	}

	.endorsement-photo--organization .endorsement-initials {
		color: var(--blue);
		opacity: 0.6;
	}

	.endorsement-initials {
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		letter-spacing: -0.02em;
		color: rgba(247, 250, 252, 0.55);
	}

	.endorsement-name {
		margin: 0.85rem 0 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.0625rem;
		letter-spacing: -0.01em;
		line-height: 1.15;
		color: var(--ink);
	}

	.endorsement-role {
		margin: 0.2rem 0 0;
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-2);
		opacity: 0.7;
	}
</style>
