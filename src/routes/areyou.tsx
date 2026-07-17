import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";
import { lazy, Suspense, useCallback, useRef, useState } from "react";
import type { OpenPhoto } from "~/components/photo";
import Record from "~/components/record";
import { Button } from "~/components/ui/button";
import { contacts } from "~/content/contacts";
import { familyHistory } from "~/content/family-history";
import type { ContentImage } from "~/content/image";

const ContactModal = lazy(() => import("~/components/contact-modal"));
const ImageModal = lazy(() => import("~/components/image-modal"));

const allPhotos: ContentImage[] = familyHistory.flatMap((record) => {
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
	const [photoIndex, setPhoto] = useState<number>();
	const contactTriggerRef = useRef<HTMLElement>(null);
	const photoTriggerRef = useRef<HTMLElement>(null);
	const openPhoto = useCallback<OpenPhoto>((selectedPhoto, trigger) => {
		const selectedIndex = allPhotos.indexOf(selectedPhoto);
		if (selectedIndex !== -1) {
			photoTriggerRef.current = trigger;
			setContact(false);
			setPhoto(selectedIndex);
		}
	}, []);

	return (
		<>
			<Suspense fallback={null}>
				{contactActive ? (
					<ContactModal
						open={contactActive}
						onClose={() => setContact(false)}
						contacts={contacts}
						restoreFocusRef={contactTriggerRef}
					/>
				) : null}
				{photoIndex !== undefined ? (
					<ImageModal
						onClose={() => setPhoto(undefined)}
						images={allPhotos}
						photoIndex={photoIndex}
						restoreFocusRef={photoTriggerRef}
					/>
				) : null}
			</Suspense>

			<div className="p-4 flex flex-col items-center">
				<p className="font-serif text-center max-w-3xl mb-4">
					A genealogical record of the DiLoreto lineage is maintained, and we
					would love to hear from any relatives with updates. An updated copy of
					the complete family tree can be sent as a PDF to family members.
				</p>
				<Button
					variant="outline"
					className="border-primary text-primary font-sans hover:bg-primary hover:text-primary-contrast"
					onClick={(event) => {
						contactTriggerRef.current = event.currentTarget;
						setPhoto(undefined);
						setContact(true);
					}}
				>
					Contact Us
				</Button>
			</div>

			{familyHistory.map((record, index) => (
				<Record
					key={record.title}
					data={record}
					isEven={index % 2 === 0}
					openPhoto={openPhoto}
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
