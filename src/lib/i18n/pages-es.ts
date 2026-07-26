/** Spanish page copy (merged into dictionaries.es) — structure mirrors pages-en.ts */
export const pagesEs = {
	common: {
		donate: 'Donar',
		viewEvent: 'Ver evento →',
		googleCalendar: 'Google Calendar',
		ics: 'ICS',
		optional: 'opcional'
	},
	about: {
		metaTitle: 'Acerca de Peter Crosby — Peter Crosby para el Congreso',
		metaDescription:
			'Conozca a Peter Crosby: esposo, padre, líder con experiencia y candidato impulsado por el servicio al norte de Utah.',
		heroAlt: 'Peter Crosby con su esposa Amanda y sus tres hijas',
		eyebrow: 'Conozca a Peter',
		introTitle: 'Centrado en la familia, enfocado en la comunidad',
		introLede: [
			'El norte de Utah es mi hogar, mi vecindario y mi comunidad. Me postulo al Congreso porque nuestros vecindarios merecen un liderazgo firme y de sentido común, enfocado en las verdaderas respuestas a los problemas que más nos golpean.',
			'Desde bajar el creciente costo de vida hasta proteger los empleos locales que sostienen a nuestras comunidades, mi compromiso es ofrecer una administración honesta y verdadera responsabilidad.'
		],
		sections: [
			{
				title: 'Una historia familiar de servicio público, un deber de servir',
				parts: [
					{
						type: 'p' as const,
						text: 'Mis padres estuvieron en las fuerzas armadas, al igual que mis dos abuelos y mis dos hermanos. El padre de mi esposa, sus hermanos y abuelos también sirvieron. Soy Eagle Scout y fui cadete del ROTC, dos experiencias fundamentales en mi vida. El servicio lo llevamos incorporado, y mi esposa y yo hemos intentado inculcar esos valores a nuestras hijas.'
					},
					{
						type: 'p' as const,
						text: 'Tras una lesión durante mi tiempo en el ROTC, supe que debía elegir un camino distinto para servir. Postularme al Congreso es parte de ese servicio para mí.'
					},
					{
						type: 'p' as const,
						text: 'Salvaguardar los derechos y libertades de nuestro país exige el sacrificio de todos nosotros. El juramento que hice como Eagle Scout hace casi veinticinco años de mejorar la sociedad sigue siendo central en mi vida hoy. Los funcionarios públicos, como nuestros representantes en el Congreso, están para servir a sus vecinos. Como su representante electo en el Congreso, pondré a la comunidad y al país antes que a mí mismo en cada momento de cada día.'
					}
				]
			},
			{
				title: 'Esposo y padre arraigado en Cache Valley desde hace 19 años',
				parts: [
					{
						type: 'p' as const,
						text: 'Mi esposa, Amanda, y yo estamos criando a nuestras tres hermosas hijas en Cache Valley. Son tres jóvenes amables, apasionadas, brillantes y extraordinarias.'
					},
					{
						type: 'p' as const,
						text: 'Les enseñamos a ser honestas, a tener integridad, a amar a su prójimo y a trabajar duro.'
					},
					{
						type: 'p' as const,
						text: 'Me postulo para asegurar que ellas, y todos los demás, tengan las oportunidades que nos prometieron. Acompáñenme para hacerlo posible.'
					}
				]
			},
			{
				title: 'Una carrera profesional basada en el liderazgo y la confianza',
				parts: [
					{
						type: 'p' as const,
						text: 'Soy un graduado universitario de primera generación que ha pasado su carrera equilibrando la vida familiar con más de un empleo de tiempo completo para llegar a fin de mes. Mi carrera profesional me ha llevado de puestos de liderazgo en una empresa Fortune 500 a una cátedra en Utah State University.'
					},
					{
						type: 'ul' as const,
						items: [
							'Completé mis estudios de licenciatura en [año] en [escuela]',
							'Comencé como miembro del personal de base trabajando en operaciones',
							'Ascendí a un rol de supervisión en menos de un año mientras estudiaba a tiempo completo',
							'Obtuve una maestría en XX en [año]',
							'Dirigí un equipo de cientos de empleados dedicados a [breve descripción del trabajo]',
							'Pasé a la educación superior con un puesto en investigación institucional y docencia en Utah State University, donde enseñé Política Estadounidense a estudiantes de pregrado',
							'Actualmente soy profesor adjunto en el Center for Anticipatory Intelligence de USU, donde imparto un curso de posgrado sobre tecnología emergente mientras desempeño un rol de tiempo completo como director, gestor de proyectos y consultor en el sector privado'
						]
					},
					{
						type: 'p' as const,
						text: 'Con mi experiencia en los sectores privado y público, trabajo con rectores, provosts, profesorado y personal de apoyo para ayudarles a navegar un futuro cada vez más impredecible.'
					},
					{
						type: 'p' as const,
						text: 'Trabajar con estudiantes como mentor, instructor y futuro colega es mi experiencia profesional más gratificante.'
					},
					{
						type: 'p' as const,
						text: 'Mi trayectoria me ha enseñado la fuerza del pensamiento flexible, la construcción de relaciones y las habilidades organizativas.'
					}
				]
			}
		]
	},
	contact: {
		metaTitle: 'Contáctenos — Peter Crosby para el Congreso',
		metaDescription:
			'Sea voluntario, envíe una solicitud de prensa o comuníquese con la campaña Peter Crosby para el Congreso con una pregunta general.',
		pageTitle: 'Contáctenos',
		intro:
			'¿Escribe desde la prensa o solo tiene una pregunta? Elija un tema y envíenos un mensaje—la campaña le responderá.',
		emailLabel: 'Correo',
		phoneLabel: 'Teléfono',
		volunteerPrompt: '¿Quiere colaborar con la campaña?',
		volunteerCta: 'Sea voluntario',
		topicLegend: '¿En qué podemos ayudarle?',
		topicMedia: 'Solicitud de prensa',
		topicGeneral: 'Información general',
		blurbMedia: 'Consultas de prensa, entrevistas y medios.',
		blurbGeneral: 'Preguntas, ideas o cualquier otra cosa.',
		firstName: 'Nombre',
		lastName: 'Apellido',
		phone: 'Teléfono',
		email: 'Correo electrónico',
		mediaOutlet: 'Medio / Publicación',
		message: 'Mensaje',
		requiredNote: 'Todos los campos son obligatorios salvo donde se indique.',
		send: 'Enviar mensaje',
		sending: 'Enviando…',
		errorMessage: 'Algo salió mal. Inténtelo de nuevo o escríbanos directamente.',
		successTitle: '¡Gracias!',
		successBody: 'Su mensaje está en camino—nos pondremos en contacto pronto.',
		sendAnother: 'Enviar otro mensaje'
	},
	volunteer: {
		metaTitle: 'Ser voluntario — Peter Crosby para el Congreso',
		metaDescription:
			'Inscríbase como voluntario en la campaña Peter Crosby para el Congreso. El norte de Utah merece algo mejor.',
		pageTitle: 'Sea voluntario',
		intro:
			'El norte de Utah merece algo mejor. Díganos cómo quiere ayudar—inscríbase abajo o escríbanos con sus preguntas.',
		donate: 'Donar',
		donatePrompt: '¿Prefiere aportar?',
		emailLabel: 'Correo',
		phoneLabel: 'Teléfono',
		firstName: 'Nombre',
		lastName: 'Apellido',
		phone: 'Teléfono',
		email: 'Correo electrónico',
		city: 'Ciudad',
		county: 'Condado',
		houseDistrict: 'Distrito de la Cámara',
		houseDistrictHint: '¿No sabe cuál le corresponde? Puede dejarlo en blanco.',
		source: '¿Qué le motivó a ser voluntario?',
		sourceHint:
			'Por ejemplo: un cabildo, las redes sociales, una conversación con un voluntario o un evento comunitario.',
		skills: 'Habilidades o recursos que puede ofrecer',
		skillsHint: 'Describa cualquier habilidad o recurso que le gustaría ofrecer como voluntario.',
		requiredNote: 'Todos los campos son obligatorios salvo donde se indique.',
		send: 'Inscribirme',
		sending: 'Enviando…',
		errorMessage: 'Algo salió mal. Inténtelo de nuevo o escríbanos directamente.',
		successTitle: '¡Gracias!',
		successBody:
			'Gracias por sumarse—alguien de la campaña se pondrá en contacto sobre los próximos pasos.',
		sendAnother: 'Enviar otra respuesta'
	},
	pastInterviews: {
		metaTitle: 'Entrevistas anteriores — Peter Crosby para el Congreso',
		metaDescription:
			'Entrevistas y cabildos anteriores con Peter Crosby en Our Vote Counts, Hal Stewart y más.',
		pageTitle: 'Entrevistas anteriores',
		intro: 'Entrevistas virtuales y cabildos de la campaña.',
		ariaYoutube: 'YouTube',
		ariaWebsite: 'Sitio web',
		items: [
			{
				id: 'pi-1',
				month: 'Dic',
				day: '16',
				year: 2024,
				title: 'Entrevista - Our Vote Counts',
				time: '3:30 PM – 4:30 PM',
				description:
					'Our Vote Counts y yo participamos en una entrevista virtual y cabildo donde hablamos de muchos temas que enfrentan nuestro distrito y el país. Puede ver la entrevista completa en YouTube.',
				viewEventUrl: 'https://www.youtube.com/watch?v=kHJBykNy9zg',
				platform: 'youtube' as const
			},
			{
				id: 'pi-2',
				month: 'Nov',
				day: '17',
				year: 2024,
				title: 'Entrevista - Hal Stewart',
				time: '3:30 PM – 4:30 PM',
				description:
					'Hal Stewart me entrevistó al inicio de mi campaña. Si quiere ver cómo empezamos, esta es la primera vez que di públicamente que quería ayudar al norte de Utah.',
				viewEventUrl: 'https://www.petercrosbyforcongress.org/events-2-1/e08a9jyyxhlt8r691kitsl9ic1m3yg',
				platform: 'website' as const
			}
		]
	},
	events: {
		metaTitle: 'Eventos — Peter Crosby para el Congreso',
		metaDescription:
			'Próximos cabildos, encuentros con el candidato y conversaciones en vivo con Peter Crosby en el norte de Utah.',
		ui: {
			eyebrow: 'Eventos',
			pageTitle: 'Dónde encontrar a Peter',
			intro: 'Cabildos, encuentros con el candidato y conversaciones en todo el norte de Utah.',
			calendarAria: 'Calendario',
			prevMonth: 'Mes anterior',
			nextMonth: 'Mes siguiente',
			dayWithEvent: 'Día con evento',
			nextEvent: 'Próximo evento',
			noUpcomingEvents:
				'No hay próximos eventos programados. Vuelva pronto o consulte los eventos anteriores abajo.',
			allEvents: 'Todos los eventos',
			pastEvent: 'Evento pasado',
			upcomingHeading: 'Próximos y recientes',
			pastHeading: 'Eventos anteriores',
			viewAllPast: 'Ver eventos anteriores',
			hidePast: 'Ocultar eventos anteriores',
			rsvp: 'Confirmar asistencia',
			rsvped: 'Confirmado',
			rsvpModalTitle: 'Confirmar asistencia',
			rsvpFirstName: 'Nombre',
			rsvpLastName: 'Apellido',
			rsvpEmail: 'Correo electrónico',
			rsvpSubmit: 'Enviar confirmación',
			rsvpSubmitting: 'Enviando…',
			rsvpSuccessTitle: '¡Está confirmado!',
			rsvpSuccessBody: 'Le enviamos una confirmación por correo — esperamos verle allí.',
			rsvpError: 'Algo salió mal. Inténtelo de nuevo.',
			rsvpClose: 'Cerrar',
			rsvpDone: 'Listo',
			addToCalendar: 'Agregar al calendario',
			calendarGoogle: 'Google',
			calendarApple: 'Apple / Outlook',
			filterLabel: 'Filtrar eventos por tipo',
			filterAll: 'Todos',
			filterTownHall: 'Cabildo',
			filterRally: 'Concentración',
			filterMeetGreet: 'Conocer al candidato',
			filterVolunteer: 'Capacitación de voluntarios',
			viewLabel: 'Vista',
			viewList: 'Vista de lista',
			viewGrid: 'Vista de cuadrícula'
		},
		monthNames: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		],
		dayNames: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
		monthAbbrev: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		byId: {
			'ev-001': {
				title: 'Dining Liberally Ogden',
				description: 'Confirme asistencia en la página de Facebook de Dining Liberally Ogden.'
			},
			'ev-002': {
				title: 'Capacitación de noche de caucus con el Women’s Caucus',
				description: 'Capacitación de noche de caucus con el Women’s Caucus.'
			},
			'ev-003': {
				title: 'Cabildo virtual',
				description: 'Hablaremos sobre el gerrymandering.'
			},
			'ev-004': {
				title: 'Conozca al candidato en Logan',
				description: 'Conozca al candidato en Logan. Solo con confirmación previa (RSVP).'
			},
			'ev-005': {
				title: 'Noche de caucus',
				description: 'Noche de caucus. ¡Regístrese con anticipación!'
			},
			'ev-006': {
				title: 'Capacitación de voluntarios',
				description: '¡Regístrese como voluntario y acompáñenos! Habrá refrigerios ligeros.'
			},
			'ev-007': {
				title: 'Casa abierta en Cache Valley',
				description: 'Casa abierta en Cache Valley. Solo con confirmación previa (RSVP).'
			},
			'ev-008': {
				title: 'Protesta No Kings en Logan, Utah',
				description: 'Protesta No Kings en Logan, Utah.'
			},
			'ev-009': {
				title: 'Protesta No Kings en Ogden, Utah',
				description: 'Protesta No Kings en Ogden, Utah.'
			},
			'ev-010': {
				title: 'Cabildo - Condado de Davis',
				description:
					'Estaremos en el condado de Davis para un cabildo. Venga con sus preguntas; esperamos verle.'
			},
			'ev-011': {
				title: 'Cabildo - Condado de Weber',
				description: 'Cabildo en el condado de Weber. Acompáñenos con sus preguntas.'
			},
			'ev-012': {
				title: 'Cabildo - Condado de Cache',
				description: 'Cabildo en el condado de Cache. ¡Acompáñenos!'
			},
			'ev-013': {
				title: 'TikTok en vivo - Vivienda asequible con Farrah Pliley',
				description:
					'Conversación en vivo en TikTok con la agente Farrah Pliley sobre vivienda asequible. Únase: tiktok.com/@petercrosbyforcongress.'
			},
			'ev-014': {
				title: 'TikTok en vivo',
				description:
					'Chris de Coffee N Politics y Peter conversan sobre postularse al cargo en el norte de Utah. Únase en tiktok.com/@petercrosbyforcongress.'
			},
			'ev-015': {
				title: 'Cabildo - Box Elder',
				description:
					'Venga a conocer al candidato. Peter Crosby estará de 6:30 a 7:30 PM para responder preguntas y hablar de los retos y oportunidades del norte de Utah.'
			},
			'ev-016': {
				title: 'Cabildo - Cache Valley',
				description:
					'Peter estará en la biblioteca de Logan de 6:00 a 7:00 PM el martes 13 de enero. Acompáñenos en un diálogo tipo cabildo.'
			},
			'ev-017': {
				title: 'Our Vote Counts - Mesa redonda',
				description:
					'Our Vote Counts organiza una mes redonda virtual y me invitaron este domingo. Entre a conversar con candidatos de distintos espectros. tiktok.com/@our.vote.counts'
			},
			'ev-018': {
				title: 'Conozca al candidato - TikTok en vivo',
				description: 'Our Vote Counts transmite una entrevista en TikTok. ¡Acompáñenos!'
			},
			'ev-019': {
				title: 'Conozca al candidato',
				description:
					'Venga a conocer al candidato. Peter Crosby estará de 6:00 a 7:00 PM para responder preguntas y hablar del norte de Utah.'
			},
			'ev-020': {
				title: 'Conozca al candidato',
				description:
					'Venga a conocer al candidato. Peter Crosby estará de 6:00 a 7:00 PM para responder preguntas y hablar del norte de Utah.'
			},
			'ev-021': {
				title: 'Conozca al candidato',
				description:
					'Venga a conocer al candidato. Peter Crosby estará de 6:00 a 7:00 PM para responder preguntas y hablar del norte de Utah.'
			},
			'ev-022': {
				title: 'Caucus del condado de Weber',
				description: 'Caucus demócrata del condado de Weber en DaVinci Academy.'
			},
			'ev-023': {
				title: 'Cabildo - Condado de Weber',
				description:
					'Cabildo en el condado de Weber en la biblioteca principal de Ogden. Venga con sus preguntas.'
			},
			'ev-024': {
				title: 'Cabildo - Condado de Cache',
				description: 'Cabildo en el condado de Cache en la biblioteca de Logan.'
			},
			'ev-025': {
				title: 'Convención del condado de Davis',
				description: 'Convención demócrata del condado de Davis en Northridge High School.'
			},
			'ev-026': {
				title: 'Convención de Box Elder',
				description: 'Convención demócrata del condado de Box Elder en la extensión de la USU.'
			},
			'ev-027': {
				title: 'Cabildo - Condado de Davis',
				description: 'Cabildo en el condado de Davis en la biblioteca de Centerville.'
			},
			'ev-028': {
				title: 'Convención demócrata de Utah',
				description: 'Convención estatal del Partido Demócrata de Utah en Jordan High School.'
			},
			'ev-029': {
				title: 'Cabildo - Condado de Box Elder',
				description: 'Cabildo en el condado de Box Elder en la biblioteca de Brigham City.'
			},
			'ev-030': {
				title: 'Cabildo virtual',
				description: 'Cabildo virtual en Facebook. Únase en línea.'
			},
			'ev-031': {
				title: 'Capacitación con Lindsie',
				description: 'Capacitación de campaña en la oficina de campaña del condado de Davis.'
			},
			'ev-032': {
				title: 'Cabildo virtual',
				description: 'Acompáñenos en línea para un cabildo virtual en Facebook.'
			},
			'ev-033': {
				title: 'Gira de participación cívica de Women’s Work Utah',
				description:
					'Gira de participación cívica de Women’s Work Utah en el centro comunitario de Farmington.'
			},
			'ev-034': {
				title: 'Protesta contra los centros de datos en el Capitolio',
				description: 'Protesta contra los centros de datos en el Capitolio del Estado de Utah.'
			},
			'ev-035': {
				title: 'Cabildo en Logan',
				description: 'Cabildo en Logan. Venga con sus preguntas.'
			},
			'ev-036': {
				title: 'Capacitación de voluntarios',
				description: 'Capacitación de voluntarios en la biblioteca de Ogden.'
			},
			'ev-037': {
				title: 'Cabildo',
				description: 'Cabildo en la biblioteca de Ogden. Venga con sus preguntas.'
			},
			'ev-038': {
				title: 'Hora feliz de los demócratas de Davis',
				description: 'Hora feliz de los demócratas de Davis en Roosters, en Layton.'
			},
			'ev-039': {
				title: 'Protesta contra los centros de datos',
				description:
					'Protesta contra los centros de datos en el histórico Palacio de Justicia del Condado de Cache.'
			},
			'ev-040': {
				title: 'Comida compartida en el parque con Davis Indivisible',
				description: 'Comida compartida en el parque con Davis Indivisible.'
			},
			'ev-041': {
				title: 'Cena de Premios Taylor & Mayne 2026',
				description: 'Cena de Premios Taylor & Mayne 2026 en el Hogle Zoo de Utah.'
			},
			'ev-042': {
				title: 'Cabildo virtual por Facebook Live',
				description: 'Un cabildo virtual con Peter. ¡Únase desde donde se encuentre!'
			},
			'ev-043': {
				title: 'Día de agradecimiento a voluntarios, condado de Cache',
				description:
					'Acompáñenos a desayunar panqueques en el parque. Traiga a sus amistades para dar las gracias juntos.'
			},
			'ev-044': {
				title: 'Día de agradecimiento a voluntarios, condado de Box Elder',
				description:
					'Día de campo con Peter en el parque. Acompáñenos a un almuerzo ligero. Traiga a sus amistades para dar las gracias juntos.'
			},
			'ev-045': {
				title: 'Día de agradecimiento a voluntarios, condado de Weber',
				description:
					'Tome una limonada rosa con Peter. Acompáñenos por una refrescante limonada rosa. Traiga a sus amistades para dar las gracias juntos.'
			},
			'ev-046': {
				title: 'Día de agradecimiento a voluntarios, condado de Davis',
				description:
					'Tome un helado con Peter. Acompáñenos por un helado. Traiga a una amistad para dar las gracias juntos.'
			},
			'ev-047': {
				title: 'Cabildo – Condado de Davis',
				description: 'Un cabildo con Peter en el condado de Davis. Traiga sus preguntas para Peter.'
			},
			'ev-048': {
				title: 'Cabildo – Condado de Cache',
				description: 'Un cabildo con Peter en el condado de Cache. Traiga sus preguntas para Peter.'
			},
			'ev-049': {
				title: 'Cabildo – Condado de Box Elder',
				description:
					'Un cabildo con Peter en el condado de Box Elder. Traiga sus preguntas para Peter.'
			},
			'ev-050': {
				title: 'Encuentro comunitario – Fruit Heights',
				description: 'Un encuentro comunitario en el condado de Davis.'
			},
			// --- Airtable-sourced events (see events.ts cutover comment) ---
			'gcal-0li2l67k3ev3q901c0bi42e910': {
				title: 'Desfile de Farmington',
				description: 'Peter marcha en el desfile de Farmington: ¡venga a apoyarlo!'
			},
			'gcal-13s98ltndqvkr7oup54ioa2br1': {
				title: 'Cabildo – Syracuse',
				description:
					'Acompañe a Peter en un cabildo en la Biblioteca Syracuse Northwest (Auditorio). Traiga sus preguntas.'
			},
			'gcal-7e44f0prdbo121ef5rpbp86jkc': {
				title: 'Picnic y conozca al candidato',
				description:
					'Los candidatos hablarán brevemente sobre su plataforma y visión, con tiempo para conversar de manera informal en el picnic. Acompáñenos.'
			},
			'gcal-530mdgg04cccb639la66879mcv': {
				title: 'Encuentro y saludo – Distrito 16',
				description:
					'Un encuentro comunitario organizado en el Distrito 16 de la Cámara. Venga a saludar a Peter.'
			},
			'gcal-0mv0bt56bdktr7fmls85p8r0ct': {
				title: 'Cabildo – Condado de Weber',
				description:
					'Acompañe a Peter en un cabildo en la Biblioteca Principal del Condado de Weber en Ogden. Traiga sus preguntas.'
			},
			'gcal-59l0d4s00h5dsoh2s0u6vq5lti': {
				title: 'Cabildo Virtual',
				description: 'Un cabildo virtual, disponible por Facebook Live. Únase desde donde esté.'
			},
			'gcal-7ceivt1nb9c7pjadi6hi6lnilr': {
				title: 'Cabildo – Layton',
				description:
					'Acompañe a Peter en un cabildo en la Biblioteca del Condado de Davis, sucursal Layton. Traiga sus preguntas.'
			},
			'gcal-47u5fs1rk0o9sfon8aa7norfhf': {
				title: 'Cabildo – Ogden Valley',
				description:
					'Acompañe a Peter en un cabildo en la Biblioteca de Ogden Valley en Huntsville. Traiga sus preguntas.'
			},
			'gcal-201npt6bb9jps47jfnakkgrm45': {
				title: 'Cabildo – Logan',
				description: 'Acompañe a Peter en un cabildo en la Biblioteca de Logan. Traiga sus preguntas.'
			},
			'gcal-68f18cmu9rq4k46rf9l76uhg3k': {
				title: 'Peach Days – Brigham City',
				description:
					'Encuentre la mesa de la campaña en Peach Days en Brigham City, junto a los Demócratas de Box Elder.'
			},
			'gcal-2gu7l3fhoa442gv2cqhokatk8b': {
				title: 'Festival Latino de Cache Valley',
				description: 'Peter acompaña a la comunidad en el Festival Latino de Cache Valley en Logan.'
			},
			'gcal-7shm3nltreu4lqee22fikpam9a': {
				title: 'Cabildo – Farmington',
				description:
					'Acompañe a Peter en un cabildo en la sede de la Biblioteca del Condado de Davis en Farmington. Traiga sus preguntas.'
			},
			'gcal-5lbomb5vtb90oakphdsnipakjc': {
				title: 'Festival del Orgullo de Logan',
				description: 'Peter acompaña a la comunidad en el Festival del Orgullo de Logan.'
			},
			'gcal-1o39srp3iqufuf9ab32du5o857': {
				title: 'Cabildo – Kaysville',
				description: 'Acompañe a Peter en un cabildo en la Biblioteca de Kaysville. Traiga sus preguntas.'
			},
			'gcal-79j4830k0p9ft60in84lbmlmnp': {
				title: 'Día de las Elecciones',
				description: 'Día de las Elecciones. Haga oír su voz: ¡vote!'
			},
			'gcal-60o1pei574juj1o4iojdqv79gs': {
				title: 'Desfile del Día de los Pioneros de Mendon',
				description: 'Acompañe a la campaña en el desfile del Día de los Pioneros de Mendon. ¡Venga a saludar!'
			},
			'gcal-09c2nr2mevnggmhpm7jfhmlmrr': {
				title: 'BBQ de verano – Progresistas del Condado de Weber',
				description: 'Un BBQ de verano con los Progresistas del Condado de Weber. ¡Venga a acompañarnos!'
			},
			'gcal-0l1pirh13fru5bvv2d0h23l8i1': {
				title: 'Picnic y conozca a los candidatos',
				description: 'Un picnic comunitario en Cache Valley donde los candidatos comparten su plataforma, con tiempo para conversar de manera informal. Acompáñenos.'
			},
			'gcal-6p3v4uskd4ilpj9ovv98lhou1d': {
				title: 'Antelope by Moonlight',
				description: 'Encuentre la mesa de los Demócratas del Condado de Davis en el paseo en bici Antelope by Moonlight. Pase a saludar.'
			},
			'gcal-70jsbm08a16c81dfr728unibtd': {
				title: 'Desfile de South Weber',
				description: '¡Acompañe a Peter y a otros candidatos locales en el desfile de South Weber!'
			},
			'gcal-7cu0c2of8h8mspcclqoso7639v': {
				title: 'Cabildo – Condado de Box Elder',
				description: 'Acompañe a Peter en el cabildo de agosto del Condado de Box Elder. Traiga sus preguntas y comparta sus inquietudes.'
			},
			'gcal-2bifckul2aicbv336070qn2vu9': {
				title: 'Cabildo – Biblioteca de Roy',
				description: 'Acompañe a Peter en el cabildo de agosto del Condado de Weber en la Biblioteca de Roy. Traiga sus preguntas.'
			},
			'gcal-25krankb031055jebtbo0jlfr5': {
				title: 'Desfile de Sauerkraut Days de Providence',
				description: '¡Acompañe a Peter y a su familia en el desfile de Sauerkraut Days de Providence!'
			},
			'gcal-3n2u5jsopk7sg1bik5kqdl9s1c': {
				title: 'Sauerkraut Days de Providence – Mesa',
				description: 'Encuentre a Peter con una mesa en los Sauerkraut Days de Providence. Pase a saludar.'
			},
			'gcal-7msagpfs4i1t9ade3i45t827sk': {
				title: 'Foro Interreligioso de Cache Valley',
				description: 'Un foro comunitario con líderes religiosos de Cache Valley sobre inquietudes ambientales: una oportunidad para escuchar a los candidatos. Más detalles próximamente.'
			},
			'gcal-1hc49k8ubfppkvv24fss43ac4s': {
				title: 'Desfile de la Feria de Box Elder',
				description: 'Acompañe a la campaña en el desfile de la Feria del Condado de Box Elder en Tremonton.'
			},
			'gcal-66cgctmceb9nc7tdb5dnbktnuk': {
				title: 'Cabildo – Farmington',
				description: 'Acompañe a Peter en el cabildo de agosto del Condado de Davis en Farmington. Traiga sus preguntas.'
			},
			'gcal-7kiiqefgfp3kf04nd18kv3kc5f': {
				title: 'Día en el Quad de USU',
				description: 'Encuentre a la campaña en el Día en el Quad de USU. Pase a saludar.'
			},
			'gcal-3rd8rs5b9cqse606eo61afk87a': {
				title: 'Desfile de Tomato Days de Hooper',
				description: 'Acompañe a la campaña en el desfile de Tomato Days de Hooper.'
			},
			'gcal-2m5urne2vm828utdmkdqmjabn9': {
				title: 'Desfile de Peach Days – Brigham City',
				description: 'Acompañe a la campaña caminando con los Demócratas de Box Elder en el desfile de Peach Days (comienza a las 10 a. m.).'
			},
			'gcal-43u07b634idc57don9uv0318ee': {
				title: 'Cabildo – Biblioteca de Layton',
				description: 'Acompañe a Peter en el cabildo del Condado de Davis en la Biblioteca de Layton. Traiga sus preguntas.'
			},
			'gcal-54o9oq6tcn5833gq458mth9egk': {
				title: 'Desfile de Bienvenida de USU',
				description: 'Acompañe a la campaña en el desfile de bienvenida (Homecoming) de USU en el centro de Logan.'
			},
			'gcal-51p7cin4daaquor021iod945fb': {
				title: 'Ogden Pride',
				description: 'Encuentre a la campaña en el festival Ogden Pride.'
			},
			'gcal-584jnkgh3cdlkk3mn2pmfbh5kr': {
				title: 'Desfile Purple Paw (Bienvenida de WSU)',
				description: 'Acompañe a la campaña en el desfile Purple Paw que inicia la Bienvenida (Homecoming) de Weber State en el centro de Ogden.'
			},
			'gcal-0v2436r6dda91cpnk1t5a2b69a': {
				title: 'Debate del Distrito 2 del Congreso',
				description: 'El debate oficial del Distrito 2 del Congreso, organizado por la Comisión de Debates de Utah y transmitido por televisión local y YouTube en vivo.'
			}
		} as Record<string, { title: string; description: string }>
	},
	endorsementsPage: {
		metaTitle: 'Respaldos — Peter Crosby para el Congreso',
		metaDescription:
			'Líderes comunitarios, vecinos y voces locales que respaldan a Peter Crosby para el Congreso en el norte de Utah.',
		eyebrow: 'Respaldos',
		pageTitle: 'Quiénes apoyan a Peter',
		lede: 'Vecinos, líderes locales y organizaciones de todo el norte de Utah respaldan esta campaña.',
		peopleHeading: 'Personas',
		orgHeading: 'Caucus y organizaciones',
		byId: {
			'rosemary-lesser': { role: 'Médica, veterana - Distrito 10 de la Cámara de Utah' },
			'dakota-wurth': { role: 'Concejo Municipal de Clearfield, candidata al Senado estatal' },
			'john-arthur': { role: 'Distrito 41 de la Cámara de Utah' },
			'stephanie-pitcher': { role: 'Distrito 14 del Senado de Utah' },
			'abigail-treasure': { role: 'Candidata - Distrito 16 de la Cámara de Utah' },
			'caroline-gleich': { role: 'Candidata al Senado de EE. UU. - Utah' },
			'anna-graff': { role: 'Candidata - Distrito 12 de la Cámara de Utah' },
			'garret-rushforth': { role: 'Candidato - Distrito 7 del Senado de Utah' },
			'kim-james': { role: 'Candidata - Distrito 8 de la Cámara de Utah' },
			'bianca-mittendorf': { role: 'Candidata - Distrito 7 de la Cámara de Utah' }
		} as Record<string, { role: string }>
	},
	media: {
		eyebrow: 'Medios',
		title: 'Lo más reciente de la campaña',
		viewAll: 'Ver todo',
		kindVideo: 'Video',
		kindArticle: 'Artículo',
		kindOpEd: 'Columna',
		closeVideo: 'Cerrar video',
		pinnedEyebrow: 'Destacados',
		pinnedTitle: 'Medios destacados',
		metaTitle: 'Medios — Peter Crosby para el Congreso',
		metaDescription:
			'Videos, columnas y entrevistas de la campaña Peter Crosby para el Congreso.',
		pageTitle: 'Todo el contenido',
		pageLede: 'Videos, columnas y entrevistas de toda la campaña.',
		byId: {
			'our-vote-counts-interview': {
				title: 'Entrevista — Our Vote Counts',
				description:
					'Me senté con Our Vote Counts para una entrevista virtual y un cabildo, donde hablamos de una amplia gama de temas que enfrentan nuestro distrito y la nación.'
			},
			'the-ties-that-bind': {
				title: 'Los lazos que nos unen',
				description:
					'Creo que hay lazos que nos unen como estadounidenses, verdades a las que nos aferramos con más fuerza que a nuestra cultura, nuestra geografía o nuestro idioma.'
			},
			'early-campaign-launch': {
				title: 'Peter Crosby lanza su campaña con anticipación'
			},
			'virtual-town-hall': {
				title: 'Cabildo virtual con Peter',
				description:
					'Conversación sobre los centros de datos, la influencia del dinero en nuestro sistema de gobierno actual, una breve mención de DOGE, USAID, la rendición de cuentas de las corporaciones, la IA, la participación en nuestro propio gobierno y la salud de las mujeres.'
			},
			'cache-valley-daily-spotlight': {
				title: 'Cache Valley Daily destaca la campaña',
				description:
					'El candidato demócrata al Congreso Peter Crosby organizará un foro en la Biblioteca de Logan.'
			},
			'cache-valley-daily-winnable': {
				title: 'Crosby ve la contienda como ganable',
				description:
					'Un perfil de Cache Valley Daily sobre por qué Peter Crosby considera ganable su desafío al representante Blake Moore, que lleva tres mandatos, y señala la caída de Moore en las primarias y la creciente competitividad del norte de Utah.'
			}
		} as Record<string, { title: string; description?: string }>
	},
	pressReleases: {
		kind: 'Comunicado',
		eyebrow: 'Sala de prensa',
		sectionTitle: 'Comunicados de prensa',
		sectionLede: 'Declaraciones y anuncios oficiales de la campaña.',
		homeTitle: 'Comunicados de prensa',
		readMore: 'Leer el comunicado',
		viewAll: 'Ver todos los comunicados',
		backToMedia: 'Volver a medios',
		forImmediateRelease: 'Para publicación inmediata',
		pressContact: 'Contacto de prensa',
		downloadOriginal: 'Descargar el comunicado',
		metaTitle: 'Comunicados de prensa — Peter Crosby para el Congreso',
		metaDescription:
			'Comunicados de prensa y anuncios oficiales de la campaña Peter Crosby para el Congreso.',
		byId: {
			'debate-rescheduled': {
				title:
					'La Comisión de Debates de Utah reprograma el debate del Distrito 2 del Congreso tras la respuesta del público',
				summary:
					'En respuesta a la preocupación de votantes y candidatos, la Comisión de Debates de Utah ha reprogramado el debate del Distrito 2 del Congreso para el 13 de octubre.',
				body: [
					{
						type: 'p',
						text: 'Ayer, la Comisión de Debates de Utah anunció la reprogramación del debate del Distrito 2 del Congreso (CD2), que ahora se realizará el martes 13 de octubre de 2026. Esto es una semana antes de lo planeado originalmente y el mismo día en que se entregan las boletas por correo. Es una victoria para los votantes de Utah, que merecen tener la oportunidad de evaluar a cada uno de los candidatos en el único debate público actualmente programado antes de emitir su voto.'
					},
					{
						type: 'quote',
						text: 'La democracia depende de votantes informados y candidatos responsables. Al mover este debate al 13 de octubre, los habitantes de Utah tendrán la oportunidad de escuchar directamente a ambos candidatos antes de que comience la votación. Eso es bueno para los votantes, bueno para el proceso electoral y bueno para Utah.',
						attribution: 'Brian King, presidente del Partido Demócrata de Utah'
					},
					{
						type: 'p',
						text: 'El candidato demócrata al Congreso Peter Crosby y la campaña Peter Crosby para el Congreso expresan su gratitud a los numerosos habitantes de Utah que se comunicaron respetuosamente para solicitar este cambio. No hay duda de que sus voces fueron escuchadas. La campaña también desea agradecer a la Comisión de Debates de Utah, a los líderes legislativos y políticos estatales, y a la campaña de Moore, que escucharon a los residentes de Utah y trabajaron para encontrar una solución adecuada.'
					},
					{
						type: 'p',
						text: 'Peter Crosby es candidato al Congreso por primera vez y es el candidato demócrata en el Distrito 2 del Congreso de Utah. Lleva adelante una campaña de base: Peter no acepta donaciones de PAC corporativos ni financiamiento de PAC vinculados a intereses extranjeros, y ya cuenta con más donantes individuales de pequeñas cantidades registrados que la campaña de Moore. La campaña se sostiene por completo con voluntarios, con más de 300 voluntarios registrados. Peter cree que los ciudadanos del norte de Utah merecen un representante que viva en el distrito, escuche sus preocupaciones y ponga a la gente de Utah por encima del partido o de la búsqueda de poder personal. Está realizando cabildos públicos por todo el distrito, con al menos uno en los condados de Cache, Box Elder, Davis y Weber cada mes. Más información en petercrosbyforcongress.org.'
					}
				]
			},
			'debate-scheduling-voter-choice': {
				title:
					'La programación tardía del debate del Congreso perjudica la decisión de los votantes y genera preocupación en el candidato del CD2, Peter Crosby',
				summary:
					'Tras la publicación del calendario de debates de las elecciones generales por parte de la Comisión de Debates de Utah, Peter Crosby, candidato demócrata por el CD2, expresa su preocupación por que el debate del 20 de octubre con Blake Moore se realice una semana completa después de que se hayan enviado las boletas por correo.',
				body: [
					{
						type: 'p',
						text: 'El jueves, la Comisión de Debates de Utah publicó las fechas de los cuatro debates del Congreso previos a las elecciones generales del 3 de noviembre. Mientras que los debates de todos los demás distritos están programados antes de que las boletas por correo se envíen el 13 de octubre, el debate del CD2 está programado para el 20 de octubre: una semana completa después de la entrega de las boletas. El candidato demócrata Peter Crosby expresa una profunda preocupación, ya que significa que algunos votantes tomarán decisiones sin haber tenido la oportunidad de evaluar a cada uno de los candidatos en el único foro público facilitado por una autoridad de confianza.'
					},
					{
						type: 'p',
						text: 'En un contexto en el que los votantes de Utah se sienten cada vez más excluidos del sistema político, este calendario tardío, posterior a la entrega de las boletas, es una forma más en que se retiene información a los ciudadanos del norte de Utah que quieren tomar decisiones informadas sobre su gobierno. Los ciudadanos merecen información oportuna y la oportunidad de considerar sus opciones antes de emitir su voto.'
					},
					{
						type: 'p',
						text: 'La campaña Peter Crosby para el Congreso se comunicó con la Comisión de Debates de Utah para presentar una protesta formal, pero no ha recibido respuesta. La campaña valora el trabajo de la Comisión de Debates de Utah para organizar debates justos y reconoce la complejidad de la programación. Si bien la campaña no solicita elegir una fecha específica para el debate, sí pide que se adelante antes de que las boletas lleguen a los buzones de los votantes. Según la Oficina del Vicegobernador, en las elecciones generales de 2024, el 29% de los votantes de Utah ya había devuelto su boleta una semana antes del día de las elecciones. Estas cifras muestran la importancia de garantizar que los votantes puedan tomar decisiones informadas una vez que tengan la boleta en sus manos.'
					},
					{
						type: 'quote',
						text: 'Votar es nuestro deber cívico fundamental, y como votantes no podemos hacerlo de manera responsable si no contamos con toda la información. Estos debates son el único momento en que los votantes verán a todos los candidatos en el mismo escenario respondiendo preguntas. Merecen saber quién quiere representarlos antes de que se les pida emitir su voto.',
						attribution: 'Peter Crosby'
					},
					{
						type: 'p',
						text: 'Es imprescindible que la Comisión de Debates de Utah mantenga un estándar de debate justo e imparcial entre los candidatos. Es un servicio del que dependen los ciudadanos y que ayuda a exigir cuentas a los candidatos ante sus electores. La campaña solicita públicamente que el debate del 20 de octubre se reprograme antes de la entrega de las boletas por correo del 13 de octubre, y espera un evento justo y animado.'
					},
					{
						type: 'p',
						text: 'Peter Crosby es candidato al Congreso por primera vez y es el candidato demócrata en el Distrito 2 del Congreso de Utah. Lleva adelante una campaña de base: Peter no acepta donaciones de PAC corporativos ni financiamiento de PAC vinculados a intereses extranjeros, y ya cuenta con más donantes individuales de pequeñas cantidades registrados que la campaña de Moore. La campaña se sostiene por completo con voluntarios, con más de 300 voluntarios registrados. Peter cree que los ciudadanos del norte de Utah merecen un representante que viva en el distrito, escuche sus preocupaciones y ponga a la gente de Utah por encima del partido o de la búsqueda de poder personal. Está realizando cabildos públicos por todo el distrito, con al menos uno en los condados de Cache, Box Elder, Davis y Weber cada mes. Más información en petercrosbyforcongress.org.'
					}
				]
			}
		} as Record<
			string,
			{
				title: string;
				summary: string;
				body?: import('$lib/data/pressReleases').PressReleaseBlock[];
				attachment?: string;
			}
		>
	},
	policies: {
		metaTitle: 'La postura de Peter — Peter Crosby para el Congreso',
		metaDescription:
			'La postura de Peter Crosby sobre los temas del norte de Utah: asequibilidad, rendición de cuentas y el cuidado del Gran Lago Salado y nuestras tierras públicas.',
		eyebrow: 'Políticas',
		pageTitle: 'La postura de Peter',
		lede: 'Respuestas reales sobre los temas que más importan al norte de Utah: la asequibilidad, la integridad de nuestro gobierno y el cuidado del Gran Lago Salado y nuestras tierras públicas.',
		videoAffordabilityLabel: 'Peter Crosby sobre la asequibilidad',
		videoAccountabilityLabel: 'Peter Crosby sobre la rendición de cuentas',
		videoStewardshipLabel: 'Peter Crosby sobre el Gran Lago Salado',
		onThisPage: 'En esta página',
		ctaTitle: '¿Tienes una pregunta que no ves aquí?',
		ctaText:
			'Quiero saber de ti. Si tienes una pregunta que no ves respondida arriba, envíamela.',
		ctaButton: 'Haz una pregunta',
		items: [
			{
				id: 'top-priorities',
				navLabel: 'Prioridades',
				question: '¿Cuáles son sus principales prioridades de políticas?',
				parts: [
					{
						type: 'p' as const,
						text: 'Mis prioridades reflejan cada conversación que tengo con la gente del norte de Utah. Desde julio pasado he hablado personalmente con cientos de personas comunes de todos los ámbitos y orígenes políticos, y nuestros voluntarios de campaña han sumado miles más. Esas conversaciones han sacado a la luz muchas preocupaciones, pero creo que se resumen en las siguientes áreas:'
					},
					{
						type: 'ul' as const,
						items: [
							'Tenemos una crisis de asequibilidad',
							'Nos preocupa profundamente la integridad de nuestro gobierno',
							'Enfrentamos una amenaza existencial mientras el Gran Lago Salado muere, y preocupaciones más amplias sobre nuestras tierras públicas'
						]
					},
					{
						type: 'p' as const,
						text: 'En términos generales, mis principales prioridades son la Asequibilidad, la Rendición de cuentas y el Cuidado de nuestras tierras. En estas áreas, y en toda política pública, mi prioridad es representar a la gente del norte de Utah. Mis soluciones se centran en dos áreas clave: lograr que el sistema haga lo que se supone que debe hacer, y asegurarme de poner primero a las personas, las familias y las comunidades.'
					}
				]
			},
			{
				id: 'affordability',
				navLabel: 'Asequibilidad',
				question: '¿Qué problemas de asequibilidad enfrenta el norte de Utah y qué haría al respecto?',
				parts: [
					{
						type: 'p' as const,
						text: 'El norte de Utah tiene una fuerte tradición de trabajo duro e innovación, sostenida por una comunidad que pone primero a la gente. Estos valores y tradiciones nos han servido bien durante décadas, pero hoy están bajo presión, en parte por las acciones (o la inacción) de quienes nos representan.'
					},
					{
						type: 'p' as const,
						text: 'Vivimos una crisis de vivienda que impide que la gente encuentre un hogar permanente, debido a un mercado que está entre los más caros del país. Aunque hay algunos esfuerzos estatales para aliviar esta presión, se quedan muy cortos ante nuestras necesidades. Necesitamos incentivar mejor planificación, más vivienda asequible basada en modelos comunitarios, y aumentar los ingresos disponibles para los utahnos promedio, de modo que puedan empezar a construir sus familias y su futuro aquí. Esto incluye volver a financiar los programas existentes que apoyan el desarrollo de las comunidades rurales y luchar por un salario digno.'
					},
					{
						type: 'p' as const,
						text: 'También vemos inflación y aumentos en el costo de vida que dificultan la situación de cualquiera que no esté en el 1% superior. Alimentos básicos, como la carne, los huevos y la leche, ocupan una parte cada vez mayor del presupuesto familiar cada mes. Otros bienes de consumo afectados por los aranceles impuestos por la administración Trump (e ignorados por nuestro propio representante en el Congreso) son más caros. Al mismo tiempo, el mercado laboral parece debilitarse, creando una situación en la que todo cuesta más y cada vez menos miembros de nuestra comunidad pueden mantenerse a sí mismos o a sus familias.'
					},
					{
						type: 'p' as const,
						text: 'A este desastre creciente se suman miles de empleados federales que han sido expulsados de sus trabajos. Hemos perdido miles de buenos empleos en el distrito y se estima entre 110 y 150 millones de dólares en salarios perdidos. Eran cheques que sostenían a las familias y a nuestros negocios locales. Ya hay informes de bancos de alimentos y otros recursos comunitarios al borde del colapso, y el hambre infantil se ha duplicado en el estado.'
					},
					{
						type: 'p' as const,
						text: 'Como golpe final, este Congreso ha recortado el acceso a la atención médica para millones de estadounidenses, incluidos decenas de miles aquí en Utah. Nuestros adultos mayores y las comunidades rurales son los más afectados, pero todos vemos los costos adicionales. Mi propio seguro personal aumentó un 40% a través de mi empleador, pero la calidad de la atención no mejoró. La gente se ve forzada a decidir entre pagar la renta o ver a un médico, y eso es insostenible.'
					},
					{
						type: 'p' as const,
						text: 'Mi prioridad para resolver estos retos es enfocarme en la gente de aquí, del norte de Utah, usando el poder del Congreso para enderezar el rumbo. Me uniría a otros miembros del Congreso dispuestos a poner fin a un régimen de aranceles ilegal que dificulta cada vez más la vida de nuestros negocios y emprendedores locales. Me aseguraría de que se cumpla la ley para que los beneficios de SNAP lleguen a las más de 80,000 familias de Utah que luchan. Apoyaría una reforma regulatoria de nuestros mercados de vivienda y volvería a financiar los programas existentes que facilitan a las comunidades rurales y a quienes compran su primera vivienda echar raíces. Por último, tenemos que encontrar una solución rentable para el acceso a la salud. Todos los estudios a gran escala apuntan a la misma solución: un sistema de pagador único. Mi preferencia es uno que también permita que existan las aseguradoras privadas, pero que ahora tengan que competir en un mercado real, en lugar de mantener cautiva a la gente común mientras dificultan el trabajo de los proveedores de salud.'
					}
				]
			},
			{
				id: 'government-integrity',
				navLabel: 'Rendición de cuentas',
				question:
					'Menciona la integridad de nuestro gobierno como un tema que plantea la gente aquí en el norte de Utah. ¿Qué quiere decir con eso y qué haría?',
				parts: [
					{
						type: 'p' as const,
						text: 'Mi familia tiene una larga y orgullosa tradición de servicio militar y público que se remonta a antes de que Estados Unidos fuera Estados Unidos. Una parte integral de mi infancia fue aprender sobre la obligación que tenemos como ciudadanos con nuestro país, y la carga especial que llevan los servidores públicos al representarnos en nuestro gobierno nacional. Este último año hemos visto rota la confianza en quienes nos representan, mientras nuestra nación avanza hacia un gobierno al que no le importa el estado de derecho ni la voluntad del pueblo.'
					},
					{
						type: 'p' as const,
						text: 'Quien nos representa debe poner primero la Constitución de Estados Unidos, segundo las necesidades de este distrito, y mucho más abajo cualquier otra preocupación. Los elegimos para que nos representen, no a su partido político ni a sus propios intereses. He hablado con mucha gente en el norte de Utah que siente que no puede confiar en que su representante actual ponga a la gente de este distrito por encima de la política partidista de Washington o de la autopromoción, y, tristemente, creo que este último año lo ha demostrado.'
					},
					{
						type: 'p' as const,
						text: 'Hay varias soluciones que ayudarán a reconstruir la confianza en nuestro gobierno, y exigen sacrificio por parte de nuestros representantes. Primero, prohibiría las operaciones bursátiles individuales para todos los miembros del Congreso y sus familiares directos. Esta prohibición también debería extenderse a los miembros del poder ejecutivo (por ejemplo, el presidente, el vicepresidente, los secretarios de gabinete) y sus familiares directos, así como al poder judicial. No está bien que alguien regule la empresa en la que invierte. Nuestros representantes están para servirnos a nosotros, no a sus cuentas bancarias.'
					},
					{
						type: 'p' as const,
						text: 'Segundo, apoyaría un debate sobre los límites de mandato para el Congreso. Es saludable para nuestra democracia impedir que cualquier persona, de cualquier partido, haga del Congreso su hogar permanente. Estados Unidos no quiere, ni necesita, políticos eternos.'
					},
					{
						type: 'p' as const,
						text: 'Tercero, apoyo los esfuerzos por eliminar el dinero corporativo de nuestro proceso político. Nuestro gobierno es “del pueblo, por el pueblo y para el pueblo”, no de los intereses corporativos. Eliminar la influencia de este “dinero oscuro” ayudará a que todos nuestros servidores públicos nos sirvan mejor a nosotros, el pueblo.'
					},
					{
						type: 'p' as const,
						text: 'Las tres soluciones son razonables y exigen que nuestros representantes actuales y futuros pongan las necesidades de este país y de sus votantes por delante de la política partidista y del beneficio personal. Estoy dispuesto a hacerlo, con el apoyo de los votantes de este distrito.'
					}
				]
			},
			{
				id: 'great-salt-lake',
				navLabel: 'Cuidado',
				question: '¿Qué hacemos con el Gran Lago Salado?',
				parts: [
					{
						type: 'p' as const,
						text: 'Restaurar el Gran Lago Salado requiere más agua. Esta es en gran medida una decisión estatal, ya que la Legislatura de Utah decide cómo asignar los recursos en colaboración con las entidades locales. Como representante federal, mi responsabilidad es proporcionar recursos que ayuden a llevar más agua al lago y eliminar las barreras a nivel nacional que impiden soluciones efectivas.'
					},
					{
						type: 'p' as const,
						text: 'Esto significa asegurar financiamiento para ayudar a restaurar nuestra envejecida infraestructura hídrica y eliminar los fragmites invasores alrededor de la orilla. También significa simplificar las barreras regulatorias existentes entre las agencias federales cuando los proyectos de mejora requieran aprobaciones de varias agencias. Por último, también significa entender que probablemente habrá comunidades afectadas por las decisiones sobre la asignación del agua, y pensar en esas consecuencias antes de que ocurran para poder brindar los recursos y el apoyo necesarios a los afectados (como los agricultores). Por eso, uno de los comités en los que estaría dispuesto a servir sería el de Agricultura, para poder defender mejor a quienes más se verán afectados por los probables cambios en la asignación de agua en todo el estado.'
					}
				]
			},
			{
				id: 'healthcare',
				navLabel: 'Salud',
				groupHeading: 'Otras posturas de política',
				question:
					'¿Cuál es su posición sobre los recortes a la Ley del Cuidado de Salud Asequible (ACA u «Obamacare») y el acceso a la atención médica en las comunidades rurales?',
				parts: [
					{
						type: 'p' as const,
						text: 'La reciente “Big Beautiful Bill”, elaborada en parte por el representante Blake Moore de lo que ahora es el distrito 2 del Congreso, recorta de forma significativa el acceso a la atención médica al reducir los pagos a Medicare a partir de 2026. Estos recortes golpean más fuerte a las comunidades rurales como las del norte de Utah, y encarecerán el acceso a la atención médica. Esto ya está teniendo un impacto aquí en Utah, ya que el estado no puede igualar la inversión federal al mismo nivel que antes, a pesar de que tenemos un gran superávit en el presupuesto estatal. Esto probablemente afectará más a nuestros sistemas de hospitales y de atención de emergencia. Para las comunidades rurales en especial, esto significa menos acceso a la atención crítica.'
					},
					{
						type: 'p' as const,
						text: 'Por eso, no estoy a favor de la Big Beautiful Bill ni de sus recortes dirigidos a nuestras comunidades locales. Es mala política y perjudicará significativamente a miles de familias de Utah.'
					}
				]
			},
			{
				id: 'data-centers',
				navLabel: 'Centros de datos',
				question:
					'El proyecto de centro de datos Stratos aprobado por MIDA está en Box Elder, un condado de su distrito. ¿Qué opina de los centros de datos en general y de Stratos en particular?',
				parts: [
					{
						type: 'p' as const,
						text: 'No apoyo el desarrollo de más centros de datos en Utah a menos que, y hasta que, aborden adecuadamente las preocupaciones sobre el agua, la energía, el medio ambiente y los impactos en la comunidad. Además, las decisiones sobre su desarrollo deberían requerir la aprobación de la comunidad. Me opongo al proyecto Stratos porque no cumple con ninguno de estos requisitos.'
					}
				]
			},
			{
				id: 'ai',
				navLabel: 'IA',
				question: 'Los centros de datos suelen vincularse con el desarrollo de la IA. ¿Cuál es su postura sobre la IA?',
				parts: [
					{
						type: 'p' as const,
						text: 'Primero, es importante señalar que la IA se refiere a una amplia variedad de herramientas tecnológicas que a menudo se agrupan. Estoy a favor de los procesos de aprendizaje automático que nos ayudan a identificar el cáncer en las imágenes de forma más rápida y precisa. Me opongo al desarrollo y despliegue de algoritmos que se usan para identificar y rastrear a ciudadanos privados sin ninguna justificación legal.'
					},
					{
						type: 'p' as const,
						text: 'Las herramientas de IA generativa existentes (por ejemplo, ChatGPT, Claude, Midjourney) se construyeron sobre bienes robados y, más a menudo que no, afectan negativamente la capacidad humana de crear, razonar y relacionarse de forma significativa con el mundo que nos rodea. Las herramientas están aquí y no van a desaparecer, así que ahora tenemos la obligación de mitigar y prevenir todo el daño que podamos.'
					},
					{
						type: 'p' as const,
						text: 'Desde el punto de vista de las políticas, estoy a favor de responsabilizar a las corporaciones por su uso y despliegue de la IA. Hay serios posibles impactos financieros para nuestras comunidades, y nuestro código tributario actual permite que las grandes corporaciones eviten pagar su parte justa de impuestos para sostener a nuestro gobierno y comunidades. Necesitamos cerrar estas lagunas fiscales, de modo que, si el despliegue de la IA desplaza significativamente a los estadounidenses y sus familias de la fuerza laboral, tengamos los recursos necesarios para apoyarlos durante esa transición.'
					},
					{
						type: 'p' as const,
						text: 'También estoy a favor de actualizar nuestras leyes y regulaciones actuales sobre la propiedad y la privacidad de los datos. Los estadounidenses deben ser dueños de sus datos, punto. También debemos estar protegidos del uso indebido de esos datos, ya sea por agencias locales, corporaciones o el gobierno federal.'
					}
				]
			},
			{
				id: 'epstein',
				navLabel: 'Archivos Epstein',
				question:
					'Ha mencionado a menudo que una de las razones por las que se postula es por lo que les ocurrió a las víctimas de trata infantil en los archivos de Epstein. ¿Cuál es su posición sobre los traficantes de Epstein?',
				parts: [
					{
						type: 'p' as const,
						text: 'Todos los involucrados deberían ser procesados con todo el peso de la ley. Apoyo la divulgación completa de los archivos, conforme a la petición de las víctimas. No me interesa proteger a nadie que haya participado en la compra, venta o violación de niños.'
					}
				]
			}
		]
	}
};
