import carolynBio from "./bios/carolyn-diloreto.md?raw";
import johnBio from "./bios/john-diloreto.md?raw";
import paulBio from "./bios/paul-diloreto.md?raw";
import type { ContactName } from "./contacts";

export const biographies: Record<ContactName, string> = {
	John: johnBio,
	Paul: paulBio,
	Carolyn: carolynBio,
};
