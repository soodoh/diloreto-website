import alfedenaAncientRuinsImage from "~/assets/images/family-history/2004-alfedena/alfedena-ancient-ruins-src-img-0340.jpg?responsive";
import alfedenaBridgeAndGardenImage from "~/assets/images/family-history/2004-alfedena/alfedena-bridge-and-garden-src-img-0339.jpg?responsive";
import alfedenaMetaRangePanoramaImage from "~/assets/images/family-history/2004-alfedena/alfedena-meta-range-panorama-src-img-0364.jpg?responsive";
import alfedenaMountainStreamImage from "~/assets/images/family-history/2004-alfedena/alfedena-mountain-stream-src-img-0346.jpg?responsive";
import alfedenaPonteDAchillePostOfficeImage from "~/assets/images/family-history/2004-alfedena/alfedena-ponte-dachille-post-office-src-img-0347.jpg?responsive";
import alfedenaChurchPortalImage from "~/assets/images/family-history/2004-alfedena/alfedena-saints-peter-and-paul-church-portal-src-img-0349.jpg?responsive";
import alfedenaViaCasiliHistoricHomesImage from "~/assets/images/family-history/2004-alfedena/alfedena-via-casili-historic-homes-src-img-0341.jpg?responsive";
import type { HistoryRecordMetadata } from "../types";

export default {
	title: "2004",
	galleryPhotos: [
		{
			title: "Bridge and garden near the entrance to Alfedena",
			alt: "Bridge and garden over a branch of the Sangro River near the entrance to Alfedena in 2004",
			...alfedenaBridgeAndGardenImage,
		},
		{
			title: "Ancient ruins in Alfedena",
			alt: "Stone ruins surrounded by vegetation in Alfedena in 2004",
			...alfedenaAncientRuinsImage,
		},
		{
			title: "Historic homes on Via Casili",
			alt: "Historic multistory homes lining Via Casili in Alfedena in 2004",
			...alfedenaViaCasiliHistoricHomesImage,
		},
		{
			title: "Mountain stream above Alfedena",
			alt: "Rocky stream descending from the mountains above Alfedena in 2004",
			...alfedenaMountainStreamImage,
		},
		{
			title: "Historic post office on Ponte D'Achille",
			alt: "Plaque on the historic post office at Ponte D'Achille in Alfedena, renovated in 2002",
			...alfedenaPonteDAchillePostOfficeImage,
		},
		{
			title: "Church of Saints Peter and Paul portal",
			alt: "Thirteenth-century decorated portal of the Church of Saints Peter and Paul in Alfedena",
			...alfedenaChurchPortalImage,
		},
		{
			title: "Alfedena and the Meta Range",
			alt: "Panoramic view of Alfedena with the Meta mountain range in the background in 2004",
			...alfedenaMetaRangePanoramaImage,
		},
	],
} satisfies HistoryRecordMetadata;
