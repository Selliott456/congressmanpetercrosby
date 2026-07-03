<script>
	import Rail from '$lib/components/Rail.svelte';
	import Button from '$lib/components/Button.svelte';
	import { messages } from '$lib/i18n/locale';

	const EMAIL = 'information@petercrosbyforcongress.org';
	const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split('@');
	const PHONE = '(435) 535-1048';
	const DONATE_URL = 'https://secure.actblue.com/donate/peter-crosby-1';
	const ENDPOINT = 'https://formspree.io/f/mqeovjzd';

	/** Public campaign volunteer calendar (Google Calendar embed, Mountain Time).
	    `mode` is appended reactively so the view toggle can swap it. */
	const CALENDAR_BASE =
		'https://calendar.google.com/calendar/embed?src=c_d787cfc734b49c528b0bfa1f07974f5ed70aa91e7e020a51f1a304f99b305b86%40group.calendar.google.com&ctz=America%2FDenver&showTitle=0&showPrint=0&showCalendars=0&showTz=0';

	/** Google Calendar view mode. @type {'MONTH' | 'AGENDA'} */
	let calView = 'MONTH';
	$: calendarSrc = `${CALENDAR_BASE}&mode=${calView}`;

	/** @type {'idle' | 'submitting' | 'success' | 'error'} */
	let status = 'idle';

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
	<header class="volunteer-head">
		<h1 class="contact-title">{$messages.volunteer.pageTitle}</h1>
		<Rail height="5px" />
		<p class="contact-lede">{$messages.volunteer.intro}</p>
		<dl class="contact-list volunteer-head-contact">
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
	</header>

	<div class="contact-inner volunteer-grid">
		<aside class="contact-aside volunteer-cal-col">
			<div class="volunteer-cal-head">
				<h2 class="volunteer-cal-heading">{$messages.volunteer.calendarHeading}</h2>
				<div class="cal-view-toggle" role="group" aria-label={$messages.volunteer.calViewLabel}>
					<button
						type="button"
						class="cal-view-btn"
						class:is-active={calView === 'MONTH'}
						aria-pressed={calView === 'MONTH'}
						on:click={() => (calView = 'MONTH')}
					>
						{$messages.volunteer.calViewMonth}
					</button>
					<button
						type="button"
						class="cal-view-btn"
						class:is-active={calView === 'AGENDA'}
						aria-pressed={calView === 'AGENDA'}
						on:click={() => (calView = 'AGENDA')}
					>
						{$messages.volunteer.calViewAgenda}
					</button>
				</div>
			</div>
			<div class="volunteer-calendar">
				<div class="volunteer-calendar-rail"><Rail /></div>
				<iframe
					class="volunteer-calendar-frame"
					title={$messages.volunteer.calendarHeading}
					src={calendarSrc}
					loading="lazy"
				></iframe>
			</div>
		</aside>

		<div class="contact-form-wrap">
			{#if status === 'success'}
				<div class="form-success" role="status" aria-live="polite">
					<p class="form-success-title">{$messages.volunteer.successTitle}</p>
					<p class="form-success-body">{$messages.volunteer.successBody}</p>
					<button type="button" class="form-success-again" on:click={resetForm}>
						{$messages.volunteer.sendAnother}
					</button>
				</div>
			{:else}
				<form class="contact-form" on:submit={handleSubmit}>
					<input type="hidden" name="_subject" value="Volunteer signup (website)" />

					<!-- Honeypot: hidden from people; bots that fill it are silently dropped by Formspree. -->
					<div class="hp-field" aria-hidden="true">
						<label for="volunteer-hp">Leave this field empty</label>
						<input id="volunteer-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
					</div>

					<div class="form-row">
						<label class="form-label" for="full-name">{$messages.volunteer.fullName}</label>
						<input
							id="full-name"
							name="fullName"
							class="form-input"
							type="text"
							required
							maxlength="120"
							autocomplete="name"
						/>
					</div>

					<div class="form-grid">
						<div class="form-row">
							<label class="form-label" for="phone">{$messages.volunteer.phone}</label>
							<input
								id="phone"
								name="phone"
								class="form-input"
								type="tel"
								required
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

	<div class="contact-cta volunteer-donate">
		<p class="contact-cta-text">{$messages.volunteer.donatePrompt}</p>
		<Button href={DONATE_URL} variant="secondary">{$messages.volunteer.donate}</Button>
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

	/* Full-width title + lede header above the two-column body. */
	.volunteer-head {
		max-width: 1080px;
		margin: 0 auto 2.5rem;
	}

	.volunteer-head .contact-lede {
		max-width: 62ch;
		margin: 1.5rem 0 0;
	}

	/* Email + phone sit side by side under the header lede. (Compound selector
	   so it beats the base .contact-list column layout regardless of order.) */
	.contact-list.volunteer-head-contact {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1.5rem 2.5rem;
		margin-top: 1.75rem;
	}

	/* Donate CTA spans the full content width beneath the calendar + form. */
	.volunteer-donate {
		max-width: 1080px;
		margin: 3rem auto 0;
		text-align: center;
	}

	/* Calendar (left) + form (right). */
	.volunteer-grid {
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	}

	/* ---- Left aside ---- */
	.contact-aside {
		position: sticky;
		top: 2rem;
	}

	/* The calendar column is tall, so it doesn't stick like the old aside. */
	.volunteer-cal-col {
		position: static;
	}

	.volunteer-cal-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin: 0 0 0.75rem;
	}

	.volunteer-cal-heading {
		font-family: var(--display);
		font-style: italic;
		font-size: 1.125rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		color: var(--ink);
		margin: 0;
	}

	/* Month / Agenda segmented toggle. */
	.cal-view-toggle {
		display: inline-flex;
		flex-shrink: 0;
		border: 1px solid var(--line-l);
	}

	.cal-view-btn {
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.4rem 0.75rem;
		background: var(--paper);
		color: var(--ink-3);
		border: none;
		cursor: pointer;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.cal-view-btn + .cal-view-btn {
		border-left: 1px solid var(--line-l);
	}

	.cal-view-btn:hover:not(.is-active) {
		color: var(--ink);
	}

	.cal-view-btn.is-active {
		background: var(--blue);
		color: var(--paper);
	}

	.volunteer-calendar {
		border: 1px solid var(--line-l);
		background: var(--paper);
	}

	.volunteer-calendar-rail {
		line-height: 0;
	}

	.volunteer-calendar-frame {
		display: block;
		width: 100%;
		height: 620px;
		border: 0;
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

		.volunteer-calendar-frame {
			height: 460px;
		}
	}
</style>
