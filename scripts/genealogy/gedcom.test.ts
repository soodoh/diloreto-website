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

const GEDCOM_7_FIXTURE = `﻿0 HEAD
1 SOUR Test suite
1 GEDC
2 VERS 7.0
0 @P1@ INDI
1 NAME Ada /Ancestor/
2 SOUR @SOURCE@
1 NAME Ada Jane /Ancestor/
2 TYPE Birth name
1 BIRT
2 DATE ABT 1880
3 PHRASE About 1880
2 PHON 555-0100
1 SNOTE @NOTE@
0 @NOTE@ SNOTE Biographical detail
1 CONT Second line
1 SOUR @SOURCE@
0 @SOURCE@ SOUR
1 TITL Public source
1 NOTE Source detail
2 SOUR @NESTED@
0 @NESTED@ SOUR
1 TITL Nested source
0 @UNUSED@ SOUR
1 TITL Private unused source
0 TRLR
`;

const LIVING_CHILD_FIXTURE = `0 HEAD
1 GEDC
2 VERS 7.0
0 @PARENT1@ INDI
1 NAME First /Parent/
1 BIRT
2 DATE 1800
1 FAMS @FAMILY@
0 @PARENT2@ INDI
1 NAME Second /Parent/
1 BIRT
2 DATE 1800
1 FAMS @FAMILY@
0 @CHILD@ INDI
1 NAME Private /Child/
1 BIRT
2 DATE 1990
1 FAMC @FAMILY@
0 @FAMILY@ FAM
1 HUSB @PARENT1@
1 WIFE @PARENT2@
1 CHIL @CHILD@
1 NOTE Private family detail
0 TRLR
`;

const OLD_EVENT_INFERENCE_FIXTURE = `0 HEAD
1 SOUR Test suite
1 GEDC
2 VERS 5.5.1
2 FORM LINEAGE-LINKED
0 @ANCESTOR@ INDI
1 NAME Undated /Ancestor/
1 FAMS @ANCESTOR_FAMILY@
0 @MARRIED_PERSON@ INDI
1 NAME Undated /Married Person/
1 FAMC @ANCESTOR_FAMILY@
1 FAMS @OLD_MARRIAGE@
0 @SPOUSE@ INDI
1 NAME Undated /Spouse/
1 FAMS @OLD_MARRIAGE@
0 @OLD_DEATH_PARENT@ INDI
1 NAME Old Death /Parent/
1 FAMS @OLD_DEATH_FAMILY@
0 @OLD_DEATH_CHILD@ INDI
1 NAME Old Death /Child/
1 DEAT
2 DATE 1 JAN 1900
1 FAMC @OLD_DEATH_FAMILY@
0 @ANCESTOR_FAMILY@ FAM
1 HUSB @ANCESTOR@
1 CHIL @MARRIED_PERSON@
0 @OLD_MARRIAGE@ FAM
1 HUSB @MARRIED_PERSON@
1 WIFE @SPOUSE@
1 MARR
2 DATE 1 JAN 1840
0 @OLD_DEATH_FAMILY@ FAM
1 HUSB @OLD_DEATH_PARENT@
1 CHIL @OLD_DEATH_CHILD@
0 TRLR
`;

const RELATIONSHIP_AGE_INFERENCE_FIXTURE = `0 HEAD
1 SOUR Test suite
1 GEDC
2 VERS 5.5.1
2 FORM LINEAGE-LINKED
0 @CONTROL_DEAD@ INDI
1 NAME Control /Deceased/
1 DEAT
2 DATE 1 JAN 2020
0 @CHILD_RULE_CANDIDATE@ INDI
1 NAME Child Rule /Candidate/
1 FAMS @CHILD_RULE_FAMILY@
0 @OLD_CHILD@ INDI
1 NAME Old /Child/
1 BIRT
2 DATE 1 JAN 1926
1 FAMC @CHILD_RULE_FAMILY@
0 @SPOUSE_RULE_CANDIDATE@ INDI
1 NAME Spouse Rule /Candidate/
1 FAMS @SPOUSE_RULE_FAMILY@
0 @OLD_SPOUSE@ INDI
1 NAME Old /Spouse/
1 BIRT
2 DATE 1 JAN 1906
1 FAMS @SPOUSE_RULE_FAMILY@
0 @SIBLING_RULE_CANDIDATE@ INDI
1 NAME Sibling Rule /Candidate/
1 FAMC @SIBLING_RULE_FAMILY@
0 @OLD_SIBLING@ INDI
1 NAME Old /Sibling/
1 BIRT
2 DATE 1 JAN 1906
1 FAMC @SIBLING_RULE_FAMILY@
0 @PARENT_RULE_CANDIDATE@ INDI
1 NAME Parent Rule /Candidate/
1 FAMC @PARENT_RULE_FAMILY@
0 @OLD_PARENT@ INDI
1 NAME Old /Parent/
1 BIRT
2 DATE 1 JAN 1876
1 FAMS @PARENT_RULE_FAMILY@
0 @AUNT_RULE_CANDIDATE@ INDI
1 NAME Aunt Rule /Candidate/
1 FAMC @AUNT_RULE_FAMILY@
0 @AUNT_RULE_PARENT@ INDI
1 NAME Aunt Rule /Parent/
1 FAMC @EXTENDED_FAMILY@
1 FAMS @AUNT_RULE_FAMILY@
0 @OLD_AUNT@ INDI
1 NAME Old /Aunt/
1 BIRT
2 DATE 1 JAN 1876
1 FAMC @EXTENDED_FAMILY@
0 @CHILD_RULE_FAMILY@ FAM
1 HUSB @CHILD_RULE_CANDIDATE@
1 CHIL @OLD_CHILD@
0 @SPOUSE_RULE_FAMILY@ FAM
1 HUSB @SPOUSE_RULE_CANDIDATE@
1 WIFE @OLD_SPOUSE@
0 @SIBLING_RULE_FAMILY@ FAM
1 CHIL @SIBLING_RULE_CANDIDATE@
1 CHIL @OLD_SIBLING@
0 @PARENT_RULE_FAMILY@ FAM
1 HUSB @OLD_PARENT@
1 CHIL @PARENT_RULE_CANDIDATE@
0 @EXTENDED_FAMILY@ FAM
1 CHIL @AUNT_RULE_PARENT@
1 CHIL @OLD_AUNT@
0 @AUNT_RULE_FAMILY@ FAM
1 HUSB @AUNT_RULE_PARENT@
1 CHIL @AUNT_RULE_CANDIDATE@
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
			alternateNames: [],
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

	test("supports GEDCOM 7 names, shared notes, phrases, and citation details", () => {
		const { data, warnings } = generateGenealogyData(GEDCOM_7_FIXTURE, 2026);
		const person = data.people.P1;

		assert.equal(data.schemaVersion, 2);
		assert.equal(data.source.version, "7.0");
		assert.equal(person?.events[0]?.date, "About 1880");
		assert.deepEqual(person?.events[0]?.phones, ["555-0100"]);
		assert.equal(person?.alternateNames[0]?.display, "Ada Jane Ancestor");
		assert.equal(person?.alternateNames[0]?.type, "Birth name");
		assert.equal(person?.name.citations?.[0]?.sourceId, "SOURCE");
		assert.equal(person?.notes[0]?.text, "Biographical detail\nSecond line");
		assert.equal(person?.notes[0]?.citations[0]?.sourceId, "SOURCE");
		assert.equal(data.sources.SOURCE?.notes[0]?.text, "Source detail");
		assert.equal(
			data.sources.SOURCE?.notes[0]?.citations[0]?.sourceId,
			"NESTED",
		);
		assert.equal(data.sources.NESTED?.title, "Nested source");
		assert.equal(data.sources.UNUSED, undefined);
		assert.deepEqual(warnings, []);
	});

	test("redacts family details when any family member is living", () => {
		const { data } = generateGenealogyData(LIVING_CHILD_FIXTURE, 2026);

		assert.equal(data.people.CHILD?.isLiving, true);
		assert.deepEqual(data.families.FAMILY?.notes, []);
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

		const misleadingPhrase = GEDCOM_FIXTURE.replace(
			"2 DATE 1 JAN 1990",
			"2 DATE 1 JAN 1990\n3 PHRASE Copied from an 1800 register",
		);
		assert.equal(
			generateGenealogyData(misleadingPhrase, 2026).data.people.LIVING
				?.isLiving,
			true,
		);

		const conflictingBirths = onBoundary.replace(
			"2 DATE 1 JAN 1906\n1 FAMS @FAMILY@",
			"2 DATE 1 JAN 1906\n1 BIRT\n2 DATE 1 JAN 1907\n1 FAMS @FAMILY@",
		);
		assert.equal(
			generateGenealogyData(conflictingBirths, 2026).data.people.LIVING
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

	test("infers people and ancestors from life events over 120 years ago", () => {
		const { data } = generateGenealogyData(OLD_EVENT_INFERENCE_FIXTURE, 2026);

		assert.equal(data.people.MARRIED_PERSON?.isLiving, false);
		assert.equal(data.people.SPOUSE?.isLiving, false);
		assert.equal(data.people.ANCESTOR?.isLiving, false);
		assert.equal(data.people.OLD_DEATH_CHILD?.isLiving, false);
		assert.equal(data.people.OLD_DEATH_PARENT?.isLiving, false);

		const uncertainMarriage = OLD_EVENT_INFERENCE_FIXTURE.replace(
			"2 DATE 1 JAN 1840",
			"2 DATE AFT 1 JAN 1840",
		);
		assert.equal(
			generateGenealogyData(uncertainMarriage, 2026).data.people.SPOUSE
				?.isLiving,
			true,
		);

		const conflictingBirth = OLD_EVENT_INFERENCE_FIXTURE.replace(
			"1 NAME Undated /Spouse/",
			"1 NAME Undated /Spouse/\n1 BIRT\n2 DATE 1 JAN 1990",
		);
		assert.equal(
			generateGenealogyData(conflictingBirth, 2026).data.people.SPOUSE
				?.isLiving,
			true,
		);

		const nonCoupleFamilyEvent = OLD_EVENT_INFERENCE_FIXTURE.replace(
			"1 MARR\n2 DATE 1 JAN 1840",
			"1 RESI\n2 DATE 1 JAN 1840",
		);
		assert.equal(
			generateGenealogyData(nonCoupleFamilyEvent, 2026).data.people.SPOUSE
				?.isLiving,
			true,
		);
	});

	test("infers undated people from relatives at conservative age thresholds", () => {
		const { data } = generateGenealogyData(
			RELATIONSHIP_AGE_INFERENCE_FIXTURE,
			2026,
		);

		for (const personId of [
			"CHILD_RULE_CANDIDATE",
			"SPOUSE_RULE_CANDIDATE",
			"SIBLING_RULE_CANDIDATE",
			"PARENT_RULE_CANDIDATE",
			"AUNT_RULE_CANDIDATE",
		]) {
			assert.equal(data.people[personId]?.isLiving, false);
		}

		const belowThresholds = RELATIONSHIP_AGE_INFERENCE_FIXTURE.replaceAll(
			"1926",
			"1927",
		)
			.replaceAll("1906", "1907")
			.replaceAll("1876", "1877");
		const belowThresholdData = generateGenealogyData(
			belowThresholds,
			2026,
		).data;
		for (const personId of [
			"CHILD_RULE_CANDIDATE",
			"SPOUSE_RULE_CANDIDATE",
			"SIBLING_RULE_CANDIDATE",
			"PARENT_RULE_CANDIDATE",
			"AUNT_RULE_CANDIDATE",
		]) {
			assert.equal(belowThresholdData.people[personId]?.isLiving, true);
		}

		const candidateWithBirth = RELATIONSHIP_AGE_INFERENCE_FIXTURE.replace(
			"1 NAME Child Rule /Candidate/",
			"1 NAME Child Rule /Candidate/\n1 BIRT\n2 DATE 1 JAN 2000",
		);
		assert.equal(
			generateGenealogyData(candidateWithBirth, 2026).data.people
				.CHILD_RULE_CANDIDATE?.isLiving,
			true,
		);

		for (const uncertainChildBirth of [
			RELATIONSHIP_AGE_INFERENCE_FIXTURE.replace(
				"2 DATE 1 JAN 1926",
				"2 DATE ABT 1926",
			),
			RELATIONSHIP_AGE_INFERENCE_FIXTURE.replace(
				"2 DATE 1 JAN 1926",
				"2 DATE BET 1900 AND 1926",
			),
			RELATIONSHIP_AGE_INFERENCE_FIXTURE.replace(
				"2 DATE 1 JAN 1926",
				"2 DATE 1926 (?)",
			),
			RELATIONSHIP_AGE_INFERENCE_FIXTURE.replace(
				"2 DATE 1 JAN 1926",
				"2 DATE probably 1926",
			),
			RELATIONSHIP_AGE_INFERENCE_FIXTURE.replace(
				"2 DATE 1 JAN 1926",
				"2 DATE @#DFRENCH R@ 1 VEND 234",
			),
		]) {
			assert.equal(
				generateGenealogyData(uncertainChildBirth, 2026).data.people
					.CHILD_RULE_CANDIDATE?.isLiving,
				true,
			);
		}

		const explicitGregorianBirth = RELATIONSHIP_AGE_INFERENCE_FIXTURE.replace(
			"2 DATE 1 JAN 1926",
			"2 DATE @#DGREGORIAN@ 1 JAN 1926",
		);
		assert.equal(
			generateGenealogyData(explicitGregorianBirth, 2026).data.people
				.CHILD_RULE_CANDIDATE?.isLiving,
			false,
		);

		const conflictingSpouseBirths = RELATIONSHIP_AGE_INFERENCE_FIXTURE.replace(
			"2 DATE 1 JAN 1906\n1 FAMS @SPOUSE_RULE_FAMILY@",
			"2 DATE 1 JAN 1906\n1 BIRT\n2 DATE 1 JAN 1905\n1 FAMS @SPOUSE_RULE_FAMILY@",
		);
		assert.equal(
			generateGenealogyData(conflictingSpouseBirths, 2026).data.people
				.SPOUSE_RULE_CANDIDATE?.isLiving,
			true,
		);
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
