import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";
import { useState } from "react";
import ContactModal from "~/components/contact-modal";
import PersonModal from "~/components/person-modal";
import Tile from "~/components/tile";
import { homePage } from "~/content/home";
import { type Person, people } from "~/content/people";

function HomePage(): JSX.Element {
	const [contactActive, setContactActive] = useState(false);
	const [personActive, setPersonActive] = useState(false);
	const [currentPerson, setCurrentPerson] = useState<Person | undefined>(
		undefined,
	);
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
						onClick={() => {
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
					onClick={() => setContactActive(true)}
				/>
			</div>

			<ContactModal
				open={contactActive}
				onClose={() => setContactActive(false)}
				people={people}
			/>
			<PersonModal
				open={personActive}
				onClose={() => {
					setPersonActive(false);
					setCurrentPerson(undefined);
				}}
				data={currentPerson}
			/>
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
