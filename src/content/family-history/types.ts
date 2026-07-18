import type { ContentImage } from "../image";

export type HistoryRecordMetadata = {
	title: string;
	link?: string;
	headerPhoto?: ContentImage;
	galleryPhotos?: ContentImage[];
};

export type HistoryRecord = HistoryRecordMetadata & {
	year: number;
	content: string;
};
