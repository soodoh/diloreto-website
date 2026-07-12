import contactImage from "~/assets/images/2017-DiLoreto-Christmas-Photo-9538.jpeg?as=metadata";
import coatOfArmsImage from "~/assets/images/coatOfArms.jpg?as=metadata";
import photosThumbnail from "~/assets/images/Thanksgiving2016-9943.jpeg?as=metadata";
import { type ContentImage, contentImage } from "./image";

export type HomePageData = {
	contactThumbnail: ContentImage;
	familyHistoryThumbnail: ContentImage;
	photosThumbnail: ContentImage;
};

export const homePage: HomePageData = {
	photosThumbnail: contentImage("Photos Thumbnail", photosThumbnail),
	familyHistoryThumbnail: contentImage("Coat of Arms", coatOfArmsImage),
	contactThumbnail: contentImage("Contact Thumbnail", contactImage),
};
