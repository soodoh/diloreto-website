export type ContactName = "John" | "Paul" | "Carolyn";

export type Contact = {
	firstName: ContactName;
	email: string;
	link?: string;
};

export const johnContact: Contact = {
	firstName: "John",
	email: "john@diloreto.com",
};

export const paulContact: Contact = {
	firstName: "Paul",
	email: "paul@diloreto.com",
	link: "https://pauldiloreto.com",
};

export const carolynContact: Contact = {
	firstName: "Carolyn",
	email: "carolyn@diloreto.com",
	link: "https://carolyndiloreto.com",
};

export const contacts: Contact[] = [johnContact, paulContact, carolynContact];
