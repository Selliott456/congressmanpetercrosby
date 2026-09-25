import { definePolicyItems } from '$lib/data/policies';

/** English-only page copy (merged into dictionaries.en) */
export const pagesEn = {
	common: {
		donate: 'Donate',
		viewEvent: 'View Event →',
		optional: 'optional',
		/** Link previews (PageMeta): og:site_name, and alt text for the branded share card. */
		siteName: 'Peter Crosby for Congress',
		shareImageAlt:
			'Peter Crosby for Congress — The Voice for Northern Utah. U.S. Congress, Utah District 2.'
	},
	about: {
		metaTitle: 'About Peter Crosby — Peter Crosby for Congress',
		metaDescription:
			'Learn about Peter Crosby: husband, father, experienced leader, and service-driven candidate for Northern Utah.',
		heroAlt: 'Peter Crosby with his wife Amanda and their three daughters',
		eyebrow: 'Meet Peter',
		introTitle: 'Family Centered, Community Focused',
		introLede: [
			'Northern Utah is my home, my neighborhood, and my community. I’m running for Congress because our neighborhoods deserve steady, common-sense leadership focused on the real answers to the problems hitting us the hardest.',
			'From lowering the rising cost of living to protecting the local jobs that anchor our communities, my commitment is to deliver honest stewardship and real accountability.'
		],
		trailEyebrow: 'Rooted in Northern Utah',
		trailAria: 'Candid photos of family and community',
		sections: [
			{
				title: 'A Family History of Public Service, A Duty to Serve',
				image: '/images/about/service-heritage.jpg',
				caption: 'Service runs in the family',
				parts: [
					{
						type: 'p' as const,
						text: 'My parents were both in the military, as were both of my grandfathers, and both of my brothers. My wife’s father, brothers, and grandparents also served. I am an Eagle Scout and was a cadet in the ROTC, both foundational experiences in my life. Service is hard coded into us, and my wife and I have tried to instill those values in our daughters.'
					},
					{
						type: 'p' as const,
						text: 'After an injury ended my time in the ROTC, I knew I had to choose a different path for serving my country. Running for Congress is part of that service.'
					},
					{
						type: 'p' as const,
						text: 'Safekeeping the rights and freedoms of our country requires sacrifice from all of us. The oath I made as an Eagle Scout almost twenty-five years ago to better society is still central to my life today. Public servants, like our Congressional representatives, are there to serve their neighbors.'
					},
					{
						type: 'p' as const,
						text: 'As your elected representative in Congress, I promise to uphold my commitment to serving the best interests of my community.'
					}
				]
			},
			{
				title: 'A Husband and Father Rooted in Northern Utah, Who Understands Life Here',
				image: '/images/about/family-northern-utah.jpg',
				caption: 'Nineteen years in Northern Utah',
				parts: [
					{
						type: 'p' as const,
						text: 'My wife, Amanda, and I, have been raising our three beautiful daughters in Northern Utah for 19 years. They are kind, passionate, brilliant, and remarkable young women.'
					},
					{
						type: 'p' as const,
						text: 'We teach them to be honest, to have integrity, to love their neighbor, and to work hard.'
					},
					{
						type: 'p' as const,
						text: 'I am running to make sure they, and everyone else, have the opportunities we were promised. Please join me to help make that possible.'
					},
					{
						type: 'p' as const,
						text: 'I started my professional career and had my first child in the summer of 2008, right as our country entered the worst financial crisis in decades. I graduated with my bachelor’s degree in 2011, into one of the worst job markets for graduating students in history.'
					},
					{
						type: 'p' as const,
						text: 'From having to stay in a job unrelated to my degree to pay the bills or maintain health insurance, or changing employers to have any chance at a raise, to taking out student loans and pursuing Public Service Loan Forgiveness in an increasingly frustrating system, **I get it.**'
					},
					{
						type: 'p' as const,
						text: 'My wife and I fight these battles every day and are launching our children into an even more uncertain world than we started in. Our family has been fortunate to move forward with hard work, a little luck, and the help of programs like WIC, Medicaid, and first-time homebuyer programs, along with supportive parents who benefitted from a functioning system.'
					}
				]
			},
			{
				title: 'A Professional Career Rooted in Leadership and Trust',
				image: '/images/about/community-issues.jpg',
				caption: 'Leading on the issues our community cares about',
				parts: [
					{
						type: 'p' as const,
						text: 'I am a first-generation college graduate who has spent my career balancing my family life with working more than one full time job at a time to make ends meet. My professional career has given me a range of experience, from leadership positions in a Fortune 500 company, to an adjunct faculty position at Utah State University:'
					},
					{
						type: 'ul' as const,
						items: [
							'Completed a Bachelor of Science in Political Science with an emphasis in the Middle East in 2011 at Utah State University',
							'Earned a Master of Science in Political Science from Utah State University in 2013, with a focus on America’s role in the international system.',
							'Started as a staff member working on the phones at a customer service agency',
							'Rose to a supervisory role within six months while going to school full time and starting a family',
							'Led a team of hundreds of employees as an Operations Manager, where I focused on customer experiences and operations for large corporations and government agencies, managing a contract with $15 million in annual revenue.',
							'Transitioned to a position in Corporate Analytics, where I helped Fortune 500 companies implement operational efficiencies',
							'Moved to Higher Education, where I held Sr. Analyst and Asst. Director positions in Institutional Research for 8 years',
							'Taught American Institutions courses to hundreds of undergrads each semester at Utah State University for 7 years',
							'Currently, I am an adjunct professor for the Center for Anticipatory Intelligence at USU where I teach a graduate course on emergent and disruptive technology while balancing a full time role as a director, project manager, and consultant in the private sector.'
						]
					},
					{
						type: 'p' as const,
						text: 'I am an educator at heart, and working with students and new employees as a mentor, instructor, and future colleague has been my most rewarding professional experience. While life hasn’t afforded me the chance to teach full-time, **helping others to understand the systems we exist in and how they should function is my passion**.'
					},
					{
						type: 'p' as const,
						text: 'Due to my background in both the private and public sectors, along with my personal lived experience, I am uniquely positioned to understand the needs and concerns of Northern Utahns and the industries that keep our economy moving here in a way a career politician never will be. I am good at finding solutions in difficult environments, developing efficient systems, and ensuring the best possible outcomes for those I work with and serve.'
					},
					{
						type: 'p' as const,
						text: 'My background has taught me the strength of flexible thinking, the importance of resiliency, and helped me develop the relationship building and organizational skills necessary for working in a complex environment like Congress to meet the best possible outcomes for those I serve.'
					}
				]
			}
		]
	},
	contact: {
		metaTitle: 'Contact Us — Peter Crosby for Congress',
		metaDescription:
			'Volunteer, send a media request, or reach the Peter Crosby for Congress campaign with a general question.',
		pageTitle: 'Contact Us',
		intro:
			'Reaching out from the press, or just have a question? Pick a topic and send us a note—the campaign will get back to you.',
		emailLabel: 'Email',
		phoneLabel: 'Phone',
		mailLabel: 'Mail',
		mailNote:
			'Donating by check? Make it payable to Peter Crosby for Congress and mail it here. Please include your:',
		mailRequired: ['Full name', 'Address', 'Occupation', 'Employer'],
		mailLaw: 'Federal law requires us to ask for all four.',
		volunteerPrompt: 'Want to pitch in on the campaign?',
		volunteerCta: 'Volunteer with us',
		topicLegend: 'What can we help you with?',
		topicMedia: 'Media Request',
		topicGeneral: 'General Information',
		blurbMedia: 'Press, interview, and media inquiries.',
		blurbGeneral: 'Questions, ideas, or anything else.',
		firstName: 'First Name',
		lastName: 'Last Name',
		phone: 'Phone Number',
		email: 'Email Address',
		zipCode: 'ZIP Code',
		zipFormat: 'A 5-digit ZIP code, e.g. 84321',
		mediaOutlet: 'Media Outlet / Publication',
		message: 'Message',
		requiredNote: 'All fields required except where noted.',
		send: 'Send message',
		sending: 'Sending…',
		errorMessage: 'Something went wrong. Please try again, or email us directly.',
		successTitle: 'Thank you!',
		successBody: 'Your message is on its way—we’ll be in touch soon.',
		sendAnother: 'Send another message'
	},
	volunteer: {
		metaTitle: 'Volunteer — Peter Crosby for Congress',
		metaDescription:
			'Sign up to volunteer with the Peter Crosby for Congress campaign. Northern Utah deserves better.',
		pageTitle: 'Volunteer with Us',
		intro:
			'Northern Utah deserves better. Tell us how you would like to help—sign up below or reach out with questions.',
		donate: 'Donate',
		donatePrompt: 'Prefer to chip in?',
		emailLabel: 'Email',
		phoneLabel: 'Phone',
		firstName: 'First Name',
		lastName: 'Last Name',
		phone: 'Phone',
		email: 'Email',
		streetAddress: 'Street Address',
		city: 'City',
		houseDistrict: 'House District',
		houseDistrictHint: 'Not sure which one you’re in? You can leave this blank.',
		source: 'What led you to volunteer?',
		sourceHint:
			'For example: a town hall, social media, a conversation with a volunteer, or a community event.',
		skills: 'Skills or resources you can offer',
		skillsHint: 'Describe any skills or resources you’d like to offer as a volunteer.',
		requiredNote: 'All fields required except where noted.',
		send: 'Sign up',
		sending: 'Sending…',
		errorMessage: 'Something went wrong. Please try again, or email us directly.',
		successTitle: 'Thank you!',
		successBody:
			'Thanks for stepping up—someone from the campaign will be in touch about next steps.',
		sendAnother: 'Submit another response'
	},
	events: {
		metaTitle: 'Events — Peter Crosby for Congress',
		metaDescription:
			'Upcoming town halls, meet the candidate events, and live conversations with Peter Crosby in Northern Utah.',
		ui: {
			eyebrow: 'Events',
			pageTitle: 'Where to Find Peter',
			intro: 'Town halls, meet the candidate events, and live conversations across Northern Utah.',
			calendarAria: 'Calendar',
			prevMonth: 'Previous month',
			nextMonth: 'Next month',
			dayWithEvent: 'Day with event',
			nextEvent: 'Next Event',
			noUpcomingEvents: 'No upcoming events scheduled. Check back soon or browse past events below.',
			allEvents: 'All events',
			pastEvent: 'Past event',
			upcomingHeading: 'Upcoming & Recent',
			pastHeading: 'Past Events',
			viewAllPast: 'View all past events',
			hidePast: 'Hide past events',
			rsvp: 'RSVP',
			rsvped: "RSVP'd",
			rsvpModalTitle: 'RSVP',
			rsvpFirstName: 'First name',
			rsvpLastName: 'Last name',
			rsvpEmail: 'Email',
			rsvpSubmit: 'Send RSVP',
			rsvpSubmitting: 'Sending…',
			rsvpSuccessTitle: "You're on the list!",
			rsvpSuccessBody: 'We emailed a confirmation to you — we look forward to seeing you there.',
			rsvpError: 'Something went wrong. Please try again.',
			rsvpClose: 'Close',
			rsvpDone: 'Done',
			addToCalendar: 'Add to calendar',
			calendarGoogle: 'Google',
			calendarApple: 'Apple / Outlook',
			filterLabel: 'Filter events by type',
			filterAll: 'All',
			filterTownHall: 'Town hall',
			filterRally: 'Rally',
			filterMeetGreet: 'Meet & greet',
			filterVolunteer: 'Volunteer training',
			viewLabel: 'View',
			viewList: 'List view',
			viewGrid: 'Grid view'
		},
		monthNames: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],
		dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		/** Short month labels on event cards (calendar uses full monthNames) */
		monthAbbrev: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		byId: {} as Record<string, { title: string; description: string }>
	},
	endorsementsPage: {
		metaTitle: 'Endorsements — Peter Crosby for Congress',
		metaDescription:
			'Community leaders, neighbors, and local voices backing Peter Crosby for Congress in Northern Utah.',
		eyebrow: 'Endorsements',
		pageTitle: 'Who’s Standing with Peter',
		lede: 'Neighbors, local leaders, and organizations from across Northern Utah are backing this campaign.',
		peopleHeading: 'People',
		orgHeading: 'Caucuses & Organizations',
		/** Card link, shown when an endorsement has a `releaseHref`. The non-breaking
		    space keeps the arrow from orphaning onto its own line in a narrow card. */
		readRelease: 'Read the release →',
		byId: {} as Record<string, { role: string }>
	},
	media: {
		/** Home: heads the Media + Press rows, which read as one Newsroom block. */
		eyebrow: 'Newsroom',
		title: 'Media Coverage',
		viewAll: 'All media coverage',
		kindVideo: 'Video',
		kindArticle: 'Article',
		kindOpEd: 'Op-Ed',
		kindPressRelease: 'Press Release',
		closeVideo: 'Close video',
		/** /media is the Newsroom's hub: Media coverage and Press releases both land here. */
		pinnedEyebrow: 'Newsroom',
		pinnedTitle: 'Featured Media',
		metaTitle: 'Newsroom — Peter Crosby for Congress',
		metaDescription:
			'Media coverage, interviews, and press releases from the Peter Crosby for Congress campaign.',
		pageEyebrow: 'In the news',
		pageTitle: 'Media Coverage',
		pageLede: 'Interviews, coverage, and statements from across the campaign.',
		/** Accessible name for the shortcut links under the /media lede. */
		chipsLabel: 'Newsroom sections',
		byId: {} as Record<string, { title: string; description?: string }>
	},
	pressReleases: {
		kind: 'Press Release',
		/** Under the Newsroom block on home and /media: coverage is "In the news", releases are this. */
		eyebrow: 'From the campaign',
		sectionTitle: 'Press Releases',
		sectionLede:
			'Official statements and announcements from the campaign, and releases issued by organizations endorsing it.',
		homeTitle: 'Press Releases',
		readMore: 'Read the release',
		viewAll: 'View all press releases',
		/** Back link on a release page; it goes to /media#press. */
		backToReleases: 'All press releases',
		forImmediateRelease: 'For immediate release',
		/** Shown instead of "For immediate release" when another organization issued it. */
		issuedBy: 'Release issued by',
		externalTag: 'Endorsing organization',
		reproducedNote: 'This release is reproduced as issued. The original is available below.',
		pressContact: 'Press contact',
		/** Polling releases (`dataRoom: true`) and the home press row point to the Data Room. */
		dataRoomNote:
			'The figures in this release are charted in the Data Room, with sample sizes, field dates and margins of error.',
		dataRoomLink: 'Open the Data Room',
		dataRoomHome: 'Polling in the Data Room',
		downloadOriginal: 'Download the release',
		metaTitle: 'Press Releases — Peter Crosby for Congress',
		metaDescription:
			'Official press releases and announcements from the Peter Crosby for Congress campaign.',
		byId: {} as Record<
			string,
			{
				title: string;
				summary: string;
				body?: import('$lib/data/pressReleases').PressReleaseBlock[];
				attachment?: string;
				/** Issuing organization's name, for releases the campaign did not write. */
				sourceName?: string;
				sourceLogoAlt?: string;
			}
		>
	},
	policies: {
		metaTitle: 'Where Peter Stands — Peter Crosby for Congress',
		metaDescription:
			'Where Peter Crosby stands on Northern Utah’s issues: affordability, accountability, the Great Salt Lake, rural healthcare, data centers, AI, and Hill Air Force Base.',
		eyebrow: 'Policies',
		pageTitle: 'Where Peter Stands',
		lede: 'Real answers on the issues that matter most to Northern Utah — affordability, the integrity of our government, and stewardship of the Great Salt Lake and our public lands.',
		videoAffordabilityLabel: 'Peter Crosby on affordability',
		videoAccountabilityLabel: 'Peter Crosby on accountability',
		videoStewardshipLabel: 'Peter Crosby on the Great Salt Lake',
		onThisPage: 'On this page',
		/** Heading for the list of sub-sections shown at the top of a long section. */
		inThisSection: 'In this section',
		ctaTitle: 'Have a question you don’t see here?',
		ctaText:
			'I want to hear from you. If there’s a question you don’t see answered above, send it my way.',
		ctaButton: 'Ask a question',
		/**
		 * Source: "Peter Crosby_Policies Page updated.docx" (campaign-approved, Sep 2026).
		 * [Header] → section `heading`, [Sub-header] → `h3` block, a standalone bold line →
		 * `lede`, inline bold → `**…**`. Section `id`s are unchanged from the previous page
		 * so links already shared off-site keep working.
		 */
		items: definePolicyItems([
			{
				id: 'top-priorities',
				navLabel: 'Top priorities',
				heading: 'My Top Policy Priorities',
				parts: [
					{
						type: 'pillars',
						items: [
							{ text: 'Affordability', target: 'affordability' },
							{ text: 'Accountability', target: 'government-integrity' },
							{ text: 'Stewardship of our Natural Resources', target: 'great-salt-lake' }
						],
						more: { text: 'Other Policy Positions', target: 'other-positions' }
					},
					{
						type: 'h3',
						id: 'priorities-from-voters',
						text: 'My policy priorities reflect my conversations with thousands of voters throughout Northern Utah.'
					},
					{
						type: 'p',
						text: 'Since we started this campaign, I have hosted over 35 town halls and visited countless community events. I have personally spoken with thousands of regular people from every walk of life and political background, and our campaign volunteers have added thousands more. The key concerns surfaced in these conversations are summed up in the following areas:'
					},
					{
						type: 'ul',
						items: [
							'Our lives are harder because of a very real affordability crisis.',
							'We are deeply concerned about the integrity of our government.',
							'We feel an existential threat as the Great Salt Lake diminishes, and want our public lands protected from billionaires’ bank accounts.'
						]
					},
					{
						type: 'p',
						text: 'I focus my policy solutions on two core areas: **getting the system to do what it is supposed to do**, and making sure **I am putting individuals, families, and communities first**.'
					},
					{
						type: 'p',
						text: 'My top priority is to represent the people of Northern Utah, and these three areas are what you have told me matter most to you. I understand they aren’t your only concern. So read on to see what I want to do about these key issues and more.'
					}
				]
			},
			{
				id: 'affordability',
				navLabel: 'Affordability',
				heading: 'What I’ll Do About the Affordability Crisis in Northern Utah',
				parts: [
					{
						type: 'lede',
						text: 'Northern Utah was founded on the traditions of hard work and innovation that puts people first.'
					},
					{
						type: 'p',
						text: 'These values and traditions have served us well for decades, but are now under stress, partly because of the actions (or inaction) of our representatives.'
					},
					{ type: 'h3', id: 'housing', text: 'The Housing Crisis' },
					{
						type: 'p',
						text: 'Northern Utah’s housing market is one of the most expensive in the country and there is a historic housing crisis preventing people from finding permanent homes for their families. While there are some in-state efforts to alleviate this pressure, they are falling well short of our current needs.'
					},
					{
						type: 'p',
						text: 'I support regulatory reform for our housing markets and want to:'
					},
					{
						type: 'ul',
						items: [
							'Incentivize **better city planning**',
							'**Build more affordable housing** around community models',
							'**Increase incomes for hard working Utahns** so they can afford to start building their families and their futures here',
							'Fund existing programs that **support thoughtful rural community development**',
							'Re-fund existing programs that make it easier for rural communities and first-time home buyers to build roots'
						]
					},
					{ type: 'h3', id: 'daily-necessities', text: 'Affordable Daily Necessities' },
					{
						type: 'p',
						text: 'We are seeing inflation and cost of living increases that are making it more difficult for regular, hard-working families. Basic staples, like meat, eggs, and milk, are taking an increasingly large part of our grocery budgets each month. Other consumer goods impacted by the tariffs imposed by the Trump administration (and ignored by Blake Moore and our other representatives) are more expensive.'
					},
					{
						type: 'ul',
						items: [
							{
								text: 'I will join other willing members of Congress and **bring an end to this illegal tariff regime**.',
								items: [
									'Tariffs make it harder for our local business and entrepreneurs to make a living.',
									'They also increase the cost of your everyday necessities.'
								]
							},
							'I would ensure the law is upheld in **making sure SNAP benefits are distributed** to the more than 80,000 Utah families who are struggling.'
						]
					},
					{ type: 'h3', id: 'jobs', text: 'A Stable Job Market with Opportunities for All' },
					{
						type: 'p',
						text: 'At the same time living costs are rising, the job market appears to be weakening, creating a situation where everything is more expensive and fewer of our neighbors can afford to provide for themselves or their families.'
					},
					{
						type: 'p',
						text: 'Adding to this budding disaster are thousands of federal workers who have been forced out of their jobs. Because of DOGE cuts, our community lost thousands of good jobs, and an estimated $110–150 million in lost wages. Those were paychecks that supported families and our local businesses. Our nonprofits, dedicated food banks and other community resources are being stretched to a breaking point. Child hunger is the highest it has ever been, all while SNAP benefits are being cut by our current representative.'
					},
					{ type: 'p', text: 'I want to:' },
					{
						type: 'ul',
						items: [
							'Establish a **realistic living wage**',
							'Revise our corporate tax code to prevent large corporations from “double dipping” (e.g., receiving tax breaks while their workers are forced to use taxpayer-subsidized programs)',
							'Reform and invest in higher education to provide more direct pathways to well-paying jobs while reducing the time and cost of applicable credentials'
						]
					},
					{ type: 'h3', id: 'affordable-healthcare', text: 'Affordable Healthcare' },
					{
						type: 'p',
						text: 'To add insult to our existing financial injury, this Congress has cut access to healthcare for millions of Americans, including tens of thousands here in Utah. Everyone is seeing the extra cost diminish their bank accounts, but our seniors and rural communities are being hit the hardest.'
					},
					{
						type: 'p',
						text: 'My own personal insurance increased 40% through my employer — yet the quality of care has not increased. People are being forced to decide between paying the rent or seeing a doctor. Healthcare workers are struggling to do their jobs under the weight of our arcane system. This is unsustainable.'
					},
					{
						type: 'p',
						text: 'The health insurance industry in the United States is worth $1.6 trillion. It’s a big beast to move but that doesn’t mean it’s a lost cause. We need **real reform** so everyone can access affordable care.'
					},
					{
						type: 'p',
						text: 'If elected, I will fight for a cost-effective solution for healthcare access. **Every large-scale study points to the same solution: a single-payer system.**'
					},
					{ type: 'p', text: 'My preference is for a single-payer system that:' },
					{
						type: 'ul',
						items: [
							'Allows private insurance companies to exist',
							'Fosters real competition in an actual marketplace',
							'Does not hold regular people captive while making the jobs of healthcare providers more difficult'
						]
					},
					{
						type: 'p',
						text: 'Medicare, when well-funded and supported, works great for seniors. Why not expand this great program to include more Americans?'
					}
				]
			},
			{
				id: 'government-integrity',
				navLabel: 'Accountability',
				heading: 'Bringing Honesty Back to Government',
				parts: [
					{
						type: 'p',
						text: 'My family has a long and proud tradition of military and public service that dates back before the United States was the United States. An integral part of my childhood was learning about the obligation we have as citizens to our country, and the special burden that public servants carry as they represent us in our national government. My faith also teaches me about honesty, integrity and the value of being a good neighbor.'
					},
					{
						type: 'p',
						text: '**Elected representatives should put the Constitution of the United States first and the needs of this district second.** Their personal wants or party affiliations shouldn’t rank in their official decision-making. I have spoken with many people throughout Northern Utah who feel they cannot trust their current representative to put the people of this district before D.C. party politics or individual self-promotion.'
					},
					{
						type: 'p',
						text: 'There are several solutions that will help rebuild our trust in our government.'
					},
					{
						type: 'ul',
						items: [
							{
								text: 'I would **vote to ban individual stock trades for all members of Congress** and their immediate families.',
								items: [
									'This ban should also be extended to members of the executive branch (e.g., the President, Vice President, cabinet secretaries) and their immediate families, as well as the judicial branch.',
									'They shouldn’t be able to regulate the companies they invest in.',
									'Our representatives are there to serve us, not their bank accounts.'
								]
							},
							{
								text: 'I would **support a conversation about term limits for Congress**.',
								items: [
									'It is healthy for our democracy to prevent any individual from any political party making a permanent home in Congress.',
									'No more forever politicians.'
								]
							},
							{
								text: 'I **support efforts to remove corporate money from our political process.**',
								items: [
									'Our government is “of the people, by the people, for the people,” not corporate interests.',
									'Removing the influence of this “dark money” will help public servants better serve us, the people.'
								]
							}
						]
					},
					{
						type: 'p',
						text: 'All three of these solutions are attainable. The issue is, they require current representatives to put the needs of this country and their voters ahead of their personal benefits. I do not think they are capable of that.'
					},
					{
						type: 'p',
						text: 'This is why I am running. I am willing and able to vote in your best interest, with the support of the voters in our district.'
					}
				]
			},
			{
				id: 'great-salt-lake',
				navLabel: 'Stewardship',
				heading: 'Restoring the Great Salt Lake',
				parts: [
					{
						type: 'p',
						text: 'Bottom line, restoring the Great Salt Lake requires more water. This is largely a state decision, as the Utah Legislature decides how to allocate resources in partnership with local entities.'
					},
					{
						type: 'p',
						text: 'As a federal representative, my responsibility will be to provide resources that help move more water to the lake and to remove barriers at the national level that prevent effective solutions.'
					},
					{
						type: 'p',
						text: 'This means doing hard work that very few of our state leaders seem equipped to do.'
					},
					{
						type: 'ul',
						items: [
							{
								text: '**Securing funding to help restore Utah’s aging water infrastructure** and removing the invasive phragmites around the shore.',
								items: [
									'This work includes pursuing the $1 billion in federal funding discussed with state leadership, which has been proposed but not yet appropriated by Congress.'
								]
							},
							'**Simplifying existing regulatory barriers** among federal agencies if/when improvement projects require multi-agency approvals.',
							{
								text: 'Identifying communities impacted by decisions about water allocation.',
								items: [
									'Thinking about consequences before they happen so we can **provide the resources and support necessary to support those impacted** — like farmers.'
								]
							}
						]
					},
					{
						type: 'p',
						text: 'This is a huge concern of mine, and I’d hope to gain a seat on the House Agriculture Committee. From there, I could better advocate for those most impacted by likely changes in water allocations throughout the state.'
					}
				]
			},
			{
				id: 'healthcare',
				navLabel: 'Rural healthcare',
				groupHeading: 'Other Policy Positions',
				groupId: 'other-positions',
				heading: 'Strengthening Rural Healthcare Infrastructure',
				parts: [
					{
						type: 'p',
						text: 'The recent “Big Beautiful Bill,” crafted, in part, by Rep. Blake Moore of what is now congressional District 2, significantly cuts access to healthcare by reducing payments to Medicaid starting in 2026.'
					},
					{
						type: 'p',
						text: 'This is already having an impact in our community, as the state is unable to match federal investment at the same level we have in the past, despite the fact we run a large surplus in our state budget. This will likely impact our hospital and emergency care systems the hardest. **For rural communities especially, this means losing local access to critical care.**'
					},
					{
						type: 'ul',
						items: [
							{
								text: 'With this background, I believe the **Big Beautiful Bill and its cuts are bad policy**.',
								items: [
									'They are targeted at our local communities and will significantly harm thousands of Utah families.'
								]
							},
							'Though we haven’t felt all of the impacts yet, we can look to other communities across the country that are losing local access to essential care and can see what’s coming our way.',
							'This is one of the reasons why we need to have a serious conversation about a single-payer healthcare system. It is less costly than our current system, provides coverage to farmers, ranchers, and small business owners, and gives Americans more freedom to make their own choices.'
						]
					}
				]
			},
			{
				id: 'data-centers',
				navLabel: 'Data centers',
				heading: 'Stratos Data Center and Responsible Development',
				parts: [
					{
						type: 'p',
						text: 'We saw the impact of a secretive government process that shuts out voters during the votes for the Stratos Data Center by the Box Elder County Commissioners.'
					},
					{
						type: 'p',
						text: 'We also saw what happens when voters feel empowered to speak their mind — two of the three commissioners that voted for the project lost their primary bids, as did Senate President Stuart Adams.'
					},
					{
						type: 'p',
						text: 'This is democracy at work, and I will work to support the voices of our voters in Box Elder County to safeguard their community from billionaires who aren’t concerned for their wellbeing.'
					},
					{
						type: 'ul',
						items: [
							'I do not support additional data center development in Utah unless and until they **adequately and transparently address concerns about water, energy, the environment, and community impacts.**',
							'Decisions about their development should **require community approval**.'
						]
					},
					{
						type: 'p',
						text: '**I am opposed to the Stratos project** because it fails to meet any of these requirements.'
					}
				]
			},
			{
				id: 'hill-afb',
				navLabel: 'Hill AFB',
				heading: 'Hill Air Force Base',
				parts: [
					{
						type: 'p',
						text: 'Hill Air Force Base (HAFB) is the single largest economic employer in Northern Utah, and maintaining a positive relationship with the leadership is an integral part of the responsibilities of our Congressional representative. The best way to support this relationship is to pursue and maintain a position on the House Armed Services Committee, ensure the restoration of the Great Salt Lake, and spend time with not just the officers, but the enlisted personnel and contractors that form the bulk of the workforce supporting the mission of HAFB, and driving the economic investment in the communities of Northern Utah.'
					}
				]
			},
			{
				id: 'ai',
				navLabel: 'AI',
				heading: 'My Stance on Artificial Intelligence (AI)',
				parts: [
					{
						type: 'p',
						text: 'AI refers to a wide variety of technological tools that often get aggregated together.'
					},
					{
						type: 'ul',
						items: [
							'I am for machine learning processes that help us identify cancer in imaging more quickly and more accurately.',
							'I am opposed to the development and deployment of algorithms that are used to identify and track private citizens without any legal justification.'
						]
					},
					{
						type: 'p',
						text: 'Existing generative AI tools (e.g., ChatGPT, Claude, Midjourney) were built on stolen assets and often negatively impact the human ability to create, reason, and meaningfully engage with the world around us. The tools are here, and they will not go away, so now **we have an obligation to mitigate and prevent as much harm as we can.**'
					},
					{ type: 'p', text: 'From a policy perspective, I want to:' },
					{
						type: 'ul',
						items: [
							'**Hold corporations accountable** for their usage and deployment of AI.',
							'Rewrite the current tax code so that **large tech companies pay their fair share of taxes** to support our government and communities.',
							'**Close these tax loopholes**, so that if AI deployment significantly displaces Americans and their families from the workforce, we have the resources necessary to support them while they transition.',
							{
								text: '**Update current laws and regulations regarding data ownership and privacy.**',
								items: [
									'Americans should own their data, full stop.',
									'We should also be protected from the misuse of that data, whether by local agencies, corporations, or the federal government.'
								]
							},
							'**Make big tech pay** for the cost of building the Data Centers and energy required to power these projects.'
						]
					}
				]
			},
			{
				id: 'epstein',
				navLabel: 'Epstein files',
				heading: 'Epstein Files Transparency',
				parts: [
					{
						type: 'p',
						text: 'Everyone involved should be prosecuted to the fullest extent of the law. I support the full release of the files, as per the victims’ request. I am not interested in protecting anyone who has participated in the buying, selling, or raping of children.'
					}
				]
			}
		])
	}
	,
	analytics: {
		metaTitle: 'Data Room — Peter Crosby for Congress',
		metaDescription:
			"The data behind Utah's 2nd Congressional District race: district polling, issue priorities, and statewide approval trends, with full methodology.",
		eyebrow: 'Data Room · UT-02',
		pageTitle: "Utah's 2nd District, by the numbers",
		lede:
			"Polling, issue priorities, and statewide context for Utah's 2nd Congressional District. Every figure is published with its source, field dates, sample size, and margin of error. New datasets are added as they become available.",
		onThisPage: 'On this page',
		nav: {
			districtPolling: 'District polling',
			statewideContext: 'Statewide context',
			groundGame: 'On the ground',
			methodology: 'Methodology'
		},
		noteLabel: 'Note.',
		noteBody:
			'Surveys commissioned by this campaign are labeled internal polling. Independent public polling is labeled separately and attributed to its pollster. Question wording, sample size, field dates, and margin of error are listed for every figure on this page.',
		meta: {
			fieldDates: 'Field dates',
			sample: 'Sample',
			marginOfError: 'Margin of error',
			geography: 'Geography',
			geographyValue: 'UT-02',
			sampleValue: 'n = {n}',
			moeValue: '±{moe}%',
			/** Used when the pollster published no margin and we computed it from n. */
			moeValueCalculated: '±{moe}% (calculated)'
		},
		eyebrows: {
			internal: 'Internal poll · UT-02',
			ballot: 'Internal poll · ballot test',
			crosstabs: 'Internal poll · crosstabs',
			issues: 'Internal poll · issue priorities',
			change: 'Internal polls · Aug. vs. Sept.',
			trend: 'Internal polls · Sept. trend',
			publicPoll: 'Independent public poll'
		},
		/**
		 * Per-poll prose, keyed by the ids in `POLLS` (`src/lib/data/analytics.ts`).
		 * Adding a poll here without adding it to `pages-es.ts` is a type error,
		 * which is the point — it stops English text reaching Spanish readers.
		 */
		polls: {
			'internal-sep21-2026': {
				pollster: 'Peter Crosby for Congress (internal)',
				shortPollster: 'Peter Crosby for Congress',
				population: 'likely voters',
				geography: 'Davis, Weber, Box Elder, Cache & Rich Counties (UT-02)',
				fieldLabel: 'Sept. 22–23, 2026',
				partisanship: 'Sponsored by this campaign — an interested party',
				methodTitle: 'Campaign internal poll · Sept. 22–23'
			},
			'internal-sep-2026': {
				pollster: 'Peter Crosby for Congress (internal)',
				shortPollster: 'Peter Crosby for Congress',
				population: 'randomized, registered voters',
				geography: 'Davis, Weber, Box Elder, Cache & Rich Counties (UT-02)',
				fieldLabel: 'Sept. 8–10, 2026',
				partisanship: 'Sponsored by this campaign — an interested party',
				methodTitle: 'Campaign internal poll · Sept. 8–10'
			},
			'internal-aug-2026': {
				pollster: 'Peter Crosby for Congress (internal)',
				shortPollster: 'Peter Crosby for Congress',
				population: 'randomized, registered voters',
				geography: 'Davis, Weber, Box Elder, Cache & Rich Counties (UT-02)',
				fieldLabel: 'Aug. 3–17, 2026',
				partisanship: 'Sponsored by this campaign — an interested party',
				methodTitle: 'Campaign internal poll · August'
			},
			'hinckley-aug-2026': {
				pollster: 'Deseret News / Hinckley Institute of Politics',
				shortPollster: 'Deseret News / Hinckley Institute of Politics',
				population: 'registered voters',
				geography: 'Statewide (Utah)',
				fieldLabel: 'August 2026',
				partisanship: 'Independent — not affiliated with any campaign',
				methodTitle: 'Statewide public poll'
			}
		},
		/** Subheading for the August block, which has no ballot test of its own. */
		blockTitles: {
			aug: 'August 3–17, 2026 survey'
		},
		/**
		 * Per-survey copy for the district-polling blocks, keyed like `polls`. The
		 * headline sentences are written per survey rather than templated: which
		 * candidate leads, and whether the gap clears the margin, differ between them.
		 */
		pollBlocks: {
			'internal-sep21-2026': {
				title: 'September 22–23, 2026 survey',
				heroLabel: 'Too close to call',
				heroSub:
					'Crosby is ahead by {gap} points, within the ±{moe}-point margin of error.',
				takeaway:
					'Peter Crosby {crosby}%, Blake Moore {moore}%. The {gap}-point gap is within the ±{moe}-point margin of error, so the race remains too close to call, and {undecided}% are unsure or chose none of the above.'
			},
			'internal-sep-2026': {
				title: 'September 8–10, 2026 survey',
				heroLabel: 'A statistical tie',
				heroSub: 'The {gap}-point gap is within the ±{moe}-point margin of error.',
				takeaway:
					'Blake Moore {moore}%, Peter Crosby {crosby}%. The {gap}-point gap is within the ±{moe}-point margin of error, and {undecided}% are unsure or chose none of the above.'
			}
		},
		pollMeta: {
			coxFrom: 'January 2026',
			coxTo: 'August 2026'
		},
		datelineLabel: 'Last updated',
		sourceInternal:
			'Internal poll, {pollster}. {n} {population} across {geography}, {dates}. ±{moe}% margin of error.',
		/** Same, for a survey whose margin the campaign did not publish. */
		sourceInternalCalculated:
			'Internal poll, {pollster}. {n} {population} across {geography}, {dates}. ±{moe}% margin of error, calculated from the sample size at 95% confidence — the campaign did not publish one.',
		/** Independent polls: the pollster rarely publishes n and margin of error. */
		sourcePublic: '{pollster}, {dates}. {geography}.',
		responseRate: 'This question had an {rate}% response rate.',
		showTable: 'Show data table',
		hideTable: 'Hide data table',
		neutralSeparate: 'shown separately, as it sits on neither side of the scale.',
		likertTable: { response: 'Response', share: 'Share of respondents' },
		/** Party groups as the September crosstabs label them. */
		groups: {
			all: 'All voters',
			democratic: 'Democrats',
			republican: 'Republicans',
			unaffiliated: 'Unaffiliated',
			other: 'Other party'
		},
		/** The September 8–10 internal poll. Figures are filled in from the data file. */
		pollBlock: {
			heroLabel: 'A statistical tie',
			heroSub: 'The {gap}-point gap is within the ±{moe}-point margin of error.',
			vs: 'vs.',
			/** Ballot options, as asked. */
			options: {
				crosby: 'Peter Crosby',
				moore: 'Blake Moore',
				other: 'Other',
				unsure: 'Unsure',
				none: 'None of the above'
			},
			ballot: {
				title: 'If the election were held today',
				question: 'If the election were held today, who would you vote for?',
				takeaway:
					'Blake Moore {moore}%, Peter Crosby {crosby}%. The {gap}-point gap is within the ±{moe}-point margin of error, and {undecided}% are unsure or chose none of the above.',
				bandKey: 'Bands show each candidate’s ±{moe}-point margin of error.',
				ariaLabel: 'Ballot test: Peter Crosby {crosby}%, Blake Moore {moore}%, each ±{moe} points',
				barLabel: 'All responses',
				barAria: 'All responses to the ballot question'
			},
			byParty: {
				title: 'Ballot test, by party',
				takeaway:
					'Republicans favor Moore {repMoore}% to {repCrosby}%, with {repUndecided}% unsure or choosing none of the above. Unaffiliated voters favor Crosby {unaCrosby}% to {unaMoore}%.',
				ariaLabel: 'Ballot test responses for all voters, Republicans and unaffiliated voters',
				note: 'The release reports the ballot question by party for Republicans and unaffiliated voters only. Margins for party groups are calculated from each group’s sample size, at 95% confidence.'
			},
			groupMeta: 'n = {n} · ±{moe} pts',
			concerns: {
				title: 'Top concerns',
				question: 'Please let us know your top concerns (multiple selections possible).',
				takeaway:
					'Affordability ({aff}%) and government accountability ({acc}%) are the most-cited concerns, followed by the Great Salt Lake ({gsl}%).',
				note: 'Respondents could choose more than one concern, so shares add up to more than 100%.',
				ariaLabel: 'Share of respondents naming each concern'
			},
			concernsByParty: {
				title: 'Top concerns, by party',
				takeaway:
					'Affordability and government accountability are the top two concerns in every party group.',
				caption: 'Share of each party group naming each concern',
				rowHeader: 'Concern',
				scaleLabel: 'Share of group',
				note: '† Small sample: margins of error are about ±{dem} points for Democrats and ±{other} points for other-party voters.'
			},
			col: {
				response: 'Response',
				share: 'Share',
				range: 'Range (±{moe})',
				group: 'Group',
				concern: 'Concern'
			}
		},
		/** Shared labels for charts that pair the two September surveys. */
		trendPair: {
			from: 'Sept. 8–10',
			to: 'Sept. 22–23',
			colFrom: 'Sept. 8–10',
			colTo: 'Sept. 22–23',
			source:
				'Internal polls, Peter Crosby for Congress: {a} (n = {aN}) and {b} (n = {bN}). The second survey’s margin is calculated from its sample size.'
		},
		ballotTrend: {
			title: 'Ballot test, Sept. 8–10 to Sept. 22–23',
			takeaway: 'Between the two surveys Crosby is {crosby}, while Moore is {moore}. {moeNote}',
			/**
			 * Picked in the page depending on whether any series moved by more than the
			 * margin on a difference between two surveys (wider than either survey's own —
			 * the two sampling errors compound).
			 */
			moeWithin:
				'Neither change is larger than the ±{moe} points a difference between two surveys has to clear, so the movement is not measurable.',
			moeExceeds:
				'Larger than the ±{moe} points a difference between two surveys has to clear: {names}.',
			ariaLabel:
				'Ballot shares for Crosby, Moore and unsure voters in the September 8–10 survey and the September 22–23 survey'
		},
		concernsTrend: {
			title: 'Top concerns, Sept. 8–10 to Sept. 22–23',
			takeaway:
				'The order of concerns is unchanged: affordability first, government accountability second. Every shift between the two surveys is within the margin of error.',
			ariaLabel:
				'Share naming each concern in the September 8–10 survey and the September 22–23 survey'
		},
		/** August → September, for the two issues both surveys asked about. */
		change: {
			title: 'Top issues, Aug. to Sept.',
			takeaway:
				'Affordability and government accountability remain the top two concerns. No change between the two surveys exceeds the margin of error.',
			from: 'Aug.',
			to: 'Sept.',
			ariaLabel:
				'Share naming affordability and government accountability in the August and September surveys, by party',
			source:
				'Internal polls, Peter Crosby for Congress: {aug} (n = {augN}) and {sep} (n = {sepN}). Shown in whole points, the precision of the August release.',
			colIssue: 'Issue',
			colGroup: 'Group',
			colAug: 'Aug.',
			colSep: 'Sept.'
		},
		approval: {
			title: 'Net job approval, August 2026',
			takeaway:
				'Every officeholder and institution measured was net negative — disapproval exceeded approval in each case.',
			ariaLabel: 'Net job approval, statewide, August 2026',
			source:
				'{pollster}, {period}. Statewide. Net = approve minus disapprove; the Congress figure is the published net.',
			colOfficeHolder: 'Office holder',
			colApprove: 'Approve',
			colDisapprove: 'Disapprove',
			colNet: 'Net',
			notReported: 'Not reported'
		},
		trend: {
			eyebrow: 'Change since January',
			body:
				"Gov. Cox's approval fell from {from} in {fromPeriod} to {to} in {toPeriod}, a change of {delta} points.",
			source: '{pollster}, {period}. Statewide.'
		},
		ground: {
			note:
				'Campaign-reported operational counts — organizing activity, not survey results. Town halls as of September 2026; volunteers and funds raised as of the September 14 release; donors as of the August release.'
		},
		method: {
			internalTitle: 'Campaign internal poll',
			publicTitle: 'Statewide public poll',
			sponsor: 'Sponsor',
			sample: 'Sample',
			geography: 'Geography',
			fieldDates: 'Field dates',
			fieldPeriod: 'Field period',
			marginOfError: 'Margin of error',
			partisanship: 'Partisanship',
			pollster: 'Pollster',
			sampleValue: '{n} {population}',
			moeValue: '±{moe} percentage points',
			internalPartisanship: 'Sponsored by this campaign — an interested party',
			publicPartisanship: 'Independent — not affiliated with any campaign',
			readRelease: 'Read the full release →',
			readPoll: 'Read the poll ↗'
		},
		limits: {
			title: 'What is not modeled here',
			intro:
				'This page reports only real, attributable figures — the campaign’s own polling and published public polls — never modeled or estimated ones. The following are not represented:',
			items: [
				{
					label: 'Ballot-test figures for Democrats and other-party voters.',
					text: 'Neither September survey breaks the Crosby-versus-Moore question out for those groups, so only Republicans and unaffiliated voters appear in the by-party chart.'
				},
				{
					label: 'Forecast or win probability.',
					text: 'No predictive model is applied. A forecast would require repeated independent polling of the district.'
				},
				{
					label: 'County-level breakouts.',
					text: 'The sample spans five counties but was not published disaggregated; n = {n} is too small for reliable subgroup estimates.'
				}
			]
		},
		/**
		 * Spanish overrides for the entries in `src/lib/data/analytics.ts`, keyed by id
		 * (the events/media convention). English lives in the data file; this is empty
		 * for `en` and filled in `pages-es.ts`.
		 */
		byId: {} as Record<
			string,
			{
				title?: string;
				question?: string;
				takeaway?: string;
				label?: string;
				sub?: string;
				note?: string;
				detail?: string;
				role?: string;
				segments?: string[];
			}
		>
	}
};
