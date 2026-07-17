import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";
import { lazy, Suspense, useRef, useState } from "react";
import Tile from "~/components/tile";
import { contacts } from "~/content/contacts";
import { homePage } from "~/content/home";
import { type Person, people } from "~/content/people";

const ContactModal = lazy(() => import("~/components/contact-modal"));
const PersonModal = lazy(() => import("~/components/person-modal"));

function HomePage(): JSX.Element {
	const [contactActive, setContactActive] = useState(false);
	const [personActive, setPersonActive] = useState(false);
	const [currentPerson, setCurrentPerson] = useState<Person>();
	const contactTriggerRef = useRef<HTMLElement>(null);
	const personTriggerRef = useRef<HTMLElement>(null);
	const transitionDelay = 300;

	return (
		<>
			<div className="grid grid-cols-3 max-sm:grid-cols-2 gap-2 max-w-[1200px] p-2 mx-auto mb-20">
				{people.map((person, index) => (
					<Tile
						key={person.fullName}
						delay={transitionDelay * (index + 1)}
						image={person.portrait}
						label={person.firstName}
						priority={index < 3}
						onClick={(event) => {
							personTriggerRef.current = event.currentTarget;
							setContactActive(false);
							setCurrentPerson(person);
							setPersonActive(true);
						}}
					/>
				))}

				<Tile
					label="Photos"
					image={homePage.photosThumbnail}
					delay={transitionDelay * (people.length + 1)}
				/>
				<Tile
					image={homePage.familyHistoryThumbnail}
					delay={transitionDelay * (people.length + 2)}
					label="Family History"
					link="/areyou"
				/>
				<Tile
					image={homePage.contactThumbnail}
					delay={transitionDelay * (people.length + 3)}
					label="Contact"
					onClick={(event) => {
						contactTriggerRef.current = event.currentTarget;
						setPersonActive(false);
						setContactActive(true);
					}}
				/>
			</div>

			<Suspense fallback={null}>
				{contactActive ? (
					<ContactModal
						open={contactActive}
						onClose={() => setContactActive(false)}
						contacts={contacts}
						restoreFocusRef={contactTriggerRef}
					/>
				) : null}
				{currentPerson ? (
					<PersonModal
						open={personActive}
						onClose={() => setPersonActive(false)}
						data={currentPerson}
						restoreFocusRef={personTriggerRef}
					/>
				) : null}
			</Suspense>
		</>
	);
}

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "The DiLoreto Family" },
			{
				name: "description",
				content:
					"The DiLoreto Family's home page. Are you a DiLoreto? View our extensive family history and lineage section, or learn more about John, Donna, Carolyn and Paul.",
			},
		],
	}),
	component: HomePage,
});
