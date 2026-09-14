/**
 * Campaign press releases (English source). Spanish overrides:
 * $messages.pressReleases.byId[id] (title + summary + body).
 *
 * Content is transcribed from the campaign's release graphics (JPEGs in
 * static/press-releases/); the original image is offered as a download
 * (`attachment`) and a 16:9 top-crop is the card thumbnail (`image`).
 *
 * Rendered in three places:
 *   - /media           → the "Press Releases" section (all releases)
 *   - home page        → a row of the 3 most recent, under the Media section
 *   - /press/<id>      → the full release (detail page)
 */

export type PressReleaseBlock =
	/** Paragraph. `text` may contain inline `[label](url)` links. */
	| { type: 'p'; text: string }
	| { type: 'ul'; items: string[] }
	| { type: 'quote'; text: string; attribution?: string }
	/** A recreated bar chart (e.g. an internal-poll question). Rendered by PressBarChart. */
	| {
			type: 'chart';
			/** The survey question, shown as the chart title. */
			chartTitle: string;
			/** Y-axis maximum (percent). */
			yMax: number;
			/** Y-axis gridline interval (percent). */
			yStep: number;
			/** Bars in display order; `color` is any CSS color. */
			bars: { label: string; value: number; color: string }[];
			/** Optional italic note under the chart (e.g. a response rate). */
			note?: string;
			/** Source / methodology line under the chart. */
			source?: string;
	  };

/**
 * Bar colors for the internal-polling charts, sampled from the release graphics.
 * Semantic ramp: strong-favor → soft-favor → soft-oppose → strong-oppose, plus unsure.
 */
export const POLL_COLORS = {
	favorStrong: '#bbcedd', // pale blue — "Very" favorable
	favorSoft: '#487996', // steel blue — "Somewhat" favorable
	opposeSoft: '#235926', // green — "Somewhat" unfavorable
	opposeStrong: '#002338', // deep navy — "Very" unfavorable
	unsure: '#737373', // gray — unsure
	// Ballot test (September release): candidate + answer colors, sampled the same way.
	crosby: '#094061', // navy — Peter Crosby
	moore: '#d76b6b', // salmon — Blake Moore
	other: '#2b602e', // green — Other
	ballotUnsure: '#bbcedd', // pale blue — Unsure
	none: '#737373' // gray — None of the Above
};

/**
 * The organization that issued a release, when it was **not** this campaign —
 * e.g. an endorsing group announcing its own decision.
 *
 * Set this and the release is presented as someone else's document: the detail
 * page and cards carry the issuer's name and mark instead of implying campaign
 * authorship. Two rules follow from that, and neither is enforced by the type:
 *   • Do NOT append `BOILERPLATE_EN` — that is campaign-authored copy, and adding
 *     it to another organization's release misrepresents what they published.
 *   • Transcribe the body faithfully. The text is theirs; it is reproduced here
 *     so it is accessible, translatable and searchable, not to be reworded.
 */
export type ReleaseSource = {
	/** Issuing organization, as they name themselves. */
	name: string;
	/** Their site, linked from the attribution line. */
	url?: string;
	/** Their mark, under `static/images/endorsements/`. */
	logo?: string;
	/** Alt text for the mark — translated via the `es` override. */
	logoAlt?: string;
};

export type PressRelease = {
	/** Stable slug — also the `/press/<id>` URL. Keep it stable across edits. */
	id: string;
	/** Set only for releases issued by another organization. See `ReleaseSource`. */
	source?: ReleaseSource;
	/** ISO date (YYYY-MM-DD) — used to sort newest-first and for the dateline. */
	date: string;
	title: string;
	/** One–two sentence dek shown on cards and at the top of the release. */
	summary: string;
	/** Dateline location, e.g. "Providence, UT". */
	location?: string;
	/** The release body, as ordered prose/list/quote blocks. */
	body: PressReleaseBlock[];
	/** Press-contact email shown in the release footer. */
	contactEmail?: string;
	/**
	 * Set on the campaign's polling releases: the detail page then points to the Data
	 * Room, where the same figures are charted with sample size, field dates and margin
	 * of error. Rendered outside the release body, which stays as issued.
	 */
	dataRoom?: boolean;
	/**
	 * Card thumbnail (the designed release graphic), path under `/press-releases/`.
	 * Shown on the `/media` section + home row cards, cropped to 16:9 (anchored top,
	 * so the headline stays visible). Optional: when omitted, the card falls back to
	 * the `attachment` file if that's an image, else the branded wordmark placeholder.
	 * Supply a purpose-made 16:9 crop here if the full graphic doesn't crop cleanly.
	 */
	image?: string;
	/**
	 * Optional path to the original release file — the source artifact, a **JPEG
	 * image or a PDF** — served from `static/press-releases/<slug>.<ext>`. When set,
	 * the detail page shows a "Download the release" link (labeled with the format).
	 * For a Spanish original, set `attachment` in the `es` `byId` override instead
	 * (falls back to this English one). NOTE: this is the downloadable original; the
	 * on-page text is always the transcribed `body` (accessible + translatable).
	 */
	attachment?: string;
};

/** Campaign boilerplate that closes each release (English). */
const BOILERPLATE_EN =
	'Peter Crosby is a first-time congressional candidate, and is the Democratic nominee in Utah’s Congressional District 2. He is running a grassroots campaign — Peter is not accepting corporate PAC donations or funding from PACs aligned with foreign interests, and already has more named small-dollar, individual donors than the Moore Campaign. The Campaign is fully volunteer-supported with over 400 registered campaign volunteers. Peter believes citizens of Northern Utah deserve a representative that lives in the district, listens to their concerns, and puts the people of Utah ahead of party or the pursuit of personal power. He is holding public town halls throughout the district, with at least one in Cache, Box Elder, Davis, and Weber counties each month. More information is available at petercrosbyforcongress.org.';

/** Source line under each chart in the September polling release, as printed there. */
const SEP_POLL_SOURCE =
	'Voter Survey, Peter Crosby for Congress Campaign. Internal polling of 762 randomized, registered voters across Davis, Weber, Box Elder, Cache, and Rich Counties (CD2), Utah, 9/8–10/2026. ±4% margin of error.';

export const pressReleases: PressRelease[] = [
	{
		// Transcribed from the release PDF — the revised edition issued the same day, which added
		// the Hinckley figures and the Utah Democratic Party Chair's quote.
		id: 'september-internal-polling',
		dataRoom: true,
		date: '2026-09-14',
		title: 'Northern Utah on track to flip a 2nd Congressional seat this November',
		summary:
			'A traditionally safe conservative district is now statistically tied, with Blake Moore leading by 1.7 points in latest Peter Crosby for Congress Campaign internal polling.',
		location: 'Providence, UT',
		contactEmail: 'Amanda@petercrosbyforcongress.org',
		body: [
			{
				type: 'p',
				text: 'New head-to-head polling conducted by the Peter Crosby for Congress campaign has the political newcomer surging into a dead heat with Republican incumbent, Representative Blake Moore in the newly redrawn Utah Congressional District 2 (CD2). The Campaign is releasing its latest internal polling, conducted Sept. 8-10, 2026, which shows the Democratic candidate neck and neck with Rep. Moore. While the new Congressional district has not yet elected its own representative, [traditional race watchers had suggested it will be an R+15 district](https://www.cookpolitical.com/house/race/485416), a rating which has not been updated since November of 2025. Recent data indicate a very different reality on the ground.'
			},
			{
				type: 'p',
				text: 'The survey, conducted across a randomized sample of registered voters in Davis, Weber, Box Elder, Cache, and Rich counties, places Crosby within a 1.7-point range of Moore in a head-to-head matchup if the election were to happen today, with over 25% of respondents still unsure. Combined with [recent polling showing that incumbent Rep. Moore is deeply unpopular in the new district](/press/august-internal-polling), the race for the new CD2 is not just competitive – it offers a significant opportunity for Utah to send two Democratic representatives to Congress this cycle.'
			},
			{
				type: 'ul',
				items: [
					'Rep. Moore is currently polling at 32.4%, and Peter Crosby is currently polling at 30.71%.',
					'Over 25% of respondents are still unsure, including 24% of registered Republicans.',
					'Affordability and Accountability are the top issues identified by respondents (74.4% are concerned with affordability related issues, and 69.8% are concerned with corruption, insider trading, and related concerns).'
				]
			},
			{
				type: 'chart',
				chartTitle: 'If the election were held today, who would you vote for?',
				yMax: 35,
				yStep: 5,
				bars: [
					{ label: 'Peter Crosby', value: 30.71, color: POLL_COLORS.crosby },
					{ label: 'Blake Moore', value: 32.41, color: POLL_COLORS.moore },
					{ label: 'Other', value: 3.28, color: POLL_COLORS.other },
					{ label: 'Unsure', value: 25.07, color: POLL_COLORS.ballotUnsure },
					{ label: 'None of the Above', value: 8.53, color: POLL_COLORS.none }
				],
				source: SEP_POLL_SOURCE
			},
			{
				type: 'chart',
				chartTitle: 'Voter Preference by Party Affiliation: Republican',
				yMax: 50,
				yStep: 10,
				bars: [
					{ label: 'Peter Crosby', value: 18, color: POLL_COLORS.crosby },
					{ label: 'Blake Moore', value: 45.7, color: POLL_COLORS.moore },
					{ label: 'Other', value: 3.7, color: POLL_COLORS.other },
					{ label: 'Unsure', value: 24, color: POLL_COLORS.ballotUnsure },
					{ label: 'None of the Above', value: 8.6, color: POLL_COLORS.none }
				],
				source: SEP_POLL_SOURCE
			},
			{
				type: 'chart',
				chartTitle: 'Voter Preference by Party Affiliation: Unaffiliated',
				yMax: 40,
				yStep: 10,
				bars: [
					{ label: 'Peter Crosby', value: 39.4, color: POLL_COLORS.crosby },
					{ label: 'Blake Moore', value: 16.5, color: POLL_COLORS.moore },
					{ label: 'Other', value: 2.8, color: POLL_COLORS.other },
					{ label: 'Unsure', value: 30.3, color: POLL_COLORS.ballotUnsure },
					{ label: 'None of the Above', value: 11, color: POLL_COLORS.none }
				],
				source: SEP_POLL_SOURCE
			},
			{
				type: 'p',
				text: 'While the Campaign intended to hold these results until after the release of independently commissioned polling conducted on behalf of the Utah Debate Commission, [typically available](https://utahdebatecommission.org/about/) by early September each election cycle, that data has yet to be released. The Utah Debate Commission polling data is significant as it determines thresholds for which candidates make it to the stage in the only publicly moderated debate currently scheduled before election day. The CD2 debate was originally planned for October 20th, one full week after the release of mail-in ballots, but [was rescheduled for October 13th](/press/debate-rescheduled) after public pushback.'
			},
			{
				type: 'p',
				text: 'The Campaign’s polling data are reinforced by recent reports at the state and national level. A recent [Deseret News/Hinckley Institute of Politics poll](https://www.deseret.com/politics/2026/08/17/utah-voters-disapprove-of-governor-cox-senator-lee-and-senator-curtis-in-new-poll/) found an increasingly anti-incumbent mood among Utah voters, with approval ratings for several high-profile elected officials declining. According to that poll, dissatisfaction extends beyond any single officeholder and reflects broader concerns about current leadership. Governor Spencer Cox is underwater, with his approval plunging from 51% in January to 41% in August. Senator Mike Lee is now seven points underwater (39% approval to 46% disapproval), Senator John Curtis has slid into negative territory at 37% approval, and the Utah State Legislature is underwater at 44% approval and 45% disapproval.'
			},
			{
				type: 'p',
				text: 'While the Deseret News release did not include data about Utah’s current Congressional House delegation (who are all up for re-election) by name, it stated that public trust in Congress as a whole has collapsed to a negative 30 points, underscoring a deep, cross-partisan fatigue with political dysfunction.'
			},
			{
				type: 'p',
				text: '“The old assumptions about this district aren’t going to decide this election. Voters will,” said Utah Democratic Party Chair Brian King. “For voters across northern Utah, the priorities are pretty straightforward: they want to know how their representatives are going to make life more affordable and whether they can trust them to put constituents ahead of special interests. Peter Crosby is connecting with voters because he’s focused on where Utah is going, not where Washington has been. He’s giving voters a chance to turn the page and elect a representative with a fresh perspective and a vision for the future of northern Utah. This poll shows that message is breaking through, and we’re proud to stand with Peter as he works to earn the support of voters across CD2.”'
			},
			{
				type: 'p',
				text: 'Rep. Blake Moore has been notably reactive to the pressure from the Crosby Campaign, recently scheduling a series of four short-notice, in-person town halls in counties in the newly drawn CD-2, the first such meetings since September 2025.'
			},
			{
				type: 'p',
				text: 'Crosby has held 35 public town-halls across the district since launching his campaign in November 2025, and has 6 more scheduled for the month of September. If elected, Crosby has pledged to continue holding those in-person town halls on a regular basis.'
			},
			{
				type: 'p',
				text: 'With voters seeking responsive representation that is focused on their concerns regarding affordability and governmental accountability, the Crosby campaign enters the final stage of the mid-term election cycle positioned to compete—and win—in Northern Utah.'
			},
			{
				type: 'p',
				text: 'Peter Crosby is the Democratic nominee for Utah’s U.S. Congressional District 2, a first-time political candidate, and a girl-dad. He is running a strictly clean-money, grassroots campaign: Peter is not accepting corporate PAC donations or funding from PACs aligned with foreign interests, and has raised just over $100,000 from small-dollar and individual donors, with over 95% coming from right here in Utah. The campaign is fully volunteer-supported with over 400 registered campaign volunteers. Peter believes citizens of Northern Utah deserve a representative that lives in the district, listens to their concerns, and puts the people of Utah ahead of party or the pursuit of personal power. He is holding public town halls throughout the district, with at least one in Cache, Box Elder, Davis, and Weber counties each month. To learn more, visit petercrosbyforcongress.org.'
			}
		],
		image: '/press-releases/september-internal-polling-thumb.jpg',
		attachment: '/press-releases/september-internal-polling.pdf'
	},
	{
		id: 'indivisible-statewide-endorsement',
		date: '2026-09-09',
		source: {
			name: 'The Indivisible groups of Utah',
			// No `url` by campaign decision: the national parent org runs its own
			// endorsement program, so linking there could imply an endorsement this
			// release does not claim. Attribution stays as plain text.
			logo: '/images/endorsements/indivisible.png',
			logoAlt: 'Indivisible'
		},
		title: 'All 12 of Utah’s Indivisible Groups Endorse Peter Crosby for Congress',
		summary:
			'Utah’s twelve Indivisible chapters announce a unified statewide endorsement in the CD2 race — the first time the state’s chapters have come together behind a single congressional candidate.',
		// Transcribed verbatim from the issuing organization's release. Their words —
		// reproduced for accessibility, translation and search, not reworded. No
		// campaign boilerplate: see `ReleaseSource`.
		body: [
			{
				type: 'p',
				text: 'All 12 of Utah’s chapters of the nationwide organization Indivisible are proud to announce their statewide endorsement of Peter Crosby, Democratic candidate for Utah’s Congressional District 2, in the upcoming 2026 election. This marks the first time all of Utah’s Indivisible chapters have come together across the state to issue a unified congressional endorsement.'
			},
			{
				type: 'p',
				text: 'Indivisible is a nationwide organization working to defend American democracy. There are over 2,000 locally led chapters of Indivisible across the country, including 12 active chapters in Utah who have come together to collectively endorse Peter Crosby in his run for Congress. These groups are:'
			},
			{
				type: 'ul',
				items: [
					'Indivisible Box Elder',
					'We the People Cache Valley',
					'Indivisible Ogden',
					'Gathering Voices Davis Indivisible',
					'Salt Lake Indivisible',
					'Utah Alliance Coalition',
					'Wasatch Progressives',
					'Indivisible Utah County',
					'Indivisible Carbon County',
					'Indivisible Cedar City',
					'Moab Indivisible',
					'Southern Utah Indivisible'
				]
			},
			{
				type: 'p',
				text: 'Utahns are increasingly concerned with both the Trump administration and a Congress unwilling to rein in his abuses of power and attacks on democratic norms. In this moment of political crisis, the Indivisible groups of Utah feel strongly that endorsing congressional candidates willing to put a stop to the current chaos is imperative. Peter Crosby stands out as a candidate who will bring integrity, accountability, transparency, and much-needed change to Congress should he be elected.'
			},
			{
				type: 'quote',
				text: 'For months we have been getting to know Peter, and we feel he is ready to lead Utah as a partner in our work to build more engaged communities that combat authoritarian government and promote the wellbeing of all Utahns.',
				attribution: 'Chelsea Hagman, Gathering Voices Davis Indivisible'
			},
			{
				type: 'p',
				text: 'The Peter Crosby for Congress campaign is making impressive strides in Northern Utah, placing an emphasis on the importance of community member involvement in ensuring good governance. Recent polling from the campaign shows deep dissatisfaction among Northern Utahns, with 57% of respondents unsatisfied with their current representation. With a registered volunteer base of more than 400 individuals, nearly 40 public town halls on the books, and over $90,000 raised from small-dollar and individual donations, the Crosby campaign is meeting the moment.'
			},
			{
				type: 'quote',
				text: 'I am honored to be endorsed by the non-partisan organization responsible for the largest peaceful protests in the history of our nation, protests centered on protecting the civil rights of all of us. I am humbled by the trust this represents, and I will continue to work to represent everyone in this new Congressional district, regardless of political background, social status, or economic circumstances.',
				attribution: 'Peter Crosby'
			},
			{
				type: 'quote',
				text: 'This statewide endorsement may not make or break the fate of American democracy, but we feel some urgency in doing everything we possibly can, even from our generally counted-out and underestimated corner of the country, to make this happen. And endorsing Peter Crosby is something the Utah Indivisible groups are excited to do in that effort.',
				attribution: 'Sarah McConkie, Indivisible Utah County'
			},
			{
				type: 'p',
				text: 'With this statewide endorsement, the Indivisible groups of Utah are ready and excited to help mobilize CD2 communities to do the work, flip Representative Blake Moore’s seat, and send Peter Crosby to Congress.'
			},
			{
				// The release sets this as a bold sub-head; the press body renderer parses
				// only `[label](url)`, so it reads as a lead-in sentence instead.
				type: 'p',
				text: 'Interview requests: members of the Utah Statewide Indivisible Coalition and representatives of the individual chapters listed above are available for interviews regarding this endorsement.'
			}
		],
		image: '/press-releases/indivisible-statewide-endorsement-thumb.jpg',
		attachment: '/press-releases/indivisible-statewide-endorsement.pdf'
	},
	{
		id: 'august-internal-polling',
		dataRoom: true,
		date: '2026-08-21',
		title:
			'All Eyes on Utah District 2 Congressional Race: Democrat Peter Crosby Making Gains Amid Statewide Anti-Incumbent Wave',
		summary:
			'District survey shows 57% voter dissatisfaction with Rep. Moore; 33% of Republicans waver as fresh August polling places state GOP leadership deep in the red.',
		location: 'Providence, UT',
		body: [
			{
				type: 'p',
				text: 'A new internal poll released by the Peter Crosby for Congress campaign reveals that Utah’s newly redrawn 2nd Congressional District has transformed into a competitive race, challenging the assumption of a guaranteed re-election for incumbent Republican Representative Blake Moore. The survey, which sampled 565 registered voters across all counties in the district, found over half of respondents are dissatisfied with Moore and 70% are unlikely or unsure of whether they’ll vote for the current congressman. Clear signs show support for Representative Moore is weakening, even among Republicans—who make up more than 40% of the survey’s sample.'
			},
			{
				type: 'ul',
				items: [
					'57% of respondents reported dissatisfaction with Rep. Blake Moore.',
					'33% of registered Republicans said they are unlikely or unsure whether they will vote for Rep. Blake Moore.',
					'47% of unaffiliated and independent voters (which make up 43% of the electorate) state they are unlikely to vote for Rep. Blake Moore.'
				]
			},
			{
				type: 'chart',
				chartTitle: 'How satisfied are you with our current representative (Rep. Blake Moore)?',
				yMax: 35,
				yStep: 5,
				bars: [
					{ label: 'Very Satisfied', value: 9, color: POLL_COLORS.favorStrong },
					{ label: 'Somewhat Satisfied', value: 34, color: POLL_COLORS.favorSoft },
					{ label: 'Somewhat Dissatisfied', value: 25, color: POLL_COLORS.opposeSoft },
					{ label: 'Very Dissatisfied', value: 32, color: POLL_COLORS.opposeStrong }
				],
				note: 'This question had an 89% response rate.',
				source:
					'Voter Survey, Peter Crosby for Congress Campaign. Internal polling of 565 randomized, registered voters across Davis, Weber, Box Elder, Cache, and Rich Counties (CD2), Utah, 8/3–17/2026. ±4% margin of error.'
			},
			{
				type: 'chart',
				chartTitle: 'How likely are you to vote for Blake Moore this November?',
				yMax: 40,
				yStep: 10,
				bars: [
					{ label: 'Very Likely', value: 13, color: POLL_COLORS.favorStrong },
					{ label: 'Somewhat Likely', value: 17, color: POLL_COLORS.favorSoft },
					{ label: 'Somewhat Unlikely', value: 11, color: POLL_COLORS.opposeSoft },
					{ label: 'Very Unlikely', value: 40, color: POLL_COLORS.opposeStrong },
					{ label: 'Unsure', value: 19, color: POLL_COLORS.unsure }
				],
				source:
					'Voter Survey, Peter Crosby for Congress Campaign. Internal polling of 565 randomized, registered voters across Davis, Weber, Box Elder, Cache, and Rich Counties (CD2), Utah, 8/3–17/2026. ±4% margin of error.'
			},
			{
				type: 'p',
				text: 'The findings align with broader trends across Utah. A recent [Deseret News/Hinckley Institute of Politics poll](https://www.deseret.com/politics/2026/08/17/utah-voters-disapprove-of-governor-cox-senator-lee-and-senator-curtis-in-new-poll/) found an increasingly anti-incumbent mood among Utah voters, with approval ratings for several high-profile elected officials declining. According to that poll, dissatisfaction extends beyond any single officeholder and reflects broader concerns about current leadership. For the first time in his gubernatorial career, Governor Spencer Cox is underwater, with his approval plunging from 51% in January to 41% in August, while total disapproval surged to 49%. The legislative branch and other top GOP officials have felt the same heavy backlash: Senator Mike Lee is now seven points underwater (39% approval to 46% disapproval), Senator John Curtis has slid into negative territory at 37% approval, and the Utah State Legislature is underwater at 44% approval and 45% disapproval. Public trust in Congress as a whole has collapsed further to negative 30 points, underscoring a deep, cross-partisan fatigue with political dysfunction.'
			},
			{
				type: 'p',
				text: 'Northern Utahns have been deeply affected by DOGE cuts, the One Big Beautiful Bill (of which Moore is proudly an architect), and a tariff regime that has crippled many small businesses and household budgets. These issues are top of mind among residents. In Crosby’s survey, 79% of all voters (including 73% of Republicans and 80% of Unaffiliated voters) identified affordability (housing, healthcare, food prices) as their top priority, while 68% of all voters (including 65% of Republicans and 71% of Unaffiliated voters) prioritized government accountability (ethics, insider trading, and closing promotional loopholes).'
			},
			{
				type: 'p',
				text: 'Many constituents in this district also felt unheard during the debate over the Stratos Data Center approval process earlier this year, while watching their representative, Blake Moore, stand steadfast with those pushing the project forward. At Moore’s in-person town hall in Box Elder on Wednesday, he stated he had a conversation with the commissioners before the vote took place:'
			},
			{
				type: 'quote',
				text: 'I called the county commissioners. I said “Hey [...], if this moves forward and you guys aren’t involved, it might be a situation where you get nothing out of the deal, and you don’t help your tax base.”',
				attribution: 'Rep. Blake Moore'
			},
			{
				type: 'p',
				text: 'This statement echoes similar ones Moore made during the primary debate, that he views data centers as an economic boon to the state.'
			},
			{
				type: 'p',
				text: 'Crosby has taken a stand against the Stratos Data Center from the beginning, and was present at the Box Elder Commissioner’s vote, where he rallied folks to let Box Elder residents in first and then to vote out elected officials who don’t listen to their constituents:'
			},
			{
				type: 'quote',
				text: 'Good governance is non-partisan. Deals in the dark, pressure campaigns from powerful officials on local public servants, and men whose courage fails them when it matters are not good governance. The Box Elder data center decision was premature and poorly researched, and ignored the will of the people of Box Elder county. We are tired of communities taking a back seat to corporate profits. Enough is enough, and we will hold our elected officials accountable.',
				attribution: 'Peter Crosby'
			},
			{
				type: 'p',
				text: 'Crosby is focusing his campaign on accessibility and direct engagement with voters. He has held 28 in-person, public town halls across the new district since launching the campaign, along with 4 virtual town halls for increased accessibility, all while maintaining his full-time employment. Before this week, Moore’s last in-person town hall was held in September 2025, after which he moved strictly to less than one scripted telephone town hall a month.'
			},
			{
				type: 'p',
				text: 'Crosby and his campaign team have also participated in many community events throughout the district, meeting directly with voters and discussing issues ranging from government accountability to concerns on affordability and data center development. The campaign’s grassroots growth reflects that engagement. Crosby has built a volunteer organization of more than 400 registered volunteers (one of the largest campaigns in the state), and raised more than $70,000 from over 550 individual donors. Campaign officials say the strong volunteer base and small-dollar fundraising support their view that CD-2 is emerging as one of Utah’s most competitive congressional races.'
			},
			{
				type: 'p',
				text: 'Peter Crosby is a first-generation college graduate who earned his undergraduate and master’s degrees in political science from Utah State University. An active member of the LDS Church and a dedicated family man, Crosby is running to restore a neighbor-to-neighbor, values-driven leadership to Utah’s 2nd Congressional District. Refusing corporate PAC money, Crosby’s grassroots campaign is focused on bringing real cost-of-living relief, restoring political accountability, and protecting Utah’s public lands and watersheds. He resides in Providence, UT, with his wife Amanda and their children. Learn more at petercrosbyforcongress.org.'
			}
		],
		image: '/press-releases/august-internal-polling-thumb.jpg',
		attachment: '/press-releases/august-internal-polling.pdf'
	},
	{
		id: 'debate-rescheduled',
		date: '2026-07-23',
		title:
			'Congressional District 2 Debate Rescheduled by Utah Debate Commission Following Public Response',
		summary:
			'In response to voter and candidate concern, the Utah Debate Commission has rescheduled the Congressional District 2 Debate to October 13th.',
		location: 'Providence, UT',
		body: [
			{
				type: 'p',
				text: 'Yesterday, the Utah Debate Commission announced the rescheduling of the Congressional District 2 (CD2) debate, which will now take place Tuesday, October 13th, 2026. This is one week earlier than originally planned and the day mail-in ballots are released. This is a win for Utah voters, who deserve to have the opportunity to evaluate each of the candidates in the only public debate currently scheduled before casting their ballots.'
			},
			{
				type: 'quote',
				text: 'Democracy depends on informed voters and accountable candidates. By moving this debate to October 13, Utahns will have the opportunity to hear directly from both candidates before voting begins. That’s good for voters, good for the electoral process, and good for Utah.',
				attribution: 'Brian King, Utah Democratic Party Chair'
			},
			{
				type: 'p',
				text: 'Democratic Congressional Candidate Peter Crosby and the Peter Crosby for Congress Campaign express their gratitude to the many Utahns who respectfully reached out to request this change. There is no doubt your voices were heard. The Campaign also wishes to thank the Utah Debate Commission, state legislative and political leaders, and the Moore Campaign, who listened to the residents of Utah and worked to find a suitable solution.'
			},
			{ type: 'p', text: BOILERPLATE_EN }
		],
		image: '/press-releases/debate-rescheduled-thumb.jpg',
		attachment: '/press-releases/debate-rescheduled.jpg'
	},
	{
		id: 'debate-scheduling-voter-choice',
		date: '2026-07-10',
		title:
			'Late Scheduling of Congressional Debate Negatively Impacts Voter Choice, Sparks Concern from CD2 Candidate Peter Crosby',
		summary:
			'After the release of the general election congressional debate schedule by the Utah Debate Commission, Peter Crosby, Democratic nominee for CD2, is concerned the October 20th debate with Blake Moore falls a full week after mail-in ballots have been sent out.',
		location: 'Providence, UT',
		body: [
			{
				type: 'p',
				text: 'On Thursday, the Utah Debate Commission released the dates of the four congressional debates ahead of the November 3rd general election. While the debates for all other congressional districts are scheduled to take place before mail-in ballots go out on October 13th, the debate for CD2 is scheduled for October 20th — one full week after the ballot release. Democratic candidate Peter Crosby expresses deep concern, as it means some voters will make decisions without having the opportunity to evaluate each of the candidates in the only public forum facilitated by a trusted authority.'
			},
			{
				type: 'p',
				text: 'In an environment where Utah voters are feeling increasingly disenfranchised by the political system, the belated timeline after ballots have been released is just one more way information is being held back from Northern Utah citizens who want to make informed decisions about their government. Citizens deserve timely information and the opportunity to consider their choices before casting ballots.'
			},
			{
				type: 'p',
				text: 'The Peter Crosby for Congress Campaign has reached out to the Utah Debate Commission to lodge a formal protest but has not received a response. The Campaign is appreciative of the work of the Utah Debate Commission to host fair debates and acknowledges the complexity of scheduling. While the Campaign is not requesting to choose a specific date for the debate, we do request it be moved before ballots arrive in voters’ mailboxes. According to the Office of the Lt. Governor, in the 2024 general election, 29% of Utah voters had already returned their ballots one week before election day. These numbers show the importance of ensuring voters have the ability to make informed choices once ballots are in hand.'
			},
			{
				type: 'quote',
				text: 'Voting is our core civic duty, and we as voters can’t do that responsibly if we don’t have all of the information. These debates are the only time voters will see all of the candidates on the same stage responding to questions. They deserve to know who wants to represent them before being asked to cast their vote.',
				attribution: 'Peter Crosby'
			},
			{
				type: 'p',
				text: 'It is imperative that the Utah Debate Commission continues to uphold a standard of fair, unbiased debate among candidates. It is a service that citizens depend on and helps hold candidates accountable to their constituents. The Campaign publicly requests the October 20th debate be rescheduled prior to the mail-in ballot release on October 13th and looks forward to a fair and spirited event.'
			},
			{ type: 'p', text: BOILERPLATE_EN }
		],
		image: '/press-releases/debate-scheduling-voter-choice-thumb.jpg',
		attachment: '/press-releases/debate-scheduling-voter-choice.jpg'
	}
];

/** Press releases sorted newest-first. */
export const pressReleasesByRecent: PressRelease[] = [...pressReleases].sort((a, b) =>
	b.date.localeCompare(a.date)
);

/** The 3 most recent releases — the home-page row. */
export const homePressReleases: PressRelease[] = pressReleasesByRecent.slice(0, 3);

/** Look up a release by slug (for the `/press/<id>` detail route). */
export function getPressRelease(id: string): PressRelease | undefined {
	return pressReleases.find((r) => r.id === id);
}
