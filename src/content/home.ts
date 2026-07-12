import type { SiteImage } from "./image";

export type HomePageData = {
	contactThumbnail: SiteImage;
	familyHistoryThumbnail: SiteImage;
	photosThumbnail: SiteImage;
};

export const homePage: HomePageData = {
	photosThumbnail: {
		url: "/assets/Thanksgiving2016-9943.jpeg",
		title: "Photos Thumbnail",
		width: 3744,
		height: 3744,
	},
	familyHistoryThumbnail: {
		url: "/assets/coatOfArms.jpg",
		title: "Coat of Arms",
		width: 443,
		height: 443,
	},
	contactThumbnail: {
		url: "/assets/2017-DiLoreto-Christmas-Photo-9538.jpeg",
		title: "Contact Thumbnail",
		width: 3651,
		height: 3651,
	},
};
