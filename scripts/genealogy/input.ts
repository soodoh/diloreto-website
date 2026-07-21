import { readFile } from "node:fs/promises";
import path from "node:path";
import { strFromU8, unzipSync } from "fflate";

const GEDCOM_ARCHIVE_ENTRY = "gedcom.ged";
const MAX_GEDCOM_BYTES = 50 * 1024 * 1024;

function normalizedArchivePath(entryName: string): string {
	return entryName.replaceAll("\\", "/").replace(/^\.\/+/, "");
}

export async function readGenealogySource(inputPath: string): Promise<string> {
	if (path.extname(inputPath).toLocaleLowerCase() !== ".gdz") {
		return readFile(inputPath, "utf8");
	}

	let foundGedcomEntry = false;
	let oversizedGedcomEntry = false;
	const archive = unzipSync(await readFile(inputPath), {
		filter: (entry) => {
			const isGedcomEntry =
				normalizedArchivePath(entry.name).toLocaleLowerCase() ===
				GEDCOM_ARCHIVE_ENTRY;
			if (!isGedcomEntry) {
				return false;
			}
			foundGedcomEntry = true;
			oversizedGedcomEntry = entry.originalSize > MAX_GEDCOM_BYTES;
			return !oversizedGedcomEntry;
		},
	});

	if (oversizedGedcomEntry) {
		throw new Error(
			`${GEDCOM_ARCHIVE_ENTRY} exceeds the ${MAX_GEDCOM_BYTES / 1024 / 1024} MiB safety limit`,
		);
	}
	if (!foundGedcomEntry) {
		throw new Error(
			`GEDCOM 7 archive must contain ${GEDCOM_ARCHIVE_ENTRY} at its root`,
		);
	}

	const gedcomEntry = Object.entries(archive).find(
		([entryName]) =>
			normalizedArchivePath(entryName).toLocaleLowerCase() ===
			GEDCOM_ARCHIVE_ENTRY,
	)?.[1];
	if (!gedcomEntry) {
		throw new Error(
			`Could not read ${GEDCOM_ARCHIVE_ENTRY} from GEDCOM archive`,
		);
	}
	return strFromU8(gedcomEntry);
}
