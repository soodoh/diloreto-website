import type { HistoryRecord, HistoryRecordMetadata } from "./types";

export type { HistoryRecord } from "./types";

const metadataByPath = import.meta.glob<HistoryRecordMetadata>(
	"./*/content.ts",
	{
		eager: true,
		import: "default",
	},
);
const markdownByPath = import.meta.glob<string>("./*/content.md", {
	eager: true,
	import: "default",
	query: "?raw",
});

const recordsByDirectory = Object.entries(metadataByPath).map(
	([metadataPath, metadata]) => {
		const directoryName = metadataPath.split("/").at(-2);
		if (directoryName === undefined) {
			throw new Error(`Invalid family history metadata path: ${metadataPath}`);
		}

		const contentPath = `./${directoryName}/content.md`;
		const content = markdownByPath[contentPath];
		if (content === undefined) {
			throw new Error(`Missing family history content: ${contentPath}`);
		}

		const year = Number.parseInt(directoryName, 10);
		if (Number.isNaN(year)) {
			throw new Error(`Invalid family history directory: ${directoryName}`);
		}

		return {
			directoryName,
			record: { ...metadata, year, content },
		};
	},
);

recordsByDirectory.sort((first, second) =>
	first.directoryName.localeCompare(second.directoryName, undefined, {
		numeric: true,
	}),
);

export const familyHistory: HistoryRecord[] = recordsByDirectory.map(
	({ record }) => record,
);
