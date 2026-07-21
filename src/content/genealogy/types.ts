export type GenealogyCitation = {
	id: string;
	sourceId?: string;
	page?: string;
	text?: string;
	dataText?: string;
	quality?: string;
	notes: string[];
	extensions?: Record<string, string[]>;
};

export type GenealogyNote = {
	id: string;
	text: string;
	citations: GenealogyCitation[];
};

export type GenealogyEvent = {
	id: string;
	type: string;
	value?: string;
	date?: string;
	place?: string;
	address?: string;
	agency?: string;
	cause?: string;
	description?: string;
	phones: string[];
	notes: GenealogyNote[];
	citations: GenealogyCitation[];
};

export type GenealogyName = {
	id?: string;
	display: string;
	given?: string;
	surname?: string;
	prefix?: string;
	suffix?: string;
	nickname?: string;
	type?: string;
	citations?: GenealogyCitation[];
};

export type GenealogyMedia = {
	id: string;
	file?: string;
	format?: string;
	title?: string;
};

export type GenealogyPerson = {
	id: string;
	isLiving: boolean;
	name: GenealogyName;
	alternateNames: GenealogyName[];
	sex?: string;
	events: GenealogyEvent[];
	citations: GenealogyCitation[];
	media: GenealogyMedia[];
	notes: GenealogyNote[];
	familyAsChildIds: string[];
	familyAsPartnerIds: string[];
};

export type GenealogyChild = {
	personId: string;
	paternalRelationship?: string;
	maternalRelationship?: string;
};

export type GenealogyFamily = {
	id: string;
	partnerIds: string[];
	children: GenealogyChild[];
	events: GenealogyEvent[];
	notes: GenealogyNote[];
	citations: GenealogyCitation[];
};

export type GenealogySource = {
	id: string;
	title?: string;
	author?: string;
	publication?: string;
	abbreviation?: string;
	text?: string;
	notes: GenealogyNote[];
	repositoryIds: string[];
};

export type GenealogyRepository = {
	id: string;
	name?: string;
	address?: string;
	phone?: string;
	email?: string;
	website?: string;
};

export type GenealogyData = {
	schemaVersion: number;
	source: {
		format: string;
		version?: string;
		producer?: string;
	};
	privacy: {
		livingPersonRule: string;
		livingPersonLabel: string;
	};
	defaultPersonId: string;
	people: Record<string, GenealogyPerson>;
	families: Record<string, GenealogyFamily>;
	sources: Record<string, GenealogySource>;
	repositories: Record<string, GenealogyRepository>;
	stats: {
		people: number;
		families: number;
		livingPeopleRedacted: number;
		deceasedPeople: number;
	};
};
