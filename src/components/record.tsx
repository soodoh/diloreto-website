import type { JSX } from "react";
import ReactMarkdown from "react-markdown";
import type { GalleryPhoto, HistoryRecord } from "~/content/family-history";
import HistoryGallery from "./history-gallery";
import Photo from "./photo";

type RecordProps = {
	data: HistoryRecord;
	openPhoto: (photo: GalleryPhoto) => void;
	isEven: boolean;
};

export default function Record({
	data,
	openPhoto,
	isEven,
}: RecordProps): JSX.Element {
	const hasGallery =
		data.galleryPhotos !== undefined && data.galleryPhotos.length > 0;

	const markdownColSpan = (() => {
		if (hasGallery || !data.headerPhoto) {
			return "col-span-3";
		}
		if (isEven) {
			return "col-start-2 col-span-2";
		}
		return "col-start-1 col-span-2";
	})();

	const photoCol = isEven ? "col-start-1 col-span-1" : "col-start-3 col-span-1";

	return (
		<div className={`p-4 ${isEven ? "bg-white" : "bg-bg-dark"}`}>
			<h1 className="font-serif italic text-primary text-5xl text-center">
				{data.title}
			</h1>

			<div className="grid grid-cols-3 gap-2">
				{data.headerPhoto !== undefined ? (
					<div
						className={`row-start-1 ${photoCol} max-sm:row-start-auto max-sm:col-span-3`}
					>
						<Photo
							data={data.headerPhoto}
							link={data.link}
							openPhoto={openPhoto}
						/>
					</div>
				) : null}

				<div
					className={`row-start-1 ${markdownColSpan} max-sm:row-start-auto max-sm:col-span-3`}
				>
					<div className="font-serif markdown-content">
						<ReactMarkdown>{data.content}</ReactMarkdown>
					</div>
				</div>

				{hasGallery ? (
					<HistoryGallery
						className="col-span-3 row-start-2 max-sm:row-start-auto"
						data={data}
						openPhoto={openPhoto}
					/>
				) : null}
			</div>
		</div>
	);
}
