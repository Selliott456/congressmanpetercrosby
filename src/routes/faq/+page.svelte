<script>
	import ButtonSecondary from '$lib/components/ButtonSecondary.svelte';
	import { messages } from '$lib/i18n/locale';
</script>

<svelte:head>
	<title>{$messages.faq.metaTitle}</title>
	<meta name="description" content={$messages.faq.metaDescription} />
</svelte:head>

<main class="faq-page">
	<div class="faq-content">
		<h1 class="faq-title">{$messages.faq.pageTitle}</h1>

		{#each $messages.faq.items as item}
			<section class="faq-section">
				<h2 class="faq-question">{item.question}</h2>
				<div class="faq-answer">
					{#each item.parts as part}
						{#if part.type === 'p'}
							<p>{part.text}</p>
						{:else if part.type === 'ul'}
							<ul>
								{#each part.items as li}
									<li>{li}</li>
								{/each}
							</ul>
						{/if}
					{/each}
				</div>
			</section>
		{/each}

		<div class="faq-cta">
			<ButtonSecondary href="https://secure.actblue.com/donate/peter-crosby-1">{$messages.common.donate}</ButtonSecondary>
		</div>
	</div>
</main>

<style>
	.faq-page {
		background: var(--color-white);
		min-height: 60vh;
		padding: 3rem 1.5rem 4rem;
	}

	.faq-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.faq-title {
		font-family: var(--font-primary);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 2rem 0;
		line-height: 1.2;
	}

	.faq-section {
		margin-bottom: 2.5rem;
	}

	.faq-section:last-of-type {
		margin-bottom: 0;
	}

	.faq-question {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 1rem 0;
		line-height: 1.4;
	}

	.faq-answer {
		font-family: var(--font-primary);
		font-size: 1.0625rem;
		line-height: 1.8;
		color: var(--color-primary);
	}

	.faq-answer p {
		margin: 0 0 1rem 0;
	}

	.faq-answer p:last-child {
		margin-bottom: 0;
	}

	.faq-answer ul {
		margin: 0 0 1rem 0;
		padding-left: 1.5rem;
	}

	.faq-answer li {
		margin-bottom: 0.35rem;
	}

	.faq-answer li:last-child {
		margin-bottom: 0;
	}

	.faq-cta {
		margin-top: 2.5rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(0, 35, 56, 0.08);
		text-align: center;
	}

	@media (max-width: 768px) {
		.faq-page {
			padding-left: 0;
			padding-right: 0;
		}

		.faq-content {
			text-align: center;
		}
	}

	@media (max-width: 640px) {
		.faq-page {
			padding: 2rem 0 3rem;
		}

		.faq-title {
			font-size: 1.75rem;
			margin-bottom: 1.5rem;
		}

		.faq-question {
			font-size: 1.125rem;
		}

		.faq-answer {
			font-size: 1rem;
		}

		.faq-section {
			margin-bottom: 2rem;
		}
	}
</style>
