export type ImageMetadata = {
	src: string;
	width: number;
	height: number;
};

export type ContentImage = {
	title: string;
	asset: ImageMetadata;
};

export function contentImage(
	title: string,
	asset: ImageMetadata,
): ContentImage {
	return { title, asset };
}
