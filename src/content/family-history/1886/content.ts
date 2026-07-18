import alfedenaVillageAerialViewImage from "~/assets/images/family-history/places/alfedena-village-aerial-view.jpg?responsive";
import type { HistoryRecordMetadata } from "../types";

export default {
	title: "1886",
	link: "https://www.facebook.com/groups/Alfedena/",
	headerPhoto: {
		title: "Aerial view of Alfedena",
		alt: "Aerial view of the village of Alfedena surrounded by green hills",
		...alfedenaVillageAerialViewImage,
	},
} satisfies HistoryRecordMetadata;
