import carolynHeadshot from "~/assets/images/2018-Carolyn-Headshot-01518.jpeg?as=metadata";
import paulHeadshot from "~/assets/images/Edited_Headshot.jpg?as=metadata";
import johnHeadshot from "~/assets/images/JohnDiLoreto-6930.jpeg?as=metadata";
import carolynBio from "./bios/carolyn-diloreto.md?raw";
import johnBio from "./bios/john-diloreto.md?raw";
import paulBio from "./bios/paul-diloreto.md?raw";
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
		bio: johnBio,
	},
	{
		id: "9276b6bf-fbdf-5147-94a2-3d25b5d1cee9",
		order: 1,
		firstName: "Paul",
		fullName: "Paul Michael DiLoreto",
		email: "paul@diloreto.com",
		link: "https://pauldiloreto.com",
		portrait: contentImage("Paul DiLoreto", paulHeadshot),
		bio: paulBio,
	},
	{
		id: "a1bb5c97-8895-59a0-8599-a54da8bb19a9",
		order: 2,
		firstName: "Carolyn",
		fullName: "Carolyn DiLoreto",
		email: "carolyn@diloreto.com",
		link: "https://carolyndiloreto.com",
		portrait: contentImage("Carolyn DiLoreto", carolynHeadshot),
		bio: carolynBio,
	},
];
