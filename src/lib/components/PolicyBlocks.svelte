<script>
	import Emphasis from './Emphasis.svelte';

	/**
	 * The body of one /policies section: paragraphs, lede statements, sub-headers,
	 * and bullets with one level of sub-bullets. Typography (font, size, line-height)
	 * is inherited from the page's `.policies-answer` wrapper; this component owns
	 * block spacing, since page-scoped styles can't reach elements rendered here.
	 */
	/** @type {import('$lib/data/policies').PolicyBlock[]} */
	export let blocks;

	/**
	 * Visible label for an "In this section" list. When set and the section has at
	 * least three sub-headers, links to them appear just before the first one, so a
	 * long section (Affordability) gets a way in without the ribbon outgrowing one line.
	 * @type {string | undefined}
	 */
	export let tocLabel = undefined;

	$: subheads = /** @type {Extract<import('$lib/data/policies').PolicyBlock, { type: 'h3' }>[]} */ (
		blocks.filter((b) => b.type === 'h3')
	);
	$: showToc = Boolean(tocLabel) && subheads.length >= 3;
	$: firstSubhead = blocks.findIndex((b) => b.type === 'h3');
</script>

{#each blocks as block, i}
	{#if showToc && i === firstSubhead}
		<nav class="toc" aria-labelledby={'toc-' + subheads[0].id}>
			<p class="toc-label" id={'toc-' + subheads[0].id}>{tocLabel}</p>
			<ul>
				{#each subheads as sub}
					<li><a href={'#' + sub.id}><Emphasis text={sub.text} /></a></li>
				{/each}
			</ul>
		</nav>
	{/if}
	{#if block.type === 'pillars'}
		<!-- The headline priorities double as navigation into their own sections. -->
		<ul class="pillars">
			{#each block.items as pillar}
				<li><a href={'#' + pillar.target}>{pillar.text}</a></li>
			{/each}
		</ul>
	{:else if block.type === 'p'}
		<p><Emphasis text={block.text} /></p>
	{:else if block.type === 'lede'}
		<p class="lede"><Emphasis text={block.text} /></p>
	{:else if block.type === 'h3'}
		<h3 class="subhead" id={block.id}><Emphasis text={block.text} /></h3>
	{:else if block.type === 'ul'}
		<ul>
			{#each block.items as item}
				{#if typeof item === 'string'}
					<li><Emphasis text={item} /></li>
				{:else}
					<li>
						<Emphasis text={item.text} />
						<ul class="sub">
							{#each item.items as sub}
								<li><Emphasis text={sub} /></li>
							{/each}
						</ul>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
{/each}

<style>
	p {
		margin: 0 0 1rem 0;
	}

	p:last-child,
	ul:last-child {
		margin-bottom: 0;
	}

	/* A bold standalone statement ("the point of this section"), set a step up. */
	.lede {
		font-size: 1.1875rem;
		line-height: 1.55;
		font-weight: 600;
		color: var(--ink);
	}

	/* Sub-header inside a section — sits between the h2 and the body copy in weight. */
	.subhead {
		margin: 2rem 0 0.75rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.0625rem;
		letter-spacing: -0.005em;
		line-height: 1.3;
		color: var(--ink);
		/* Deep links to a sub-header must clear the sticky nav + ribbon too. The
		   custom property is set on the page's <main> and inherits down to here. */
		scroll-margin-top: var(--policies-anchor, 6rem);
	}

	/* Don't stack the sub-header's top margin on the section heading above it. */
	.subhead:first-child {
		margin-top: 0;
	}

	ul {
		margin: 0 0 1rem 0;
		padding-left: 1.5rem;
	}

	li {
		margin-bottom: 0.35rem;
	}

	li:last-child {
		margin-bottom: 0;
	}

	.sub {
		margin: 0.35rem 0 0;
		padding-left: 1.25rem;
		list-style: circle;
	}

	/* Headline priorities as three linked chips. Square corners and hairline borders
	   per the brand; the top edges take the Rail's green / sky / civic sequence. */
	.pillars {
		list-style: none;
		margin: 0 0 2rem;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.pillars li {
		margin: 0;
	}

	.pillars a {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.75rem;
		height: 100%;
		box-sizing: border-box;
		padding: 0.95rem 1rem 1rem;
		border: 1px solid var(--line-l);
		border-top: 4px solid var(--blue);
		background: var(--paper-2);
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.0625rem;
		line-height: 1.2;
		letter-spacing: -0.01em;
		color: var(--ink);
		text-decoration: none;
		transition: background-color 0.15s ease;
	}

	.pillars li:nth-child(1) a {
		border-top-color: var(--green);
	}

	.pillars li:nth-child(2) a {
		border-top-color: var(--sky);
	}

	/* A down-arrow says "this jumps further down the page", not "leaves the page". */
	.pillars a::after {
		content: '↓';
		flex-shrink: 0;
		font-style: normal;
		color: var(--blue);
	}

	.pillars a:hover,
	.pillars a:focus-visible {
		background: var(--paper);
	}

	/* The first sub-header sits right under the chips; the chips' margin is enough. */
	.pillars + .subhead {
		margin-top: 0;
	}

	/* "In this section": links to a long section's sub-headers. */
	.toc {
		margin: 1.75rem 0 2rem;
		padding: 0.9rem 1.1rem 1rem;
		border: 1px solid var(--line-l);
		border-left: 3px solid var(--blue);
		background: var(--paper-2);
	}

	.toc-label {
		margin: 0 0 0.5rem;
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.toc ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.5rem;
	}

	.toc li {
		margin: 0;
	}

	.toc a {
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.9375rem;
		line-height: 1.3;
		color: var(--blue);
		text-decoration: none;
	}

	.toc a:hover,
	.toc a:focus-visible {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.toc + .subhead {
		margin-top: 0;
	}

	@media (max-width: 640px) {
		.pillars {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}
</style>
