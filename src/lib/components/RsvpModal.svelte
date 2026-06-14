<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { messages } from '$lib/i18n/locale';
	import { markRsvped } from '$lib/stores/rsvp';
	import Rail from './Rail.svelte';

	const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjylwar';

	/** @type {import('$lib/data/events').EventRow & { title: string; description: string }} */
	export let event;

	const dispatch = createEventDispatcher();

	let firstName = '';
	let lastName = '';
	let email = '';
	let gotcha = ''; // honeypot — bots fill it, humans don't
	let submitting = false;
	let succeeded = false;
	/** @type {string} */
	let error = '';

	/** @type {HTMLInputElement | undefined} */
	let firstInput;

	$: dateLabel = `${$messages.events.monthAbbrev[event.monthIndex - 1]} ${event.day}, ${event.year}`;
	$: subtitle = event.time ? `${dateLabel} · ${event.time}` : dateLabel;

	function close() {
		dispatch('close');
	}

	/** @param {KeyboardEvent} e */
	function onKeydown(e) {
		if (e.key === 'Escape') close();
	}

	async function submit() {
		if (submitting) return;
		submitting = true;
		error = '';
		try {
			const res = await fetch(FORMSPREE_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					event: event.title,
					eventDate: dateLabel,
					_subject: `RSVP: ${event.title} (${dateLabel})`,
					_gotcha: gotcha
				})
			});
			if (res.ok) {
				markRsvped(event.id);
				succeeded = true;
			} else {
				const data = await res.json().catch(() => null);
				error = data?.errors?.[0]?.message ?? $messages.events.ui.rsvpError;
			}
		} catch {
			error = $messages.events.ui.rsvpError;
		} finally {
			submitting = false;
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

<div
	class="rsvp-overlay"
	role="presentation"
	on:click|self={close}
>
	<div
		class="rsvp-modal"
		role="dialog"
		aria-modal="true"
		aria-labelledby="rsvp-title"
	>
		<Rail />
		<button type="button" class="rsvp-close" aria-label={$messages.events.ui.rsvpClose} on:click={close}>×</button>

		<div class="rsvp-modal-inner">
			{#if succeeded}
				<div class="rsvp-success">
					<span class="rsvp-success-check" aria-hidden="true">✓</span>
					<h2 id="rsvp-title" class="rsvp-title">{$messages.events.ui.rsvpSuccessTitle}</h2>
					<p class="rsvp-success-body">{$messages.events.ui.rsvpSuccessBody}</p>
					<button type="button" class="rsvp-submit" on:click={close}>{$messages.events.ui.rsvpDone}</button>
				</div>
			{:else}
				<p class="rsvp-eyebrow">{$messages.events.ui.rsvpModalTitle}</p>
				<h2 id="rsvp-title" class="rsvp-title">{event.title}</h2>
				<p class="rsvp-subtitle">{subtitle}</p>

				<form class="rsvp-form" on:submit|preventDefault={submit}>
					<!-- Honeypot: visually hidden, off-screen, not tabbable -->
					<label class="rsvp-honeypot" aria-hidden="true">
						Leave this empty
						<input type="text" tabindex="-1" autocomplete="off" bind:value={gotcha} />
					</label>

					<div class="rsvp-field">
						<label class="rsvp-label" for="rsvp-first">{$messages.events.ui.rsvpFirstName}</label>
						<input
							id="rsvp-first"
							class="rsvp-input"
							type="text"
							bind:value={firstName}
							bind:this={firstInput}
							required
							autocomplete="given-name"
						/>
					</div>

					<div class="rsvp-field">
						<label class="rsvp-label" for="rsvp-last">{$messages.events.ui.rsvpLastName}</label>
						<input
							id="rsvp-last"
							class="rsvp-input"
							type="text"
							bind:value={lastName}
							required
							autocomplete="family-name"
						/>
					</div>

					<div class="rsvp-field">
						<label class="rsvp-label" for="rsvp-email">{$messages.events.ui.rsvpEmail}</label>
						<input
							id="rsvp-email"
							class="rsvp-input"
							type="email"
							bind:value={email}
							required
							autocomplete="email"
						/>
					</div>

					{#if error}
						<p class="rsvp-error" role="alert">{error}</p>
					{/if}

					<button type="submit" class="rsvp-submit" disabled={submitting}>
						{submitting ? $messages.events.ui.rsvpSubmitting : $messages.events.ui.rsvpSubmit}
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	.rsvp-overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(9, 27, 54, 0.62);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.rsvp-modal {
		position: relative;
		width: 100%;
		max-width: 440px;
		background: var(--paper);
		border: 1px solid var(--line-l);
		max-height: calc(100vh - 3rem);
		overflow-y: auto;
	}

	.rsvp-close {
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

	.rsvp-close:hover {
		color: var(--ink);
	}

	.rsvp-modal-inner {
		padding: 1.75rem 1.75rem 2rem;
	}

	.rsvp-eyebrow {
		margin: 0 0 0.4rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.6875rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--blue);
	}

	.rsvp-title {
		margin: 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: 1.5rem;
		letter-spacing: -0.02em;
		line-height: 1.1;
		color: var(--ink);
	}

	.rsvp-subtitle {
		margin: 0.35rem 0 1.25rem;
		font-family: var(--mono);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.rsvp-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.rsvp-honeypot {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.rsvp-field {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.rsvp-label {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--ink);
	}

	.rsvp-input {
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

	.rsvp-input:focus {
		outline: none;
		border-color: var(--blue);
		box-shadow: 0 0 0 2px rgba(46, 95, 160, 0.2);
	}

	.rsvp-error {
		margin: 0;
		padding: 0.55rem 0.7rem;
		font-family: var(--font-primary);
		font-size: 0.875rem;
		color: #6b1616;
		background: rgba(150, 20, 20, 0.1);
		border: 1px solid rgba(150, 20, 20, 0.25);
	}

	.rsvp-submit {
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

	.rsvp-submit:hover:not(:disabled) {
		background: var(--blue);
		border-color: var(--blue);
	}

	.rsvp-submit:disabled {
		opacity: 0.65;
		cursor: default;
	}

	.rsvp-success {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
	}

	.rsvp-success-check {
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

	.rsvp-success-body {
		margin: 0 0 0.75rem;
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.5;
		color: var(--ink-2);
	}
</style>
