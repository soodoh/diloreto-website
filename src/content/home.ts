import contactCardImage from "~/assets/images/home/contact-card-diloreto-family-2017.jpeg?responsive";
import familyHistoryCardImage from "~/assets/images/home/family-history-card-diloreto-coat-of-arms.jpg?responsive";
import photoGalleryCardImage from "~/assets/images/home/photo-gallery-card-family-thanksgiving-2016.jpeg?responsive";
import type { ContentImage } from "./image";

export type HomePageData = {
	contactThumbnail: ContentImage;
	familyHistoryThumbnail: ContentImage;
	photosThumbnail: ContentImage;
};

export const homePage: HomePageData = {
	photosThumbnail: {
		title: "Family Photos",
		alt: "DiLoreto family members celebrating Thanksgiving together in 2016",
		...photoGalleryCardImage,
	},
	familyHistoryThumbnail: {
		title: "DiLoreto Coat of Arms",
		alt: "Illustrated DiLoreto family coat of arms",
		...familyHistoryCardImage,
	},
	contactThumbnail: {
		title: "Contact the DiLoreto Family",
		alt: "DiLoreto family members gathered for Christmas in 2017",
		...contactCardImage,
	},
};
