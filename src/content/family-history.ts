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
import damicoFamilyTreeJpg from "~/assets/images/damico-family-tree.jpg?as=metadata";
import familytreeGif from "~/assets/images/FamilyTree.gif?as=metadata";
import freePress43Jpg from "~/assets/images/Free_Press-_43.jpg?as=metadata";
import farm1909 from "~/assets/images/farm1909.png?as=metadata";
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
	title: string;
	link?: string;
	description?: string;
	image: ContentImage;
};

export type HistoryRecord = {
	year: number;
	title: string;
	content: string;
	link?: string;
	headerPhoto?: GalleryPhoto;
	galleryPhotos?: GalleryPhoto[];
};

export const familyHistory: HistoryRecord[] = [
	{
		year: 996,
		title: "996 - 1330",
		link: "http://www.gens.info/italia/it/turismo-viaggi-e-tradizioni-italia?t=cognomi&cognome=di+loreto&x=33&y=9#.WJD7TrYrLMU",
		content:
			"## Historical and Heraldic Information on the DiLoreto Stock\n\nExcerpts from the Istituto Genealogico Italiano:\n\n\"The family descends from D'Aquino stock of Longobard origin, whose forefather was Atenolfo, Lord of Capua in 996. Among the feudal holdings of this important family were L'Aquila, Alvito, Loreto and many others. The branch of the family that became known as DI LORETO presumably took its surname from the town of Loreto, their feudal holding. The first DI LORETO of documented record is one Berardo in 1330.\"",
		headerPhoto: {
			title: "DiLoreto map",
			description: "How many DiLoretos live in Italy?",
			image: contentImage("DiLoreto map", diloretoMapGif),
		},
	},
	{
		year: 1295,
		title: "1295 - 1528",
		content:
			'## Excerpts from "The Historical Research Center"\n\nSubmitted by Joanne Monroe (1993):\n\n"The surname Loreto is of Italian origin, and is a locational name from the famous town of Loreto in the province of Ancona in Italy. Loreto became famous through the legend of the \'Holy House,\' where tradition states that the house where the Virgin Mary lived and was visited by the Angel, was miraculously carried to Loreto in 1295 by angels from the Holy Land."\n\n"In the 14th century, a family named Di Loreto, having originated in the above-named town, became quite prominent. The first documented reference to the name was in 1528, when one Luca di Loreto was recorded. It is from this point in time that the ancestral history of the family began to be carefully followed."',
		headerPhoto: {
			title: "Alfedena Homestead",
			description:
				"Location of DiLoreto Homestead in Alfedena, L'Aquila, Italy.",
			image: contentImage("Alfedena Homestead", mapAlfGif),
		},
	},
	{
		year: 1600,
		title: "Coat of Arms - DiLoreto Family of Genua",
		content:
			'## Coat of Arms\n\nBlazon: "Azure, a tree on a grassy plain all proper, overall a fess gules."\n\nThe tree signifies antiquity and knowledge. The fesse represents the military belt of honor. Crest: Three ostrich plumes. Origin: Italy.',
		headerPhoto: {
			title: "DiLoreto Coat of Arms",
			image: contentImage("DiLoreto Coat of Arms", coatofarmsGif),
		},
	},
	{
		year: 1600,
		title: "Family Trees",
		content: "",
		galleryPhotos: [
			{
				title: "Family Tree",
				description: "Hand-drawn family tree (1797-1938)",
				image: contentImage("Family Tree", familytreeGif),
			},
			{
				title: "1600s Family Tree",
				description: "Family tree dating back to the mid-1600s",
				image: contentImage("1600s Family Tree", oldestFamilyTreeGif),
			},
			{
				title: "D'Amico Family Tree",
				description: "D'Amico family tree",
				image: contentImage("D'Amico Family Tree", damicoFamilyTreeJpg),
			},
		],
	},
	{
		year: 1601,
		title: "1600s",
		content:
			"## We Came from Alfedena\n\nAlfedena is a comune (municipality) in the Province of L'Aquila in the Abruzzo region of Italy. A small village of about 700 inhabitants, it sits along the Sangro River in a narrow valley at about 3,000 feet elevation.",
		headerPhoto: {
			title: "Map of Abruzzo",
			description: "Map of Abruzzo pointing to Alfedena at the bottom",
			image: contentImage("Map of Abruzzo", abruzziMapJpg),
		},
	},
	{
		year: 1886,
		title: "1886",
		link: "https://www.facebook.com/groups/Alfedena/",
		content:
			'## The Loyal Wing Club\n\nMigration from Alfedena to Detroit began in 1886, with about 100 arriving by 1900. By 1960, there were 1,680 Alfedenese in Detroit (compared to 1,430 in Alfedena itself), and by 1979 that number had grown to 2-3 thousand.\n\nThe Loyal Wing Club ("Club Ala Fidente") was founded in 1919 by the Alfedenese community in Detroit. The club\'s name derives from the legend that Alfedena defended the right wing of the army of Rome against Hannibal in 216 BC.',
		headerPhoto: {
			title: "Alfedena View",
			description: "Loyal Wing Club's Facebook Group",
			image: contentImage("Alfedena View", alfedenaJpg),
		},
	},
	{
		year: 1909,
		title: "1909",
		content:
			"## Immigration to the U.S.\n\nRemo DiLoreto, one of 13 children of Panfilo and Eufrasia Gigante, emigrated to the United States. He married Marianna D'Amico in 1911 (one of 11 children). They settled in the Eastern Market area of Detroit. Their children were: Panfilo, Oscar, Gilbert, and Emma.",
		galleryPhotos: [
			{
				title: "Panfilo and Eufrasia DiLoreto",
				description: "Panfilo (1847-1920) & Eufrasia (1854-1928)",
				image: contentImage("Panfilo and Eufrasia DiLoreto", panfEufrJpg),
			},
			{
				title: "Remo DiLoreto",
				description: "Remo DiLoreto",
				image: contentImage("Remo DiLoreto", remoJpg),
			},
		],
	},
	{
		year: 1909,
		title: "1909-1910",
		content: `## Camillo D'Amico's farm, around 1909-1910

Back row: Gaetano, Remo, Marianna, Pasqualino (Pat)

Front row: Quindo, Rosa Passarelli D'Amico, Lydia, Amelia, Camillo, and Josephine
`,
		headerPhoto: {
			title: "Family photo at Camillo D'Amico's farm (1909-1910)",
			description: "Family photo at Camillo D'Amico's farm (1909-1910)",
			image: contentImage(
				"Family photo at Camillo D'Amico's farm (1909-1910)",
				farm1909,
			),
		},
	},
	{
		year: 1911,
		title: "1911-1913 Weddings",
		content: `The headline in The Rochester Democratic and Chronicle on 02.13.1911 read: DiLoreto-D’Amico, Largely Attended Wedding in Church in Hulberton, and stated it was one of the largest church weddings in Orleans country in many months. Donatelli’s Orchestra played the wedding march. Over 150 invited guests witnessed the ceremony.

“After the ceremony, a wedding dinner was served to 150 guests at the farm home of the bride’s parents. Forty were seated at the bride’s table, while the other guests were seated at smaller tables in various rooms of the home. The event was made of the occasion of the Passarelli family reunion.

“Following the Italian custom, there will be no honeymoon trip, but several days will be given to entertainment and social gatherings. The bride is well known in this village, where her father formerly conducted a store in East Bank Street, and she is a graduate of the Brockport Normal School (a school to prepare students for careers in education).`,
		galleryPhotos: [
			{
				title:
					"The wedding of Remo DiLoreto and Marianna D'Amico (Feb. 12, 1911)",
				description:
					"The wedding of Remo DiLoreto and Marianna D'Amico (Feb. 12, 1911)",
				image: contentImage("Remo and Marianna Wedding Photo", wedding1911),
			},
			{
				title: "1913 Wedding",
				description:
					"The wedding of Gaetano D'Amico and Cleonice DiLoreto with Remo and Marianna (D'Amico) DiLoreto (Aug. 23, 1913).",
				image: contentImage("1913 Wedding", diloretoDAmicoWeddingJpg),
			},
		],
	},
	{
		year: 1913,
		title: "1913 - 1923 Postcards",
		content:
			"## Antique Postcards from Alfedena, Italy\n\nThese postcards were sent between 1913 and 1923, between family members in Alfedena and those who had emigrated to Detroit and Rochester.",
		galleryPhotos: [
			{
				title: "postcard-04a",
				image: contentImage("postcard-04a", postcard04AGif),
			},
			{
				title: "postcard-04",
				image: contentImage("postcard-04", postcard04Jpg),
			},
			{
				title: "postcard-06a",
				image: contentImage("postcard-06a", postcard06AGif),
			},
			{
				title: "postcard-06",
				image: contentImage("postcard-06", postcard06Gif),
			},
			{
				title: "postcard-01",
				image: contentImage("postcard-01", postcard01Gif),
			},
			{
				title: "postcard-01a",
				image: contentImage("postcard-01a", postcard01AGif),
			},
			{
				title: "postcard-02",
				image: contentImage("postcard-02", postcard02Gif),
			},
			{
				title: "postcard-03",
				image: contentImage("postcard-03", postcard03Gif),
			},
			{
				title: "postcard-03a",
				image: contentImage("postcard-03a", postcard03AGif),
			},
			{
				title: "postcard-03b",
				image: contentImage("postcard-03b", postcard03BJpg),
			},
			{
				title: "postcard-05",
				image: contentImage("postcard-05", postcard05Jpg),
			},
			{
				title: "postcard-05a",
				image: contentImage("postcard-05a", postcard05AGif),
			},
			{
				title: "postcard-07",
				image: contentImage("postcard-07", postcard07Gif),
			},
			{
				title: "postcard-07a",
				image: contentImage("postcard-07a", postcard07AGif),
			},
			{
				title: "postcard-08",
				image: contentImage("postcard-08", postcard08Gif),
			},
			{
				title: "postcard-08a",
				image: contentImage("postcard-08a", postcard08AGif),
			},
			{
				title: "postcard-09",
				image: contentImage("postcard-09", postcard09Gif),
			},
			{
				title: "postcard-10",
				image: contentImage("postcard-10", postcard10Gif),
			},
			{
				title: "postcard-11",
				image: contentImage("postcard-11", postcard11Gif),
			},
			{
				title: "postcard-12",
				image: contentImage("postcard-12", postcard12Gif),
			},
			{
				title: "postcard-13",
				image: contentImage("postcard-13", postcard13Gif),
			},
			{
				title: "postcard-14",
				image: contentImage("postcard-14", postcard14Gif),
			},
			{
				title: "postcard-15",
				image: contentImage("postcard-15", postcard15Gif),
			},
			{
				title: "postcard-16",
				image: contentImage("postcard-16", postcard16Gif),
			},
			{
				title: "postcard-17",
				image: contentImage("postcard-17", postcard17Gif),
			},
			{
				title: "postcard-18",
				image: contentImage("postcard-18", postcard18Gif),
			},
			{
				title: "postcard-19",
				image: contentImage("postcard-19", postcard19Gif),
			},
			{
				title: "postcard-20",
				image: contentImage("postcard-20", postcard20Gif),
			},
			{
				title: "postcard-21",
				image: contentImage("postcard-21", postcard21Gif),
			},
		],
	},
	{
		year: 1919,
		title: "circa 1919",
		content:
			"Photo of DiLoreto children, c. 1919. If you have additional information about this photo, please contact us.",
		headerPhoto: {
			title: "DiLoreto Children",
			description: "DiLoreto children (c. 1919)",
			image: contentImage("DiLoreto Children", image4DiLoretoS1919Jpg),
		},
	},
	{
		year: 1938,
		title: "circa 1938",
		content:
			"## Nick & Mary's Store in Erie, PA\n\nNick and Mary (Monacelli) DiLoreto with sons William and Julio.",
		headerPhoto: {
			title: "Nick & Mary's Store",
			description:
				"Nick and Mary (Monacelli) DiLoreto with sons William and Julio in their store in Erie, PA.",
			image: contentImage("Nick & Mary's Store", nickMariaBoysJpg),
		},
	},
	{
		year: 1943,
		title: "1943 - Detroit Free Press Article",
		content: `The article chronicles Remo DiLoreto's journey from Alfedena, Italy to Detroit, where he built a successful life as a tile setter and raised a family. It details his apprenticeship, difficult early days, path to citizenship, and the achievements of his four children: Oscar (auto worker), Gilbert (soldier), Panfilo (draftsman), and Emma.

Read the text version of this article below.

---

## Remo DiLoreto's Life in America Exemplifies Strength of U.S. System

**by Paul M. Deac (Free Press Cosmopolitan Editor)**

Since he came to this country from Italy in 1902 at the age of 16, Remo DiLoreto, fifty-eight-year-old Ford tool-and-die maker has averaged no more than $35 a week. Yet he owns his own two-family home at 3331 Charlevoix and has put his three sons through college and a daughter, no married, through high school.

DiLoreto inherited this inclination for thrift and planning ahead from his parents, who reared 13 children on a small farm in the Italian province of Abruzzi.

### Becomes Apprentice

To make ends meet, the children were compelled to strike out for themselves as soon as they could be of any use to an employer. At the age of 12 Remo DiLoreto became an apprentice in a shoe shop. There he learned to cut shoes to measure for the village folk. He learned little during the first two years as he was too busy doing unpleasant chores for his employer. He was moved up when an older apprentice left and a younger one came to replace him.

Whatever money he earned went to his parents who needed it badly. For the young apprentice, those days were all work and no fun.

### Difficult Days

Says DiLoreto reminiscing about his past:

> "Those were bitter days when I look at them in the light of the American way of life, but at least they taught me what a serious thing life is and that one should not expect something for nothing."

Armed with this practical philosophy, DiLoreto arrived in Falls Creek, Pa., to join three brothers who preceded him to this country. Not knowing the language, he could not find employment in his trade, so he accepted a job as stonecutter with a Pennsylvania contractor. The work was hard, but the sixteen-year-old immigrant had no choice. Besides paying for his trip, he had to save money to help bring the rest of the family to America.

### Becomes a Citizen

The year 1911 was a milestone in DiLoreto's life. That is when he became an American citizen and then married. Mrs. DiLoreto was the second child of a family of nine. Her parents operated a farm near Albion, N.Y., when she met her future husband.

Tired of hammering huge blocks of stone, DiLoreto moved to Detroit in 1915 to try his luck in the Motor City's factories. In 1916, although married and the father of two children, he took up tool-and-die making at the Ford Trade School. He has been with the Ford Motor Co. since that time.

The hard work he went through in his younger days is beginning to tell on his health. His children have begged him to stop working, but his pride and love for his country keep him going.

### Victory First

To his doctor, who ordered him to retire, DiLoreto answered:

> "I will the very day this war is won. But right now it would be a shame for any able-bodied American to loaf around while our nation is struggling for its life."

DiLoreto holds no brief for Mussolini or the Italian brand of Fascism. He simply is not interested in Italian politics, he says. His life and the existence of his four children are tied to the fate of this country, not that of Italy. Therefore, although he still has a tender feeling for the scenes of his childhood in sunny Italy, America comes first.

### Played in Orchestra

In his spare time, DiLoreto learned to play several instruments. At one time he played a guitar in a mandolin-guitar orchestra which won an audition at one of the Detroit radio stations in 1939. Nor has he been inactive socially. He is a charter member of the Loyal Wing Club, an Italian organization made up of natives of the Italian village of Alfedena. At present the club has branches in several American cities.

The Diloretos' four children are: Panfilo, 30, a medical doctor who was graduated from the University of Michigan in 1938. He practiced two years following which he enlisted in the Army. He now is serving as lieutenant with the medical corps in Iceland.

Emma, a daughter, is now married to Joseph Concilio, a radius-grinder with the National Tool & Twist Co. They live in the upper flat in the DiLoreto home on Charlevoix.

Oscar, 26, a dentist with offices at 3413 McDougall, volunteered but was turned down by the Army. He is considered more useful on the home front. He too, like his two brothers, is a graduate of the University of Michigan.

Gilbert, 24, is waiting to be called in the Army. He hopes to gain admission to the officers' training school.`,
		headerPhoto: {
			title: "1943 Detroit Free Press Article",
			image: contentImage("1943 Detroit Free Press Article", freePress43Jpg),
		},
	},
	{
		year: 1946,
		title: "1946 Landscape Photos",
		content:
			"## A G.I.'s Visit to Alfedena\n\nThese photos were taken by Gilbert DiLoreto during his visit to Alfedena in 1946.",
		galleryPhotos: [
			{
				title: "Panorama-117",
				image: contentImage("Panorama-117", alfedenaPanorama117Jpg),
			},
			{
				title: "Panorama-118",
				image: contentImage("Panorama-118", alfedenaPanorama118Jpg),
			},
			{
				title: "Panorama-119",
				image: contentImage("Panorama-119", alfedenaPanorama119Jpg),
			},
			{
				title: "Panorama-120",
				image: contentImage("Panorama-120", alfedenaPanorama120Jpg),
			},
			{
				title: "Panorama-121",
				image: contentImage("Panorama-121", alfedenaPanorama121Jpg),
			},
			{
				title: "Panorama-122",
				image: contentImage("Panorama-122", alfedenaPanorama122Jpg),
			},
			{
				title: "Ruins-111",
				image: contentImage("Ruins-111", alfedenaRuins111Jpg),
			},
			{
				title: "Ruins-112",
				image: contentImage("Ruins-112", alfedenaRuins112Jpg),
			},
			{
				title: "Ruins-Apr46",
				image: contentImage("Ruins-Apr46", alfedenaRuinsApr46Jpg),
			},
		],
	},
	{
		year: 1946,
		title: "1946 Alfedena Relatives",
		content:
			"## A G.I.'s Visit to Alfedena\n\nGilbert DiLoreto visited relatives in Alfedena and Rome after World War II.",
		galleryPhotos: [
			{
				title: "Woman Sitting on Balcony",
				image: contentImage("Woman Sitting on Balcony", rome46AJpg),
			},
			{
				title: "Woman Standing on Balcony",
				image: contentImage("Woman Standing on Balcony", rome46BJpg),
			},
			{
				title: "Group Photo Balcony",
				image: contentImage("Group Photo Balcony", rome46CJpg),
			},
			{
				title: "Entire Family Photo",
				image: contentImage("Entire Family Photo", alfedena46DJpg),
			},
			{
				title: "Man Behind Desk",
				image: contentImage("Man Behind Desk", rome46EJpg),
			},
			{
				title: "Old Woman Looking Away",
				image: contentImage("Old Woman Looking Away", rome46FJpg),
			},
			{
				title: "Parents and Child",
				image: contentImage("Parents and Child", rome46GJpg),
			},
			{
				title: "Gilbert and Relatives",
				description:
					"Gilbert DiLoreto kneeling in center with other relatives.",
				image: contentImage("Gilbert and Relatives", alfedena46HJpg),
			},
			{
				title: "Gilbert DiLoreto and Relatives",
				description: "Gilbert DiLoreto kneeling center with other relatives",
				image: contentImage("Gilbert DiLoreto and Relatives", alfedena89Jpg),
			},
		],
	},
	{
		year: 1965,
		title: "1965",
		content:
			"## Family Reunion\n\nAbout 150 family members attended the DiLoreto family reunion in Harper Woods, Michigan. A genealogical database of more than 500 descendants has been compiled, tracing ancestors back to the mid-1600s.",
		headerPhoto: {
			title: "1965 Reunion Program",
			description: "DiLoreto Family Reunion Program (1965)",
			image: contentImage("1965 Reunion Program", image1965ReunionProgramGif),
		},
	},
	{
		year: 1979,
		title: "1979",
		content: `"Where We Came From" — An extensive historical and archaeological research paper presented at the 1979 DiLoreto family reunion. The report covers the history of Barrea and Alfedena, the Samnite tribes, the Roman conquest, migration patterns, Panfilo's career as City Clerk, the Gigante family origins, and land holdings.

---

## Armand DiGuilio's Report

Ancient "Aufidena" was home to many stonecutters, which paved most of the streets of medieval Rome and later paved streets throughout Europe and North Africa, according to a report by Armand DiGuilio, the oldest grandchild of Panfilo and Eufrasia, given at a 1979 DiLoreto family reunion.

### Where We Came From

**Detroit, May 27, 1979**

> "In darkness duels the people which knows annals not" — Thucydides (460–400 B.C.)

The roots of the Di Loreto family are found in two towns in the central Appenine Mountains of Italy in the Abruzzi region, Barrea and Alfedena. The towns, at about 3300 feet above sea level, are nestled on the north sides of the Meta Mountains, located 77.5 air miles (125 km) east of Rome and 64.5 air miles (104 km) north of Naples. The chain runs west-south east, south of the towns and rises to 2300 meters or 7500 feet. From its peaks, it is possible to see Rome, the Vesuvius and the Adriatic Sea.

The name Barrea is derived from “Vallis Regia” through the later “Varreggia”. Little is know of the ancient history of Barrea but recent excavations (1950–1970) carried out by one of our cousins Dr. Oscar Di Loreto (1911–1971) have shown that the town was part of the Marsican and Samnite tribes in 300–200 B.C.

The history of Alfedena is well attested by the excavations, which started in 1885 with A. De Nino, and in 1897 the civic Museum was organized. During World War II, the collection was recovered at Chieti and is still waiting to be returned to Alfedena to be housed in a proper building. The artifacts consist mainly of bronze coins, arms, medals, ornaments and assorted ceramic vases, all recovered from the more than 1500 tombs excavated in the Roman necropolis in what is now Viale della Stazione, the road that leads to the railroad station.

Aufidena (Alfedena) was the capital of the Caraceni, a tribe of the Samnites and was situated north of the present main square on the left side of the Rio Torto, the small stream that divides the town. The remaining megalithic walls, about a mile long, are seen together with distinct evidence of the acropolis. It is interesting to know that of the original Italian tribes, which tried to block the expansion of Rome, the Samnites were the only ones, which actually defeated the Roman legions. In 321 B.C., at the Forche Caudine, the Romans were made to pass under a yoke. However, victory was short-lived. Aufidena was conquered by the roman consul Gneo Fulvio and by 272 B.C. Rome was master of what is now central and most of southern Italy. Aufidena became a faithful roman colony.

The wanderlust of the Alfedenesi developed many centuries ago and, in the Annals of Tacitus, Book 1, we see that “Aufidenius Rufus” who was a camp commandant, having been advanced from private to centurion, was instrumental in fighting the Roman troops, which had rebelled in Pannonia (Austria) after the death of Emperor Augustus in 14 A.D. Because of its faithful service to Rome, its strategic location, controlling the mountain passes of the north/south route from the Adriatic to the Tyrrenian Sea, and the east/west route to Rome, Alfedena received the designation of Ala Fidelis (Loyal Wing), the A–F of the coat of arms.

For several centuries, the Abruzzi region shared the fate of Italy, that is, internal wars and occupation by invaders. During the Middle Ages, the region was ruled by barons, princes at the service of the German, Spanish, French Emperors or Popes. In 1860 with the fall of the Bourbon kingdom of Naples, the Abruzzi became part of the kingdom of Italy until June 1946, when the present Republic was established.

During the early middle Ages, the inhabitants moved away from the stony hills on the left side of the Rio Torto to the flat land at the right. The land was and is very poor but the forests and stones are plentiful, hence making of charcoal and stone cutting developed. Most of the streets of medieval Rome were paved by the “selciaroli” from Alfedena, who are also responsible for developing the many stone quarries found in the Alban Hills. Alfedenesi have roamed, paving streets in England, Belgium, Germany, Romania, North Africa.

At about 1880, the temporary and later permanent migration to our country began and, as we know, there are more Alfedenesi in Detroit than at any time in Alfedena.

As mentioned, the Di Loreto root is from Barrea, where the family was the landed gentry of the town. Several branches of the family still exist and during the 19th century contributed outstanding citizens to law, medicine, commerce, church, and the Army and Navy, traditions which are still continuing. Our grandfather Panfilo, following his schooling in Naples in 1871–72, until his coming to U.S.A in 1913, was the Segretario Comunale (City Clerk) for the towns of Montenero and Scontrone, a nonelected job under the direct supervision of the provincial authorities.

The other root, the Gigante, is unique. There is only on family in town with that name. Incomplete records indicate that the family originated in Atina, a town on the southern slope of the Meta Mountains about 20 air miles from Alfedena. The Roman bridge Ponte d’Achille, next to the Gigante’s house carried an inscription commemorating the alliance with Veroli and Atina. Church records, now destroyed, mentioned a bishop Gigante, and until recently, the altar to the right of the main altar of the higher church was reserved for the descendants of the Gigante family. The family possessed some very desirable land, the “Vigne” and “Le Corone” south-west of the Piazza and in via Casili a garden, stables and a carriage house. On a wall, about 30 feet long, there were frescoes which, supposedly, had been painted by the renowned Cola d’Amatrice or his school in residence of Maria, the youngest daughter of Alfonso and Elvira Gigante. The Gigante family was engaged in various commercial and civic activities. Since the end of the last century to the present, the family has given several mayors and many professionals to the town.

The roots were unquestionably strong and transplanted in our country with its freedom and unlimited opportunities, the many trees can only continue to grow.

*Researched and prepared by Armand DiGiulio (oldest First Cousin)*`,
	},
	{
		year: 2004,
		title: "2004",
		content:
			"## Photos by Bob Brunetti\n\nJune 2004. Contact: rgbprocare1@americarecorp.com",
		galleryPhotos: [
			{
				title: "Garden near Sangro River",
				description:
					"A bridge and garden near the entrance to the village, over a branch of the Sangro River.",
				image: contentImage("Garden near Sangro River", img0339JPG),
			},
			{
				title: "Ancient Ruins",
				description: "Ancient ruins in Alfedena.",
				image: contentImage("Ancient Ruins", img0340JPG),
			},
			{
				title: "Oldest Homes",
				description: "Oldest homes in Alfedena on Via Casili.",
				image: contentImage("Oldest Homes", img0341JPG),
			},
			{
				title: "Alfedena Stream",
				description: "Stream descending from mountains above Alfedena.",
				image: contentImage("Alfedena Stream", img0346JPG),
			},
			{
				title: "Ancient Post Office Plaque",
				description:
					"Ancient post office on Ponte D'Achillewhich, renovated in 2002.",
				image: contentImage("Ancient Post Office Plaque", img0347JPG),
			},
			{
				title: "Church Door",
				description:
					"13th century portal of the Church of Sts. Pietro e Paolo.",
				image: contentImage("Church Door", img0349JPG),
			},
			{
				title: "Alfedena View",
				description:
					"Panorama of Alfedena with the Meta Range in the background.",
				image: contentImage("Alfedena View", img0364JPG),
			},
		],
	},
];
