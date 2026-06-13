import { pagesEn } from './pages-en';
import { pagesEs } from './pages-es';

export type Locale = 'en' | 'es';

export type Messages = typeof en;

const en = {
	nav: {
		donate: 'DONATE',
		home: 'HOME',
		about: 'ABOUT',
		contact: 'CONTACT',
		events: 'EVENTS',
		pastInterviews: 'PAST INTERVIEWS',
		policies: 'POLICIES',
		ariaHome: 'Congressman Peter Crosby - Home',
		menuToggle: 'Toggle menu'
	},
	footer: {
		contactUs: 'Contact Us',
		createdBy: 'Created by',
		createdByName: 'Elliott Peck Software',
		socialAria: 'Social media links',
		rights: 'Peter Crosby for Congress. All rights reserved.',
		paidForBy: 'Paid for by Peter Crosby for Congress'
	},
	language: {
		switch: 'Language',
		english: 'English',
		spanish: 'Español'
	},
	announcement: {
		ballotsMail: 'Ballots Mail · Oct 13, 2026',
		electionDay: 'Election Day · Tue, Nov 3',
		registerToVote: 'Register to Vote'
	},
	home: {
		metaDescription:
			'Peter Crosby for U.S. Congress, Utah District 2. Integrity, practical solutions, and a representative who puts Northern Utah first.',
		heroKicker: 'U.S. Congress · Utah District 2',
		heroTitle: 'A voice for Northern Utah',
		heroLead:
			'Peter Crosby is running to represent this district with integrity, straight answers, and a focus on what matters here—housing, honest government, and strong communities.',
		donate: 'Donate',
		pillarsTitle: 'What this campaign stands for',
		pillarsIntro: 'No slogans—just clear expectations for how your representative should show up.',
		pillars: [
			{
				title: 'Rooted here',
				text: 'Raised a family in Cache Valley. Northern Utah isn’t a stepping stone—it’s home.'
			},
			{
				title: 'Accountable government',
				text: 'Public office should serve people first: clear rules, honest answers, and representatives who earn your trust.'
			},
			{
				title: 'Practical focus',
				text: 'Housing people can afford, healthcare access that works in rural communities, and an economy that rewards work.'
			}
		],
		whyTitle: 'Why he’s running',
		whyProse:
			'Northern Utah families deserve a representative who listens before speaking, answers tough questions, and votes with the district in mind. Peter is running to bring that standard to Congress—not party talking points, but work that helps neighbors and communities thrive.',
		whyLink: 'Read where he stands on the issues →',
		prioritiesTitle: 'Priorities',
		prioritiesIntro: 'Concrete issues affecting families and communities across the district.',
		priorities: [
			{ label: 'Stronger communities' },
			{ label: 'Affordable living' },
			{ label: 'Costs that match wages' },
			{ label: 'Fair rules for everyone' },
			{ label: 'Safe neighborhoods' },
			{ label: 'Protecting what we love' }
		],
		communityAria: 'Peter Crosby with family',
		communityAlt: 'Peter Crosby with his family in Northern Utah',
		communityQuote: 'Family, service, and community—values that shape this campaign.',
		involveTitle: 'Get involved',
		involveIntro: 'Every race is won by people who pitch in. Pick what fits you.',
		involveDonate: 'Donate',
		involveDonateDesc: 'Fuel voter outreach and events.',
		involveVolunteer: 'Volunteer',
		involveVolunteerDesc: 'Door knocks, calls, and community events.',
		involveEvents: 'Events',
		involveEventsDesc: 'Town halls and meetups near you.',
		involveContact: 'Contact',
		involveContactDesc: 'Questions or ideas for the campaign.',
		followCampaign: 'Follow the campaign',
		socialAria: 'Social media links'
	},
	...pagesEn
};

const es: Messages = {
	nav: {
		donate: 'DONAR',
		home: 'INICIO',
		about: 'ACERCA DE',
		contact: 'CONTACTO',
		events: 'EVENTOS',
		pastInterviews: 'ENTREVISTAS',
		policies: 'POLÍTICAS',
		ariaHome: 'Peter Crosby para el Congreso - Inicio',
		menuToggle: 'Abrir menú'
	},
	footer: {
		contactUs: 'Contáctenos',
		createdBy: 'Creado por',
		createdByName: 'Elliott Peck Software',
		socialAria: 'Enlaces a redes sociales',
		rights: 'Peter Crosby para el Congreso. Todos los derechos reservados.',
		paidForBy: 'Paid for by Peter Crosby for Congress'
	},
	language: {
		switch: 'Idioma',
		english: 'English',
		spanish: 'Español'
	},
	announcement: {
		ballotsMail: 'Boletas por correo · 13 oct 2026',
		electionDay: 'Día de elecciones · mar 3 nov',
		registerToVote: 'Regístrese para votar'
	},
	home: {
		metaDescription:
			'Peter Crosby para el Congreso de EE. UU., Distrito 2 de Utah. Integridad, soluciones prácticas y un representante que pone primero al norte de Utah.',
		heroKicker: 'Congreso de EE. UU. · Distrito 2 de Utah',
		heroTitle: 'Una voz para el norte de Utah',
		heroLead:
			'Peter Crosby se postula para representar este distrito con integridad, respuestas claras y un enfoque en lo que importa aquí: vivienda, gobierno honesto y comunidades fuertes.',
		donate: 'Donar',
		pillarsTitle: 'En qué se basa esta campaña',
		pillarsIntro:
			'Sin eslóganes: expectativas claras de cómo debe comportarse quien le representa.',
		pillars: [
			{
				title: 'Arraigo aquí',
				text: 'Crió a su familia en Cache Valley. El norte de Utah no es un trampolín: es hogar.'
			},
			{
				title: 'Gobierno responsable',
				text: 'El cargo público debe servir primero a la gente: reglas claras, respuestas honestas y representantes que se ganen su confianza.'
			},
			{
				title: 'Enfoque práctico',
				text: 'Vivienda asequible, acceso a la salud que funcione en comunidades rurales y una economía que recompense el trabajo.'
			}
		],
		whyTitle: 'Por qué se postula',
		whyProse:
			'Las familias del norte de Utah merecen un representante que escuche antes de hablar, responda preguntas difíciles y vote pensando en el distrito. Peter se postula para llevar ese estándar al Congreso: no consignas de partido, sino trabajo que ayude a vecinos y comunidades a prosperar.',
		whyLink: 'Lea sus posiciones sobre los temas →',
		prioritiesTitle: 'Prioridades',
		prioritiesIntro: 'Temas concretos que afectan a familias y comunidades en el distrito.',
		priorities: [
			{ label: 'Comunidades más fuertes' },
			{ label: 'Costo de vida asequible' },
			{ label: 'Salarios acordes con los costos' },
			{ label: 'Reglas justas para todos' },
			{ label: 'Vecindarios seguros' },
			{ label: 'Proteger lo que amamos' }
		],
		communityAria: 'Peter Crosby con su familia',
		communityAlt: 'Peter Crosby con su familia en el norte de Utah',
		communityQuote: 'Familia, servicio y comunidad: valores que dan forma a esta campaña.',
		involveTitle: 'Participar',
		involveIntro: 'Toda campaña la ganan quienes ayudan. Elija cómo participar.',
		involveDonate: 'Donar',
		involveDonateDesc: 'Apoye alcance electoral y eventos.',
		involveVolunteer: 'Ser voluntario',
		involveVolunteerDesc: 'Puerta a puerta, llamadas y eventos comunitarios.',
		involveEvents: 'Eventos',
		involveEventsDesc: 'Cabildos y encuentros cerca de usted.',
		involveContact: 'Contacto',
		involveContactDesc: 'Preguntas o ideas para la campaña.',
		followCampaign: 'Siga la campaña',
		socialAria: 'Enlaces a redes sociales'
	},
	...pagesEs
};

export const dictionaries: Record<Locale, Messages> = { en, es };
