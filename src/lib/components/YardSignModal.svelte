<script>
	import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte';
	import { messages } from '$lib/i18n/locale';
	import Rail from './Rail.svelte';

	/** Yard-sign requests → Formspree (campaign wires the Formspree → Airtable automation). */
	const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjeooql';
	/** ActBlue "sponsor a yard sign" donation page. */
	const SPONSOR_URL = 'https://secure.actblue.com/donate/peteryardsign';

	const dispatch = createEventDispatcher();

	/** @type {'idle' | 'submitting' | 'success' | 'error'} */
	let status = 'idle';

	/** @type {HTMLInputElement | undefined} */
	let firstInput;
	/** Success heading — focused on submit so the confirmation is announced/reachable. @type {HTMLElement | undefined} */
	let successHeading;

	function close() {
		dispatch('close');
	}

	/** @param {KeyboardEvent} e */
	function onKeydown(e) {
		if (e.key === 'Escape') close();
	}

	/** @param {SubmitEvent} event */
	async function handleSubmit(event) {
		event.preventDefault();
		const form = /** @type {HTMLFormElement} */ (event.currentTarget);
		status = 'submitting';
		try {
			const response = await fetch(FORMSPREE_ENDPOINT, {
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

	onMount(() => {
		document.body.style.overflow = 'hidden';
		firstInput?.focus();
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<svelte:window on:keydown={onKeydown} />

<div class="ys-overlay" role="presentation" on:click|self={close}>
	<div class="ys-modal" role="dialog" aria-modal="true" aria-labelledby="ys-title">
		<Rail />
		<button type="button" class="ys-close" aria-label={$messages.yardSign.close} on:click={close}>×</button>

		<div class="ys-modal-inner">
			{#if status === 'success'}
				<div class="ys-success">
					<span class="ys-success-check" aria-hidden="true">✓</span>
					<h2 id="ys-title" class="ys-title" bind:this={successHeading} tabindex="-1">
						{$messages.yardSign.successTitle}
					</h2>
					<p class="ys-success-body">{$messages.yardSign.successBody}</p>
					<div class="ys-sponsor ys-sponsor--success">
						<p class="ys-sponsor-text">{$messages.yardSign.successSponsorPrompt}</p>
						<a
							class="ys-sponsor-btn"
							href={SPONSOR_URL}
							target="_blank"
							rel="noopener noreferrer"
						>
							{$messages.yardSign.sponsorCta}
						</a>
					</div>
					<button type="button" class="ys-submit ys-done" on:click={close}>
						{$messages.yardSign.done}
					</button>
				</div>
			{:else}
				<p class="ys-eyebrow">{$messages.yardSign.eyebrow}</p>
				<h2 id="ys-title" class="ys-title">{$messages.yardSign.title}</h2>
				<p class="ys-blurb">{$messages.yardSign.blurb}</p>

				<form class="ys-form" on:submit={handleSubmit}>
					<input type="hidden" name="_subject" value="Yard sign request (website)" />
					<!-- Stable machine tag so the Formspree → Airtable workflow can route by form. -->
					<input type="hidden" name="formType" value="yard-sign" />
					<!-- Honeypot: hidden from people; bots that fill it are silently dropped by Formspree. -->
					<div class="hp-field" aria-hidden="true">
						<label for="ys-hp">Leave this field empty</label>
						<input id="ys-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
					</div>

					<div class="ys-grid">
						<div class="ys-field">
							<label class="ys-label" for="ys-first">{$messages.yardSign.firstName}</label>
							<input
								id="ys-first"
								name="firstName"
								class="ys-input"
								type="text"
								bind:this={firstInput}
								required
								maxlength="80"
								autocomplete="given-name"
							/>
						</div>
						<div class="ys-field">
							<label class="ys-label" for="ys-last">{$messages.yardSign.lastName}</label>
							<input
								id="ys-last"
								name="lastName"
								class="ys-input"
								type="text"
								required
								maxlength="80"
								autocomplete="family-name"
							/>
						</div>
					</div>

					<div class="ys-grid">
						<div class="ys-field ys-field--qty">
							<label class="ys-label" for="ys-qty">{$messages.yardSign.quantity}</label>
							<input
								id="ys-qty"
								name="quantity"
								class="ys-input"
								type="number"
								inputmode="numeric"
								value="1"
								min="1"
								max="10"
								required
							/>
						</div>
						<div class="ys-field">
							<label class="ys-label" for="ys-email">{$messages.yardSign.email}</label>
							<input
								id="ys-email"
								name="email"
								class="ys-input"
								type="email"
								required
								maxlength="254"
								autocomplete="email"
							/>
						</div>
					</div>

					<div class="ys-field">
						<label class="ys-label" for="ys-phone">{$messages.yardSign.phone}</label>
						<input
							id="ys-phone"
							name="phone"
							class="ys-input"
							type="tel"
							required
							maxlength="25"
							autocomplete="tel"
							inputmode="tel"
						/>
					</div>

					<div class="ys-field">
						<label class="ys-label" for="ys-street">{$messages.yardSign.streetAddress}</label>
						<input
							id="ys-street"
							name="streetAddress"
							class="ys-input"
							type="text"
							required
							maxlength="160"
							autocomplete="street-address"
						/>
					</div>

					<div class="ys-field">
						<label class="ys-label" for="ys-city">{$messages.yardSign.city}</label>
						<input
							id="ys-city"
							name="city"
							class="ys-input"
							type="text"
							required
							maxlength="80"
							autocomplete="address-level2"
						/>
					</div>

					<div class="ys-field">
						<label class="ys-label" for="ys-instructions">
							{$messages.yardSign.instructions}
							<span class="ys-optional">({$messages.common.optional})</span>
						</label>
						<textarea
							id="ys-instructions"
							name="placementInstructions"
							class="ys-input ys-textarea"
							rows="3"
							maxlength="600"
							aria-describedby="ys-instructions-hint"
						></textarea>
						<p class="ys-hint" id="ys-instructions-hint">{$messages.yardSign.instructionsHint}</p>
					</div>

					<!-- Donation nudge: suggest sponsoring to cover print + placement cost. -->
					<div class="ys-sponsor">
						<p class="ys-sponsor-text">{$messages.yardSign.donatePrompt}</p>
						<a class="ys-sponsor-link" href={SPONSOR_URL} target="_blank" rel="noopener noreferrer">
							{$messages.yardSign.sponsorCta}
						</a>
					</div>

					{#if status === 'error'}
						<p class="ys-error" role="alert">{$messages.yardSign.error}</p>
					{/if}

					<div class="ys-foot">
						<p class="ys-required">{$messages.yardSign.requiredNote}</p>
						<button type="submit" class="ys-submit" disabled={status === 'submitting'}>
							{status === 'submitting' ? $messages.yardSign.submitting : $messages.yardSign.submit}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	.ys-overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(9, 27, 54, 0.62);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.ys-modal {
		position: relative;
		width: 100%;
		max-width: 480px;
		background: var(--paper);
		border: 1px solid var(--line-l);
		max-height: calc(100vh - 3rem);
		overflow-y: auto;
	}

	.ys-close {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
		line-height: 1;
		color: var(--ink-2);
		background: transparent;
		border: 0;
		cursor: pointer;
	}

	.ys-close:hover {
		color: var(--ink);
	}

	.ys-modal-inner {
		padding: 1.75rem 1.75rem 2rem;
	}

	.ys-eyebrow {
		margin: 0 0 0.4rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.6875rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--blue);
	}

	.ys-title {
		margin: 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: 1.5rem;
		letter-spacing: -0.02em;
		line-height: 1.1;
		color: var(--ink);
	}

	.ys-blurb {
		margin: 0.5rem 0 1.25rem;
		font-family: var(--serif);
		font-size: 1rem;
		line-height: 1.5;
		color: var(--ink-2);
	}

	.ys-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.ys-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.ys-field {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-width: 0;
	}

	.ys-field--qty {
		max-width: 8rem;
	}

	.ys-label {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--ink);
	}

	.ys-optional {
		font-weight: 400;
		font-style: italic;
		color: var(--ink-2);
	}

	.ys-input {
		font-family: var(--font-primary);
		font-size: 1rem;
		width: 100%;
		box-sizing: border-box;
		padding: 0.65rem 0.8rem;
		border: 1px solid var(--line-l);
		border-radius: 0;
		background: var(--color-white);
		color: var(--ink);
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.ys-input:focus {
		outline: none;
		border-color: var(--blue);
		box-shadow: 0 0 0 2px rgba(46, 95, 160, 0.2);
	}

	.ys-textarea {
		resize: vertical;
		min-height: 72px;
	}

	.ys-hint {
		font-family: var(--font-primary);
		font-size: 0.8125rem;
		line-height: 1.4;
		color: var(--ink-2);
		margin: 0;
	}

	/* Donation nudge — civic-blue tinted panel with the ActBlue sponsor link. */
	.ys-sponsor {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0.9rem 1rem;
		background: rgba(46, 95, 160, 0.07);
		border: 1px solid rgba(46, 95, 160, 0.2);
	}

	.ys-sponsor-text {
		margin: 0;
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		line-height: 1.45;
		color: var(--ink-2);
	}

	.ys-sponsor-link {
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.9375rem;
		color: var(--blue);
		text-decoration: none;
	}

	.ys-sponsor-link:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.ys-error {
		margin: 0;
		padding: 0.55rem 0.7rem;
		font-family: var(--font-primary);
		font-size: 0.875rem;
		color: #6b1616;
		background: rgba(150, 20, 20, 0.1);
		border: 1px solid rgba(150, 20, 20, 0.25);
	}

	.ys-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.ys-required {
		margin: 0;
		font-family: var(--mono);
		font-size: 0.6875rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.ys-submit {
		font-family: var(--display);
		font-style: italic;
		font-size: 0.875rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.8rem 1.5rem;
		border: 1px solid var(--ink);
		background: var(--ink);
		color: var(--paper);
		cursor: pointer;
		transition:
			background 0.18s ease,
			border-color 0.18s ease;
	}

	.ys-submit:hover:not(:disabled) {
		background: var(--blue);
		border-color: var(--blue);
	}

	.ys-submit:disabled {
		opacity: 0.65;
		cursor: default;
	}

	/* ---- Success state ---- */
	.ys-success {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
	}

	.ys-success-check {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: var(--green);
		color: var(--paper);
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}

	.ys-success-body {
		margin: 0 0 0.5rem;
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.5;
		color: var(--ink-2);
	}

	.ys-sponsor--success {
		width: 100%;
		text-align: center;
		align-items: center;
	}

	.ys-sponsor-btn {
		display: inline-block;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.875rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 0.7rem 1.4rem;
		border: 1px solid var(--blue);
		background: var(--blue);
		color: var(--paper);
		text-decoration: none;
	}

	.ys-sponsor-btn:hover {
		background: var(--ink);
		border-color: var(--ink);
	}

	.ys-done {
		margin-top: 0.5rem;
	}

	/* Honeypot — kept in the DOM (so bots fill it) but away from people and AT. */
	.hp-field {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	@media (max-width: 480px) {
		.ys-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
