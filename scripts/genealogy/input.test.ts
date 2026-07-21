import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, test } from "node:test";
import { strToU8, zipSync } from "fflate";
import { readGenealogySource } from "./input";

const GEDCOM = "0 HEAD\n1 GEDC\n2 VERS 7.0\n0 TRLR\n";

describe("genealogy input", () => {
	test("reads a plain GEDCOM file", async () => {
		const directory = await mkdtemp(path.join(os.tmpdir(), "genealogy-input-"));
		try {
			const inputPath = path.join(directory, "tree.ged");
			await writeFile(inputPath, GEDCOM, "utf8");

			assert.equal(await readGenealogySource(inputPath), GEDCOM);
		} finally {
			await rm(directory, { recursive: true, force: true });
		}
	});

	test("reads the root gedcom.ged from a GEDCOM 7 archive", async () => {
		const directory = await mkdtemp(path.join(os.tmpdir(), "genealogy-input-"));
		try {
			const inputPath = path.join(directory, "tree.gdz");
			await writeFile(
				inputPath,
				zipSync({
					"gedcom.ged": strToU8(GEDCOM),
					"media/source-files/old.ged": strToU8("private source"),
				}),
			);

			assert.equal(await readGenealogySource(inputPath), GEDCOM);
		} finally {
			await rm(directory, { recursive: true, force: true });
		}
	});

	test("rejects an archive without a root gedcom.ged", async () => {
		const directory = await mkdtemp(path.join(os.tmpdir(), "genealogy-input-"));
		try {
			const inputPath = path.join(directory, "tree.gdz");
			await writeFile(
				inputPath,
				zipSync({ "nested/tree.ged": strToU8(GEDCOM) }),
			);

			await assert.rejects(
				readGenealogySource(inputPath),
				/must contain gedcom\.ged at its root/,
			);
		} finally {
			await rm(directory, { recursive: true, force: true });
		}
	});
});
