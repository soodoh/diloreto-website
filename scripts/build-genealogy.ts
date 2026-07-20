import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateGenealogyData } from "./genealogy/gedcom";

const projectRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const configuredInputPath = process.env.GENEALOGY_GEDCOM_PATH?.trim();
if (!configuredInputPath) {
	throw new Error(
		"GENEALOGY_GEDCOM_PATH must point to a private GEDCOM file outside this repository.",
	);
}

const resolvedProjectRoot = await realpath(projectRoot);
const inputPath = await realpath(
	path.resolve(projectRoot, configuredInputPath),
);
const pathFromProject = path.relative(resolvedProjectRoot, inputPath);
const isInsideProject =
	pathFromProject === "" ||
	(!pathFromProject.startsWith(`..${path.sep}`) &&
		pathFromProject !== ".." &&
		!path.isAbsolute(pathFromProject));
if (isInsideProject) {
	throw new Error(
		"GENEALOGY_GEDCOM_PATH must remain outside this repository to prevent accidental commits.",
	);
}

const outputPath = path.join(
	projectRoot,
	"src/content/genealogy/generated.json",
);

const source = await readFile(inputPath, "utf8");
const referenceYear = new Date().getUTCFullYear();
const { data, warnings } = generateGenealogyData(source, referenceYear);

for (const person of Object.values(data.people)) {
	if (!person.isLiving) {
		continue;
	}
	const hasPrivateFields =
		person.name.display !== data.privacy.livingPersonLabel ||
		Object.keys(person.name).length !== 1 ||
		person.sex !== undefined ||
		person.events.length > 0 ||
		person.citations.length > 0 ||
		person.media.length > 0 ||
		person.notes.length > 0;
	if (hasPrivateFields) {
		throw new Error(
			`Privacy validation failed for living person @${person.id}@`,
		);
	}
}

for (const family of Object.values(data.families)) {
	const hasLivingPartner = family.partnerIds.some(
		(personId) => data.people[personId]?.isLiving === true,
	);
	if (
		hasLivingPartner &&
		(family.events.length > 0 ||
			family.citations.length > 0 ||
			family.notes.length > 0)
	) {
		throw new Error(
			`Privacy validation failed for family @${family.id}@ with a living partner`,
		);
	}
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(data, null, "\t")}\n`, "utf8");

console.log(
	`Generated ${path.relative(projectRoot, outputPath)} with ${data.stats.deceasedPeople} public and ${data.stats.livingPeopleRedacted} redacted people.`,
);
for (const warning of warnings) {
	console.warn(`GEDCOM warning: ${warning}`);
}
