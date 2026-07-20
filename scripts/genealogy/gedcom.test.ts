import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { generateGenealogyData, parseGedcom } from "./gedcom";

const GEDCOM_FIXTURE = `0 HEAD
1 SOUR Test suite
1 GEDC
2 VERS 5.5.1
2 FORM LINEAGE-LINKED
0 @OLD@ INDI
1 NAME Ada /Ancestor/
1 SEX F
1 BIRT
2 DATE 1 JAN 1880
2 PLAC Alfedena, Italy
2 SOUR @SOURCE@
3 PAGE Page 12
1 FAMS @FAMILY@
0 @LIVING@ INDI
1 NAME Private /Relative/
1 SEX M
1 BIRT
2 DATE 1 JAN 1990
1 FAMS @FAMILY@
0 @FAMILY@ FAM
1 WIFE @OLD@
1 HUSB @LIVING@
1 MARR
2 DATE 1 JAN 2010
2 PLAC Private place
0 @SOURCE@ SOUR
1 TITL Public source
0 TRLR
`;

const ANCESTOR_INFERENCE_FIXTURE = `0 HEAD
1 SOUR Test suite
1 GEDC
2 VERS 5.5.1
2 FORM LINEAGE-LINKED
0 @GRANDPARENT@ INDI
1 NAME Undated /Grandparent/
1 FAMS @OLD_FAMILY@
0 @PARENT@ INDI
1 NAME Undated /Parent/
1 FAMC @OLD_FAMILY@
1 FAMS @OLDER_FAMILY@
0 @OLD_DESCENDANT@ INDI
1 NAME Old /Descendant/
1 BIRT
2 DATE 1 JAN 1880
1 FAMC @OLDER_FAMILY@
0 @RECENT_PARENT@ INDI
1 NAME Recent /Parent/
1 BIRT
2 DATE 1 JAN 1970
1 FAMS @RECENT_FAMILY@
0 @RECENTLY_DECEASED_CHILD@ INDI
1 NAME Recently Deceased /Child/
1 BIRT
2 DATE 1 JAN 2000
1 DEAT
2 DATE 1 JAN 2020
1 FAMC @RECENT_FAMILY@
0 @OLD_FAMILY@ FAM
1 HUSB @GRANDPARENT@
1 CHIL @PARENT@
0 @OLDER_FAMILY@ FAM
1 HUSB @PARENT@
1 CHIL @OLD_DESCENDANT@
0 @RECENT_FAMILY@ FAM
1 HUSB @RECENT_PARENT@
1 CHIL @RECENTLY_DECEASED_CHILD@
0 TRLR
`;

describe("GEDCOM parser", () => {
	test("parses nested level-based records", () => {
		const parsed = parseGedcom(GEDCOM_FIXTURE);
		assert.deepEqual(
			parsed.roots.map((root) => root.tag),
			["HEAD", "INDI", "INDI", "FAM", "SOUR", "TRLR"],
		);
		assert.equal(parsed.roots[1]?.children[2]?.tag, "BIRT");
	});

	test("rejects malformed level jumps and duplicate identifiers", () => {
		assert.throws(
			() => parseGedcom("0 HEAD\n2 SOUR Invalid\n0 TRLR\n"),
			/GEDCOM level jumps/,
		);
		assert.throws(
			() => parseGedcom("0 @P1@ INDI\n0 @P1@ INDI\n0 TRLR\n"),
			/Duplicate GEDCOM identifier/,
		);
	});
});

describe("genealogy generation", () => {
	test("redacts living records and shared family events", () => {
		const { data } = generateGenealogyData(GEDCOM_FIXTURE, 2026);
		const living = data.people.LIVING;
		const deceased = data.people.OLD;
		const family = data.families.FAMILY;

		assert.deepEqual(living, {
			id: "LIVING",
			isLiving: true,
			name: { display: "Living person" },
			events: [],
			citations: [],
			media: [],
			notes: [],
			familyAsChildIds: [],
			familyAsPartnerIds: ["FAMILY"],
		});
		assert.equal(deceased?.name.display, "Ada Ancestor");
		assert.equal(deceased?.events[0]?.place, "Alfedena, Italy");
		assert.deepEqual(family?.events, []);
		assert.equal(data.defaultPersonId, "OLD");
	});

	test("uses the conservative 120-year living rule", () => {
		const onBoundary = GEDCOM_FIXTURE.replace("1 JAN 1990", "1 JAN 1906");
		const newerThanBoundary = GEDCOM_FIXTURE.replace(
			"1 JAN 1990",
			"1 JAN 1907",
		);
		assert.equal(
			generateGenealogyData(onBoundary, 2026).data.people.LIVING?.isLiving,
			false,
		);
		assert.equal(
			generateGenealogyData(newerThanBoundary, 2026).data.people.LIVING
				?.isLiving,
			true,
		);
	});

	test("infers undated ancestors of people born over 120 years ago as deceased", () => {
		const { data } = generateGenealogyData(ANCESTOR_INFERENCE_FIXTURE, 2026);

		assert.equal(data.people.OLD_DESCENDANT?.isLiving, false);
		assert.equal(data.people.PARENT?.isLiving, false);
		assert.equal(data.people.GRANDPARENT?.isLiving, false);
		assert.equal(data.people.RECENTLY_DECEASED_CHILD?.isLiving, false);
		assert.equal(data.people.RECENT_PARENT?.isLiving, true);
	});

	test("fails on dangling person and family references", () => {
		const dangling = GEDCOM_FIXTURE.replace(
			"1 HUSB @LIVING@",
			"1 HUSB @MISSING@",
		);
		assert.throws(
			() => generateGenealogyData(dangling, 2026),
			/Family @FAMILY@ references missing person @MISSING@/,
		);
	});
});
