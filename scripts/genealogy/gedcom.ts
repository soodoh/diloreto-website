import type {
	GenealogyChild,
	GenealogyCitation,
	GenealogyData,
	GenealogyEvent,
	GenealogyFamily,
	GenealogyMedia,
	GenealogyName,
	GenealogyPerson,
	GenealogyRepository,
	GenealogySource,
} from "../../src/content/genealogy/types";

export type GedcomNode = {
	level: number;
	tag: string;
	value?: string;
	xref?: string;
	line: number;
	children: GedcomNode[];
};

export type GedcomParseResult = {
	roots: GedcomNode[];
	warnings: string[];
};

const EVENT_LABELS: Record<string, string> = {
	ADOP: "Adoption",
	BAPM: "Baptism",
	BARM: "Bar mitzvah",
	BASM: "Bat mitzvah",
	BIRT: "Birth",
	BLES: "Blessing",
	BURI: "Burial",
	CENS: "Census",
	CHR: "Christening",
	CHRA: "Adult christening",
	CONF: "Confirmation",
	CREM: "Cremation",
	DEAT: "Death",
	DIV: "Divorce",
	DIVF: "Divorce filing",
	EDUC: "Education",
	EMIG: "Emigration",
	ENGA: "Engagement",
	EVEN: "Event",
	FACT: "Fact",
	FCOM: "First communion",
	GRAD: "Graduation",
	IMMI: "Immigration",
	MARB: "Marriage bann",
	MARC: "Marriage contract",
	MARL: "Marriage license",
	MARR: "Marriage",
	MARS: "Marriage settlement",
	NATU: "Naturalization",
	OCCU: "Occupation",
	ORDN: "Ordination",
	PROB: "Probate",
	RELI: "Religion",
	RESI: "Residence",
	RETI: "Retirement",
	TITL: "Title",
	WILL: "Will",
	_MILT: "Military service",
};

const EVENT_TAGS = new Set(Object.keys(EVENT_LABELS));
const POINTER_PATTERN = /^@[^@\s]+@$/;
const YEAR_PATTERN = /(?<!\d)(\d{3,4})(?!\d)/g;

function cleanValue(value: string | undefined): string | undefined {
	const cleaned = value?.trim();
	return cleaned ? cleaned : undefined;
}

function pointerId(value: string | undefined): string | undefined {
	const cleaned = cleanValue(value);
	if (!cleaned || !POINTER_PATTERN.test(cleaned)) {
		return undefined;
	}
	return cleaned.slice(1, -1);
}

function child(node: GedcomNode, tag: string): GedcomNode | undefined {
	return node.children.find((candidate) => candidate.tag === tag);
}

function children(node: GedcomNode, tag: string): GedcomNode[] {
	return node.children.filter((candidate) => candidate.tag === tag);
}

function nodeText(node: GedcomNode | undefined): string | undefined {
	if (!node) {
		return undefined;
	}

	let text = node.value ?? "";
	for (const continuation of node.children) {
		if (continuation.tag === "CONC") {
			text += continuation.value ?? "";
		} else if (continuation.tag === "CONT") {
			text += `\n${continuation.value ?? ""}`;
		}
	}
	return cleanValue(text);
}

function childText(node: GedcomNode, tag: string): string | undefined {
	return nodeText(child(node, tag));
}

function noteTexts(node: GedcomNode): string[] {
	return children(node, "NOTE")
		.map((note) => nodeText(note))
		.filter((note) => note !== undefined);
}

function joinAddress(node: GedcomNode | undefined): string | undefined {
	if (!node) {
		return undefined;
	}
	const parts = [
		nodeText(node),
		childText(node, "ADR1"),
		childText(node, "ADR2"),
		childText(node, "ADR3"),
		childText(node, "CITY"),
		childText(node, "STAE"),
		childText(node, "POST"),
		childText(node, "CTRY"),
	].filter((part) => part !== undefined);
	return parts.length > 0 ? parts.join(", ") : undefined;
}

export function parseGedcom(text: string): GedcomParseResult {
	const roots: GedcomNode[] = [];
	const stack: GedcomNode[] = [];
	const warnings: string[] = [];
	const normalizedText = text.replace(/^\uFEFF/, "");
	const lines = normalizedText.split(/\r?\n/);

	for (let index = 0; index < lines.length; index += 1) {
		const rawLine = lines[index];
		const lineNumber = index + 1;
		if (rawLine.trim() === "") {
			continue;
		}

		const match = /^(\d+)\s+(?:(@[^@\s]+@)\s+)?([^\s]+)(?:\s(.*))?$/.exec(
			rawLine,
		);
		if (!match) {
			throw new Error(`Malformed GEDCOM line ${lineNumber}`);
		}

		const levelText = match[1];
		const tag = match[3];
		if (levelText === undefined || tag === undefined) {
			throw new Error(`Malformed GEDCOM line ${lineNumber}`);
		}
		const level = Number.parseInt(levelText, 10);
		const xref = match[2];
		const value = cleanValue(match[4]);
		if (xref && level !== 0) {
			throw new Error(
				`Cross-reference identifier must be level 0 at line ${lineNumber}`,
			);
		}
		if (level > stack.length) {
			throw new Error(
				`GEDCOM level jumps from ${stack.length - 1} to ${level} at line ${lineNumber}`,
			);
		}

		const node: GedcomNode = {
			level,
			tag,
			...(value ? { value } : {}),
			...(xref ? { xref: xref.slice(1, -1) } : {}),
			line: lineNumber,
			children: [],
		};
		if (level === 0) {
			roots.push(node);
		} else {
			const parent = stack[level - 1];
			if (!parent) {
				throw new Error(`Missing parent for GEDCOM line ${lineNumber}`);
			}
			parent.children.push(node);
		}
		stack.length = level;
		stack[level] = node;
	}

	const seenXrefs = new Map<string, number>();
	for (const root of roots) {
		if (!root.xref) {
			continue;
		}
		const existingLine = seenXrefs.get(root.xref);
		if (existingLine !== undefined) {
			throw new Error(
				`Duplicate GEDCOM identifier @${root.xref}@ at lines ${existingLine} and ${root.line}`,
			);
		}
		seenXrefs.set(root.xref, root.line);
	}

	if (roots.at(-1)?.tag !== "TRLR") {
		warnings.push("GEDCOM does not end with a TRLR record");
	}

	return { roots, warnings };
}

function parseCitation(node: GedcomNode): GenealogyCitation {
	const data = child(node, "DATA");
	const extensions: Record<string, string[]> = {};
	for (const citationChild of node.children) {
		if (!citationChild.tag.startsWith("_")) {
			continue;
		}
		const extensionValue = nodeText(citationChild);
		if (!extensionValue) {
			continue;
		}
		const existing = extensions[citationChild.tag] ?? [];
		existing.push(extensionValue);
		extensions[citationChild.tag] = existing;
	}

	return {
		id: `citation-${node.line}`,
		...(pointerId(node.value) ? { sourceId: pointerId(node.value) } : {}),
		...(childText(node, "PAGE") ? { page: childText(node, "PAGE") } : {}),
		...(childText(node, "TEXT") ? { text: childText(node, "TEXT") } : {}),
		...(data && childText(data, "TEXT")
			? { dataText: childText(data, "TEXT") }
			: {}),
		...(childText(node, "QUAY") ? { quality: childText(node, "QUAY") } : {}),
		...(Object.keys(extensions).length > 0 ? { extensions } : {}),
	};
}

function parseCitations(node: GedcomNode): GenealogyCitation[] {
	return children(node, "SOUR").map(parseCitation);
}

function parseEvent(node: GedcomNode): GenealogyEvent {
	const explicitType = childText(node, "TYPE");
	return {
		id: `event-${node.line}`,
		type: explicitType ?? EVENT_LABELS[node.tag] ?? node.tag,
		...(node.value && node.value !== "Y" ? { value: node.value } : {}),
		...(childText(node, "DATE") ? { date: childText(node, "DATE") } : {}),
		...(childText(node, "PLAC") ? { place: childText(node, "PLAC") } : {}),
		...(joinAddress(child(node, "ADDR"))
			? { address: joinAddress(child(node, "ADDR")) }
			: {}),
		...(childText(node, "AGNC") ? { agency: childText(node, "AGNC") } : {}),
		...(childText(node, "CAUS") ? { cause: childText(node, "CAUS") } : {}),
		...(childText(node, "DESC")
			? { description: childText(node, "DESC") }
			: {}),
		notes: noteTexts(node),
		citations: parseCitations(node),
	};
}

function parseEvents(node: GedcomNode): GenealogyEvent[] {
	return node.children
		.filter((candidate) => EVENT_TAGS.has(candidate.tag))
		.map(parseEvent);
}

function parseName(node: GedcomNode): GenealogyName {
	const rawName = nodeText(node) ?? "Unnamed person";
	const firstSlash = rawName.indexOf("/");
	const secondSlash =
		firstSlash >= 0 ? rawName.indexOf("/", firstSlash + 1) : -1;
	const inferredGiven =
		firstSlash >= 0 ? cleanValue(rawName.slice(0, firstSlash)) : undefined;
	const inferredSurname =
		firstSlash >= 0 && secondSlash > firstSlash
			? cleanValue(rawName.slice(firstSlash + 1, secondSlash))
			: undefined;
	const display = rawName.replaceAll("/", "").replace(/\s+/g, " ").trim();

	return {
		display: display || "Unnamed person",
		...((childText(node, "GIVN") ?? inferredGiven)
			? { given: childText(node, "GIVN") ?? inferredGiven }
			: {}),
		...((childText(node, "SURN") ?? inferredSurname)
			? { surname: childText(node, "SURN") ?? inferredSurname }
			: {}),
		...(childText(node, "NPFX") ? { prefix: childText(node, "NPFX") } : {}),
		...(childText(node, "NSFX") ? { suffix: childText(node, "NSFX") } : {}),
		...(childText(node, "NICK") ? { nickname: childText(node, "NICK") } : {}),
		...(childText(node, "TYPE") ? { type: childText(node, "TYPE") } : {}),
	};
}

function parseMediaNode(
	node: GedcomNode,
	mediaRecords: Map<string, GedcomNode>,
): GenealogyMedia | undefined {
	const referencedId = pointerId(node.value);
	const mediaNode = referencedId ? mediaRecords.get(referencedId) : node;
	if (!mediaNode) {
		return referencedId ? { id: referencedId } : undefined;
	}
	const fileNode = child(mediaNode, "FILE");
	return {
		id: referencedId ?? `media-${node.line}`,
		...(nodeText(fileNode) ? { file: nodeText(fileNode) } : {}),
		...(fileNode && childText(fileNode, "FORM")
			? { format: childText(fileNode, "FORM") }
			: childText(mediaNode, "FORM")
				? { format: childText(mediaNode, "FORM") }
				: {}),
		...(fileNode && childText(fileNode, "TITL")
			? { title: childText(fileNode, "TITL") }
			: childText(mediaNode, "TITL")
				? { title: childText(mediaNode, "TITL") }
				: {}),
	};
}

function parseMedia(
	node: GedcomNode,
	mediaRecords: Map<string, GedcomNode>,
): GenealogyMedia[] {
	return children(node, "OBJE")
		.map((mediaNode) => parseMediaNode(mediaNode, mediaRecords))
		.filter((media) => media !== undefined);
}

function extractYears(date: string | undefined): number[] {
	if (!date) {
		return [];
	}
	return Array.from(date.matchAll(YEAR_PATTERN), (match) => {
		const year = match[1];
		return year ? Number.parseInt(year, 10) : Number.NaN;
	}).filter((year) => Number.isFinite(year));
}

function hasBirthAtLeast120YearsAgo(
	personNode: GedcomNode,
	referenceYear: number,
): boolean {
	const birthDate = childText(child(personNode, "BIRT") ?? personNode, "DATE");
	if (!birthDate || /^AFT\b/i.test(birthDate)) {
		return false;
	}
	const years = extractYears(birthDate);
	return years.length > 0 && Math.max(...years) <= referenceYear - 120;
}

function inferDeceasedPersonIds(
	roots: GedcomNode[],
	referenceYear: number,
): Set<string> {
	const deceasedPersonIds = new Set<string>();
	const ancestorsOfOldPeople = new Set<string>();
	const ancestorIdsByChildId = new Map<string, Set<string>>();

	for (const personNode of roots.filter((root) => root.tag === "INDI")) {
		if (!personNode.xref) {
			continue;
		}
		if (child(personNode, "DEAT")) {
			deceasedPersonIds.add(personNode.xref);
		}
		if (hasBirthAtLeast120YearsAgo(personNode, referenceYear)) {
			ancestorsOfOldPeople.add(personNode.xref);
		}
	}

	for (const familyNode of roots.filter((root) => root.tag === "FAM")) {
		const ancestorIds = [child(familyNode, "HUSB"), child(familyNode, "WIFE")]
			.map((partner) => pointerId(partner?.value))
			.filter((personId) => personId !== undefined);
		for (const childNode of children(familyNode, "CHIL")) {
			const childId = pointerId(childNode.value);
			if (!childId) {
				continue;
			}
			const existingAncestorIds =
				ancestorIdsByChildId.get(childId) ?? new Set();
			for (const ancestorId of ancestorIds) {
				existingAncestorIds.add(ancestorId);
			}
			ancestorIdsByChildId.set(childId, existingAncestorIds);
		}
	}

	const pendingDescendantIds = [...ancestorsOfOldPeople];
	for (let index = 0; index < pendingDescendantIds.length; index += 1) {
		const descendantId = pendingDescendantIds[index];
		if (!descendantId) {
			continue;
		}
		for (const ancestorId of ancestorIdsByChildId.get(descendantId) ?? []) {
			if (ancestorsOfOldPeople.has(ancestorId)) {
				continue;
			}
			ancestorsOfOldPeople.add(ancestorId);
			pendingDescendantIds.push(ancestorId);
		}
	}

	for (const ancestorId of ancestorsOfOldPeople) {
		deceasedPersonIds.add(ancestorId);
	}
	return deceasedPersonIds;
}

function parsePerson(
	node: GedcomNode,
	mediaRecords: Map<string, GedcomNode>,
	deceasedPersonIds: Set<string>,
): GenealogyPerson {
	if (!node.xref) {
		throw new Error(`Individual record at line ${node.line} has no identifier`);
	}
	const living = !deceasedPersonIds.has(node.xref);
	if (living) {
		return {
			id: node.xref,
			isLiving: true,
			name: { display: "Living person" },
			events: [],
			citations: [],
			media: [],
			notes: [],
			familyAsChildIds: children(node, "FAMC")
				.map((family) => pointerId(family.value))
				.filter((familyId) => familyId !== undefined),
			familyAsPartnerIds: children(node, "FAMS")
				.map((family) => pointerId(family.value))
				.filter((familyId) => familyId !== undefined),
		};
	}

	const nameNode = child(node, "NAME");
	return {
		id: node.xref,
		isLiving: false,
		name: nameNode ? parseName(nameNode) : { display: "Unnamed person" },
		...(childText(node, "SEX") ? { sex: childText(node, "SEX") } : {}),
		events: parseEvents(node),
		citations: parseCitations(node),
		media: parseMedia(node, mediaRecords),
		notes: noteTexts(node),
		familyAsChildIds: children(node, "FAMC")
			.map((family) => pointerId(family.value))
			.filter((familyId) => familyId !== undefined),
		familyAsPartnerIds: children(node, "FAMS")
			.map((family) => pointerId(family.value))
			.filter((familyId) => familyId !== undefined),
	};
}

function parseChild(node: GedcomNode): GenealogyChild | undefined {
	const personId = pointerId(node.value);
	if (!personId) {
		return undefined;
	}
	return {
		personId,
		...(childText(node, "_FREL")
			? { paternalRelationship: childText(node, "_FREL") }
			: {}),
		...(childText(node, "_MREL")
			? { maternalRelationship: childText(node, "_MREL") }
			: {}),
	};
}

function parseFamily(
	node: GedcomNode,
	people: Record<string, GenealogyPerson>,
): GenealogyFamily {
	if (!node.xref) {
		throw new Error(`Family record at line ${node.line} has no identifier`);
	}
	const partnerIds = [child(node, "HUSB"), child(node, "WIFE")]
		.map((partner) => pointerId(partner?.value))
		.filter((personId) => personId !== undefined);
	const includesLivingPartner = partnerIds.some(
		(personId) => people[personId]?.isLiving === true,
	);
	return {
		id: node.xref,
		partnerIds,
		children: children(node, "CHIL")
			.map(parseChild)
			.filter((familyChild) => familyChild !== undefined),
		events: includesLivingPartner ? [] : parseEvents(node),
		notes: includesLivingPartner ? [] : noteTexts(node),
		citations: includesLivingPartner ? [] : parseCitations(node),
	};
}

function parseSource(node: GedcomNode): GenealogySource {
	if (!node.xref) {
		throw new Error(`Source record at line ${node.line} has no identifier`);
	}
	const data = child(node, "DATA");
	return {
		id: node.xref,
		...(childText(node, "TITL") ? { title: childText(node, "TITL") } : {}),
		...(childText(node, "AUTH") ? { author: childText(node, "AUTH") } : {}),
		...(childText(node, "PUBL")
			? { publication: childText(node, "PUBL") }
			: {}),
		...(childText(node, "ABBR")
			? { abbreviation: childText(node, "ABBR") }
			: {}),
		...(childText(node, "TEXT")
			? { text: childText(node, "TEXT") }
			: data && childText(data, "TEXT")
				? { text: childText(data, "TEXT") }
				: {}),
		notes: noteTexts(node),
		repositoryIds: children(node, "REPO")
			.map((repository) => pointerId(repository.value))
			.filter((repositoryId) => repositoryId !== undefined),
	};
}

function parseRepository(node: GedcomNode): GenealogyRepository {
	if (!node.xref) {
		throw new Error(`Repository record at line ${node.line} has no identifier`);
	}
	return {
		id: node.xref,
		...(childText(node, "NAME") ? { name: childText(node, "NAME") } : {}),
		...(joinAddress(child(node, "ADDR"))
			? { address: joinAddress(child(node, "ADDR")) }
			: {}),
		...(childText(node, "PHON") ? { phone: childText(node, "PHON") } : {}),
		...(childText(node, "EMAIL") ? { email: childText(node, "EMAIL") } : {}),
		...(childText(node, "WWW") ? { website: childText(node, "WWW") } : {}),
	};
}

function validateReferences(
	people: Record<string, GenealogyPerson>,
	families: Record<string, GenealogyFamily>,
	sources: Record<string, GenealogySource>,
	repositories: Record<string, GenealogyRepository>,
): void {
	const errors: string[] = [];
	for (const person of Object.values(people)) {
		for (const familyId of [
			...person.familyAsChildIds,
			...person.familyAsPartnerIds,
		]) {
			if (!families[familyId]) {
				errors.push(
					`Person @${person.id}@ references missing family @${familyId}@`,
				);
			}
		}
	}
	for (const family of Object.values(families)) {
		for (const personId of [
			...family.partnerIds,
			...family.children.map((familyChild) => familyChild.personId),
		]) {
			if (!people[personId]) {
				errors.push(
					`Family @${family.id}@ references missing person @${personId}@`,
				);
			}
		}
	}

	const citations = [
		...Object.values(people).flatMap((person) => [
			...person.citations,
			...person.events.flatMap((event) => event.citations),
		]),
		...Object.values(families).flatMap((family) => [
			...family.citations,
			...family.events.flatMap((event) => event.citations),
		]),
	];
	for (const citation of citations) {
		if (citation.sourceId && !sources[citation.sourceId]) {
			errors.push(`Citation references missing source @${citation.sourceId}@`);
		}
	}
	for (const source of Object.values(sources)) {
		for (const repositoryId of source.repositoryIds) {
			if (!repositories[repositoryId]) {
				errors.push(
					`Source @${source.id}@ references missing repository @${repositoryId}@`,
				);
			}
		}
	}
	if (errors.length > 0) {
		throw new Error(
			`GEDCOM reference validation failed:\n- ${errors.join("\n- ")}`,
		);
	}
}

function oldestPersonId(people: Record<string, GenealogyPerson>): string {
	let selectedId: string | undefined;
	let selectedYear = Number.POSITIVE_INFINITY;
	for (const person of Object.values(people)) {
		if (person.isLiving) {
			continue;
		}
		const birth = person.events.find((event) => event.type === "Birth");
		const years = extractYears(birth?.date);
		const year =
			years.length > 0 ? Math.min(...years) : Number.POSITIVE_INFINITY;
		if (
			year < selectedYear ||
			(year === selectedYear &&
				selectedId !== undefined &&
				person.id < selectedId)
		) {
			selectedId = person.id;
			selectedYear = year;
		}
	}
	if (selectedId) {
		return selectedId;
	}
	const firstDeceased = Object.values(people).find(
		(person) => !person.isLiving,
	);
	if (!firstDeceased) {
		throw new Error(
			"GEDCOM contains no deceased person for the public starting view",
		);
	}
	return firstDeceased.id;
}

export function generateGenealogyData(
	text: string,
	referenceYear: number,
): { data: GenealogyData; warnings: string[] } {
	const parsed = parseGedcom(text);
	const records = new Map<string, GedcomNode>();
	for (const root of parsed.roots) {
		if (root.xref) {
			records.set(root.xref, root);
		}
	}
	const mediaRecords = new Map(
		parsed.roots
			.filter((root) => root.tag === "OBJE" && root.xref !== undefined)
			.map((root) => [root.xref ?? "", root]),
	);

	const deceasedPersonIds = inferDeceasedPersonIds(parsed.roots, referenceYear);
	const people: Record<string, GenealogyPerson> = {};
	for (const node of parsed.roots.filter((root) => root.tag === "INDI")) {
		const person = parsePerson(node, mediaRecords, deceasedPersonIds);
		people[person.id] = person;
	}
	const families: Record<string, GenealogyFamily> = {};
	for (const node of parsed.roots.filter((root) => root.tag === "FAM")) {
		const family = parseFamily(node, people);
		families[family.id] = family;
	}
	const sources: Record<string, GenealogySource> = {};
	for (const node of parsed.roots.filter((root) => root.tag === "SOUR")) {
		const source = parseSource(node);
		sources[source.id] = source;
	}
	const repositories: Record<string, GenealogyRepository> = {};
	for (const node of parsed.roots.filter((root) => root.tag === "REPO")) {
		const repository = parseRepository(node);
		repositories[repository.id] = repository;
	}
	validateReferences(people, families, sources, repositories);

	const livingPeopleRedacted = Object.values(people).filter(
		(person) => person.isLiving,
	).length;
	const head = parsed.roots.find((root) => root.tag === "HEAD");
	const gedcom = head ? child(head, "GEDC") : undefined;
	const producer = head ? childText(head, "SOUR") : undefined;
	const data: GenealogyData = {
		schemaVersion: 1,
		source: {
			format: gedcom
				? (childText(gedcom, "FORM") ?? "LINEAGE-LINKED")
				: "GEDCOM",
			...(gedcom && childText(gedcom, "VERS")
				? { version: childText(gedcom, "VERS") }
				: {}),
			...(producer ? { producer } : {}),
		},
		privacy: {
			livingPersonRule:
				"A person is presumed deceased when a death record exists, their latest recorded birth year is at least 120 years before the build year, or they are an ancestor of someone meeting that 120-year birth threshold.",
			livingPersonLabel: "Living person",
		},
		defaultPersonId: oldestPersonId(people),
		people,
		families,
		sources,
		repositories,
		stats: {
			people: Object.keys(people).length,
			families: Object.keys(families).length,
			livingPeopleRedacted,
			deceasedPeople: Object.keys(people).length - livingPeopleRedacted,
		},
	};

	const referencedRecords = new Set(records.keys());
	const knownTopLevelTags = new Set([
		"FAM",
		"HEAD",
		"INDI",
		"OBJE",
		"REPO",
		"SOUR",
		"SUBM",
		"TRLR",
	]);
	for (const root of parsed.roots) {
		if (!knownTopLevelTags.has(root.tag)) {
			parsed.warnings.push(
				`Ignored unsupported level-0 tag ${root.tag} at line ${root.line}`,
			);
		}
	}
	if (referencedRecords.size === 0) {
		parsed.warnings.push("GEDCOM contains no cross-referenced records");
	}

	return { data, warnings: parsed.warnings };
}
