import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";
import { lazy, Suspense, useRef, useState } from "react";
import Tile from "~/components/tile";
import { contacts } from "~/content/contacts";
import { type HomeTile, homeTiles } from "~/content/home";

const ContactModal = lazy(() => import("~/components/contact-modal"));
const PersonModal = lazy(() => import("~/components/person-modal"));

type PersonTile = Extract<HomeTile, { kind: "person" }>;

function HomePage(): JSX.Element {
	const [contactActive, setContactActive] = useState(false);
	const [personActive, setPersonActive] = useState(false);
	const [currentPerson, setCurrentPerson] = useState<PersonTile>();
	const contactTriggerRef = useRef<HTMLElement>(null);
	const personTriggerRef = useRef<HTMLElement>(null);
	const transitionDelay = 300;

	return (
		<>
			<div className="grid grid-cols-3 max-sm:grid-cols-2 gap-2 max-w-[1200px] p-2 mx-auto mb-20">
				{homeTiles.map((tile, index) => {
					const delay = transitionDelay * (index + 1);
					const priority = index < 3;

					switch (tile.kind) {
						case "person":
							return (
								<Tile
									key={tile.title}
									delay={delay}
									image={tile}
									label={tile.title}
									priority={priority}
									onClick={(event) => {
										personTriggerRef.current = event.currentTarget;
										setContactActive(false);
										setCurrentPerson(tile);
										setPersonActive(true);
									}}
								/>
							);
						case "family-history":
							return (
								<Tile
									key={tile.title}
									delay={delay}
									image={tile}
									label={tile.title}
									link={tile.link}
								/>
							);
						case "contact":
							return (
								<Tile
									key={tile.title}
									delay={delay}
									image={tile}
									label={tile.title}
									onClick={(event) => {
										contactTriggerRef.current = event.currentTarget;
										setPersonActive(false);
										setContactActive(true);
									}}
								/>
							);
						case "photos":
							return (
								<Tile
									key={tile.title}
									delay={delay}
									image={tile}
									label={tile.title}
								/>
							);
					}

					return null;
				})}
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
