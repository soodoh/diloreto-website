import carolynHeadshot from "~/assets/images/2018-Carolyn-Headshot-01518.jpeg?responsive";
import paulHeadshot from "~/assets/images/Edited_Headshot.jpg?responsive";
import johnHeadshot from "~/assets/images/JohnDiLoreto-6930.jpeg?responsive";
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
		portrait: { title: "John DiLoreto", ...johnHeadshot },
	},
	{
		...paulContact,
		order: 1,
		fullName: "Paul Michael DiLoreto",
		portrait: { title: "Paul DiLoreto", ...paulHeadshot },
	},
	{
		...carolynContact,
		order: 2,
		fullName: "Carolyn DiLoreto",
		portrait: { title: "Carolyn DiLoreto", ...carolynHeadshot },
	},
];
