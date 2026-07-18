import abruzzoRegionAlfedenaMapImage from "~/assets/images/family-history/maps/abruzzo-region-alfedena.jpg?responsive";
import type { HistoryRecordMetadata } from "../types";

export default {
	title: "1600s",
	headerPhoto: {
		title: "Alfedena in the Abruzzo region",
		alt: "Map of the Abruzzo region of Italy marking Alfedena near its southern border",
		...abruzzoRegionAlfedenaMapImage,
	},
} satisfies HistoryRecordMetadata;
