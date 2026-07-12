import type { SiteImage } from "./image";

export type GalleryPhoto = {
	id: string;
	title: string;
	link?: string;
	description?: string;
	thumbnail: SiteImage;
	fullSize: SiteImage;
};

export type HistoryRecord = {
	id: string;
	year: number;
	title: string;
	content: string;
	link?: string;
	photos: GalleryPhoto[];
};

export const familyHistory: HistoryRecord[] = [
	{
		id: "17745bfb-af75-54c9-a34d-c1746af6896a",
		year: 996,
		title: "996 - 1330",
		link: "http://www.gens.info/italia/it/turismo-viaggi-e-tradizioni-italia?t=cognomi&cognome=di+loreto&x=33&y=9#.WJD7TrYrLMU",
		content:
			"## Historical and Heraldic Information on the DiLoreto Stock\n\nExcerpts from the Istituto Genealogico Italiano:\n\n\"The family descends from D'Aquino stock of Longobard origin, whose forefather was Atenolfo, Lord of Capua in 996. Among the feudal holdings of this important family were L'Aquila, Alvito, Loreto and many others. The branch of the family that became known as DI LORETO presumably took its surname from the town of Loreto, their feudal holding. The first DI LORETO of documented record is one Berardo in 1330.\"",
		photos: [
			{
				id: "6MWMDjUUhOc2A0GQWSwAkw",
				title: "DiLoreto map",
				description: "How many DiLoretos live in Italy?",
				thumbnail: {
					url: "/assets/DiLoreto_map.gif",
					title: "DiLoreto map",
					width: 500,
					height: 600,
				},
				fullSize: {
					url: "/assets/DiLoreto_map.gif",
					title: "DiLoreto map",
					width: 500,
					height: 600,
				},
			},
		],
	},
	{
		id: "90a0403d-80c4-54e2-92e0-9ed3e4ae5a26",
		year: 1295,
		title: "1295 - 1528",
		content:
			'## Excerpts from "The Historical Research Center"\n\nSubmitted by Joanne Monroe (1993):\n\n"The surname Loreto is of Italian origin, and is a locational name from the famous town of Loreto in the province of Ancona in Italy. Loreto became famous through the legend of the \'Holy House,\' where tradition states that the house where the Virgin Mary lived and was visited by the Angel, was miraculously carried to Loreto in 1295 by angels from the Holy Land."\n\n"In the 14th century, a family named Di Loreto, having originated in the above-named town, became quite prominent. The first documented reference to the name was in 1528, when one Luca di Loreto was recorded. It is from this point in time that the ancestral history of the family began to be carefully followed."',
		photos: [
			{
				id: "2BW7hGmbScQIOswsgW4iqC",
				title: "Alfedena Homestead",
				description:
					"Location of DiLoreto Homestead in Alfedena, L'Aquila, Italy.",
				thumbnail: {
					url: "/assets/Map_Alf.gif",
					title: "Alfedena Homestead",
					width: 3251,
					height: 2454,
				},
				fullSize: {
					url: "/assets/Map_Alf.gif",
					title: "Alfedena Homestead",
					width: 3251,
					height: 2454,
				},
			},
		],
	},
	{
		id: "0519efcf-f3b4-59f7-b1bb-098307702ffd",
		year: 1600,
		title: "Coat of Arms - DiLoreto Family of Genua",
		content:
			'## Coat of Arms\n\nBlazon: "Azure, a tree on a grassy plain all proper, overall a fess gules."\n\nThe tree signifies antiquity and knowledge. The fesse represents the military belt of honor. Crest: Three ostrich plumes. Origin: Italy.',
		photos: [
			{
				id: "4WNoguuxpu2QQyuIgYAG4u",
				title: "DiLoreto Coat of Arms",
				thumbnail: {
					url: "/assets/CoatofArms.gif",
					title: "DiLoreto Coat of Arms",
					width: 2191,
					height: 2431,
				},
				fullSize: {
					url: "/assets/CoatofArms.gif",
					title: "DiLoreto Coat of Arms",
					width: 2191,
					height: 2431,
				},
			},
		],
	},
	{
		id: "6abc310f-778f-5074-b304-66166edf5b1c",
		year: 1601,
		title: "1600s",
		content:
			"## We Came from Alfedena\n\nAlfedena is a comune (municipality) in the Province of L'Aquila in the Abruzzo region of Italy. A small village of about 700 inhabitants, it sits along the Sangro River in a narrow valley at about 3,000 feet elevation.",
		photos: [
			{
				id: "7CQlbPj5SgqGu2G4cSQu64",
				title: "Map of Abruzzo",
				description: "Map of Abruzzo pointing to Alfedena at the bottom",
				thumbnail: {
					url: "/assets/abruzzi_map.jpg",
					title: "Map of Abruzzo",
					width: 893,
					height: 804,
				},
				fullSize: {
					url: "/assets/abruzzi_map.jpg",
					title: "Map of Abruzzo",
					width: 893,
					height: 804,
				},
			},
		],
	},
	{
		id: "0a464ab4-b7e3-5110-8eab-98d7a89f4d3c",
		year: 1886,
		title: "1886",
		link: "https://www.facebook.com/groups/Alfedena/",
		content:
			'## The Loyal Wing Club\n\nMigration from Alfedena to Detroit began in 1886, with about 100 arriving by 1900. By 1960, there were 1,680 Alfedenese in Detroit (compared to 1,430 in Alfedena itself), and by 1979 that number had grown to 2-3 thousand.\n\nThe Loyal Wing Club ("Club Ala Fidente") was founded in 1919 by the Alfedenese community in Detroit. The club\'s name derives from the legend that Alfedena defended the right wing of the army of Rome against Hannibal in 216 BC.',
		photos: [
			{
				id: "1VEKHlk0yMWQG6OeieCcsq",
				title: "Alfedena View",
				description: "Loyal Wing Club's Facebook Group",
				thumbnail: {
					url: "/assets/alfedena.jpg",
					title: "Alfedena View",
					width: 400,
					height: 258,
				},
				fullSize: {
					url: "/assets/alfedena.jpg",
					title: "Alfedena View",
					width: 400,
					height: 258,
				},
			},
		],
	},
	{
		id: "5c08bf87-119e-572b-96fa-cc8c1e9a413b",
		year: 1909,
		title: "1909",
		content:
			"## Immigration to the U.S.\n\nRemo DiLoreto, one of 13 children of Panfilo and Eufrasia Gigante, emigrated to the United States. He married Marianna D'Amico in 1911 (one of 11 children). They settled in the Eastern Market area of Detroit. Their children were: Panfilo, Oscar, Gilbert, and Emma.",
		photos: [
			{
				id: "6oP8CPUVTq8woyiG6iMG4e",
				title: "Family Tree",
				description: "Hand-drawn family tree (1797-1938)",
				thumbnail: {
					url: "/assets/FamilyTree.gif",
					title: "Family Tree",
					width: 2529,
					height: 3058,
				},
				fullSize: {
					url: "/assets/FamilyTree.gif",
					title: "Family Tree",
					width: 2529,
					height: 3058,
				},
			},
			{
				id: "4EA3845Ya4Oikc8EgEOUq0",
				title: "Panfilo and Eufrasia DiLoreto",
				description: "Panfilo (1847-1920) & Eufrasia (1854-1928)",
				thumbnail: {
					url: "/assets/Panf-Eufr.jpg",
					title: "Panfilo and Eufrasia DiLoreto",
					width: 2372,
					height: 2990,
				},
				fullSize: {
					url: "/assets/Panf-Eufr.jpg",
					title: "Panfilo and Eufrasia DiLoreto",
					width: 2372,
					height: 2990,
				},
			},
			{
				id: "2Z2FuBc1JK8Mc4K0oCEUmk",
				title: "Remo DiLoreto",
				description: "Remo DiLoreto",
				thumbnail: {
					url: "/assets/Remo.jpg",
					title: "Remo DiLoreto",
					width: 2448,
					height: 3840,
				},
				fullSize: {
					url: "/assets/Remo.jpg",
					title: "Remo DiLoreto",
					width: 2448,
					height: 3840,
				},
			},
		],
	},
	{
		id: "8a7b896c-bcc3-5d6c-8138-d64f6e91c1a4",
		year: 1913,
		title: "1913 - 1923",
		content:
			"## Antique Postcards from Alfedena, Italy\n\nThese postcards were sent between 1913 and 1923, between family members in Alfedena and those who had emigrated to Detroit and Rochester.",
		photos: [
			{
				id: "pc-04a",
				title: "postcard-04a",
				thumbnail: {
					url: "/assets/postcard-04a.gif",
					title: "postcard-04a",
					width: 648,
					height: 416,
				},
				fullSize: {
					url: "/assets/postcard-04a.gif",
					title: "postcard-04a",
					width: 648,
					height: 416,
				},
			},
			{
				id: "pc-04",
				title: "postcard-04",
				thumbnail: {
					url: "/assets/postcard-04.jpg",
					title: "postcard-04",
					width: 648,
					height: 416,
				},
				fullSize: {
					url: "/assets/postcard-04.jpg",
					title: "postcard-04",
					width: 648,
					height: 416,
				},
			},
			{
				id: "pc-06a",
				title: "postcard-06a",
				thumbnail: {
					url: "/assets/postcard-06a.gif",
					title: "postcard-06a",
					width: 648,
					height: 412,
				},
				fullSize: {
					url: "/assets/postcard-06a.gif",
					title: "postcard-06a",
					width: 648,
					height: 412,
				},
			},
			{
				id: "pc-06",
				title: "postcard-06",
				thumbnail: {
					url: "/assets/postcard-06.gif",
					title: "postcard-06",
					width: 648,
					height: 420,
				},
				fullSize: {
					url: "/assets/postcard-06.gif",
					title: "postcard-06",
					width: 648,
					height: 420,
				},
			},
			{
				id: "pc-01",
				title: "postcard-01",
				thumbnail: {
					url: "/assets/postcard-01.gif",
					title: "postcard-01",
					width: 415,
					height: 648,
				},
				fullSize: {
					url: "/assets/postcard-01.gif",
					title: "postcard-01",
					width: 415,
					height: 648,
				},
			},
			{
				id: "pc-01a",
				title: "postcard-01a",
				thumbnail: {
					url: "/assets/postcard-01a.gif",
					title: "postcard-01a",
					width: 415,
					height: 648,
				},
				fullSize: {
					url: "/assets/postcard-01a.gif",
					title: "postcard-01a",
					width: 415,
					height: 648,
				},
			},
			{
				id: "pc-02",
				title: "postcard-02",
				thumbnail: {
					url: "/assets/postcard-02.gif",
					title: "postcard-02",
					width: 648,
					height: 415,
				},
				fullSize: {
					url: "/assets/postcard-02.gif",
					title: "postcard-02",
					width: 648,
					height: 415,
				},
			},
			{
				id: "pc-03",
				title: "postcard-03",
				thumbnail: {
					url: "/assets/postcard-03.gif",
					title: "postcard-03",
					width: 415,
					height: 648,
				},
				fullSize: {
					url: "/assets/postcard-03.gif",
					title: "postcard-03",
					width: 415,
					height: 648,
				},
			},
			{
				id: "pc-03a",
				title: "postcard-03a",
				thumbnail: {
					url: "/assets/postcard-03a.gif",
					title: "postcard-03a",
					width: 415,
					height: 648,
				},
				fullSize: {
					url: "/assets/postcard-03a.gif",
					title: "postcard-03a",
					width: 415,
					height: 648,
				},
			},
			{
				id: "pc-03b",
				title: "postcard-03b",
				thumbnail: {
					url: "/assets/postcard-03b.jpg",
					title: "postcard-03b",
					width: 648,
					height: 417,
				},
				fullSize: {
					url: "/assets/postcard-03b.jpg",
					title: "postcard-03b",
					width: 648,
					height: 417,
				},
			},
			{
				id: "pc-05",
				title: "postcard-05",
				thumbnail: {
					url: "/assets/postcard-05.jpg",
					title: "postcard-05",
					width: 648,
					height: 421,
				},
				fullSize: {
					url: "/assets/postcard-05.jpg",
					title: "postcard-05",
					width: 648,
					height: 421,
				},
			},
			{
				id: "pc-05a",
				title: "postcard-05a",
				thumbnail: {
					url: "/assets/postcard-05a.gif",
					title: "postcard-05a",
					width: 648,
					height: 414,
				},
				fullSize: {
					url: "/assets/postcard-05a.gif",
					title: "postcard-05a",
					width: 648,
					height: 414,
				},
			},
			{
				id: "pc-07",
				title: "postcard-07",
				thumbnail: {
					url: "/assets/postcard-07.gif",
					title: "postcard-07",
					width: 409,
					height: 648,
				},
				fullSize: {
					url: "/assets/postcard-07.gif",
					title: "postcard-07",
					width: 409,
					height: 648,
				},
			},
			{
				id: "pc-07a",
				title: "postcard-07a",
				thumbnail: {
					url: "/assets/postcard-07a.gif",
					title: "postcard-07a",
					width: 409,
					height: 648,
				},
				fullSize: {
					url: "/assets/postcard-07a.gif",
					title: "postcard-07a",
					width: 409,
					height: 648,
				},
			},
			{
				id: "pc-08",
				title: "postcard-08",
				thumbnail: {
					url: "/assets/postcard-08.gif",
					title: "postcard-08",
					width: 648,
					height: 418,
				},
				fullSize: {
					url: "/assets/postcard-08.gif",
					title: "postcard-08",
					width: 648,
					height: 418,
				},
			},
			{
				id: "pc-08a",
				title: "postcard-08a",
				thumbnail: {
					url: "/assets/postcard-08a.gif",
					title: "postcard-08a",
					width: 648,
					height: 420,
				},
				fullSize: {
					url: "/assets/postcard-08a.gif",
					title: "postcard-08a",
					width: 648,
					height: 420,
				},
			},
			{
				id: "pc-09",
				title: "postcard-09",
				thumbnail: {
					url: "/assets/postcard-09.gif",
					title: "postcard-09",
					width: 645,
					height: 411,
				},
				fullSize: {
					url: "/assets/postcard-09.gif",
					title: "postcard-09",
					width: 645,
					height: 411,
				},
			},
			{
				id: "pc-10",
				title: "postcard-10",
				thumbnail: {
					url: "/assets/postcard-10.gif",
					title: "postcard-10",
					width: 648,
					height: 455,
				},
				fullSize: {
					url: "/assets/postcard-10.gif",
					title: "postcard-10",
					width: 648,
					height: 455,
				},
			},
			{
				id: "pc-11",
				title: "postcard-11",
				thumbnail: {
					url: "/assets/postcard-11.gif",
					title: "postcard-11",
					width: 648,
					height: 408,
				},
				fullSize: {
					url: "/assets/postcard-11.gif",
					title: "postcard-11",
					width: 648,
					height: 408,
				},
			},
			{
				id: "pc-12",
				title: "postcard-12",
				thumbnail: {
					url: "/assets/postcard-12.gif",
					title: "postcard-12",
					width: 420,
					height: 648,
				},
				fullSize: {
					url: "/assets/postcard-12.gif",
					title: "postcard-12",
					width: 420,
					height: 648,
				},
			},
			{
				id: "pc-13",
				title: "postcard-13",
				thumbnail: {
					url: "/assets/postcard-13.gif",
					title: "postcard-13",
					width: 648,
					height: 416,
				},
				fullSize: {
					url: "/assets/postcard-13.gif",
					title: "postcard-13",
					width: 648,
					height: 416,
				},
			},
			{
				id: "pc-14",
				title: "postcard-14",
				thumbnail: {
					url: "/assets/postcard-14.gif",
					title: "postcard-14",
					width: 648,
					height: 449,
				},
				fullSize: {
					url: "/assets/postcard-14.gif",
					title: "postcard-14",
					width: 648,
					height: 449,
				},
			},
			{
				id: "pc-15",
				title: "postcard-15",
				thumbnail: {
					url: "/assets/postcard-15.gif",
					title: "postcard-15",
					width: 648,
					height: 416,
				},
				fullSize: {
					url: "/assets/postcard-15.gif",
					title: "postcard-15",
					width: 648,
					height: 416,
				},
			},
			{
				id: "pc-16",
				title: "postcard-16",
				thumbnail: {
					url: "/assets/postcard-16.gif",
					title: "postcard-16",
					width: 648,
					height: 443,
				},
				fullSize: {
					url: "/assets/postcard-16.gif",
					title: "postcard-16",
					width: 648,
					height: 443,
				},
			},
			{
				id: "pc-17",
				title: "postcard-17",
				thumbnail: {
					url: "/assets/postcard-17.gif",
					title: "postcard-17",
					width: 648,
					height: 412,
				},
				fullSize: {
					url: "/assets/postcard-17.gif",
					title: "postcard-17",
					width: 648,
					height: 412,
				},
			},
			{
				id: "pc-18",
				title: "postcard-18",
				thumbnail: {
					url: "/assets/postcard-18.gif",
					title: "postcard-18",
					width: 416,
					height: 648,
				},
				fullSize: {
					url: "/assets/postcard-18.gif",
					title: "postcard-18",
					width: 416,
					height: 648,
				},
			},
			{
				id: "pc-19",
				title: "postcard-19",
				thumbnail: {
					url: "/assets/postcard-19.gif",
					title: "postcard-19",
					width: 408,
					height: 648,
				},
				fullSize: {
					url: "/assets/postcard-19.gif",
					title: "postcard-19",
					width: 408,
					height: 648,
				},
			},
			{
				id: "pc-20",
				title: "postcard-20",
				thumbnail: {
					url: "/assets/postcard-20.gif",
					title: "postcard-20",
					width: 648,
					height: 419,
				},
				fullSize: {
					url: "/assets/postcard-20.gif",
					title: "postcard-20",
					width: 648,
					height: 419,
				},
			},
			{
				id: "pc-21",
				title: "postcard-21",
				thumbnail: {
					url: "/assets/postcard-21.gif",
					title: "postcard-21",
					width: 413,
					height: 648,
				},
				fullSize: {
					url: "/assets/postcard-21.gif",
					title: "postcard-21",
					width: 413,
					height: 648,
				},
			},
		],
	},
	{
		id: "060966ce-3594-5fbd-aa90-70392382e7ca",
		year: 1913,
		title: "1913",
		content:
			"## Gaetano D'Amico & Cleonice DiLoreto's Wedding\n\nAugust 23, 1913",
		photos: [
			{
				id: "1QWRvhoJlGawIAgaY0i04o",
				title: "1913 Wedding",
				description:
					"The wedding of Gaetano D'Amico and Cleonice DiLoreto with Remo and Marianna (D'Amico) DiLoreto (Aug. 23, 1913).",
				thumbnail: {
					url: "/assets/DiLoreto-D_Amico_Wedding.jpg",
					title: "1913 Wedding",
					width: 1189,
					height: 1638,
				},
				fullSize: {
					url: "/assets/DiLoreto-D_Amico_Wedding.jpg",
					title: "1913 Wedding",
					width: 1189,
					height: 1638,
				},
			},
		],
	},
	{
		id: "fd714f2f-1de3-5c21-89b2-f304fc53c4f8",
		year: 1919,
		title: "circa 1919",
		content:
			"Photo of DiLoreto children, c. 1919. If you have additional information about this photo, please contact us.",
		photos: [
			{
				id: "1CsIOc1X16i8CsGooCq6gS",
				title: "DiLoreto Children",
				description: "DiLoreto children (c. 1919)",
				thumbnail: {
					url: "/assets/4_DiLoreto_s__1919.jpg",
					title: "DiLoreto Children",
					width: 3554,
					height: 2377,
				},
				fullSize: {
					url: "/assets/4_DiLoreto_s__1919.jpg",
					title: "DiLoreto Children",
					width: 3554,
					height: 2377,
				},
			},
		],
	},
	{
		id: "2553f8cb-62f6-5eed-880e-fa6619959e09",
		year: 1938,
		title: "circa 1938",
		content:
			"## Nick & Mary's Store in Erie, PA\n\nNick and Mary (Monacelli) DiLoreto with sons William and Julio.",
		photos: [
			{
				id: "3csKu33bNmKAwQoWwi8sOI",
				title: "Nick & Mary's Store",
				description:
					"Nick and Mary (Monacelli) DiLoreto with sons William and Julio in their store in Erie, PA.",
				thumbnail: {
					url: "/assets/Nick__Maria__Boys.jpg",
					title: "Nick & Mary's Store",
					width: 1222,
					height: 1513,
				},
				fullSize: {
					url: "/assets/Nick__Maria__Boys.jpg",
					title: "Nick & Mary's Store",
					width: 1222,
					height: 1513,
				},
			},
		],
	},
	{
		id: "afb11289-7a2c-557c-b341-f439c825e56a",
		year: 1943,
		title: "1943 - Detroit Free Press Article",
		content:
			"## Remo DiLoreto's Life in America Exemplifies Strength of U.S. System\n\nBy Paul M. Deac, Detroit Free Press, 1943\n\nThe article chronicles Remo DiLoreto's journey from Alfedena, Italy to Detroit, where he built a successful life as a tile setter and raised a family. It details his apprenticeship, difficult early days, path to citizenship, and the achievements of his four children: Oscar (auto worker), Gilbert (soldier), Panfilo (draftsman), and Emma.",
		photos: [
			{
				id: "3tgnMYScl2MCY4MGUEgI4u",
				title: "1943 Detroit Free Press Article",
				thumbnail: {
					url: "/assets/Free_Press-_43.jpg",
					title: "1943 Detroit Free Press Article",
					width: 1835,
					height: 3508,
				},
				fullSize: {
					url: "/assets/Free_Press-_43.jpg",
					title: "1943 Detroit Free Press Article",
					width: 1835,
					height: 3508,
				},
			},
		],
	},
	{
		id: "a9c5c077-73a8-532a-a3d1-1b71eaf0c490",
		year: 1946,
		title: "1946 Landscape Photos",
		content:
			"## A G.I.'s Visit to Alfedena\n\nThese photos were taken by Gilbert DiLoreto during his visit to Alfedena in 1946.",
		photos: [
			{
				id: "3bMB7ujmUUcAKgCQ2cg6Sy",
				title: "Panorama-117",
				thumbnail: {
					url: "/assets/Alfedena_Panorama-117.jpg",
					title: "Panorama-117",
					width: 2401,
					height: 1928,
				},
				fullSize: {
					url: "/assets/Alfedena_Panorama-117.jpg",
					title: "Panorama-117",
					width: 2401,
					height: 1928,
				},
			},
			{
				id: "1M3o63t5s4eygEeYOgQSEi",
				title: "Panorama-118",
				thumbnail: {
					url: "/assets/Alfedena_Panorama-118.jpg",
					title: "Panorama-118",
					width: 2399,
					height: 1926,
				},
				fullSize: {
					url: "/assets/Alfedena_Panorama-118.jpg",
					title: "Panorama-118",
					width: 2399,
					height: 1926,
				},
			},
			{
				id: "5HrMcBMFwc4ieuwc26YyEe",
				title: "Panorama-119",
				thumbnail: {
					url: "/assets/Alfedena_Panorama-119.jpg",
					title: "Panorama-119",
					width: 1787,
					height: 1791,
				},
				fullSize: {
					url: "/assets/Alfedena_Panorama-119.jpg",
					title: "Panorama-119",
					width: 1787,
					height: 1791,
				},
			},
			{
				id: "43xKCWXf2oIskQIuageaAi",
				title: "Panorama-120",
				thumbnail: {
					url: "/assets/Alfedena_Panorama-120.jpg",
					title: "Panorama-120",
					width: 1796,
					height: 1803,
				},
				fullSize: {
					url: "/assets/Alfedena_Panorama-120.jpg",
					title: "Panorama-120",
					width: 1796,
					height: 1803,
				},
			},
			{
				id: "6ewiemQN6os02AgQQwqmYs",
				title: "Panorama-121",
				thumbnail: {
					url: "/assets/Alfedena_Panorama-121.jpg",
					title: "Panorama-121",
					width: 1799,
					height: 1805,
				},
				fullSize: {
					url: "/assets/Alfedena_Panorama-121.jpg",
					title: "Panorama-121",
					width: 1799,
					height: 1805,
				},
			},
			{
				id: "2uNgtSReEMyOO4co04wSYa",
				title: "Panorama-122",
				thumbnail: {
					url: "/assets/Alfedena_Panorama-122.jpg",
					title: "Panorama-122",
					width: 1802,
					height: 1796,
				},
				fullSize: {
					url: "/assets/Alfedena_Panorama-122.jpg",
					title: "Panorama-122",
					width: 1802,
					height: 1796,
				},
			},
			{
				id: "1qoL1K7KiE86Awqcg0WGea",
				title: "Ruins-111",
				thumbnail: {
					url: "/assets/Alfedena_Ruins-111.jpg",
					title: "Ruins-111",
					width: 1790,
					height: 1802,
				},
				fullSize: {
					url: "/assets/Alfedena_Ruins-111.jpg",
					title: "Ruins-111",
					width: 1790,
					height: 1802,
				},
			},
			{
				id: "56jjfjLKoEca2IkgKyCYaw",
				title: "Ruins-112",
				thumbnail: {
					url: "/assets/Alfedena_Ruins-112.jpg",
					title: "Ruins-112",
					width: 1786,
					height: 1802,
				},
				fullSize: {
					url: "/assets/Alfedena_Ruins-112.jpg",
					title: "Ruins-112",
					width: 1786,
					height: 1802,
				},
			},
			{
				id: "7CueCNhQlOQcqQ080KaMuE",
				title: "Ruins-Apr46",
				thumbnail: {
					url: "/assets/Alfedena_Ruins-Apr_46.jpg",
					title: "Ruins-Apr46",
					width: 1774,
					height: 2121,
				},
				fullSize: {
					url: "/assets/Alfedena_Ruins-Apr_46.jpg",
					title: "Ruins-Apr46",
					width: 1774,
					height: 2121,
				},
			},
		],
	},
	{
		id: "3d31e232-b0c1-5466-8286-e2d344146398",
		year: 1946,
		title: "1946 Alfedena Relatives",
		content:
			"## A G.I.'s Visit to Alfedena\n\nGilbert DiLoreto visited relatives in Alfedena and Rome after World War II.",
		photos: [
			{
				id: "46a",
				title: "Woman Sitting on Balcony",
				thumbnail: {
					url: "/assets/Rome-_46a.jpg",
					title: "Woman Sitting on Balcony",
					width: 2331,
					height: 1815,
				},
				fullSize: {
					url: "/assets/Rome-_46a.jpg",
					title: "Woman Sitting on Balcony",
					width: 2331,
					height: 1815,
				},
			},
			{
				id: "46b",
				title: "Woman Standing on Balcony",
				thumbnail: {
					url: "/assets/Rome-_46b.jpg",
					title: "Woman Standing on Balcony",
					width: 2513,
					height: 1924,
				},
				fullSize: {
					url: "/assets/Rome-_46b.jpg",
					title: "Woman Standing on Balcony",
					width: 2513,
					height: 1924,
				},
			},
			{
				id: "46c",
				title: "Group Photo Balcony",
				thumbnail: {
					url: "/assets/Rome-_46c.jpg",
					title: "Group Photo Balcony",
					width: 2400,
					height: 1920,
				},
				fullSize: {
					url: "/assets/Rome-_46c.jpg",
					title: "Group Photo Balcony",
					width: 2400,
					height: 1920,
				},
			},
			{
				id: "46d",
				title: "Entire Family Photo",
				thumbnail: {
					url: "/assets/Alfedena-_46d.jpg",
					title: "Entire Family Photo",
					width: 2912,
					height: 2505,
				},
				fullSize: {
					url: "/assets/Alfedena-_46d.jpg",
					title: "Entire Family Photo",
					width: 2912,
					height: 2505,
				},
			},
			{
				id: "46e",
				title: "Man Behind Desk",
				thumbnail: {
					url: "/assets/Rome-_46e.jpg",
					title: "Man Behind Desk",
					width: 2396,
					height: 2396,
				},
				fullSize: {
					url: "/assets/Rome-_46e.jpg",
					title: "Man Behind Desk",
					width: 2396,
					height: 2396,
				},
			},
			{
				id: "46f",
				title: "Old Woman Looking Away",
				thumbnail: {
					url: "/assets/Rome-_46f.jpg",
					title: "Old Woman Looking Away",
					width: 2329,
					height: 2329,
				},
				fullSize: {
					url: "/assets/Rome-_46f.jpg",
					title: "Old Woman Looking Away",
					width: 2329,
					height: 2329,
				},
			},
			{
				id: "46g",
				title: "Parents and Child",
				thumbnail: {
					url: "/assets/Rome-_46g.jpg",
					title: "Parents and Child",
					width: 2404,
					height: 2404,
				},
				fullSize: {
					url: "/assets/Rome-_46g.jpg",
					title: "Parents and Child",
					width: 2404,
					height: 2404,
				},
			},
			{
				id: "46h",
				title: "Gilbert and Relatives",
				description:
					"Gilbert DiLoreto kneeling in center with other relatives.",
				thumbnail: {
					url: "/assets/Alfedena-_46h.jpg",
					title: "Gilbert and Relatives",
					width: 2403,
					height: 2403,
				},
				fullSize: {
					url: "/assets/Alfedena-_46h.jpg",
					title: "Gilbert and Relatives",
					width: 2403,
					height: 2403,
				},
			},
			{
				id: "46i",
				title: "Gilbert DiLoreto and Relatives",
				description: "Gilbert DiLoreto kneeling center with other relatives",
				thumbnail: {
					url: "/assets/Alfedena-89.jpg",
					title: "Gilbert DiLoreto and Relatives",
					width: 2418,
					height: 2954,
				},
				fullSize: {
					url: "/assets/Alfedena-89.jpg",
					title: "Gilbert DiLoreto and Relatives",
					width: 2418,
					height: 2954,
				},
			},
		],
	},
	{
		id: "d2ce9a47-836d-5a87-aa33-51f4d5a2689f",
		year: 1965,
		title: "1965",
		content:
			"## Family Reunion\n\nAbout 150 family members attended the DiLoreto family reunion in Harper Woods, Michigan. A genealogical database of more than 500 descendants has been compiled, tracing ancestors back to the mid-1600s.",
		photos: [
			{
				id: "5jGUjIKozKKCuqGmQmyk6E",
				title: "1965 Reunion Program",
				description: "DiLoreto Family Reunion Program (1965)",
				thumbnail: {
					url: "/assets/1965_reunion_program.gif",
					title: "1965 Reunion Program",
					width: 825,
					height: 633,
				},
				fullSize: {
					url: "/assets/1965_reunion_program.gif",
					title: "1965 Reunion Program",
					width: 825,
					height: 633,
				},
			},
			{
				id: "3ZjYAmxg2syaIa2gGSMK0g",
				title: "1600s Family Tree",
				description: "Family tree dating back to the mid-1600s",
				thumbnail: {
					url: "/assets/oldest_family_tree.gif",
					title: "1600s Family Tree",
					width: 428,
					height: 582,
				},
				fullSize: {
					url: "/assets/oldest_family_tree.gif",
					title: "1600s Family Tree",
					width: 428,
					height: 582,
				},
			},
		],
	},
	{
		id: "6246fc3d-1bd0-51c4-8742-3be9acc9d798",
		year: 1979,
		title: "1979",
		content:
			"## Armand DiGuilio's Report\n\n\"Where We Came From\" — An extensive historical and archaeological research paper presented at the 1979 DiLoreto family reunion. The report covers the history of Barrea and Alfedena, the Samnite tribes, the Roman conquest, migration patterns, Panfilo's career as City Clerk, the Gigante family origins, and land holdings.",
		photos: [],
	},
	{
		id: "8498606c-7a6e-564f-9be9-b11d70acee9c",
		year: 2004,
		title: "2004",
		content:
			"## Photos by Bob Brunetti\n\nJune 2004. Contact: rgbprocare1@americarecorp.com",
		photos: [
			{
				id: "img-339",
				title: "Garden near Sangro River",
				description:
					"A bridge and garden near the entrance to the village, over a branch of the Sangro River.",
				thumbnail: {
					url: "/assets/IMG_0339.JPG",
					title: "Garden near Sangro River",
					width: 2272,
					height: 1704,
				},
				fullSize: {
					url: "/assets/IMG_0339.JPG",
					title: "Garden near Sangro River",
					width: 2272,
					height: 1704,
				},
			},
			{
				id: "img-340",
				title: "Ancient Ruins",
				description: "Ancient ruins in Alfedena.",
				thumbnail: {
					url: "/assets/IMG_0340.JPG",
					title: "Ancient Ruins",
					width: 1704,
					height: 2272,
				},
				fullSize: {
					url: "/assets/IMG_0340.JPG",
					title: "Ancient Ruins",
					width: 1704,
					height: 2272,
				},
			},
			{
				id: "img-341",
				title: "Oldest Homes",
				description: "Oldest homes in Alfedena on Via Casili.",
				thumbnail: {
					url: "/assets/IMG_0341.JPG",
					title: "Oldest Homes",
					width: 1704,
					height: 2272,
				},
				fullSize: {
					url: "/assets/IMG_0341.JPG",
					title: "Oldest Homes",
					width: 1704,
					height: 2272,
				},
			},
			{
				id: "img-346",
				title: "Alfedena Stream",
				description: "Stream descending from mountains above Alfedena.",
				thumbnail: {
					url: "/assets/IMG_0346.JPG",
					title: "Alfedena Stream",
					width: 1704,
					height: 2272,
				},
				fullSize: {
					url: "/assets/IMG_0346.JPG",
					title: "Alfedena Stream",
					width: 1704,
					height: 2272,
				},
			},
			{
				id: "img-347",
				title: "Ancient Post Office Plaque",
				description:
					"Ancient post office on Ponte D'Achillewhich, renovated in 2002.",
				thumbnail: {
					url: "/assets/IMG_0347.JPG",
					title: "Ancient Post Office Plaque",
					width: 2272,
					height: 1704,
				},
				fullSize: {
					url: "/assets/IMG_0347.JPG",
					title: "Ancient Post Office Plaque",
					width: 2272,
					height: 1704,
				},
			},
			{
				id: "img-349",
				title: "Church Door",
				description:
					"13th century portal of the Church of Sts. Pietro e Paolo.",
				thumbnail: {
					url: "/assets/IMG_0349.JPG",
					title: "Church Door",
					width: 1704,
					height: 2272,
				},
				fullSize: {
					url: "/assets/IMG_0349.JPG",
					title: "Church Door",
					width: 1704,
					height: 2272,
				},
			},
			{
				id: "img-363",
				title: "Alfedena View 1",
				description:
					"Panorama of Alfedena with the Meta Range in the background.",
				thumbnail: {
					url: "/assets/IMG_0363.JPG",
					title: "Alfedena View 1",
					width: 2272,
					height: 1704,
				},
				fullSize: {
					url: "/assets/IMG_0363.JPG",
					title: "Alfedena View 1",
					width: 2272,
					height: 1704,
				},
			},
			{
				id: "img-364",
				title: "Alfedena View 2",
				description:
					"Panorama of Alfedena with the Meta Range in the background.",
				thumbnail: {
					url: "/assets/IMG_0364.JPG",
					title: "Alfedena View 2",
					width: 2272,
					height: 1704,
				},
				fullSize: {
					url: "/assets/IMG_0364.JPG",
					title: "Alfedena View 2",
					width: 2272,
					height: 1704,
				},
			},
			{
				id: "img-365",
				title: "Alfedena View 3",
				description:
					"Panorama of Alfedena with the Meta Range in the background.",
				thumbnail: {
					url: "/assets/IMG_0365.JPG",
					title: "Alfedena View 3",
					width: 2272,
					height: 1704,
				},
				fullSize: {
					url: "/assets/IMG_0365.JPG",
					title: "Alfedena View 3",
					width: 2272,
					height: 1704,
				},
			},
		],
	},
];
