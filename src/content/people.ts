import carolynHeadshot from "~/assets/images/2018-Carolyn-Headshot-01518.jpeg?as=metadata";
import paulHeadshot from "~/assets/images/Edited_Headshot.jpg?as=metadata";
import johnHeadshot from "~/assets/images/JohnDiLoreto-6930.jpeg?as=metadata";
import carolynBio from "./bios/carolyn-diloreto.md?raw";
import johnBio from "./bios/john-diloreto.md?raw";
import paulBio from "./bios/paul-diloreto.md?raw";
import type { ContentImage } from "./image";

export type Person = {
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
		order: 0,
		firstName: "John",
		fullName: "John R. DiLoreto",
		email: "john@diloreto.com",
		portrait: { title: "John DiLoreto", ...johnHeadshot },
		bio: johnBio,
	},
	{
		order: 1,
		firstName: "Paul",
		fullName: "Paul Michael DiLoreto",
		email: "paul@diloreto.com",
		link: "https://pauldiloreto.com",
		portrait: { title: "Paul DiLoreto", ...paulHeadshot },
		bio: paulBio,
	},
	{
		order: 2,
		firstName: "Carolyn",
		fullName: "Carolyn DiLoreto",
		email: "carolyn@diloreto.com",
		link: "https://carolyndiloreto.com",
		portrait: { title: "Carolyn DiLoreto", ...carolynHeadshot },
		bio: carolynBio,
	},
];
