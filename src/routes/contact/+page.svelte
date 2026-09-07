<script>
	import { tick } from 'svelte';
	import Rail from '$lib/components/Rail.svelte';
	import Button from '$lib/components/Button.svelte';
	import { messages } from '$lib/i18n/locale';

	const EMAIL = 'information@petercrosbyforcongress.org';
	const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split('@');
	const PHONE = '(435) 227-5195';

	/** @type {'general' | 'media'} */
	let topic = 'general';

	/** Formspree endpoint per topic. */
	const ENDPOINTS = {
		general: 'https://formspree.io/f/meewbdjn',
		media: 'https://formspree.io/f/mzdqlwpy'
	};

	/** @type {'idle' | 'submitting' | 'success' | 'error'} */
	let status = 'idle';

	/** Success heading — focused on submit so the confirmation is announced/reachable. @type {HTMLElement | undefined} */
	let successHeading;

	/** Radio buttons by topic id — so focus can follow selection (WAI-ARIA radiogroup). @type {Record<string, HTMLButtonElement>} */
	let radioEls = {};

	/** Arrow-key navigation for the topic radiogroup (two options → arrows toggle). @param {KeyboardEvent} e */
	async function onTopicKeydown(e) {
		if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
			e.preventDefault();
			topic = topic === 'general' ? 'media' : 'general';
			await tick();
			radioEls[topic]?.focus();
		}
	}

	/** @type {{ id: 'general' | 'media'; label: string }[]} */
	$: topics = [
		{ id: 'general', label: $messages.contact.topicGeneral },
		{ id: 'media', label: $messages.contact.topicMedia }
	];

	$: blurb = topic === 'media' ? $messages.contact.blurbMedia : $messages.contact.blurbGeneral;

	/** @param {SubmitEvent} event */
	async function handleSubmit(event) {
		event.preventDefault();
		const form = /** @type {HTMLFormElement} */ (event.currentTarget);
		status = 'submitting';
		try {
			const response = await fetch(ENDPOINTS[topic], {
				method: 'POST',
				body: new FormData(form),
				headers: { Accept: 'application/json' }
			});
			if (response.ok) {
				status = 'success';
				form.reset();
				await tick();
				successHeading?.focus();
			} else {
				status = 'error';
			}
		} catch {
			status = 'error';
		}
	}

	function resetForm() {
		status = 'idle';
	}
</script>

<svelte:head>
	<title>{$messages.contact.metaTitle}</title>
	<meta name="description" content={$messages.contact.metaDescription} />
</svelte:head>

<main class="contact-page">
	<div class="contact-inner">
		<aside class="contact-aside">
			<h1 class="contact-title">{$messages.contact.pageTitle}</h1>
			<Rail height="5px" />
			<p class="contact-lede">{$messages.contact.intro}</p>
			<dl class="contact-list">
				<div class="contact-row">
					<dt class="contact-term">{$messages.contact.emailLabel}</dt>
					<dd class="contact-def">
						<a href={`mailto:${EMAIL}`} class="contact-link"
							>{EMAIL_USER}@<wbr />{EMAIL_DOMAIN}</a
						>
					</dd>
				</div>
				<div class="contact-row">
					<dt class="contact-term">{$messages.contact.phoneLabel}</dt>
					<dd class="contact-def">
						<a href="tel:+14352275195" class="contact-link">{PHONE}</a>
					</dd>
				</div>
			</dl>
			<div class="contact-cta">
				<p class="contact-cta-text">{$messages.contact.volunteerPrompt}</p>
				<Button href="/volunteer" variant="secondary">{$messages.contact.volunteerCta}</Button>
			</div>
		</aside>

		<div class="contact-form-wrap" id="contact-form">
			{#if status === 'success'}
					<div class="form-success" role="status" aria-live="polite">
						<p class="form-success-title" bind:this={successHeading} tabindex="-1">
							{$messages.contact.successTitle}
						</p>
						<p class="form-success-body">{$messages.contact.successBody}</p>
						<button type="button" class="form-success-again" on:click={resetForm}>
							{$messages.contact.sendAnother}
						</button>
					</div>
				{/if}
				<fieldset class="topic-switch" class:is-hidden={status === 'success'}>
				<legend class="topic-legend" id="topic-legend">{$messages.contact.topicLegend}</legend>
				<div
					class="topic-tabs"
					role="radiogroup"
					aria-labelledby="topic-legend"
					tabindex="-1"
					on:keydown={onTopicKeydown}
				>
					{#each topics as t (t.id)}
						<button
							type="button"
							role="radio"
							class="topic-tab"
							class:is-active={topic === t.id}
							aria-checked={topic === t.id}
							tabindex={topic === t.id ? 0 : -1}
							bind:this={radioEls[t.id]}
							on:click={() => (topic = t.id)}
						>
							{t.label}
						</button>
					{/each}
				</div>
			</fieldset>

			<form
					class="contact-form"
					class:is-hidden={status === 'success'}
					on:submit={handleSubmit}
				>
				<input type="hidden" name="topic" value={topic} />
					<input
						type="hidden"
						name="_subject"
						value={topic === 'media' ? 'Media request (website)' : 'General inquiry (website)'}
					/>
				<!-- Honeypot: hidden from people; bots that fill it are silently dropped by Formspree. -->
					<div class="hp-field" aria-hidden="true">
						<label for="contact-hp">Leave this field empty</label>
						<input id="contact-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
					</div>
					<p class="form-blurb">{blurb}</p>

					{#if topic === 'media'}
						<div class="form-row">
							<label class="form-label" for="media-outlet">{$messages.contact.mediaOutlet}</label>
							<input
								id="media-outlet"
								name="mediaOutlet"
								class="form-input"
								type="text"
								required
								maxlength="120"
								autocomplete="organization"
							/>
						</div>
					{/if}

				<div class="form-grid">
					<div class="form-row">
						<label class="form-label" for="first-name">{$messages.contact.firstName}</label>
						<input
							id="first-name"
							name="firstName"
							class="form-input"
							type="text"
							required
							maxlength="80"
							autocomplete="given-name"
						/>
					</div>
					<div class="form-row">
						<label class="form-label" for="last-name">{$messages.contact.lastName}</label>
						<input
							id="last-name"
							name="lastName"
							class="form-input"
							type="text"
							required
							maxlength="80"
							autocomplete="family-name"
						/>
					</div>
				</div>

				<div class="form-grid">
					<div class="form-row">
						<label class="form-label" for="phone">
							{$messages.contact.phone}
							<span class="form-optional">({$messages.common.optional})</span>
						</label>
						<input
							id="phone"
							name="phone"
							class="form-input"
							type="tel"
							maxlength="25"
							autocomplete="tel"
							inputmode="tel"
						/>
					</div>
					<div class="form-row">
						<label class="form-label" for="email">{$messages.contact.email}</label>
						<input
							id="email"
							name="email"
							class="form-input"
							type="email"
							required
							maxlength="254"
							autocomplete="email"
						/>
					</div>
				</div>

				<div class="form-row">
					<label class="form-label" for="message">{$messages.contact.message}</label>
					<textarea
						id="message"
						name="message"
						class="form-input form-textarea"
						rows="5"
						required
						maxlength="2000"
					></textarea>
				</div>

				{#if status === 'error'}
						<p class="form-error" role="alert">{$messages.contact.errorMessage}</p>
					{/if}

					<div class="form-foot">
					<p class="form-required">{$messages.contact.requiredNote}</p>
					<button type="submit" class="form-submit" disabled={status === 'submitting'}>
							{status === 'submitting' ? $messages.contact.sending : $messages.contact.send}
						</button>
				</div>
			</form>
		</div>
	</div>
</main>

<style>
	.contact-page {
		background: var(--paper);
		min-height: 60vh;
		padding: 3.5rem 1.5rem 4.5rem;
	}

	.contact-inner {
		max-width: 1080px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		gap: 3.5rem;
		align-items: start;
	}

	/* ---- Left aside ---- */
	.contact-aside {
		position: sticky;
		top: 2rem;
	}

	.contact-title {
		font-family: var(--display);
		font-style: italic;
		font-size: clamp(2.25rem, 4vw, 3rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		color: var(--ink);
		margin: 0 0 1rem;
		line-height: 1.02;
	}

	.contact-lede {
		font-family: var(--serif);
		font-size: 1.25rem;
		line-height: 1.55;
		color: var(--ink-2);
		margin: 1.5rem 0 2rem;
	}

	.contact-list {
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-row {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.contact-term {
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-3);
		margin: 0;
	}

	.contact-def {
		margin: 0;
	}

	.contact-link {
		font-family: var(--font-primary);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--blue);
		text-decoration: none;
		overflow-wrap: anywhere;
	}

	.contact-link:hover {
		color: var(--ink);
		text-decoration: underline;
	}

	.contact-cta {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line-l);
	}

	.contact-cta-text {
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.5;
		color: var(--ink-2);
		margin: 0 0 0.85rem;
	}

	/* ---- Right form panel ---- */
	.contact-form-wrap {
		background: var(--paper-2);
		border: 1px solid var(--line-l);
		padding: 1.75rem;
		min-width: 0;
		/* Clears the sticky nav (~117px tall) when linked to via #contact-form
		   (e.g. the Policies page "Ask a question" CTA). */
		scroll-margin-top: 8.5rem;
	}

	.topic-switch {
		border: none;
		padding: 0;
		margin: 0 0 1.5rem;
		/* Fieldsets default to min-width: min-content, which lets the tab grid
		   overflow its parent on narrow screens — pin it back to the container. */
		min-width: 0;
	}

	.topic-legend {
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-3);
		padding: 0;
		margin: 0 0 0.65rem;
	}

	.topic-tabs {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border: 1px solid var(--ink);
	}

	.topic-tab {
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.8125rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-align: center;
		padding: 0.7rem 0.5rem;
		background: transparent;
		color: var(--ink);
		border: none;
		border-right: 1px solid var(--ink);
		cursor: pointer;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.topic-tab:last-child {
		border-right: none;
	}

	.topic-tab:hover:not(.is-active) {
		background: var(--paper-3);
	}

	.topic-tab.is-active {
		background: var(--ink);
		color: var(--paper);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-blurb {
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.5;
		color: var(--ink-2);
		margin: 0;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	.form-row {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
	}

	.form-label {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--ink);
	}

	/* "(optional)" marker — de-emphasized, normal weight. */
	.form-optional {
		font-weight: 400;
		font-style: italic;
		color: var(--ink-2);
	}

	.form-input {
		font-family: var(--font-primary);
		font-size: 1rem;
		width: 100%;
		box-sizing: border-box;
		padding: 0.7rem 0.8rem;
		border: 1px solid var(--line-l);
		border-radius: 0;
		background: var(--paper);
		color: var(--ink);
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.form-input:focus {
		outline: none;
		border-color: var(--blue);
		box-shadow: 0 0 0 2px rgba(46, 95, 160, 0.2);
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
	}

	.form-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 0.25rem;
	}

	.form-required {
		font-family: var(--mono);
		font-size: 0.6875rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-3);
		margin: 0;
	}

	.form-submit {
		font-family: var(--display);
		font-style: italic;
		font-size: 0.9375rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.85rem 2rem;
		border: 2px solid var(--ink);
		border-radius: 0;
		background: var(--ink);
		color: var(--paper);
		cursor: pointer;
		transition:
			background 0.2s ease,
			border-color 0.2s ease;
	}

	.form-submit:hover {
		background: var(--ink-2);
		border-color: var(--ink-2);
	}

	.form-submit:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	.is-hidden {
		display: none;
	}

	/* Honeypot — kept in the DOM (so bots fill it) but away from people and AT. */
	.hp-field {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.form-error {
		font-family: var(--font-primary);
		font-size: 0.95rem;
		line-height: 1.4;
		color: #6b1616;
		background: rgba(150, 20, 20, 0.08);
		border: 1px solid rgba(150, 20, 20, 0.25);
		padding: 0.65rem 0.8rem;
		margin: 0;
	}

	.form-success {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		border-left: 3px solid var(--green);
		padding: 0.25rem 0 0.25rem 1.25rem;
	}

	.form-success-title {
		font-family: var(--display);
		font-style: italic;
		font-size: 1.5rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		color: var(--ink);
		margin: 0;
	}

	.form-success-body {
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.5;
		color: var(--ink-2);
		margin: 0;
	}

	.form-success-again {
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--blue);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.form-success-again:hover {
		color: var(--ink);
		text-decoration: underline;
	}

	@media (max-width: 860px) {
		.contact-inner {
			grid-template-columns: 1fr;
			gap: 2.25rem;
		}

		.contact-aside {
			position: static;
		}
	}

	@media (max-width: 560px) {
		.contact-page {
			padding: 2.5rem 1.25rem 3.5rem;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.contact-form-wrap {
			padding: 1.25rem;
		}

		/* Stack the topic tabs so the long labels stay legible instead of being
		   squeezed into two cramped columns. */
		.topic-tabs {
			grid-template-columns: 1fr;
		}

		.topic-tab {
			border-right: none;
			border-bottom: 1px solid var(--ink);
			padding: 0.75rem 0.5rem;
		}

		.topic-tab:last-child {
			border-bottom: none;
		}
	}
</style>
