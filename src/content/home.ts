import contactCardImage from "~/assets/images/home/contact-card-diloreto-family-2017.jpeg?responsive";
import familyHistoryCardImage from "~/assets/images/home/family-history-card-diloreto-coat-of-arms.jpg?responsive";
import photoGalleryCardImage from "~/assets/images/home/photo-gallery-card-family-thanksgiving-2016.jpeg?responsive";
import carolynPortraitImage from "~/assets/images/people/carolyn-diloreto-portrait.jpeg?responsive";
import johnPortraitImage from "~/assets/images/people/john-diloreto-portrait.jpeg?responsive";
import paulPortraitImage from "~/assets/images/people/paul-michael-diloreto-portrait.jpg?responsive";
import carolynBio from "./bios/carolyn-diloreto.md?raw";
import johnBio from "./bios/john-diloreto.md?raw";
import paulBio from "./bios/paul-diloreto.md?raw";
import {
	type Contact,
	carolynContact,
	johnContact,
	paulContact,
} from "./contacts";
import type { ContentImage } from "./image";

export type HomeTile =
	| (ContentImage & { kind: "contact" })
	| (ContentImage & { kind: "family-history"; link: "/areyou" })
	| (ContentImage & {
			kind: "person";
			bio: string;
			contact: Contact;
			fullName: string;
	  })
	| (ContentImage & { kind: "photos" });

export const homeTiles: HomeTile[] = [
	{
		kind: "person",
		title: "John",
		fullName: "John R. DiLoreto",
		alt: "Portrait of John DiLoreto",
		bio: johnBio,
		contact: johnContact,
		...johnPortraitImage,
	},
	{
		kind: "person",
		title: "Paul",
		fullName: "Paul Michael DiLoreto",
		alt: "Portrait of Paul DiLoreto",
		bio: paulBio,
		contact: paulContact,
		...paulPortraitImage,
	},
	{
		kind: "person",
		title: "Carolyn",
		fullName: "Carolyn DiLoreto",
		alt: "Portrait of Carolyn DiLoreto",
		bio: carolynBio,
		contact: carolynContact,
		...carolynPortraitImage,
	},
	{
		kind: "photos",
		title: "Photos",
		alt: "DiLoreto family members celebrating Thanksgiving together in 2016",
		...photoGalleryCardImage,
	},
	{
		kind: "family-history",
		title: "Family History",
		alt: "Illustrated DiLoreto family coat of arms",
		link: "/areyou",
		...familyHistoryCardImage,
	},
	{
		kind: "contact",
		title: "Contact",
		alt: "DiLoreto family members gathered for Christmas in 2017",
		...contactCardImage,
	},
];
