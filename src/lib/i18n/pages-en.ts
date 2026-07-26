/** English-only page copy (merged into dictionaries.en) */
export const pagesEn = {
	common: {
		donate: 'Donate',
		viewEvent: 'View Event →',
		googleCalendar: 'Google Calendar',
		ics: 'ICS',
		optional: 'optional'
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
		sections: [
			{
				title: 'A Family History of Public Service, A Duty to Serve',
				parts: [
					{
						type: 'p' as const,
						text: 'My parents were both in the military, as were both of my grandfathers, and both of my brothers. My wife’s father, brothers, and grandparents also served. I am an Eagle Scout and was a cadet in the ROTC, both foundational experiences in my life. Service is hard coded into us, and my wife and I have tried to instill those values in our daughters.'
					},
					{
						type: 'p' as const,
						text: 'After an injury during my time serving in the ROTC, I knew I had to choose a different path for service. Running for Congress is part of that service for me.'
					},
					{
						type: 'p' as const,
						text: 'Safekeeping the rights and freedoms of our country requires sacrifice from all of us. The oath I made as an Eagle Scout almost twenty-five years ago to better society is still central to my life today. Public servants, like our Congressional representatives, are there to serve their neighbors. As your elected representative in Congress, I’ll put community and country before myself every moment of every day.'
					}
				]
			},
			{
				title: 'A Husband and Father Rooted in Cache Valley for 19 years',
				parts: [
					{
						type: 'p' as const,
						text: 'My wife, Amanda, and I, are raising our three beautiful daughters in the Cache Valley. They are three kind, passionate, brilliant, and remarkable young women.'
					},
					{
						type: 'p' as const,
						text: 'We teach them to be honest, to have integrity, to love their neighbor, and to work hard.'
					},
					{
						type: 'p' as const,
						text: 'I am running to make sure they, and everyone else, have the opportunities we were promised. Please join me to help make that possible.'
					}
				]
			},
			{
				title: 'A Professional Career Rooted in Leadership and Trust',
				parts: [
					{
						type: 'p' as const,
						text: 'I’m a first-generation college graduate who has spent my career balancing my family life with working more than one full time job to make ends meet. My professional career has taken me from leadership positions in a Fortune 500 company, to a professorship at Utah State University.'
					},
					{
						type: 'ul' as const,
						items: [
							'Completed undergraduate studies in [year] at [school]',
							'Started as a boot on the ground staff member working in operations',
							'Rose to a supervisory role within 1 year while going to school full time',
							'Awarded a master’s degree in XX in [year]',
							'Led a team of hundreds of employees working to [brief description of the work]',
							'Moved to higher education with a position in institutional research and teaching at Utah State University where I taught American Politics to undergrads',
							'Currently an adjunct professor for the Center for Anticipatory Intelligence at USU teaching a graduate course on emergent technology while balancing a full time role as a director, project manager and consultant in the private sector'
						]
					},
					{
						type: 'p' as const,
						text: 'Using my background in both the private and public sectors, I work with presidents, provosts, faculty, and support staff to help them navigate what has become a very unpredictable future.'
					},
					{
						type: 'p' as const,
						text: 'Working with students as a mentor, instructor, and future colleague is my most rewarding professional experience.'
					},
					{
						type: 'p' as const,
						text: 'My background has taught me the strength of flexible thinking, relationship building, and organizational skills.'
					}
				]
			}
		]
	},
	contact: {
		metaTitle: 'Contact Us — Peter Crosby for Congress',
		metaDescription:
			'Volunteer, send a media request, or reach the Peter Crosby for Congress campaign with a general question.',
		pageTitle: 'Contact us',
		intro:
			'Reaching out from the press, or just have a question? Pick a topic and send us a note—the campaign will get back to you.',
		emailLabel: 'Email',
		phoneLabel: 'Phone',
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
		pageTitle: 'Volunteer with us',
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
		city: 'City',
		county: 'County',
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
	pastInterviews: {
		metaTitle: 'Past Interviews — Peter Crosby for Congress',
		metaDescription:
			'Past interviews and town halls with Peter Crosby on Our Vote Counts, Hal Stewart, and more.',
		pageTitle: 'Past Interviews',
		intro: 'Virtual interviews and town halls from the campaign.',
		ariaYoutube: 'YouTube',
		ariaWebsite: 'Website',
		items: [
			{
				id: 'pi-1',
				month: 'Dec',
				day: '16',
				year: 2024,
				title: 'Interview - Our Vote Counts',
				time: '3:30 PM – 4:30 PM',
				description:
					'Our Vote Counts and I sat for a virtual interview and town hall, where we talked about a wide range of issues facing our district and the nation. You can find the full interview on Youtube.',
				viewEventUrl: 'https://www.youtube.com/watch?v=kHJBykNy9zg',
				platform: 'youtube' as const
			},
			{
				id: 'pi-2',
				month: 'Nov',
				day: '17',
				year: 2024,
				title: 'Interview - Hal Stewart',
				time: '3:30 PM – 4:30 PM',
				description:
					'Hal Stewart interviewed me at the start of my campaign. If you would like to see where we started, this is the first time I went public with my desire to help Northern Utah.',
				viewEventUrl: 'https://www.petercrosbyforcongress.org/events-2-1/e08a9jyyxhlt8r691kitsl9ic1m3yg',
				platform: 'website' as const
			}
		]
	},
	events: {
		metaTitle: 'Events — Peter Crosby for Congress',
		metaDescription:
			'Upcoming town halls, meet the candidate events, and live conversations with Peter Crosby in Northern Utah.',
		ui: {
			eyebrow: 'Events',
			pageTitle: 'Where to find Peter',
			intro: 'Town halls, meet the candidate events, and live conversations across Northern Utah.',
			calendarAria: 'Calendar',
			prevMonth: 'Previous month',
			nextMonth: 'Next month',
			dayWithEvent: 'Day with event',
			nextEvent: 'Next event',
			noUpcomingEvents: 'No upcoming events scheduled. Check back soon or browse past events below.',
			allEvents: 'All events',
			pastEvent: 'Past event',
			upcomingHeading: 'Upcoming & recent',
			pastHeading: 'Past events',
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
		pageTitle: 'Who’s standing with Peter',
		lede: 'Neighbors, local leaders, and organizations from across Northern Utah are backing this campaign.',
		peopleHeading: 'People',
		orgHeading: 'Caucuses & organizations',
		byId: {} as Record<string, { role: string }>
	},
	media: {
		eyebrow: 'Media',
		title: 'Latest from the campaign',
		viewAll: 'View all media',
		kindVideo: 'Video',
		kindArticle: 'Article',
		kindOpEd: 'Op-Ed',
		closeVideo: 'Close video',
		pinnedEyebrow: 'Featured',
		pinnedTitle: 'Featured media',
		metaTitle: 'Media — Peter Crosby for Congress',
		metaDescription:
			'Videos, op-eds, and interviews from the Peter Crosby for Congress campaign.',
		pageTitle: 'All media',
		pageLede: 'Videos, op-eds, and interviews from across the campaign.',
		byId: {} as Record<string, { title: string; description?: string }>
	},
	pressReleases: {
		kind: 'Press Release',
		eyebrow: 'Newsroom',
		sectionTitle: 'Press Releases',
		sectionLede: 'Official statements and announcements from the campaign.',
		homeTitle: 'Press releases',
		readMore: 'Read the release',
		viewAll: 'View all press releases',
		backToMedia: 'Back to media',
		forImmediateRelease: 'For immediate release',
		pressContact: 'Press contact',
		downloadPdf: 'Download the release (PDF)',
		metaTitle: 'Press Releases — Peter Crosby for Congress',
		metaDescription:
			'Official press releases and announcements from the Peter Crosby for Congress campaign.',
		byId: {} as Record<
			string,
			{
				title: string;
				summary: string;
				body?: import('$lib/data/pressReleases').PressReleaseBlock[];
				pdf?: string;
			}
		>
	},
	policies: {
		metaTitle: 'Where Peter Stands — Peter Crosby for Congress',
		metaDescription:
			'Where Peter Crosby stands on the issues facing Northern Utah: affordability, accountability, and stewardship of the Great Salt Lake and our public lands.',
		eyebrow: 'Policies',
		pageTitle: 'Where Peter stands',
		lede: 'Real answers on the issues that matter most to Northern Utah — affordability, the integrity of our government, and stewardship of the Great Salt Lake and our public lands.',
		videoAffordabilityLabel: 'Peter Crosby on affordability',
		videoAccountabilityLabel: 'Peter Crosby on accountability',
		videoStewardshipLabel: 'Peter Crosby on the Great Salt Lake',
		onThisPage: 'On this page',
		ctaTitle: 'Have a question you don’t see here?',
		ctaText:
			'I want to hear from you. If there’s a question you don’t see answered above, send it my way.',
		ctaButton: 'Ask a question',
		items: [
			{
				id: 'top-priorities',
				navLabel: 'Top priorities',
				question: 'What are your top policy priorities?',
				parts: [
					{
						type: 'p' as const,
						text: 'My policy priorities are a reflection of every conversation I have with people throughout Northern Utah. Since last July I have personally spoken with hundreds of regular people from every walk of life and political background, and our campaign volunteers have added thousands more. These conversations have surfaced a variety of concerns and issues, but I think they can be summed up in the following areas:'
					},
					{
						type: 'ul' as const,
						items: [
							'We have an affordability crisis',
							'We are deeply concerned about the integrity of our government',
							'We have an existential threat as the Great Salt Lake dies, and broader concerns about our public lands'
						]
					},
					{
						type: 'p' as const,
						text: 'So broadly, my top priorities are Affordability, Accountability, and Stewardship. In these areas, and in all other policy making, my top priority is to represent the people of Northern Utah. My policy solutions focus on two core areas: getting the system to do what it is supposed to do, and making sure I am putting individuals, families, and communities first.'
					}
				]
			},
			{
				id: 'affordability',
				navLabel: 'Affordability',
				question:
					'What are the affordability issues facing northern Utah and what would you do about them?',
				parts: [
					{
						type: 'p' as const,
						text: 'Northern Utah has a strong tradition of hard work combined with innovation supported by a community that puts people first. These values and traditions have served us well for decades, but are now under stress, partly because of the actions (or inaction) of our representatives.'
					},
					{
						type: 'p' as const,
						text: 'We are currently experiencing a housing crisis that prevents people from finding permanent homes due to a housing market that is one of the most expensive in the country. While there are some in-state efforts to alleviate this pressure, they are falling well short of our current needs. We need to incentivize better planning, more affordable housing built around community models, and increase the income available to average Utahns so they can afford to start building their families and their futures here. This includes refunding existing programs that support rural community development and fighting for a living wage.'
					},
					{
						type: 'p' as const,
						text: 'We are also seeing inflation and cost of living increases that are making it more difficult for anyone who is not in the top 1%. Basic staples, like meat, eggs, and milk, are taking an increasingly large part of our grocery budgets each month. Other consumer goods impacted by the tariffs imposed by the Trump administration (and ignored by our own Congressional representative) are more expensive. At the same time, the job market appears to be weakening, creating a situation where everything is more expensive and fewer and fewer members of our community can afford to provide for themselves or their families.'
					},
					{
						type: 'p' as const,
						text: 'Adding to this building disaster are thousands of federal workers who have been forced out of their jobs. We have lost thousands of good jobs in the district, and an estimated $110–150 million in lost wages. Those were paychecks that supported families and our local businesses. There are already reports of dedicated food banks and other community resources being stretched to a breaking point, and child hunger has doubled in the state.'
					},
					{
						type: 'p' as const,
						text: 'As a final insult to injury, this Congress has cut access to healthcare for millions of Americans, including tens of thousands here in Utah. Our seniors and rural communities are being hit the hardest, but everyone is seeing the extra costs. My own personal insurance increased 40% through my employer, but the quality of care has not increased. People are being forced to make a decision between paying the rent or seeing a doctor, and that is unsustainable.'
					},
					{
						type: 'p' as const,
						text: 'My priority in solving these challenges is to focus on the people here in Northern Utah by using the power of the Congress to right the ship. I would join other willing members of Congress and bring an end to an illegal tariff regime that is making it harder and harder for our local business and entrepreneurs to make a living. I would ensure the law is upheld in making sure SNAP benefits are distributed to the more than 80,000 Utah families who are struggling. I would support regulatory reform for our housing markets, and re-fund existing programs that make it easier for rural communities and first-time home buyers to build roots. Finally, we have to find a cost-effective solution for healthcare access. Every large-scale study points to the same solution: a single-payer system. My preference is one that also allows private insurance companies to exist, but now they have to compete in an actual marketplace, instead of holding regular people captive while making the jobs of healthcare providers more difficult.'
					}
				]
			},
			{
				id: 'government-integrity',
				navLabel: 'Accountability',
				question:
					'You mention the integrity of our government as an issue raised by people here in Northern Utah. What do you mean by that, and what would you do?',
				parts: [
					{
						type: 'p' as const,
						text: 'My family has a long and proud tradition of military and public service that dates back before the United States was the United States. An integral part of my childhood was learning about the obligation we have as citizens to our country, and the special burden that public servants carry as they represent us in our national government. This past year, we have seen our trust broken by our representatives as our nation moves further towards a government that does not care about the rule of law or the will of the people.'
					},
					{
						type: 'p' as const,
						text: 'Our representative should put the Constitution of the United States first, the needs of this district second, and all other concerns somewhere much lower. We elect them to represent us, not their political party and not their own self-interests. I have spoken with many people throughout Northern Utah who feel they can not trust their current representative to put the people of this district before D.C. party politics or individual self-promotion, and sadly, I think this last year has shown that to be true.'
					},
					{
						type: 'p' as const,
						text: 'There are several solutions that will help rebuild our trust in our government, and they require sacrifice on the part of our representatives. First, I would ban individual stock trades for all members of Congress and their immediate families. This ban should also be extended to members of the executive branch (e.g., the President, Vice President, cabinet secretaries) and their immediate families, as well as the judicial branch. It is not right for someone to regulate the company they invest in. Our representatives are there to serve us, not their bank accounts.'
					},
					{
						type: 'p' as const,
						text: 'Second, I would support a conversation about term limits for Congress. It is healthy for our democracy to prevent any individual from any political party making a permanent home in Congress. America does not want, nor does it need, forever politicians.'
					},
					{
						type: 'p' as const,
						text: 'Third, I support efforts to remove corporate money from our political process. Our government is “of the people, by the people, for the people,” not corporate interests. Removing the influence of this “dark money” will help all of our public servants better serve us, the people.'
					},
					{
						type: 'p' as const,
						text: 'All three of these solutions are reasonable, and require our current and future representatives to put the needs of this country and their voters ahead of partisan politics and personal benefits. I am willing to do that, with the support of the voters in this district.'
					}
				]
			},
			{
				id: 'great-salt-lake',
				navLabel: 'Stewardship',
				question: 'What do we do about the Great Salt Lake?',
				parts: [
					{
						type: 'p' as const,
						text: 'Restoring the Great Salt Lake requires more water. This is largely a state decision, as the Utah Legislature decides how to allocate resources in partnership with local entities. As a federal representative, my responsibility is to provide resources that help move more water to the lake and to remove barriers at the national level that prevent effective solutions.'
					},
					{
						type: 'p' as const,
						text: 'This means securing funding to help restore our aging water infrastructure and removing the invasive phragmites around the shore. It also means simplifying existing regulatory barriers among federal agencies if/when improvement projects require multi-agency approvals. Finally, it also means understanding there are likely to be communities impacted by decisions about water allocation, and thinking about what those consequences are before they happen so we can provide the resources and support necessary to support those impacted (like farmers). This means one of the committees I would be open to serving on would be the Agricultural committee, so I could better advocate for those most impacted by likely changes in water allocations throughout the state.'
					}
				]
			},
			{
				id: 'healthcare',
				navLabel: 'Healthcare',
				groupHeading: 'Other Policy Positions',
				question:
					'What is your position on the cuts to the Affordable Care Act (ACA or “Obamacare”) and access to healthcare for rural communities?',
				parts: [
					{
						type: 'p' as const,
						text: 'The recent “Big Beautiful Bill”, crafted, in part, by Rep. Blake Moore of what is now congressional district 2, significantly cuts access to healthcare by reducing payments to Medicare starting in 2026. These cuts hit hardest in rural communities like those here in Northern Utah, and will make it more expensive to get access to medical care. This is already having an impact here in Utah, as the state is unable to match federal investment at the same level we have in the past, despite the fact we run a large surplus in our state budget. This will likely impact our hospital and emergency care systems the hardest. For rural communities especially, this means less access to critical care.'
					},
					{
						type: 'p' as const,
						text: 'Given this, I am not in favor of the Big Beautiful Bill and its cuts targeted at our local communities. It is bad policy, and it will significantly harm thousands of Utah families.'
					}
				]
			},
			{
				id: 'data-centers',
				navLabel: 'Data centers',
				question:
					'The Stratos data center project approved by MIDA is in Box Elder, a county in your district. What are your thoughts on data centers generally, and Stratos specifically?',
				parts: [
					{
						type: 'p' as const,
						text: 'I do not support additional data center development in Utah unless and until they adequately address concerns about water, energy, the environment, and community impacts. Additionally, decisions about their development should require community approval. I am opposed to the Stratos project because it fails to meet any of these requirements.'
					}
				]
			},
			{
				id: 'ai',
				navLabel: 'AI',
				question: 'Data centers are often linked to AI development. Where do you stand on AI?',
				parts: [
					{
						type: 'p' as const,
						text: 'First, I think it is important to note that AI refers to a wide variety of technological tools that often get aggregated together. I am for machine learning processes that help us identify cancer in imaging more quickly and more accurately. I am opposed to the development and deployment of algorithms that are used to identify and track private citizens without any legal justification.'
					},
					{
						type: 'p' as const,
						text: 'Existing generative AI tools (e.g., ChatGPT, Claude, Midjourney) were built on stolen assets and more often than not negatively impact the human ability to create, reason, and meaningfully engage with the world around us. The tools are here, and they will not go away, so now we have an obligation to mitigate and prevent as much harm as we can.'
					},
					{
						type: 'p' as const,
						text: 'From a policy perspective, I am in favor of holding corporations accountable for their usage and deployment of AI. There are serious potential financial impacts for our communities, and our current tax code allows large corporations to avoid paying their fair share of taxes to support our government and communities. We need to close these tax loopholes, so that if AI deployment significantly displaces Americans and their families from the workforce, we have the resources necessary to support them while they transition.'
					},
					{
						type: 'p' as const,
						text: 'I am also in favor of updates to our current laws and regulations regarding data ownership and privacy. Americans should own their data, full stop. We should also be protected from the misuse of that data, whether by local agencies, corporations, or the federal government.'
					}
				]
			},
			{
				id: 'epstein',
				navLabel: 'Epstein files',
				question:
					'You have often mentioned that one of the reasons you are running is because of what happened to the victims of child trafficking in the Epstein files. What is your position on the Epstein traffickers?',
				parts: [
					{
						type: 'p' as const,
						text: 'Everyone involved should be prosecuted to the fullest extent of the law. I support the full release of the files, as per the victim’s request. I am not interested in protecting anyone who has participated in the buying, selling, or raping of children.'
					}
				]
			}
		]
	}
};
