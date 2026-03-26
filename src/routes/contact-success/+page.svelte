<svelte:head>
	<title>Message Sent — Peter Crosby for Congress</title>
	<meta name="description" content="Thanks for reaching out to the Peter Crosby campaign." />
</svelte:head>

<main class="contact-success-page">
	<section class="contact-success-card" aria-label="Contact form success">
		<h1>Thanks! Your message has been sent.</h1>
		<p>We appreciate you reaching out and will follow up as soon as we can.</p>
		<p><a href="/contact">Back to contact form</a></p>
	</section>
</main>

<style>
	.contact-success-page {
		min-height: 50vh;
		display: grid;
		place-items: center;
		padding: 2rem 1.5rem 3rem;
		background: var(--color-white);
	}

	.contact-success-card {
		max-width: 680px;
		width: 100%;
		border: 1px solid rgba(0, 35, 56, 0.12);
		border-radius: 12px;
		padding: 2rem;
		background: rgba(187, 206, 221, 0.18);
	}

	h1 {
		margin: 0 0 0.75rem;
		font-size: 1.75rem;
		color: var(--color-primary);
	}

	p {
		margin: 0 0 0.75rem;
		color: var(--color-primary);
	}

	a {
		color: var(--color-secondary);
		font-weight: 600;
	}
</style>
