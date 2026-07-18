import panfiloEufrasiaPortraitImage from "~/assets/images/family-history/people-and-events/panfilo-diloreto-eufrasia-gigante-portrait.jpg?responsive";
import remoDiloretoPortraitImage from "~/assets/images/family-history/people-and-events/remo-diloreto-portrait.jpg?responsive";
import type { HistoryRecordMetadata } from "../types";

export default {
	title: "1909",
	galleryPhotos: [
		{
			title: "Panfilo DiLoreto and Eufrasia Gigante",
			alt: "Portrait of Panfilo DiLoreto, 1847-1920, and Eufrasia Gigante, 1854-1928",
			...panfiloEufrasiaPortraitImage,
		},
		{
			title: "Remo DiLoreto",
			alt: "Seated portrait of Remo DiLoreto",
			...remoDiloretoPortraitImage,
		},
	],
} satisfies HistoryRecordMetadata;
