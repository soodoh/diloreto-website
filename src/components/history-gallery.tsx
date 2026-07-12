import type { JSX } from "react";
import type { HistoryRecord } from "~/types";
import Photo from "./photo";

type HistoryGalleryProps = {
	data: HistoryRecord;
	openPhoto: (id: string) => void;
	className?: string;
};

export default function HistoryGallery({
	data,
	openPhoto,
	className,
}: HistoryGalleryProps): JSX.Element {
	return (
		<div className={`grid grid-cols-3 gap-4 ${className ?? ""}`}>
			<div className="col-span-3 flex justify-center">
				<span className="text-sm">Click any photo to view full gallery</span>
			</div>

			{data.photos.slice(0, 3).map((photo) => (
				<Photo
					key={photo.id}
					data={photo}
					link={data.link}
					openPhoto={openPhoto}
				/>
			))}
		</div>
	);
}
