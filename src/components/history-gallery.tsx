import type { JSX } from "react";
import type { HistoryRecord } from "~/content/family-history";
import Photo, { type OpenPhoto } from "./photo";

type HistoryGalleryProps = {
	data: HistoryRecord;
	openPhoto: OpenPhoto;
	className?: string;
};

export default function HistoryGallery({
	data,
	openPhoto,
	className,
}: HistoryGalleryProps): JSX.Element {
	const photos = data.galleryPhotos?.slice(0, 3) ?? [];
	const columnClass = photos.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

	return (
		<div className={className}>
			<div className="flex justify-center">
				<span className="text-sm">Click any photo to view full gallery</span>
			</div>

			<div className={`grid grid-cols-1 gap-4 ${columnClass}`}>
				{photos.map((photo) => (
					<Photo
						key={photo.img.src}
						data={photo}
						link={data.link}
						openPhoto={openPhoto}
					/>
				))}
			</div>
		</div>
	);
}
