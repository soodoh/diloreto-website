import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";
import { useState } from "react";
import ContactModal from "~/components/contact-modal";
import ImageModal from "~/components/image-modal";
import Record from "~/components/record";
import { Button } from "~/components/ui/button";
import { familyHistory, type GalleryPhoto } from "~/content/family-history";
import { people } from "~/content/people";

const allPhotos: GalleryPhoto[] = familyHistory.flatMap((record) => {
	if (record.link) {
		return [];
	}

	return [
		...(record.headerPhoto !== undefined ? [record.headerPhoto] : []),
		...(record.galleryPhotos ?? []),
	];
});

function FamilyHistory(): JSX.Element {
	const [contactActive, setContact] = useState(false);
	const [photoIndex, setPhoto] = useState<number | undefined>(undefined);

	return (
		<>
			<ContactModal
				open={contactActive}
				onClose={() => setContact(false)}
				people={people}
			/>

			<ImageModal
				onChange={(newIndex: number) => setPhoto(newIndex)}
				onClose={() => setPhoto(undefined)}
				images={allPhotos}
				photoIndex={photoIndex}
			/>

			<div className="p-4 flex flex-col items-center">
				<p className="font-serif text-center max-w-3xl mb-4">
					A genealogical record of the DiLoreto lineage is maintained, and we
					would love to hear from any relatives with updates. An updated copy of
					the complete family tree can be sent as a PDF to family members.
				</p>
				<Button
					variant="outline"
					className="border-primary text-primary font-sans hover:bg-primary hover:text-primary-contrast"
					onClick={() => setContact(true)}
				>
					Contact Us
				</Button>
			</div>

			{familyHistory.map((record, index) => (
				<Record
					key={record.title}
					data={record}
					isEven={index % 2 === 0}
					openPhoto={(selectedPhoto) => {
						const selectedIndex = allPhotos.indexOf(selectedPhoto);
						if (selectedIndex !== -1) {
							setPhoto(selectedIndex);
						}
					}}
				/>
			))}
		</>
	);
}

export const Route = createFileRoute("/areyou")({
	head: () => ({
		meta: [
			{ title: "Are You a DiLoreto?" },
			{
				name: "description",
				content:
					"Are you a DiLoreto? View the history of the DiLoretos from Alfadena, Italy to Michigan and California. Extensive historical sources, photos and family tree listed.",
			},
		],
	}),
	component: FamilyHistory,
});
