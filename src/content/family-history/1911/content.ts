import gaetanoCleoniceWedding1913Image from "~/assets/images/family-history/people-and-events/gaetano-damico-cleonice-diloreto-wedding-1913.jpg?responsive";
import remoMariannaWedding1911Image from "~/assets/images/family-history/people-and-events/remo-diloreto-marianna-damico-wedding-1911.jpg?responsive";
import type { HistoryRecordMetadata } from "../types";

export default {
	title: "1911-1913 Weddings",
	galleryPhotos: [
		{
			title: "Remo DiLoreto and Marianna D'Amico's wedding",
			alt: "Wedding portrait of Remo DiLoreto and Marianna D'Amico on February 12, 1911",
			...remoMariannaWedding1911Image,
		},
		{
			title: "Gaetano D'Amico and Cleonice DiLoreto's wedding",
			alt: "Gaetano D'Amico and Cleonice DiLoreto with Remo and Marianna DiLoreto at the wedding on August 23, 1913",
			...gaetanoCleoniceWedding1913Image,
		},
	],
} satisfies HistoryRecordMetadata;
