export type ResponsiveImageData = {
	sources: Record<string, string>;
	img: {
		src: string;
		w: number;
		h: number;
	};
};

export type ContentImage = ResponsiveImageData & {
	title: string;
};
