import contactImage from "~/assets/images/2017-DiLoreto-Christmas-Photo-9538.jpeg?responsive";
import coatOfArmsImage from "~/assets/images/coatOfArms.jpg?responsive";
import photosThumbnail from "~/assets/images/Thanksgiving2016-9943.jpeg?responsive";
import type { ContentImage } from "./image";

export type HomePageData = {
	contactThumbnail: ContentImage;
	familyHistoryThumbnail: ContentImage;
	photosThumbnail: ContentImage;
};

export const homePage: HomePageData = {
	photosThumbnail: { title: "Photos Thumbnail", ...photosThumbnail },
	familyHistoryThumbnail: { title: "Coat of Arms", ...coatOfArmsImage },
	contactThumbnail: { title: "Contact Thumbnail", ...contactImage },
};
