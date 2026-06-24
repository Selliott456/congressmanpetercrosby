<script>
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import { messages } from '$lib/i18n/locale';
</script>

<div class="announce">
	<div class="announce-inner">
		<p class="announce-dates">
			<span class="announce-date">{$messages.announcement.ballotsMail}</span>
			<span class="announce-sep" aria-hidden="true"></span>
			<span class="announce-date">{$messages.announcement.electionDay}</span>
		</p>
		<div class="announce-right">
			<a
				class="announce-register"
				href="https://vote.utah.gov"
				target="_blank"
				rel="noopener noreferrer"
			>
				{$messages.announcement.registerToVote}<span class="announce-arrow" aria-hidden="true"
					>&#8599;</span
				>
			</a>
			<LanguageSwitcher />
		</div>
	</div>
</div>

<style>
	.announce {
		background: var(--ink-deep);
		color: var(--paper);
	}

	.announce-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0.3rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.announce-dates {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		margin: 0;
		min-width: 0;
		font-family: var(--mono);
		font-size: 0.6875rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(247, 250, 252, 0.72);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.announce-sep {
		flex-shrink: 0;
		width: 1px;
		height: 11px;
		background: var(--line-d);
	}

	.announce-right {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		flex-shrink: 0;
	}

	.announce-register {
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--sky);
		text-decoration: none;
		white-space: nowrap;
		transition: color 0.2s ease;
	}

	.announce-register:hover {
		color: var(--paper);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.announce-arrow {
		margin-left: 0.3em;
		font-weight: 400;
		text-decoration: none;
	}

	@media (max-width: 640px) {
		.announce-inner {
			padding: 0.3rem var(--mobile-margin);
		}

		/* Thin bar: keep the actions; the dates would overflow at phone widths */
		.announce-dates {
			display: none;
		}

		.announce-right {
			flex: 1;
			justify-content: space-between;
		}
	}
</style>
