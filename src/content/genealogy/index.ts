import generatedGenealogy from "./generated.json";
import type { GenealogyData } from "./types";

export const genealogy: GenealogyData = generatedGenealogy;
export type {
	GenealogyCitation,
	GenealogyData,
	GenealogyEvent,
	GenealogyFamily,
	GenealogyNote,
	GenealogyPerson,
	GenealogyRepository,
	GenealogySource,
} from "./types";
