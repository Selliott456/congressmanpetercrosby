<script>
	import ButtonSecondary from '$lib/components/ButtonSecondary.svelte';

	const interviews = [
		{
			month: 'Dec',
			day: '16',
			year: 2024,
			title: 'Interview - Our Vote Counts',
			time: '3:30 PM – 4:30 PM',
			description: 'Our Vote Counts and I sat for a virtual interview and town hall, where we talked about a wide range of issues facing our district and the nation. You can find the full interview on Youtube.',
			viewEventUrl: 'https://www.youtube.com/watch?v=kHJBykNy9zg',
			platform: 'youtube'
		},
		{
			month: 'Nov',
			day: '17',
			year: 2024,
			title: 'Interview - Hal Stewart',
			time: '3:30 PM – 4:30 PM',
			description: 'Hal Stewart interviewed me at the start of my campaign. If you would like to see where we started, this is the first time I went public with my desire to help Northern Utah.',
			viewEventUrl: 'https://www.petercrosbyforcongress.org/events-2-1/e08a9jyyxhlt8r691kitsl9ic1m3yg',
			platform: 'website'
		}
	];
</script>

<svelte:head>
	<title>Past Interviews — Peter Crosby for Congress</title>
	<meta name="description" content="Past interviews and town halls with Peter Crosby on Our Vote Counts, Hal Stewart, and more." />
</svelte:head>

<main class="interviews-page">
	<div class="interviews-watermark" aria-hidden="true">
		<img src="/images/peter.jpg" alt="" class="interviews-watermark-image" />
	</div>
	<header class="interviews-header">
		<h1 class="interviews-title">Past Interviews</h1>
		<p class="interviews-intro">Virtual interviews and town halls from the campaign.</p>
	</header>

	<div class="interviews-list">
		{#each interviews as interview}
			<article class="interview-card">
				<div class="interview-date">
					<span class="interview-month">{interview.month}</span>
					<span class="interview-day">{interview.day}</span>
					<span class="interview-platform" aria-label={interview.platform === 'youtube' ? 'YouTube' : 'Website'}>
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
						<span class="calendar-link">Google Calendar</span>
						<span class="calendar-sep"> </span>
						<span class="calendar-link">ICS</span>
					</p>
					<p class="interview-description">{interview.description}</p>
					{#if interview.viewEventUrl}
						<a href={interview.viewEventUrl} target="_blank" rel="noopener noreferrer" class="interview-view-link">
							View Event →
						</a>
					{/if}
				</div>
			</article>
		{/each}
	</div>

	<div class="interviews-cta">
		<ButtonSecondary href="https://secure.actblue.com/donate/peter-crosby-1">Donate</ButtonSecondary>
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
		font-family: var(--font-primary);
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 0.5rem 0;
		line-height: 1.2;
	}

	.interviews-intro {
		font-family: var(--font-primary);
		font-size: 1.0625rem;
		line-height: 1.6;
		color: var(--color-primary);
		margin: 0;
		opacity: 0.9;
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

	.interviews-cta {
		position: relative;
		z-index: 1;
		max-width: 800px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 4rem;
		margin-top: 2.5rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(0, 35, 56, 0.08);
		text-align: center;
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		text-align: center;
		background: var(--color-primary);
		color: var(--color-white);
		border-radius: 8px;
		padding: 0.5rem 0;
	}

	.interview-platform {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-white);
		opacity: 0.95;
	}

	.platform-icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	.interview-month {
		display: block;
		font-family: var(--font-primary);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.interview-day {
		display: block;
		font-family: var(--font-primary);
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.2;
	}

	.interview-body {
		flex: 1;
		min-width: 0;
	}

	.interview-title {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 0.25rem 0;
		line-height: 1.3;
	}

	.interview-time {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		color: var(--color-primary);
		margin: 0 0 0.5rem 0;
		opacity: 0.9;
	}

	.interview-calendar-links {
		font-family: var(--font-primary);
		font-size: 0.875rem;
		margin: 0 0 0.75rem 0;
	}

	.calendar-link {
		color: var(--color-primary);
		opacity: 0.85;
	}

	.interview-description {
		font-family: var(--font-primary);
		font-size: 1rem;
		line-height: 1.7;
		color: var(--color-primary);
		margin: 0 0 1rem 0;
	}

	.interview-view-link {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-secondary);
		text-decoration: none;
	}

	.interview-view-link:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	@media (max-width: 640px) {
		.interviews-watermark-image {
			opacity: 0.06;
		}

		.interviews-header {
			padding: 2rem 1rem 1.5rem;
		}

		.interviews-title {
			font-size: 1.75rem;
		}

		.interviews-list {
			padding: 1.5rem 1rem 0;
			gap: 1.5rem;
		}

		.interview-card {
			flex-direction: column;
			gap: 1rem;
			padding-bottom: 1.5rem;
		}

		.interview-date {
			width: 100%;
			flex-direction: row;
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
	}
</style>
