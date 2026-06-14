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
	endorsements: {
		eyebrow: 'Endorsed By'
	},
	home: {
		metaDescription:
			'Peter Crosby for U.S. Congress, Utah District 2. Integrity, practical solutions, and a representative who puts Northern Utah first.',
		heroKicker: 'U.S. Congress · Utah District 2',
		heroTitle: 'A voice for Northern Utah',
		heroLead: [
			'I’m running to put Northern Utah first, not Washington politics. I believe you deserve a representative who answers directly to you, not to a political party.',
			'Northern Utah is my home; it’s where I was raised, and where we’re raising our family. I’m focused on exactly what matters to our neighborhoods: lowering the cost of living, protecting our local jobs, and bringing honest stewardship back to Congress.'
		],
		donate: 'Donate',
		prioritiesEyebrow: 'Priorities',
		prioritiesTitle: 'Five priorities. No fine print.',
		prioritiesLede:
			'Northern Utah families deserve a representative who listens before speaking, answers tough questions, and votes with the district in mind. Here is where Peter stands.',
		priorities: [
			{
				title: 'Housing people can afford',
				summary: 'Young families and seniors are getting priced out of the towns they built.',
				points: [
					'Cut the red tape that blocks starter homes and townhomes near where people already work.',
					'Protect seniors and longtime renters from the worst of the rent spikes.',
					'Keep growth in step with water, roads, and schools—not ahead of them.'
				]
			},
			{
				title: 'Costs that match wages',
				summary: 'Groceries, gas, and insurance climbed faster than paychecks. The job is to close that gap.',
				points: [
					'Lower the everyday costs—energy, prescriptions, and child care—that hit family budgets first.',
					'Back the small businesses and trades that keep good-paying jobs local.',
					'Hold the line on the spending that fuels inflation.'
				]
			},
			{
				title: 'Healthcare that works rurally',
				summary: 'A clinic an hour away isn’t access. Rural Utah deserves care that’s actually within reach.',
				points: [
					'Keep rural hospitals and clinics open and staffed.',
					'Expand telehealth and mental-health care for small towns.',
					'Bring down the price of prescriptions for seniors.'
				]
			},
			{
				title: 'Honest, accountable government',
				summary: 'Public office is a public trust—clear answers, open books, and showing up.',
				points: [
					'Hold regular town halls and answer tough questions in person.',
					'Put spending and votes on the record where anyone can read them.',
					'Refuse the gridlock games—work with anyone who’ll deliver for the district.'
				]
			},
			{
				title: 'Protecting Northern Utah',
				summary: 'The Great Salt Lake, our air, and safe neighborhoods are worth protecting for the next generation.',
				points: [
					'Take the shrinking Great Salt Lake seriously before it’s a crisis.',
					'Defend the clean air and public lands that define life here.',
					'Back the officers, firefighters, and neighbors who keep communities safe.'
				]
			}
		],
		prioritiesLink: 'Read where he stands on the issues →',
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
	endorsements: {
		eyebrow: 'Respaldado por'
	},
	home: {
		metaDescription:
			'Peter Crosby para el Congreso de EE. UU., Distrito 2 de Utah. Integridad, soluciones prácticas y un representante que pone primero al norte de Utah.',
		heroKicker: 'Congreso de EE. UU. · Distrito 2 de Utah',
		heroTitle: 'Una voz para el norte de Utah',
		heroLead: [
			'Me postulo para poner al norte de Utah primero, no a la política de Washington. Creo que usted merece un representante que le responda directamente a usted, no a un partido político.',
			'El norte de Utah es mi hogar; aquí me crié y aquí estamos criando a nuestra familia. Me concentro exactamente en lo que les importa a nuestros vecindarios: bajar el costo de vida, proteger nuestros empleos locales y devolver al Congreso una administración honesta.'
		],
		donate: 'Donar',
		prioritiesEyebrow: 'Prioridades',
		prioritiesTitle: 'Cinco prioridades. Sin letra pequeña.',
		prioritiesLede:
			'Las familias del norte de Utah merecen un representante que escuche antes de hablar, responda preguntas difíciles y vote pensando en el distrito. Aquí está la postura de Peter.',
		priorities: [
			{
				title: 'Vivienda al alcance',
				summary: 'Las familias jóvenes y los mayores están siendo expulsados de los pueblos que construyeron.',
				points: [
					'Eliminar la burocracia que frena las casas y townhomes accesibles cerca de donde la gente ya trabaja.',
					'Proteger a los mayores e inquilinos de siempre de las peores subidas de alquiler.',
					'Mantener el crecimiento a la par del agua, las carreteras y las escuelas, no por delante.'
				]
			},
			{
				title: 'Costos acordes a los sueldos',
				summary: 'La comida, la gasolina y los seguros subieron más rápido que los sueldos. La tarea es cerrar esa brecha.',
				points: [
					'Bajar los costos diarios —energía, medicamentos y cuidado infantil— que golpean primero al presupuesto familiar.',
					'Apoyar a los pequeños negocios y oficios que mantienen empleos bien pagados aquí.',
					'Frenar el gasto que alimenta la inflación.'
				]
			},
			{
				title: 'Salud que funciona en zonas rurales',
				summary: 'Una clínica a una hora no es acceso. La zona rural de Utah merece atención que esté de verdad a su alcance.',
				points: [
					'Mantener abiertos y con personal los hospitales y clínicas rurales.',
					'Ampliar la telesalud y la atención de salud mental para los pueblos pequeños.',
					'Reducir el precio de los medicamentos para los mayores.'
				]
			},
			{
				title: 'Gobierno honesto y responsable',
				summary: 'El cargo público es una confianza pública: respuestas claras, cuentas abiertas y dar la cara.',
				points: [
					'Hacer asambleas comunitarias y responder las preguntas difíciles en persona.',
					'Poner los gastos y votos en el registro donde cualquiera pueda leerlos.',
					'Rechazar los juegos de bloqueo: trabajar con quien sea que cumpla por el distrito.'
				]
			},
			{
				title: 'Proteger el norte de Utah',
				summary: 'El Gran Lago Salado, nuestro aire y los barrios seguros valen la pena protegerlos para la próxima generación.',
				points: [
					'Tomar en serio la reducción del Gran Lago Salado antes de que sea una crisis.',
					'Defender el aire limpio y las tierras públicas que definen la vida aquí.',
					'Apoyar a los oficiales, bomberos y vecinos que mantienen seguras a las comunidades.'
				]
			}
		],
		prioritiesLink: 'Lea su postura sobre los temas →',
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
