import image4DiLoretoS1919Jpg from "~/assets/images/4_DiLoreto_s__1919.jpg?as=metadata";
import image1965ReunionProgramGif from "~/assets/images/1965_reunion_program.gif?as=metadata";
import alfedenaPanorama117Jpg from "~/assets/images/Alfedena_Panorama-117.jpg?as=metadata";
import alfedenaPanorama118Jpg from "~/assets/images/Alfedena_Panorama-118.jpg?as=metadata";
import alfedenaPanorama119Jpg from "~/assets/images/Alfedena_Panorama-119.jpg?as=metadata";
import alfedenaPanorama120Jpg from "~/assets/images/Alfedena_Panorama-120.jpg?as=metadata";
import alfedenaPanorama121Jpg from "~/assets/images/Alfedena_Panorama-121.jpg?as=metadata";
import alfedenaPanorama122Jpg from "~/assets/images/Alfedena_Panorama-122.jpg?as=metadata";
import alfedenaRuins111Jpg from "~/assets/images/Alfedena_Ruins-111.jpg?as=metadata";
import alfedenaRuins112Jpg from "~/assets/images/Alfedena_Ruins-112.jpg?as=metadata";
import alfedenaRuinsApr46Jpg from "~/assets/images/Alfedena_Ruins-Apr_46.jpg?as=metadata";
import alfedena46DJpg from "~/assets/images/Alfedena-_46d.jpg?as=metadata";
import alfedena46HJpg from "~/assets/images/Alfedena-_46h.jpg?as=metadata";
import alfedena89Jpg from "~/assets/images/Alfedena-89.jpg?as=metadata";
import abruzziMapJpg from "~/assets/images/abruzzi_map.jpg?as=metadata";
import alfedenaJpg from "~/assets/images/alfedena.jpg?as=metadata";
import coatofarmsGif from "~/assets/images/CoatofArms.gif?as=metadata";
import diloretoMapGif from "~/assets/images/DiLoreto_map.gif?as=metadata";
import diloretoDAmicoWeddingJpg from "~/assets/images/DiLoreto-D_Amico_Wedding.jpg?as=metadata";
import familytreeGif from "~/assets/images/FamilyTree.gif?as=metadata";
import freePress43Jpg from "~/assets/images/Free_Press-_43.jpg?as=metadata";
import img0339JPG from "~/assets/images/IMG_0339.JPG?as=metadata";
import img0340JPG from "~/assets/images/IMG_0340.JPG?as=metadata";
import img0341JPG from "~/assets/images/IMG_0341.JPG?as=metadata";
import img0346JPG from "~/assets/images/IMG_0346.JPG?as=metadata";
import img0347JPG from "~/assets/images/IMG_0347.JPG?as=metadata";
import img0349JPG from "~/assets/images/IMG_0349.JPG?as=metadata";
import img0364JPG from "~/assets/images/IMG_0364.JPG?as=metadata";
import mapAlfGif from "~/assets/images/Map_Alf.gif?as=metadata";
import nickMariaBoysJpg from "~/assets/images/Nick__Maria__Boys.jpg?as=metadata";
import oldestFamilyTreeGif from "~/assets/images/oldest_family_tree.gif?as=metadata";
import panfEufrJpg from "~/assets/images/Panf-Eufr.jpg?as=metadata";
import postcard01Gif from "~/assets/images/postcard-01.gif?as=metadata";
import postcard01AGif from "~/assets/images/postcard-01a.gif?as=metadata";
import postcard02Gif from "~/assets/images/postcard-02.gif?as=metadata";
import postcard03Gif from "~/assets/images/postcard-03.gif?as=metadata";
import postcard03AGif from "~/assets/images/postcard-03a.gif?as=metadata";
import postcard03BJpg from "~/assets/images/postcard-03b.jpg?as=metadata";
import postcard04Jpg from "~/assets/images/postcard-04.jpg?as=metadata";
import postcard04AGif from "~/assets/images/postcard-04a.gif?as=metadata";
import postcard05Jpg from "~/assets/images/postcard-05.jpg?as=metadata";
import postcard05AGif from "~/assets/images/postcard-05a.gif?as=metadata";
import postcard06Gif from "~/assets/images/postcard-06.gif?as=metadata";
import postcard06AGif from "~/assets/images/postcard-06a.gif?as=metadata";
import postcard07Gif from "~/assets/images/postcard-07.gif?as=metadata";
import postcard07AGif from "~/assets/images/postcard-07a.gif?as=metadata";
import postcard08Gif from "~/assets/images/postcard-08.gif?as=metadata";
import postcard08AGif from "~/assets/images/postcard-08a.gif?as=metadata";
import postcard09Gif from "~/assets/images/postcard-09.gif?as=metadata";
import postcard10Gif from "~/assets/images/postcard-10.gif?as=metadata";
import postcard11Gif from "~/assets/images/postcard-11.gif?as=metadata";
import postcard12Gif from "~/assets/images/postcard-12.gif?as=metadata";
import postcard13Gif from "~/assets/images/postcard-13.gif?as=metadata";
import postcard14Gif from "~/assets/images/postcard-14.gif?as=metadata";
import postcard15Gif from "~/assets/images/postcard-15.gif?as=metadata";
import postcard16Gif from "~/assets/images/postcard-16.gif?as=metadata";
import postcard17Gif from "~/assets/images/postcard-17.gif?as=metadata";
import postcard18Gif from "~/assets/images/postcard-18.gif?as=metadata";
import postcard19Gif from "~/assets/images/postcard-19.gif?as=metadata";
import postcard20Gif from "~/assets/images/postcard-20.gif?as=metadata";
import postcard21Gif from "~/assets/images/postcard-21.gif?as=metadata";
import remoJpg from "~/assets/images/Remo.jpg?as=metadata";
import rome46AJpg from "~/assets/images/Rome-_46a.jpg?as=metadata";
import rome46BJpg from "~/assets/images/Rome-_46b.jpg?as=metadata";
import rome46CJpg from "~/assets/images/Rome-_46c.jpg?as=metadata";
import rome46EJpg from "~/assets/images/Rome-_46e.jpg?as=metadata";
import rome46FJpg from "~/assets/images/Rome-_46f.jpg?as=metadata";
import rome46GJpg from "~/assets/images/Rome-_46g.jpg?as=metadata";
import wedding1911 from "~/assets/images/Wedding-1911.jpg?as=metadata";
import { type ContentImage, contentImage } from "./image";

export type GalleryPhoto = {
	id: string;
	title: string;
	link?: string;
	description?: string;
	image: ContentImage;
};

export type HistoryRecord = {
	id: string;
	year: number;
	title: string;
	content: string;
	link?: string;
	headerPhoto?: GalleryPhoto;
	galleryPhotos?: GalleryPhoto[];
};

export const familyHistory: HistoryRecord[] = [
	{
		id: "17745bfb-af75-54c9-a34d-c1746af6896a",
		year: 996,
		title: "996 - 1330",
		link: "http://www.gens.info/italia/it/turismo-viaggi-e-tradizioni-italia?t=cognomi&cognome=di+loreto&x=33&y=9#.WJD7TrYrLMU",
		content:
			"## Historical and Heraldic Information on the DiLoreto Stock\n\nExcerpts from the Istituto Genealogico Italiano:\n\n\"The family descends from D'Aquino stock of Longobard origin, whose forefather was Atenolfo, Lord of Capua in 996. Among the feudal holdings of this important family were L'Aquila, Alvito, Loreto and many others. The branch of the family that became known as DI LORETO presumably took its surname from the town of Loreto, their feudal holding. The first DI LORETO of documented record is one Berardo in 1330.\"",
		headerPhoto: {
			id: "6MWMDjUUhOc2A0GQWSwAkw",
			title: "DiLoreto map",
			description: "How many DiLoretos live in Italy?",
			image: contentImage("DiLoreto map", diloretoMapGif),
		},
	},
	{
		id: "90a0403d-80c4-54e2-92e0-9ed3e4ae5a26",
		year: 1295,
		title: "1295 - 1528",
		content:
			'## Excerpts from "The Historical Research Center"\n\nSubmitted by Joanne Monroe (1993):\n\n"The surname Loreto is of Italian origin, and is a locational name from the famous town of Loreto in the province of Ancona in Italy. Loreto became famous through the legend of the \'Holy House,\' where tradition states that the house where the Virgin Mary lived and was visited by the Angel, was miraculously carried to Loreto in 1295 by angels from the Holy Land."\n\n"In the 14th century, a family named Di Loreto, having originated in the above-named town, became quite prominent. The first documented reference to the name was in 1528, when one Luca di Loreto was recorded. It is from this point in time that the ancestral history of the family began to be carefully followed."',
		headerPhoto: {
			id: "2BW7hGmbScQIOswsgW4iqC",
			title: "Alfedena Homestead",
			description:
				"Location of DiLoreto Homestead in Alfedena, L'Aquila, Italy.",
			image: contentImage("Alfedena Homestead", mapAlfGif),
		},
	},
	{
		id: "0519efcf-f3b4-59f7-b1bb-098307702ffd",
		year: 1600,
		title: "Coat of Arms - DiLoreto Family of Genua",
		content:
			'## Coat of Arms\n\nBlazon: "Azure, a tree on a grassy plain all proper, overall a fess gules."\n\nThe tree signifies antiquity and knowledge. The fesse represents the military belt of honor. Crest: Three ostrich plumes. Origin: Italy.',
		headerPhoto: {
			id: "4WNoguuxpu2QQyuIgYAG4u",
			title: "DiLoreto Coat of Arms",
			image: contentImage("DiLoreto Coat of Arms", coatofarmsGif),
		},
	},
	{
		id: "6abc310f-778f-5074-b304-66166edf5b1c",
		year: 1601,
		title: "1600s",
		content:
			"## We Came from Alfedena\n\nAlfedena is a comune (municipality) in the Province of L'Aquila in the Abruzzo region of Italy. A small village of about 700 inhabitants, it sits along the Sangro River in a narrow valley at about 3,000 feet elevation.",
		headerPhoto: {
			id: "7CQlbPj5SgqGu2G4cSQu64",
			title: "Map of Abruzzo",
			description: "Map of Abruzzo pointing to Alfedena at the bottom",
			image: contentImage("Map of Abruzzo", abruzziMapJpg),
		},
	},
	{
		id: "0a464ab4-b7e3-5110-8eab-98d7a89f4d3c",
		year: 1886,
		title: "1886",
		link: "https://www.facebook.com/groups/Alfedena/",
		content:
			'## The Loyal Wing Club\n\nMigration from Alfedena to Detroit began in 1886, with about 100 arriving by 1900. By 1960, there were 1,680 Alfedenese in Detroit (compared to 1,430 in Alfedena itself), and by 1979 that number had grown to 2-3 thousand.\n\nThe Loyal Wing Club ("Club Ala Fidente") was founded in 1919 by the Alfedenese community in Detroit. The club\'s name derives from the legend that Alfedena defended the right wing of the army of Rome against Hannibal in 216 BC.',
		headerPhoto: {
			id: "1VEKHlk0yMWQG6OeieCcsq",
			title: "Alfedena View",
			description: "Loyal Wing Club's Facebook Group",
			image: contentImage("Alfedena View", alfedenaJpg),
		},
	},
	{
		id: "5c08bf87-119e-572b-96fa-cc8c1e9a413b",
		year: 1909,
		title: "1909",
		content:
			"## Immigration to the U.S.\n\nRemo DiLoreto, one of 13 children of Panfilo and Eufrasia Gigante, emigrated to the United States. He married Marianna D'Amico in 1911 (one of 11 children). They settled in the Eastern Market area of Detroit. Their children were: Panfilo, Oscar, Gilbert, and Emma.",
		galleryPhotos: [
			{
				id: "6oP8CPUVTq8woyiG6iMG4e",
				title: "Family Tree",
				description: "Hand-drawn family tree (1797-1938)",
				image: contentImage("Family Tree", familytreeGif),
			},
			{
				id: "4EA3845Ya4Oikc8EgEOUq0",
				title: "Panfilo and Eufrasia DiLoreto",
				description: "Panfilo (1847-1920) & Eufrasia (1854-1928)",
				image: contentImage("Panfilo and Eufrasia DiLoreto", panfEufrJpg),
			},
			{
				id: "2Z2FuBc1JK8Mc4K0oCEUmk",
				title: "Remo DiLoreto",
				description: "Remo DiLoreto",
				image: contentImage("Remo DiLoreto", remoJpg),
			},
		],
	},
	{
		id: "asdf",
		year: 1911,
		title: "1911-1913 Weddings",
		content: "",
		galleryPhotos: [
			{
				id: "asdf-1",
				title: "The wedding of Remo DiLoreto and Marianna D'Amico (1911)",
				description: "The wedding of Remo DiLoreto and Marianna D'Amico (1911)",
				image: contentImage("Remo and Marianna Wedding Photo", wedding1911),
			},
			{
				id: "1QWRvhoJlGawIAgaY0i04o",
				title: "1913 Wedding",
				description:
					"The wedding of Gaetano D'Amico and Cleonice DiLoreto with Remo and Marianna (D'Amico) DiLoreto (Aug. 23, 1913).",
				image: contentImage("1913 Wedding", diloretoDAmicoWeddingJpg),
			},
		],
	},
	{
		id: "8a7b896c-bcc3-5d6c-8138-d64f6e91c1a4",
		year: 1913,
		title: "1913 - 1923 Postcards",
		content:
			"## Antique Postcards from Alfedena, Italy\n\nThese postcards were sent between 1913 and 1923, between family members in Alfedena and those who had emigrated to Detroit and Rochester.",
		galleryPhotos: [
			{
				id: "pc-04a",
				title: "postcard-04a",
				image: contentImage("postcard-04a", postcard04AGif),
			},
			{
				id: "pc-04",
				title: "postcard-04",
				image: contentImage("postcard-04", postcard04Jpg),
			},
			{
				id: "pc-06a",
				title: "postcard-06a",
				image: contentImage("postcard-06a", postcard06AGif),
			},
			{
				id: "pc-06",
				title: "postcard-06",
				image: contentImage("postcard-06", postcard06Gif),
			},
			{
				id: "pc-01",
				title: "postcard-01",
				image: contentImage("postcard-01", postcard01Gif),
			},
			{
				id: "pc-01a",
				title: "postcard-01a",
				image: contentImage("postcard-01a", postcard01AGif),
			},
			{
				id: "pc-02",
				title: "postcard-02",
				image: contentImage("postcard-02", postcard02Gif),
			},
			{
				id: "pc-03",
				title: "postcard-03",
				image: contentImage("postcard-03", postcard03Gif),
			},
			{
				id: "pc-03a",
				title: "postcard-03a",
				image: contentImage("postcard-03a", postcard03AGif),
			},
			{
				id: "pc-03b",
				title: "postcard-03b",
				image: contentImage("postcard-03b", postcard03BJpg),
			},
			{
				id: "pc-05",
				title: "postcard-05",
				image: contentImage("postcard-05", postcard05Jpg),
			},
			{
				id: "pc-05a",
				title: "postcard-05a",
				image: contentImage("postcard-05a", postcard05AGif),
			},
			{
				id: "pc-07",
				title: "postcard-07",
				image: contentImage("postcard-07", postcard07Gif),
			},
			{
				id: "pc-07a",
				title: "postcard-07a",
				image: contentImage("postcard-07a", postcard07AGif),
			},
			{
				id: "pc-08",
				title: "postcard-08",
				image: contentImage("postcard-08", postcard08Gif),
			},
			{
				id: "pc-08a",
				title: "postcard-08a",
				image: contentImage("postcard-08a", postcard08AGif),
			},
			{
				id: "pc-09",
				title: "postcard-09",
				image: contentImage("postcard-09", postcard09Gif),
			},
			{
				id: "pc-10",
				title: "postcard-10",
				image: contentImage("postcard-10", postcard10Gif),
			},
			{
				id: "pc-11",
				title: "postcard-11",
				image: contentImage("postcard-11", postcard11Gif),
			},
			{
				id: "pc-12",
				title: "postcard-12",
				image: contentImage("postcard-12", postcard12Gif),
			},
			{
				id: "pc-13",
				title: "postcard-13",
				image: contentImage("postcard-13", postcard13Gif),
			},
			{
				id: "pc-14",
				title: "postcard-14",
				image: contentImage("postcard-14", postcard14Gif),
			},
			{
				id: "pc-15",
				title: "postcard-15",
				image: contentImage("postcard-15", postcard15Gif),
			},
			{
				id: "pc-16",
				title: "postcard-16",
				image: contentImage("postcard-16", postcard16Gif),
			},
			{
				id: "pc-17",
				title: "postcard-17",
				image: contentImage("postcard-17", postcard17Gif),
			},
			{
				id: "pc-18",
				title: "postcard-18",
				image: contentImage("postcard-18", postcard18Gif),
			},
			{
				id: "pc-19",
				title: "postcard-19",
				image: contentImage("postcard-19", postcard19Gif),
			},
			{
				id: "pc-20",
				title: "postcard-20",
				image: contentImage("postcard-20", postcard20Gif),
			},
			{
				id: "pc-21",
				title: "postcard-21",
				image: contentImage("postcard-21", postcard21Gif),
			},
		],
	},
	{
		id: "fd714f2f-1de3-5c21-89b2-f304fc53c4f8",
		year: 1919,
		title: "circa 1919",
		content:
			"Photo of DiLoreto children, c. 1919. If you have additional information about this photo, please contact us.",
		headerPhoto: {
			id: "1CsIOc1X16i8CsGooCq6gS",
			title: "DiLoreto Children",
			description: "DiLoreto children (c. 1919)",
			image: contentImage("DiLoreto Children", image4DiLoretoS1919Jpg),
		},
	},
	{
		id: "2553f8cb-62f6-5eed-880e-fa6619959e09",
		year: 1938,
		title: "circa 1938",
		content:
			"## Nick & Mary's Store in Erie, PA\n\nNick and Mary (Monacelli) DiLoreto with sons William and Julio.",
		headerPhoto: {
			id: "3csKu33bNmKAwQoWwi8sOI",
			title: "Nick & Mary's Store",
			description:
				"Nick and Mary (Monacelli) DiLoreto with sons William and Julio in their store in Erie, PA.",
			image: contentImage("Nick & Mary's Store", nickMariaBoysJpg),
		},
	},
	{
		id: "afb11289-7a2c-557c-b341-f439c825e56a",
		year: 1943,
		title: "1943 - Detroit Free Press Article",
		content:
			"## Remo DiLoreto's Life in America Exemplifies Strength of U.S. System\n\nBy Paul M. Deac, Detroit Free Press, 1943\n\nThe article chronicles Remo DiLoreto's journey from Alfedena, Italy to Detroit, where he built a successful life as a tile setter and raised a family. It details his apprenticeship, difficult early days, path to citizenship, and the achievements of his four children: Oscar (auto worker), Gilbert (soldier), Panfilo (draftsman), and Emma.",
		headerPhoto: {
			id: "3tgnMYScl2MCY4MGUEgI4u",
			title: "1943 Detroit Free Press Article",
			image: contentImage("1943 Detroit Free Press Article", freePress43Jpg),
		},
	},
	{
		id: "a9c5c077-73a8-532a-a3d1-1b71eaf0c490",
		year: 1946,
		title: "1946 Landscape Photos",
		content:
			"## A G.I.'s Visit to Alfedena\n\nThese photos were taken by Gilbert DiLoreto during his visit to Alfedena in 1946.",
		galleryPhotos: [
			{
				id: "3bMB7ujmUUcAKgCQ2cg6Sy",
				title: "Panorama-117",
				image: contentImage("Panorama-117", alfedenaPanorama117Jpg),
			},
			{
				id: "1M3o63t5s4eygEeYOgQSEi",
				title: "Panorama-118",
				image: contentImage("Panorama-118", alfedenaPanorama118Jpg),
			},
			{
				id: "5HrMcBMFwc4ieuwc26YyEe",
				title: "Panorama-119",
				image: contentImage("Panorama-119", alfedenaPanorama119Jpg),
			},
			{
				id: "43xKCWXf2oIskQIuageaAi",
				title: "Panorama-120",
				image: contentImage("Panorama-120", alfedenaPanorama120Jpg),
			},
			{
				id: "6ewiemQN6os02AgQQwqmYs",
				title: "Panorama-121",
				image: contentImage("Panorama-121", alfedenaPanorama121Jpg),
			},
			{
				id: "2uNgtSReEMyOO4co04wSYa",
				title: "Panorama-122",
				image: contentImage("Panorama-122", alfedenaPanorama122Jpg),
			},
			{
				id: "1qoL1K7KiE86Awqcg0WGea",
				title: "Ruins-111",
				image: contentImage("Ruins-111", alfedenaRuins111Jpg),
			},
			{
				id: "56jjfjLKoEca2IkgKyCYaw",
				title: "Ruins-112",
				image: contentImage("Ruins-112", alfedenaRuins112Jpg),
			},
			{
				id: "7CueCNhQlOQcqQ080KaMuE",
				title: "Ruins-Apr46",
				image: contentImage("Ruins-Apr46", alfedenaRuinsApr46Jpg),
			},
		],
	},
	{
		id: "3d31e232-b0c1-5466-8286-e2d344146398",
		year: 1946,
		title: "1946 Alfedena Relatives",
		content:
			"## A G.I.'s Visit to Alfedena\n\nGilbert DiLoreto visited relatives in Alfedena and Rome after World War II.",
		galleryPhotos: [
			{
				id: "46a",
				title: "Woman Sitting on Balcony",
				image: contentImage("Woman Sitting on Balcony", rome46AJpg),
			},
			{
				id: "46b",
				title: "Woman Standing on Balcony",
				image: contentImage("Woman Standing on Balcony", rome46BJpg),
			},
			{
				id: "46c",
				title: "Group Photo Balcony",
				image: contentImage("Group Photo Balcony", rome46CJpg),
			},
			{
				id: "46d",
				title: "Entire Family Photo",
				image: contentImage("Entire Family Photo", alfedena46DJpg),
			},
			{
				id: "46e",
				title: "Man Behind Desk",
				image: contentImage("Man Behind Desk", rome46EJpg),
			},
			{
				id: "46f",
				title: "Old Woman Looking Away",
				image: contentImage("Old Woman Looking Away", rome46FJpg),
			},
			{
				id: "46g",
				title: "Parents and Child",
				image: contentImage("Parents and Child", rome46GJpg),
			},
			{
				id: "46h",
				title: "Gilbert and Relatives",
				description:
					"Gilbert DiLoreto kneeling in center with other relatives.",
				image: contentImage("Gilbert and Relatives", alfedena46HJpg),
			},
			{
				id: "46i",
				title: "Gilbert DiLoreto and Relatives",
				description: "Gilbert DiLoreto kneeling center with other relatives",
				image: contentImage("Gilbert DiLoreto and Relatives", alfedena89Jpg),
			},
		],
	},
	{
		id: "d2ce9a47-836d-5a87-aa33-51f4d5a2689f",
		year: 1965,
		title: "1965",
		content:
			"## Family Reunion\n\nAbout 150 family members attended the DiLoreto family reunion in Harper Woods, Michigan. A genealogical database of more than 500 descendants has been compiled, tracing ancestors back to the mid-1600s.",
		galleryPhotos: [
			{
				id: "5jGUjIKozKKCuqGmQmyk6E",
				title: "1965 Reunion Program",
				description: "DiLoreto Family Reunion Program (1965)",
				image: contentImage("1965 Reunion Program", image1965ReunionProgramGif),
			},
			{
				id: "3ZjYAmxg2syaIa2gGSMK0g",
				title: "1600s Family Tree",
				description: "Family tree dating back to the mid-1600s",
				image: contentImage("1600s Family Tree", oldestFamilyTreeGif),
			},
		],
	},
	{
		id: "6246fc3d-1bd0-51c4-8742-3be9acc9d798",
		year: 1979,
		title: "1979",
		content:
			"## Armand DiGuilio's Report\n\n\"Where We Came From\" — An extensive historical and archaeological research paper presented at the 1979 DiLoreto family reunion. The report covers the history of Barrea and Alfedena, the Samnite tribes, the Roman conquest, migration patterns, Panfilo's career as City Clerk, the Gigante family origins, and land holdings.",
	},
	{
		id: "8498606c-7a6e-564f-9be9-b11d70acee9c",
		year: 2004,
		title: "2004",
		content:
			"## Photos by Bob Brunetti\n\nJune 2004. Contact: rgbprocare1@americarecorp.com",
		galleryPhotos: [
			{
				id: "img-339",
				title: "Garden near Sangro River",
				description:
					"A bridge and garden near the entrance to the village, over a branch of the Sangro River.",
				image: contentImage("Garden near Sangro River", img0339JPG),
			},
			{
				id: "img-340",
				title: "Ancient Ruins",
				description: "Ancient ruins in Alfedena.",
				image: contentImage("Ancient Ruins", img0340JPG),
			},
			{
				id: "img-341",
				title: "Oldest Homes",
				description: "Oldest homes in Alfedena on Via Casili.",
				image: contentImage("Oldest Homes", img0341JPG),
			},
			{
				id: "img-346",
				title: "Alfedena Stream",
				description: "Stream descending from mountains above Alfedena.",
				image: contentImage("Alfedena Stream", img0346JPG),
			},
			{
				id: "img-347",
				title: "Ancient Post Office Plaque",
				description:
					"Ancient post office on Ponte D'Achillewhich, renovated in 2002.",
				image: contentImage("Ancient Post Office Plaque", img0347JPG),
			},
			{
				id: "img-349",
				title: "Church Door",
				description:
					"13th century portal of the Church of Sts. Pietro e Paolo.",
				image: contentImage("Church Door", img0349JPG),
			},
			{
				id: "img-364",
				title: "Alfedena View",
				description:
					"Panorama of Alfedena with the Meta Range in the background.",
				image: contentImage("Alfedena View", img0364JPG),
			},
		],
	},
];
