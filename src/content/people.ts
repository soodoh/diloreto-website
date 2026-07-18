import carolynPortraitImage from "~/assets/images/people/carolyn-diloreto-portrait.jpeg?responsive";
import johnPortraitImage from "~/assets/images/people/john-diloreto-portrait.jpeg?responsive";
import paulPortraitImage from "~/assets/images/people/paul-michael-diloreto-portrait.jpg?responsive";
import {
	type Contact,
	carolynContact,
	johnContact,
	paulContact,
} from "./contacts";
import type { ContentImage } from "./image";

export type Person = Contact & {
	order: number;
	fullName: string;
	portrait: ContentImage;
};

export const people: Person[] = [
	{
		...johnContact,
		order: 0,
		fullName: "John R. DiLoreto",
		portrait: {
			title: "John R. DiLoreto",
			alt: "Portrait of John R. DiLoreto",
			...johnPortraitImage,
		},
	},
	{
		...paulContact,
		order: 1,
		fullName: "Paul Michael DiLoreto",
		portrait: {
			title: "Paul Michael DiLoreto",
			alt: "Portrait of Paul Michael DiLoreto",
			...paulPortraitImage,
		},
	},
	{
		...carolynContact,
		order: 2,
		fullName: "Carolyn DiLoreto",
		portrait: {
			title: "Carolyn DiLoreto",
			alt: "Portrait of Carolyn DiLoreto",
			...carolynPortraitImage,
		},
	},
];
