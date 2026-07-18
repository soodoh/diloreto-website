import alfedenaPanoramaView01Image from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-panorama-view-01-src-117.jpg?responsive";
import alfedenaPanoramaView02Image from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-panorama-view-02-src-118.jpg?responsive";
import alfedenaPanoramaView03Image from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-panorama-view-03-src-119.jpg?responsive";
import alfedenaPanoramaView04Image from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-panorama-view-04-src-120.jpg?responsive";
import alfedenaPanoramaView05Image from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-panorama-view-05-src-121.jpg?responsive";
import alfedenaPanoramaView06Image from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-panorama-view-06-src-122.jpg?responsive";
import alfedenaWarRuinsApril1946Image from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-war-ruins-april-1946.jpg?responsive";
import alfedenaWarRuinsView01Image from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-war-ruins-view-01-src-111.jpg?responsive";
import alfedenaWarRuinsView02Image from "~/assets/images/family-history/1946-gilbert-italy-trip/alfedena-war-ruins-view-02-src-112.jpg?responsive";
import type { HistoryRecordMetadata } from "../types";

export default {
	title: "1946 Landscape Photos",
	galleryPhotos: [
		{
			title: "Alfedena panorama, 1946 — view 1",
			alt: "Black-and-white panoramic view of Alfedena and the surrounding mountains in 1946, view 1",
			...alfedenaPanoramaView01Image,
		},
		{
			title: "Alfedena panorama, 1946 — view 2",
			alt: "Black-and-white panoramic view of Alfedena and the surrounding mountains in 1946, view 2",
			...alfedenaPanoramaView02Image,
		},
		{
			title: "Alfedena panorama, 1946 — view 3",
			alt: "Black-and-white panoramic view of Alfedena and the surrounding mountains in 1946, view 3",
			...alfedenaPanoramaView03Image,
		},
		{
			title: "Alfedena panorama, 1946 — view 4",
			alt: "Black-and-white panoramic view of Alfedena and the surrounding mountains in 1946, view 4",
			...alfedenaPanoramaView04Image,
		},
		{
			title: "Alfedena panorama, 1946 — view 5",
			alt: "Black-and-white panoramic view of Alfedena and the surrounding mountains in 1946, view 5",
			...alfedenaPanoramaView05Image,
		},
		{
			title: "Alfedena panorama, 1946 — view 6",
			alt: "Black-and-white panoramic view of Alfedena and the surrounding mountains in 1946, view 6",
			...alfedenaPanoramaView06Image,
		},
		{
			title: "War-damaged buildings in Alfedena, 1946 — view 1",
			alt: "Black-and-white view of war-damaged buildings in Alfedena in 1946, view 1",
			...alfedenaWarRuinsView01Image,
		},
		{
			title: "War-damaged buildings in Alfedena, 1946 — view 2",
			alt: "Black-and-white view of war-damaged buildings in Alfedena in 1946, view 2",
			...alfedenaWarRuinsView02Image,
		},
		{
			title: "War-damaged buildings in Alfedena, April 1946",
			alt: "Black-and-white view of war-damaged buildings in Alfedena in April 1946",
			...alfedenaWarRuinsApril1946Image,
		},
	],
} satisfies HistoryRecordMetadata;
