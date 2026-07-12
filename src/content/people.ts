import carolynHeadshot from "~/assets/images/2018-Carolyn-Headshot-01518.jpeg?as=metadata";
import paulHeadshot from "~/assets/images/Edited_Headshot.jpg?as=metadata";
import johnHeadshot from "~/assets/images/JohnDiLoreto-6930.jpeg?as=metadata";
import { type ContentImage, contentImage } from "./image";

export type Person = {
	id: string;
	order: number;
	firstName: string;
	fullName: string;
	email: string;
	link?: string;
	portrait: ContentImage;
	bio: string;
};

export const people: Person[] = [
	{
		id: "0e302574-2e3a-55a9-8331-c6f27a3de509",
		order: 0,
		firstName: "John",
		fullName: "John R. DiLoreto",
		email: "john@diloreto.com",
		portrait: contentImage("John DiLoreto", johnHeadshot),
		bio: "John DiLoreto has served 25 years in Silicon Valley as an engineer, marketer, executive, entrepreneur in the fields of telecom, displays and digital media. As an industry analyst, he has made regular contributions to technology and forecast reports, and has presented and moderated panels at industry events. With top-level analytical and business management skills and with senior executive experience in several high-tech start-ups, his expertise in offshore business development, strategic partnering, manufacturing, finance and administration have made him a well-rounded and highly-valued business consultant and advisor.\n\nAs an industry executive, he has made key contributions in medical imaging, including the introduction of the first artificial intelligence-based medical image processing system. An innovator in large-scale displays, he co-founded Jenmar Visual Systems and holds key patents in refractive screen technology and led this technology into commercialization in a number of markets. Jenmar screens cover the exterior of the landmark Nasdaq building at Times Square and can also be found in the cockpits of F-18 aircraft and on rides at Disneyland. His latest endeavors involve HDTV and media distribution in the home, realized in a custom-built 73-in. prototype, affectionately called Woody. John also serves on the advisory boards of a number of high-tech companies across the country.\n\nMr. DiLoreto holds technical and business degrees from M.I.T., U.C. Berkeley and Stanford. He has proven leadership in commercializing new technologies and has a consistent record of rapidly and solidly positioning companies with strategic customers, suppliers, manufacturing partners and the media to entrench new products in established and developing markets.\n\nJohn is also a performing musician on voice and keyboards. Classically trained, he competed on piano in high school and excelled at trumpet in symphony band and orchestra. In his junior year of college he studied at L'Ecole National de Musique in Nantes, France and wrote the score to a theatrical production of Saint-Exupery's \"Le Petit Prince.\" In Palo Alto, John opened a recording studio and produced multi-track remote recordings of TheatreWorks productions and others. He also produced and distributed records of local musicians, including a joint project with Windham Hill Records and guitarist Robbie Basho. He served as founding director and treasurer of what is now the West Coast Songwriters Association. For over 15 years John also performed keyboards and vocals in a number of local rock groups, featuring classic rock and Motown. He has also played keyboard in local community theatre productions.\n\nJohn has worked as a board member of arts-oriented non-profit corporations including the Nothern California Songwriters Association, Tapestry Arts, and The Tabard Theatre Company, where he currently serves as CFO.",
	},
	{
		id: "9276b6bf-fbdf-5147-94a2-3d25b5d1cee9",
		order: 1,
		firstName: "Paul",
		fullName: "Paul Michael DiLoreto",
		email: "paul@diloreto.com",
		link: "https://pauldiloreto.com",
		portrait: contentImage("Paul DiLoreto", paulHeadshot),
		bio: "Paul is a proud UCLA graduate, with a diverse array of skills and interests. After receiving his Bachelor of Art's from UCLA's School of Theater, Film and Television, he went on to perform in several regional musical theatre productions. Currently, Paul is performing part-time as \"Shorty\" in the Red Car Trolley Newsboys at Disney California Adventure.\n\nHe is also a adept, self-taught developer. After building his first desktop computer and coding his first website at the age of 13, his thirst for technical knowledge has yet to be quenched. To date, Paul has become proficient in numerous Front and Back End Languages. In the past few years, he has worked on Wordpress customization & older LAMP stack websites. Today, Paul mainly works with Node.js & React in both serverless architectures and server-based reactive architectures (using socket connections).\n\nPaul is currently a Javascript Software Engineer at 20th Century Fox.",
	},
	{
		id: "a1bb5c97-8895-59a0-8599-a54da8bb19a9",
		order: 2,
		firstName: "Carolyn",
		fullName: "Carolyn DiLoreto",
		email: "carolyn@diloreto.com",
		link: "https://carolyndiloreto.com",
		portrait: contentImage("Carolyn DiLoreto", carolynHeadshot),
		bio: "Carolyn DiLoreto is a multi-media artist, a graduate of USC's School of Cinematic Arts, and a current UX Designer at NBCUniversal.\n\nAs a filmmaker, photographer, dancer, and interaction designer, she is compelled by the power of visual storytelling. Her recent work includes *Em/Body* (2018), an interactive installation that encourages users to explore their kinesthetic awareness through space based on visual and auditory cues. As the co-director and cinematographer of *Shed* (2017), she explores how dance can manifest the conflict of identity and sexuality against social expectations of womanhood. *Shed* received 2nd place at the Feminist Media Fest and was screened at the San Francisco Dance Film Festival, Festival of Recorded Movement, and Dance Camera West. She has also produced photo and video work for The Oscars (AMPAS), The Screen Actor's Guild (SAG), The California Democratic Party, BODYTRAFFIC, and the USC Kaufman School of Dance.\n\nCarolyn had grown up with a strong background in performing arts while simultaneously retaining an interest in media technologies. She is trained in classical piano, dance, singing, acting, and is well-versed in a variety of coding languages and software programs. Through her studies and work experience, she has gained a rich knowledge of interaction design and storytelling techniques.\n\nCarolyn continues to dance and create photo/video content in the LA-area. On the occassion, she can be found jamming with friends or protesting in the streets of downtown. In all the work she does, she thinks about the potential impact on our society, retaining a passionate awareness of marginalized communities and the future of our planet.",
	},
];
