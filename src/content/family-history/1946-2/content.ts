import alfedenaRelativesFamilyGroupImage from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-relatives-family-group-src-46d.jpg?responsive";
import alfedenaRelativesGilbertKneeling46HImage from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-relatives-gilbert-kneeling-src-46h.jpg?responsive";
import alfedenaRelativesGilbertKneeling89Image from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-relatives-gilbert-kneeling-src-89.jpg?responsive";
import romeElderlyWomanPortraitImage from "~/assets/images/family-history/1946-gilbert-italy-trip/rome-elderly-woman-portrait-src-46f.jpg?responsive";
import romeManAtDeskImage from "~/assets/images/family-history/1946-gilbert-italy-trip/rome-man-at-desk-src-46e.jpg?responsive";
import romeParentsAndChildImage from "~/assets/images/family-history/1946-gilbert-italy-trip/rome-parents-and-child-src-46g.jpg?responsive";
import romeRelativesBalconyGroupImage from "~/assets/images/family-history/1946-gilbert-italy-trip/rome-relatives-balcony-group-src-46c.jpg?responsive";
import romeWomanSeatedOnBalconyImage from "~/assets/images/family-history/1946-gilbert-italy-trip/rome-woman-seated-on-balcony-src-46a.jpg?responsive";
import romeWomanStandingOnBalconyImage from "~/assets/images/family-history/1946-gilbert-italy-trip/rome-woman-standing-on-balcony-src-46b.jpg?responsive";
import type { HistoryRecordMetadata } from "../types";

export default {
	title: "1946 Alfedena Relatives",
	galleryPhotos: [
		{
			title: "Relatives gathered on a balcony in Rome",
			alt: "Group of DiLoreto relatives gathered on a balcony in Rome in 1946",
			...romeRelativesBalconyGroupImage,
		},
		{
			title: "DiLoreto relatives in Alfedena",
			alt: "Large group portrait of DiLoreto relatives in Alfedena in 1946",
			...alfedenaRelativesFamilyGroupImage,
		},
		{
			title: "Gilbert DiLoreto with relatives in Alfedena — group 1",
			alt: "Gilbert DiLoreto kneeling at center with relatives in Alfedena in 1946",
			...alfedenaRelativesGilbertKneeling89Image,
		},
		{
			title: "Woman seated on a balcony in Rome",
			alt: "Woman seated on a balcony overlooking Rome in 1946",
			...romeWomanSeatedOnBalconyImage,
		},
		{
			title: "Woman standing on a balcony in Rome",
			alt: "Woman standing on a balcony overlooking Rome in 1946",
			...romeWomanStandingOnBalconyImage,
		},
		{
			title: "Man seated at a desk in Rome",
			alt: "Man seated behind a desk in Rome in 1946",
			...romeManAtDeskImage,
		},
		{
			title: "Elderly woman in Rome",
			alt: "Portrait of an elderly woman looking away from the camera in Rome in 1946",
			...romeElderlyWomanPortraitImage,
		},
		{
			title: "Parents and child in Rome",
			alt: "Parents standing with their young child on a street in Rome in 1946",
			...romeParentsAndChildImage,
		},
		{
			title: "Gilbert DiLoreto with relatives in Alfedena — group 2",
			alt: "Gilbert DiLoreto kneeling in front of another group of relatives in Alfedena in 1946",
			...alfedenaRelativesGilbertKneeling46HImage,
		},
	],
} satisfies HistoryRecordMetadata;
