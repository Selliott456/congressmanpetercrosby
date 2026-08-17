import { pagesEn } from './pages-en';
import { pagesEs } from './pages-es';

export type Locale = 'en' | 'es';

export type Messages = typeof en;

const en = {
	nav: {
		donate: 'DONATE',
		volunteer: 'Volunteer',
		home: 'HOME',
		about: 'ABOUT',
		contact: 'CONTACT',
		events: 'EVENTS',
		media: 'MEDIA',
		policies: 'POLICIES',
		endorsements: 'ENDORSEMENTS',
		ariaHome: 'Congressman Peter Crosby - Home',
		menuToggle: 'Toggle menu'
	},
	footer: {
		contactUs: 'Contact Us',
		endorsements: 'Endorsements',
		navAria: 'Footer links',
		socialAria: 'Social media links',
		rights: 'Peter Crosby for Congress. All rights reserved.',
		paidForBy: 'Paid for by Peter Crosby for Congress',
		newsletter: {
			title: 'Get Campaign Updates',
			blurb: 'News, events, and ways to help — straight to your inbox.',
			firstName: 'First name',
			lastName: 'Last name',
			emailLabel: 'Email address',
			emailPlaceholder: 'you@example.com',
			submit: 'Sign up',
			sending: 'Signing up…',
			successTitle: 'You’re subscribed!',
			successBody: 'Thanks for joining — we’ll keep you posted.',
			error: 'Something went wrong. Please try again.',
			privacy: 'We’ll never share your email.'
		}
	},
	yardSign: {
		footerHeading: 'Put Up a Yard Sign',
		requestButton: 'Request a Yard Sign',
		sponsorLink: 'Sponsor a yard sign',
		eyebrow: 'Yard signs',
		title: 'Request a Yard Sign',
		blurb: 'Show your support for the campaign — we’ll get a sign to you and help put it up.',
		firstName: 'First name',
		lastName: 'Last name',
		quantity: 'How many signs?',
		email: 'Email',
		phone: 'Phone',
		streetAddress: 'Street address',
		city: 'City',
		instructions: 'Placement instructions',
		instructionsHint: 'Where should the sign go? Any access notes or preferences.',
		donatePrompt: 'Yard signs cost about $10 to print, deliver, and place.',
		sponsorCta: 'Sponsor a yard sign →',
		requiredNote: 'All fields required except where noted.',
		submit: 'Send request',
		submitting: 'Sending…',
		close: 'Close',
		error: 'Something went wrong. Please try again.',
		successTitle: 'Request received!',
		successBody:
			'Thanks for showing your support. We’ll be in touch to coordinate delivery and placement.',
		successSponsorPrompt:
			'Want to help cover the cost? Each sign runs about $10 to produce and place.',
		done: 'Done'
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
		eyebrow: 'Endorsed By',
		viewAll: 'See all endorsements'
	},
	errorPage: {
		metaTitle: 'Error',
		homeCta: 'Back to home',
		eventsCta: 'Find an event',
		contactCta: 'Contact the campaign',
		helpLead: 'Where to next?',
		notFound: {
			eyebrow: 'Page not found',
			title: 'We can’t find that page',
			lede: 'The page you’re looking for may have moved, or the link might be out of date. Let’s get you back on track.'
		},
		serverError: {
			eyebrow: 'Server error',
			title: 'Something went wrong on our end',
			lede: 'This one’s on us, not you. Please try again in a moment, or head back to a page that’s working.'
		},
		generic: {
			eyebrow: 'Something went wrong',
			title: 'That didn’t work',
			lede: 'An unexpected error came up. Please try again, or use one of the links below.'
		}
	},
	home: {
		metaDescription:
			'Peter Crosby for U.S. Congress, Utah District 2. Integrity, practical solutions, and a representative who puts Northern Utah first.',
		heroKicker: 'U.S. Congress · Utah District 2',
		heroTitle: 'The Voice for Northern Utah',
		heroLead: [
			'Northern Utah is home. It’s where Amanda and I have put down roots and have raised our family for almost 20 years now.',
			'I’m running because our community needs a leader that will voice our concerns, resolve our issues, and hold to our values whatever comes. I am determined to be that kind of leader, and to earn your trust by proving that throughout the entire campaign.',
			'I want to hear from you. I’m holding town halls every month. Come talk to me at the next one near you.'
		],
		heroEventsLink: 'Find your next town hall →',
		donate: 'Donate',
		prioritiesEyebrow: 'Priorities',
		prioritiesTitle: 'Five Priorities. No Fine Print.',
		prioritiesLede:
			'Northern Utah families deserve a representative who listens before speaking, answers tough questions, and votes with the district in mind. Here is where Peter stands.',
		priorities: [
			{
				title: 'Housing People Can Afford',
				summary: 'Young families and seniors are getting priced out of the towns they built.',
				points: [
					'Cut the red tape that blocks starter homes and townhomes near where people already work.',
					'Protect seniors and longtime renters from the worst of the rent spikes.',
					'Keep growth in step with water, roads, and schools—not ahead of them.'
				]
			},
			{
				title: 'Costs That Match Wages',
				summary: 'Groceries, gas, and insurance climbed faster than paychecks. The job is to close that gap.',
				points: [
					'Lower the everyday costs—energy, prescriptions, and child care—that hit family budgets first.',
					'Back the small businesses and trades that keep good-paying jobs local.',
					'Hold the line on the spending that fuels inflation.'
				]
			},
			{
				title: 'Healthcare That Works Rurally',
				summary: 'A clinic an hour away isn’t access. Rural Utah deserves care that’s actually within reach.',
				points: [
					'Keep rural hospitals and clinics open and staffed.',
					'Expand telehealth and mental-health care for small towns.',
					'Bring down the price of prescriptions for seniors.'
				]
			},
			{
				title: 'Honest, Accountable Government',
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
		// Temporary home stand-in shown while the full "Priorities" section copy is
		// being finalized — a short summary of the Policies page. See PoliciesSummary.svelte.
		policiesSummaryEyebrow: 'Where Peter stands',
		policiesSummaryTitle: 'People-First Policy for Northern Utah',
		policiesSummaryLede:
			'Peter’s priorities come straight from the people he meets across Northern Utah. They come down to three things:',
		policiesSummaryAreas: [
			{
				title: 'Affordability',
				text: 'Confronting the housing crisis and the rising cost of living, including our healthcare costs, and standing up for the local jobs and small businesses that hold our towns together.'
			},
			{
				title: 'Accountability',
				text: 'Banning congressional stock trades, opening a real conversation on term limits, and getting corporate dark money out of our politics.'
			},
			{
				title: 'Stewardship',
				text: 'Protecting our public lands, restoring the Great Salt Lake, and standing up for communities against corporate developments like the Stratos data center project in Box Elder.'
			}
		],
		policiesSummaryLink: 'Read where Peter stands on the issues →',
		communityAria: 'Peter Crosby with family',
		communityAlt: 'Peter Crosby with his family in Northern Utah',
		communityQuote: 'Family, service, and community—values that shape this campaign.',
		involveTitle: 'Get Involved',
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
		volunteer: 'Voluntario',
		home: 'INICIO',
		about: 'ACERCA DE',
		contact: 'CONTACTO',
		events: 'EVENTOS',
		media: 'MEDIOS',
		policies: 'POLÍTICAS',
		endorsements: 'RESPALDOS',
		ariaHome: 'Peter Crosby para el Congreso - Inicio',
		menuToggle: 'Abrir menú'
	},
	footer: {
		contactUs: 'Contáctenos',
		endorsements: 'Respaldos',
		navAria: 'Enlaces del pie de página',
		socialAria: 'Enlaces a redes sociales',
		rights: 'Peter Crosby para el Congreso. Todos los derechos reservados.',
		paidForBy: 'Paid for by Peter Crosby for Congress',
		newsletter: {
			title: 'Reciba novedades de la campaña',
			blurb: 'Noticias, eventos y formas de ayudar, directo a su correo.',
			firstName: 'Nombre',
			lastName: 'Apellido',
			emailLabel: 'Correo electrónico',
			emailPlaceholder: 'usted@ejemplo.com',
			submit: 'Suscribirse',
			sending: 'Enviando…',
			successTitle: '¡Está suscrito!',
			successBody: 'Gracias por unirse: le mantendremos informado.',
			error: 'Algo salió mal. Inténtelo de nuevo.',
			privacy: 'Nunca compartiremos su correo.'
		}
	},
	yardSign: {
		footerHeading: 'Ponga un letrero de jardín',
		requestButton: 'Solicitar un letrero',
		sponsorLink: 'Patrocinar un letrero',
		eyebrow: 'Letreros de jardín',
		title: 'Solicitar un letrero de jardín',
		blurb: 'Muestre su apoyo a la campaña: le llevaremos un letrero y le ayudaremos a colocarlo.',
		firstName: 'Nombre',
		lastName: 'Apellido',
		quantity: '¿Cuántos letreros?',
		email: 'Correo electrónico',
		phone: 'Teléfono',
		streetAddress: 'Dirección',
		city: 'Ciudad',
		instructions: 'Instrucciones de colocación',
		instructionsHint: '¿Dónde debe ir el letrero? Notas de acceso o preferencias.',
		donatePrompt: 'Los letreros cuestan alrededor de $10 para imprimir, entregar y colocar.',
		sponsorCta: 'Patrocinar un letrero →',
		requiredNote: 'Todos los campos son obligatorios salvo donde se indique.',
		submit: 'Enviar solicitud',
		submitting: 'Enviando…',
		close: 'Cerrar',
		error: 'Algo salió mal. Inténtelo de nuevo.',
		successTitle: '¡Solicitud recibida!',
		successBody:
			'Gracias por mostrar su apoyo. Nos pondremos en contacto para coordinar la entrega y la colocación.',
		successSponsorPrompt:
			'¿Quiere ayudar a cubrir el costo? Cada letrero cuesta alrededor de $10 para producir y colocar.',
		done: 'Listo'
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
		eyebrow: 'Respaldado por',
		viewAll: 'Ver todos los respaldos'
	},
	errorPage: {
		metaTitle: 'Error',
		homeCta: 'Volver al inicio',
		eventsCta: 'Buscar un evento',
		contactCta: 'Contactar la campaña',
		helpLead: '¿A dónde ahora?',
		notFound: {
			eyebrow: 'Página no encontrada',
			title: 'No encontramos esa página',
			lede: 'La página que busca pudo haberse movido o el enlace ya no está vigente. Le ayudamos a retomar el camino.'
		},
		serverError: {
			eyebrow: 'Error del servidor',
			title: 'Algo salió mal de nuestro lado',
			lede: 'Esto es cosa nuestra, no suya. Inténtelo de nuevo en un momento o vuelva a una página que funcione.'
		},
		generic: {
			eyebrow: 'Algo salió mal',
			title: 'Eso no funcionó',
			lede: 'Ocurrió un error inesperado. Inténtelo de nuevo o use uno de los enlaces de abajo.'
		}
	},
	home: {
		metaDescription:
			'Peter Crosby para el Congreso de EE. UU., Distrito 2 de Utah. Integridad, soluciones prácticas y un representante que pone primero al norte de Utah.',
		heroKicker: 'Congreso de EE. UU. · Distrito 2 de Utah',
		heroTitle: 'La voz del norte de Utah',
		heroLead: [
			'El norte de Utah es nuestro hogar. Aquí Amanda y yo hemos echado raíces y hemos criado a nuestra familia durante casi 20 años.',
			'Me postulo porque nuestra comunidad necesita un líder que exprese nuestras preocupaciones, resuelva nuestros problemas y se mantenga fiel a nuestros valores pase lo que pase. Estoy decidido a ser esa clase de líder y a ganarme su confianza demostrándolo durante toda la campaña.',
			'Quiero saber de usted. Realizo cabildos cada mes. Venga a hablar conmigo en el próximo que haya cerca de usted.'
		],
		heroEventsLink: 'Encuentre su próximo cabildo →',
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
		// Stand-in temporal de la página de inicio mientras se finaliza el texto de
		// la sección "Prioridades" — un resumen de la página de Políticas.
		policiesSummaryEyebrow: 'La postura de Peter',
		policiesSummaryTitle: 'Políticas que ponen a la gente primero',
		policiesSummaryLede:
			'Las prioridades de Peter vienen directamente de la gente que conoce en todo el norte de Utah. Se resumen en tres áreas:',
		policiesSummaryAreas: [
			{
				title: 'Asequibilidad',
				text: 'Enfrentar la crisis de vivienda y el aumento del costo de vida, incluidos los costos de atención médica, y defender los empleos locales y las pequeñas empresas que sostienen a nuestros pueblos.'
			},
			{
				title: 'Rendición de cuentas',
				text: 'Prohibir que los miembros del Congreso negocien acciones, abrir una conversación seria sobre los límites de mandato y sacar el dinero corporativo de nuestra política.'
			},
			{
				title: 'Cuidado ambiental',
				text: 'Proteger nuestras tierras públicas, restaurar el Gran Lago Salado y defender a las comunidades frente a desarrollos corporativos como el proyecto de centro de datos Stratos en Box Elder.'
			}
		],
		policiesSummaryLink: 'Lea la postura de Peter sobre los temas →',
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
