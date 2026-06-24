<script>
	import Button from '$lib/components/Button.svelte';
	import { messages } from '$lib/i18n/locale';
</script>

<svelte:head>
	<title>{$messages.pastInterviews.metaTitle}</title>
	<meta name="description" content={$messages.pastInterviews.metaDescription} />
</svelte:head>

<main class="interviews-page">
	<div class="interviews-watermark" aria-hidden="true">
		<img src="/images/peter.jpg" alt="" class="interviews-watermark-image" />
	</div>
	<header class="interviews-header">
		<h1 class="interviews-title">{$messages.pastInterviews.pageTitle}</h1>
		<p class="interviews-intro">{$messages.pastInterviews.intro}</p>
	</header>

	<div class="interviews-list">
		{#each $messages.pastInterviews.items as interview}
			<article class="interview-card">
				<div class="interview-date">
					<span class="interview-month">{interview.month}</span>
					<span class="interview-day">{interview.day}</span>
					<span
						class="interview-platform"
						aria-label={interview.platform === 'youtube'
							? $messages.pastInterviews.ariaYoutube
							: $messages.pastInterviews.ariaWebsite}
					>
						{#if interview.platform === 'youtube'}
							<svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
							</svg>
						{:else if interview.platform === 'website'}
							<svg class="platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<circle cx="12" cy="12" r="10"/>
								<line x1="2" y1="12" x2="22" y2="12"/>
								<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
							</svg>
						{/if}
					</span>
				</div>
				<div class="interview-body">
					<h2 class="interview-title">{interview.title}</h2>
					<p class="interview-time">{interview.time}</p>
					<p class="interview-calendar-links">
						<span class="calendar-link">{$messages.common.googleCalendar}</span>
						<span class="calendar-sep"> </span>
						<span class="calendar-link">{$messages.common.ics}</span>
					</p>
					<p class="interview-description">{interview.description}</p>
					{#if interview.viewEventUrl}
						<a href={interview.viewEventUrl} target="_blank" rel="noopener noreferrer" class="interview-view-link">
							{$messages.common.viewEvent}
						</a>
					{/if}
				</div>
			</article>
		{/each}
	</div>

	<div class="interviews-cta">
		<Button href="https://secure.actblue.com/donate/peter-crosby-1">{$messages.common.donate}</Button>
	</div>
</main>

<style>
	.interviews-page {
		position: relative;
		background: var(--color-white);
		min-height: 100vh;
		padding-bottom: 4rem;
		overflow: hidden;
	}

	.interviews-watermark {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		pointer-events: none;
		z-index: 0;
	}

	.interviews-watermark-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: right 25%;
		opacity: 0.08;
	}

	.interviews-header {
		position: relative;
		z-index: 1;
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1.5rem 2rem;
		border-bottom: 1px solid rgba(0, 35, 56, 0.08);
	}

	.interviews-title {
		font-family: var(--display);
		font-style: italic;
		font-size: 2.25rem;
		font-weight: 900;
		letter-spacing: -0.03em;
		color: var(--ink);
		margin: 0 0 0.5rem 0;
		line-height: 1.05;
	}

	.interviews-intro {
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.6;
		color: var(--ink-2);
		margin: 0;
	}

	.interviews-list {
		position: relative;
		z-index: 1;
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1.5rem 0;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.interview-card {
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
		padding-bottom: 2rem;
		border-bottom: 1px solid rgba(0, 35, 56, 0.08);
	}

	.interview-card:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.interview-date {
		flex-shrink: 0;
		width: 4rem;
		text-align: center;
		background: var(--ink);
		color: var(--paper);
		border-radius: 0;
		padding: 0.5rem 0;
		position: relative;
	}

	.interview-month {
		display: block;
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.interview-day {
		display: block;
		font-family: var(--mono);
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 1.2;
	}

	.interview-platform {
		position: absolute;
		bottom: -0.5rem;
		right: -0.5rem;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 0;
		background: var(--paper);
		color: var(--ink);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--line-l);
	}

	.platform-icon {
		width: 1rem;
		height: 1rem;
	}

	.interview-body {
		flex: 1;
		min-width: 0;
	}

	.interview-title {
		font-family: var(--display);
		font-style: italic;
		font-size: 1.25rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		color: var(--ink);
		margin: 0 0 0.25rem 0;
		line-height: 1.25;
	}

	.interview-time {
		font-family: var(--mono);
		font-size: 0.8125rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-2);
		margin: 0 0 0.5rem 0;
	}

	.interview-calendar-links {
		font-family: var(--mono);
		font-size: 0.8125rem;
		letter-spacing: 0.04em;
		margin: 0 0 0.75rem 0;
	}

	.calendar-link {
		color: var(--ink-2);
	}

	.interview-description {
		font-family: var(--font-primary);
		font-size: 1rem;
		line-height: 1.7;
		color: var(--ink-2);
		margin: 0 0 1rem 0;
	}

	.interview-view-link {
		display: inline-block;
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--blue);
		text-decoration: none;
		margin-top: 0.5rem;
	}

	.interview-view-link:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.interviews-cta {
		position: relative;
		z-index: 1;
		max-width: 800px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 0;
		text-align: center;
		border-top: 1px solid rgba(0, 35, 56, 0.08);
		margin-top: 2rem;
	}

	@media (max-width: 768px) {
		.interviews-header {
			padding-left: 0;
			padding-right: 0;
			text-align: center;
		}

		.interviews-list {
			padding-left: 0;
			padding-right: 0;
		}

		.interview-card .interview-body {
			text-align: center;
		}

		.interviews-cta {
			padding-left: 0;
			padding-right: 0;
		}

		.interviews-watermark::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-image: url('/images/peter.jpg');
			background-repeat: repeat;
			background-size: auto;
			opacity: 0.08;
			pointer-events: none;
		}

		.interviews-watermark-image {
			display: none;
		}
	}

	@media (max-width: 640px) {
		.interviews-title {
			font-size: 1.75rem;
		}

		.interviews-list {
			padding: 1.5rem 0 0;
			gap: 1.5rem;
		}

		.interview-card {
			flex-direction: column;
			gap: 1rem;
			padding-bottom: 1.5rem;
		}

		.interview-date {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			padding: 0.35rem 0;
		}

		.interview-month {
			display: inline;
			font-size: 0.875rem;
		}

		.interview-day {
			display: inline;
			font-size: 1.25rem;
		}

		.interview-title {
			font-size: 1.125rem;
		}

		.interviews-cta {
			padding: 2.5rem 0 0;
		}

		.interviews-watermark::before {
			opacity: 0.06;
		}
	}
</style>
