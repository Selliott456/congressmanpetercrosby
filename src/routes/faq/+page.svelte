<script>
	import ButtonSecondary from '$lib/components/ButtonSecondary.svelte';
</script>

<svelte:head>
	<title>FAQs — Peter Crosby for Congress</title>
	<meta name="description" content="Frequently asked questions about Peter Crosby's policy priorities, economic issues, government integrity, and healthcare." />
</svelte:head>

<main class="faq-page">
	<div class="faq-content">
		<h1 class="faq-title">FAQs</h1>

		<section class="faq-section">
			<h2 class="faq-question">What are your top policy priorities?</h2>
			<div class="faq-answer">
				<p>My policy priorities are a reflection of the people I speak with throughout Northern Utah. These conversations have surfaced a variety of concerns and issues, but I think they can be summed up in the following areas:</p>
				<ul>
					<li>The economic well being of our district</li>
					<li>The integrity of our government</li>
					<li>The health of our communities</li>
				</ul>
				<p>In these areas, and in all other policy making, my top priority is to represent the people of Northern Utah. My policy positions are people first.</p>
			</div>
		</section>

		<section class="faq-section">
			<h2 class="faq-question">What are the economic issues facing northern Utah and what would you do about them?</h2>
			<div class="faq-answer">
				<p>Northern Utah has a strong tradition of hard work combined with innovation supported by a community that puts people first. These values and traditions have served us well for decades, but are now under stress, partly because of the actions (or inaction) or our representatives.</p>
				<p>We are currently experiencing a housing crisis that prevents people from finding permanent homes due to a housing market that is one of the most expensive in the country. While there are some in-state efforts to alleviate this pressure, they are falling well short of our current needs. We need to incentivize better planning, more affordable housing built around community models, and increase the income available to average Utahns so they can afford to start building their families and their futures here.</p>
				<p>We are also seeing inflation and cost of living increases that are making it more difficult for anyone who is not in the top 1%. Basic staples, like meat, eggs, and milk, are taking an increasingly large part of our grocery budgets each month. Other consumer goods impacted by the tariffs imposed by the Trump administration (and ignored by our own Congressional representative) are more expensive. At the same time, the job market appears to be weakening, creating a situation where everything is more expensive and fewer and fewer members of our community can afford to provide for themselves or their families.</p>
				<p>Adding to this building disaster are thousands of federal workers and members of the military who are now either furloughed or forced to work without pay because a Republican House, a Republican Senate, and a Republican White House can not effectively govern. There are already reports of dedicated food banks and other community resources being stretched to a breaking point, while our representatives take a paid vacation.</p>
				<p>My priority in solving these challenges is to focus on the people here in Northern Utah by using the power of the Congress to right the ship. I would join other willing members of Congress and bring an end to an illegal tariff regime that is making it harder and harder for our local business and entrepreneurs to make a living. I would ensure the law is upheld in making sure SNAP benefits are distributed to the more than 80,000 Utah families who are struggling. Finally, I would stand up against the current Republican leadership in D.C. They need to learn how to govern, or they need to get a new job.</p>
			</div>
		</section>

		<section class="faq-section">
			<h2 class="faq-question">You mention the integrity of our government as an issue raised by people here in Northern Utah. What do you mean by that, and what would you do?</h2>
			<div class="faq-answer">
				<p>My family has a long and proud tradition of military and public service that dates back before the United States was the United States. An integral part of my childhood was learning about the obligation we have as citizens to our country, and the special burden that public servants carry as they represent us in our national government. This past year, we have seen our trust broken by our representatives as our nation moves further towards a government that does not care about the rule of law or the will of the people.</p>
				<p>Our representative should put the Constitution of the United States first, the needs of this district second, and all other concerns somewhere much lower. We elect them to represent us, not their political party and not their own self-interests. I have spoken with many people throughout Northern Utah who feel they can not trust their current representative to put the people of this district before D.C. party politics or individual self-promotion, and sadly, I think this last year has shown that to be true.</p>
				<p>I think there are several solutions that will help rebuild our trust in our government, and they require sacrifice on the part of our representatives. First, I would ban individual stock trades for all members of Congress and their immediate families. It is not right for someone to regulate the company they invest in. Our representatives are there to serve us, not their bank accounts.</p>
				<p>Second, I would support a conversation about term limits for Congress. It is healthy for our democracy to prevent any individual from any political party making a permanent home in Congress. America does not want, nor does it need, forever politicians.</p>
				<p>Third, I support efforts to remove corporate money from our political process. Our government is "of the people, by the people, for the people," not corporate interests. Removing the influence of this "dark money" will help all of our public servants better serve us, the people.</p>
				<p>All three of these solutions are reasonable, and require our current and future representatives to put the needs of this country and their voters ahead of partisan politics and personal benefits. I am willing to do that, with the support of the voters in this district.</p>
			</div>
		</section>

		<section class="faq-section">
			<h2 class="faq-question">What is your position on the cuts to the Affordable Care Act (ACA or "Obamacare") and access to healthcare for rural communities?</h2>
			<div class="faq-answer">
				<p>The recent "Big Beautiful Bill," which District 1's Rep. Blake Moore helped craft and pass, significantly cuts access to healthcare by reducing payments to Medicare starting in 2026. These cuts hit hardest in rural communities like those here in Northern Utah, and will make it more expensive to get access to medical care. This is already having an impact here in Utah, as the state is unable to match federal investment at the same level we have in the past, despite the fact we run a large surplus in our state budget. This will likely impact our hospital and emergency care systems the hardest. For rural communities especially, this means less access to critical care.</p>
				<p>Given this, I am not in favor of the Big Beautiful Bill and its cuts targeted at our local communities. It is bad policy, and it will significantly harm thousands of Utah families.</p>
			</div>
		</section>

		<div class="faq-cta">
			<ButtonSecondary href="https://secure.actblue.com/donate/peter-crosby-1">Donate</ButtonSecondary>
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
