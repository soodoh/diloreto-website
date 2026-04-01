import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import ContactModal from "~/components/contact-modal";
import ImageModal from "~/components/image-modal";
import Record from "~/components/record";
import { Button } from "~/components/ui/button";
import { fetchFamilyHistory, fetchPeople } from "~/lib/contentful";
import type { GalleryPhoto, HistoryRecord, Person } from "~/types";

const getHistoryData = createServerFn({ method: "GET" }).handler(() => {
	const history = fetchFamilyHistory();
	const people = fetchPeople();
	return { history, people };
});

export function FamilyHistory(): JSX.Element {
	const { history, people }: { history: HistoryRecord[]; people: Person[] } =
		useLoaderData({ from: "/areyou" });
	const allPhotos = useMemo(() => {
		const photos: GalleryPhoto[] = [];
		for (const album of history) {
			if (album.link) {
				continue;
			}
			for (const photo of album.photos ?? []) {
				photos.push(photo);
			}
		}
		return photos;
	}, [history]);

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

			{history.map((record, index) => (
				<Record
					key={record.id}
					data={record}
					isEven={index % 2 === 0}
					openPhoto={(id) => {
						const idx = allPhotos.findIndex((photo) => photo.id === id);
						if (idx !== -1) {
							setPhoto(idx);
						}
					}}
				/>
			))}
		</>
	);
}

export const Route = createFileRoute("/areyou")({
	loader: async () => getHistoryData(),
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
