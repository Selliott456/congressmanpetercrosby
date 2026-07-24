<script>
	import { tick } from 'svelte';
	import Rail from '$lib/components/Rail.svelte';
	import Button from '$lib/components/Button.svelte';
	import { messages } from '$lib/i18n/locale';

	const EMAIL = 'information@petercrosbyforcongress.org';
	const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split('@');
	const PHONE = '(435) 535-1048';
	const DONATE_URL = 'https://secure.actblue.com/donate/peter-crosby-1';
	const ENDPOINT = 'https://formspree.io/f/mqeovjzd';

	/** @type {'idle' | 'submitting' | 'success' | 'error'} */
	let status = 'idle';

	/** Success heading — focused on submit so the confirmation is announced/reachable. @type {HTMLElement | undefined} */
	let successHeading;

	/** @param {SubmitEvent} event */
	async function handleSubmit(event) {
		event.preventDefault();
		const form = /** @type {HTMLFormElement} */ (event.currentTarget);
		status = 'submitting';
		try {
			const response = await fetch(ENDPOINT, {
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
	<title>{$messages.volunteer.metaTitle}</title>
	<meta name="description" content={$messages.volunteer.metaDescription} />
</svelte:head>

<main class="contact-page">
	<div class="contact-inner">
		<aside class="contact-aside">
			<h1 class="contact-title">{$messages.volunteer.pageTitle}</h1>
			<Rail height="5px" />
			<p class="contact-lede">{$messages.volunteer.intro}</p>
			<dl class="contact-list">
				<div class="contact-row">
					<dt class="contact-term">{$messages.volunteer.emailLabel}</dt>
					<dd class="contact-def">
						<a href={`mailto:${EMAIL}`} class="contact-link">{EMAIL_USER}@<wbr />{EMAIL_DOMAIN}</a>
					</dd>
				</div>
				<div class="contact-row">
					<dt class="contact-term">{$messages.volunteer.phoneLabel}</dt>
					<dd class="contact-def">
						<a href="tel:+14355351048" class="contact-link">{PHONE}</a>
					</dd>
				</div>
			</dl>
			<div class="contact-cta">
				<p class="contact-cta-text">{$messages.volunteer.donatePrompt}</p>
				<Button href={DONATE_URL} variant="secondary">{$messages.volunteer.donate}</Button>
			</div>
		</aside>

		<div class="contact-form-wrap">
			{#if status === 'success'}
				<div class="form-success" role="status" aria-live="polite">
					<p class="form-success-title" bind:this={successHeading} tabindex="-1">
						{$messages.volunteer.successTitle}
					</p>
					<p class="form-success-body">{$messages.volunteer.successBody}</p>
					<button type="button" class="form-success-again" on:click={resetForm}>
						{$messages.volunteer.sendAnother}
					</button>
				</div>
			{:else}
				<form class="contact-form" on:submit={handleSubmit}>
					<input type="hidden" name="_subject" value="Volunteer signup (website)" />
					<!-- Stable machine tag so the Formspree → Airtable workflow can route by form. -->
					<input type="hidden" name="formType" value="volunteer" />

					<!-- Honeypot: hidden from people; bots that fill it are silently dropped by Formspree. -->
					<div class="hp-field" aria-hidden="true">
						<label for="volunteer-hp">Leave this field empty</label>
						<input id="volunteer-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
					</div>

					<div class="form-grid">
						<div class="form-row">
							<label class="form-label" for="first-name">{$messages.volunteer.firstName}</label>
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
							<label class="form-label" for="last-name">{$messages.volunteer.lastName}</label>
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
								{$messages.volunteer.phone}
								<span class="form-optional">({$messages.volunteer.optional})</span>
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
							<label class="form-label" for="email">{$messages.volunteer.email}</label>
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

					<div class="form-grid">
						<div class="form-row">
							<label class="form-label" for="city">{$messages.volunteer.city}</label>
							<input
								id="city"
								name="city"
								class="form-input"
								type="text"
								required
								maxlength="80"
								autocomplete="address-level2"
							/>
						</div>
						<div class="form-row">
							<label class="form-label" for="county">{$messages.volunteer.county}</label>
							<input
								id="county"
								name="county"
								class="form-input"
								type="text"
								required
								maxlength="80"
							/>
						</div>
					</div>

					<div class="form-row">
						<label class="form-label" for="house-district">
							{$messages.volunteer.houseDistrict}
							<span class="form-optional">({$messages.volunteer.optional})</span>
						</label>
						<input
							id="house-district"
							name="houseDistrict"
							class="form-input"
							type="text"
							maxlength="60"
							aria-describedby="house-district-hint"
						/>
						<p class="form-hint" id="house-district-hint">
							{$messages.volunteer.houseDistrictHint}
						</p>
					</div>

					<div class="form-row">
						<label class="form-label" for="source">{$messages.volunteer.source}</label>
						<input
							id="source"
							name="source"
							class="form-input"
							type="text"
							required
							maxlength="200"
							aria-describedby="source-hint"
						/>
						<p class="form-hint" id="source-hint">{$messages.volunteer.sourceHint}</p>
					</div>

					<div class="form-row">
						<label class="form-label" for="skills">
							{$messages.volunteer.skills}
							<span class="form-optional">({$messages.volunteer.optional})</span>
						</label>
						<textarea
							id="skills"
							name="skills"
							class="form-input form-textarea"
							rows="4"
							maxlength="2000"
							aria-describedby="skills-hint"
						></textarea>
						<p class="form-hint" id="skills-hint">{$messages.volunteer.skillsHint}</p>
					</div>

					{#if status === 'error'}
						<p class="form-error" role="alert">{$messages.volunteer.errorMessage}</p>
					{/if}

					<div class="form-foot">
						<p class="form-required">{$messages.volunteer.requiredNote}</p>
						<button type="submit" class="form-submit" disabled={status === 'submitting'}>
							{status === 'submitting' ? $messages.volunteer.sending : $messages.volunteer.send}
						</button>
					</div>
				</form>
			{/if}
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
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
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

	.form-optional {
		font-weight: 500;
		opacity: 0.7;
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

	.form-hint {
		font-family: var(--font-primary);
		font-size: 0.8125rem;
		line-height: 1.4;
		color: var(--ink-3);
		margin: 0;
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
	}
</style>
