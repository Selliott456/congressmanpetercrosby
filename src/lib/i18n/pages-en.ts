/** English-only page copy (merged into dictionaries.en) */
export const pagesEn = {
	common: {
		donate: 'Donate',
		viewEvent: 'View Event →',
		googleCalendar: 'Google Calendar',
		ics: 'ICS'
	},
	about: {
		metaTitle: 'About Peter Crosby — Peter Crosby for Congress',
		metaDescription:
			'Learn about Peter Crosby: husband, father, experienced leader, and service-driven candidate for Northern Utah.',
		heroAlt: 'Peter Crosby with his wife Amanda and their three daughters',
		introTitle: 'Family Centered, Community Focused',
		introLede:
			'Northern Utah isn’t just a spot on a map to me. It’s my home, my neighborhood, and my community. I’m not a career politician, and I didn’t clock into this race to play Washington’s partisan games. I’m running for Congress because our neighborhoods deserve steady, common-sense leadership focused on the real economic pressures hitting our kitchen tables. From lowering the rising cost of living to protecting the local jobs that anchor our communities, my commitment is to deliver honest stewardship and real accountability.',
		sections: [
			{
				title: 'Service driven',
				paragraphs: [
					"My family has a history of public service going back to the foundations of our country. My parents were both in the military, as were both of my grandfathers, and both of my brothers. I was a cadet in the ROTC until I blew my knee out in PT one morning, which set me on a different path. My wife's father, brothers, and grandparents also served. Service is hard coded into us, and my wife and I have tried to instill those values in our daughters.",
					'I know the rights and freedoms this country is built on require sacrifice from all of us if we are to keep them. I believe the oath I made as an Eagle Scout almost twenty-five years ago to better society still holds today. Public servants, like our Congressional representatives, are there to serve. It is a duty, an honor, and an obligation to put country and community before self. Please join me in doing our part.'
				]
			},
			{
				title: 'Husband and father',
				paragraphs: [
					'My wife, Amanda, and I, along with our three daughters, have built a home in Cache Valley, where we have lived most of the 19 years Amanda and I have been married. We have raised three kind, passionate, brilliant, and remarkable young women. We teach them to be honest, to have integrity, to love their neighbor, and to work hard. I am running to make sure they, and everyone else, have the opportunities we were promised. Please join me to help make that possible.'
				]
			},
			{
				title: 'Experienced leader',
				paragraphs: [
					'I started my professional career working for a Fortune 500 company in operations. I worked my way up to a supervisory role within a year while going to school full time, and spent the next five to six years leading teams and projects. At the time I moved to a position in analytics at the corporate level, I had a staff of eleven and over 200 employees.',
					'As a first-generation college graduate with two degrees in political science, I know first-hand the value our universities in Northern Utah provide to individuals and communities, and I wanted to be part of that. So, I left the private sector to work for Utah State University in institutional research. I also started teaching, with my first classes focusing on American politics and institutions for undergraduates. I am grateful to continue my role as an educator working as an adjunct for the Center for Anticipatory Intelligence at USU, where I now teach a graduate course on emergent technology. Working with students as a mentor, instructor, and future colleague is perhaps some of the most rewarding professional experiences I have.',
					'My current full time employment is back in the private sector as a director, project manager, and consultant for a research company that supports higher education. Using my background in both the private and public sectors, I work with presidents, provosts, faculty, and support staff to help them navigate what has become a very unpredictable future.',
					'My background has taught me the strength of flexible thinking, relationship building, and organizational skills. I have learned that good leadership is built on trust.'
				]
			}
		]
	},
	contact: {
		metaTitle: 'Contact Us — Peter Crosby for Congress',
		metaDescription: 'Phone and email for the Peter Crosby for Congress campaign.',
		pageTitle: 'Contact us',
		intro: 'Reach the campaign using the phone number or email below.',
		emailLabel: 'Email',
		phoneLabel: 'Phone'
	},
	volunteer: {
		metaTitle: 'Volunteer — Peter Crosby for Congress',
		metaDescription:
			'Sign up to volunteer with the Peter Crosby for Congress campaign. Northern Utah deserves better.',
		pageTitle: 'Volunteer with us',
		intro:
			'Northern Utah deserves better. Tell us how you would like to help—sign up below or reach out with questions.',
		donate: 'Donate',
		formLegendName: 'Name',
		firstName: 'First Name (required)',
		lastName: 'Last Name (required)',
		email: 'Email (required)',
		phone: 'Mobile phone number (required)',
		phoneHint: 'We use this number to reach you quickly by text.',
		zip: 'ZIP code',
		zipOptional: 'optional',
		zipHint: 'Five digits, or five digits, a hyphen, and four more digits (optional field).',
		helpLegend: 'How would you like to help?',
		helpCanvassing: 'Canvassing',
		helpPhoneBanking: 'Phone banking',
		helpTextBanking: 'Text banking',
		helpHosting: 'Hosting an event',
		helpDataEntry: 'Data entry/admin',
		helpWherever: 'Wherever needed',
		message: 'Message (required)',
		send: 'Send',
		mailSubject: 'Contact from website'
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
			pageTitle: 'Events',
			intro: 'Town halls, meet the candidate events, and live conversations across Northern Utah.',
			calendarAria: 'Calendar',
			prevMonth: 'Previous month',
			nextMonth: 'Next month',
			dayWithEvent: 'Day with event',
			nextEvent: 'Next event',
			noUpcomingEvents: 'No upcoming events scheduled. Check back soon or browse past events below.',
			allEvents: 'All events',
			pastEvent: 'Past event'
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
	media: {
		eyebrow: 'Media',
		title: 'Latest from the campaign',
		viewAll: 'View all media',
		kindVideo: 'Video',
		kindArticle: 'Op-Ed',
		closeVideo: 'Close video',
		pinnedEyebrow: 'Featured',
		pinnedTitle: 'Featured media',
		metaTitle: 'Media — Peter Crosby for Congress',
		metaDescription:
			'Videos, op-eds, and interviews from the Peter Crosby for Congress campaign.',
		pageTitle: 'All media',
		pageLede: 'Videos, op-eds, and interviews from across the campaign.',
		byId: {} as Record<string, { title: string; description: string }>
	},
	faq: {
		metaTitle: 'FAQs — Peter Crosby for Congress',
		metaDescription:
			"Frequently asked questions about Peter Crosby's policy priorities, economic issues, government integrity, and healthcare.",
		pageTitle: 'FAQs',
		items: [
			{
				question: 'What are your top policy priorities?',
				parts: [
					{
						type: 'p' as const,
						text: 'My policy priorities are a reflection of the people I speak with throughout Northern Utah. These conversations have surfaced a variety of concerns and issues, but I think they can be summed up in the following areas:'
					},
					{
						type: 'ul' as const,
						items: [
							'The economic well being of our district',
							'The integrity of our government',
							'The health of our communities'
						]
					},
					{
						type: 'p' as const,
						text: 'In these areas, and in all other policy making, my top priority is to represent the people of Northern Utah. My policy positions are people first.'
					}
				]
			},
			{
				question:
					'What are the economic issues facing northern Utah and what would you do about them?',
				parts: [
					{
						type: 'p' as const,
						text: 'Northern Utah has a strong tradition of hard work combined with innovation supported by a community that puts people first. These values and traditions have served us well for decades, but are now under stress, partly because of the actions (or inaction) or our representatives.'
					},
					{
						type: 'p' as const,
						text: 'We are currently experiencing a housing crisis that prevents people from finding permanent homes due to a housing market that is one of the most expensive in the country. While there are some in-state efforts to alleviate this pressure, they are falling well short of our current needs. We need to incentivize better planning, more affordable housing built around community models, and increase the income available to average Utahns so they can afford to start building their families and their futures here.'
					},
					{
						type: 'p' as const,
						text: 'We are also seeing inflation and cost of living increases that are making it more difficult for anyone who is not in the top 1%. Basic staples, like meat, eggs, and milk, are taking an increasingly large part of our grocery budgets each month. Other consumer goods impacted by the tariffs imposed by the Trump administration (and ignored by our own Congressional representative) are more expensive. At the same time, the job market appears to be weakening, creating a situation where everything is more expensive and fewer and fewer members of our community can afford to provide for themselves or their families.'
					},
					{
						type: 'p' as const,
						text: 'Adding to this building disaster are thousands of federal workers and members of the military who are now either furloughed or forced to work without pay because a Republican House, a Republican Senate, and a Republican White House can not effectively govern. There are already reports of dedicated food banks and other community resources being stretched to a breaking point, while our representatives take a paid vacation.'
					},
					{
						type: 'p' as const,
						text: 'My priority in solving these challenges is to focus on the people here in Northern Utah by using the power of the Congress to right the ship. I would join other willing members of Congress and bring an end to an illegal tariff regime that is making it harder and harder for our local business and entrepreneurs to make a living. I would ensure the law is upheld in making sure SNAP benefits are distributed to the more than 80,000 Utah families who are struggling. Finally, I would stand up against the current Republican leadership in D.C. They need to learn how to govern, or they need to get a new job.'
					}
				]
			},
			{
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
						text: 'I think there are several solutions that will help rebuild our trust in our government, and they require sacrifice on the part of our representatives. First, I would ban individual stock trades for all members of Congress and their immediate families. It is not right for someone to regulate the company they invest in. Our representatives are there to serve us, not their bank accounts.'
					},
					{
						type: 'p' as const,
						text: 'Second, I would support a conversation about term limits for Congress. It is healthy for our democracy to prevent any individual from any political party making a permanent home in Congress. America does not want, nor does it need, forever politicians.'
					},
					{
						type: 'p' as const,
						text: 'Third, I support efforts to remove corporate money from our political process. Our government is "of the people, by the people, for the people," not corporate interests. Removing the influence of this "dark money" will help all of our public servants better serve us, the people.'
					},
					{
						type: 'p' as const,
						text: 'All three of these solutions are reasonable, and require our current and future representatives to put the needs of this country and their voters ahead of partisan politics and personal benefits. I am willing to do that, with the support of the voters in this district.'
					}
				]
			},
			{
				question:
					'What is your position on the cuts to the Affordable Care Act (ACA or "Obamacare") and access to healthcare for rural communities?',
				parts: [
					{
						type: 'p' as const,
						text: 'The recent "Big Beautiful Bill," which District 1\'s Rep. Blake Moore helped craft and pass, significantly cuts access to healthcare by reducing payments to Medicare starting in 2026. These cuts hit hardest in rural communities like those here in Northern Utah, and will make it more expensive to get access to medical care. This is already having an impact here in Utah, as the state is unable to match federal investment at the same level we have in the past, despite the fact we run a large surplus in our state budget. This will likely impact our hospital and emergency care systems the hardest. For rural communities especially, this means less access to critical care.'
					},
					{
						type: 'p' as const,
						text: 'Given this, I am not in favor of the Big Beautiful Bill and its cuts targeted at our local communities. It is bad policy, and it will significantly harm thousands of Utah families.'
					}
				]
			}
		]
	}
};
