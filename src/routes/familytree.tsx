import { createFileRoute } from "@tanstack/react-router";
import {
	BookOpenText,
	CalendarDays,
	ExternalLink,
	GitBranch,
	LockKeyhole,
	MapPin,
	Search,
	Users,
} from "lucide-react";
import type { JSX } from "react";
import {
	lazy,
	Suspense,
	useCallback,
	useDeferredValue,
	useMemo,
	useState,
} from "react";
import type {
	GenealogyCitation,
	GenealogyEvent,
	GenealogyPerson,
} from "~/content/genealogy";
import { genealogy } from "~/content/genealogy";
import "~/styles/family-tree.css";

const FamilyTreeGraph = lazy(() => import("~/components/family-tree-graph"));

type FamilyTreeSearch = {
	person?: string;
};

function validateSearch(search: Record<string, unknown>): FamilyTreeSearch {
	return {
		...(typeof search.person === "string" ? { person: search.person } : {}),
	};
}

function eventYear(person: GenealogyPerson, type: string): string | undefined {
	return person.events
		.find((event) => event.type === type)
		?.date?.match(/(?<!\d)\d{3,4}(?!\d)/)?.[0];
}

function lifespan(person: GenealogyPerson): string | undefined {
	const birthYear = eventYear(person, "Birth");
	const deathYear = eventYear(person, "Death");
	if (!birthYear && !deathYear) {
		return undefined;
	}
	return `${birthYear ?? "?"}–${deathYear ?? "?"}`;
}

function uniquePeople(personIds: string[]): GenealogyPerson[] {
	const uniqueIds = new Set(personIds);
	return [...uniqueIds]
		.map((personId) => genealogy.people[personId])
		.filter((person) => person !== undefined);
}

function relationships(person: GenealogyPerson): {
	parents: GenealogyPerson[];
	partners: GenealogyPerson[];
	children: GenealogyPerson[];
} {
	const parentIds: string[] = [];
	for (const familyId of person.familyAsChildIds) {
		const family = genealogy.families[familyId];
		for (const partnerId of family?.partnerIds ?? []) {
			if (partnerId !== person.id) {
				parentIds.push(partnerId);
			}
		}
	}
	const partnerIds: string[] = [];
	const childIds: string[] = [];
	for (const familyId of person.familyAsPartnerIds) {
		const family = genealogy.families[familyId];
		for (const partnerId of family?.partnerIds ?? []) {
			if (partnerId !== person.id) {
				partnerIds.push(partnerId);
			}
		}
		for (const familyChild of family?.children ?? []) {
			childIds.push(familyChild.personId);
		}
	}
	return {
		parents: uniquePeople(parentIds),
		partners: uniquePeople(partnerIds),
		children: uniquePeople(childIds),
	};
}

function validatedLinks(values: Array<string | undefined>): string[] {
	const links = new Set<string>();
	for (const value of values) {
		for (const match of value?.match(/https?:\/\/[^\s<>()]+/g) ?? []) {
			try {
				const url = new URL(match.replace(/[.,;:]$/, ""));
				if (url.protocol === "http:" || url.protocol === "https:") {
					links.add(url.href);
				}
			} catch {
				// Ignore malformed URLs embedded in source text.
			}
		}
	}
	return [...links];
}

function sourceLabel(url: string): string {
	const hostname = new URL(url).hostname.replace(/^www\./, "");
	return hostname.endsWith("ancestry.com")
		? "View on Ancestry"
		: `Visit ${hostname}`;
}

function CitationDetails({ citation }: { citation: GenealogyCitation }) {
	const source = citation.sourceId
		? genealogy.sources[citation.sourceId]
		: undefined;
	const repositories =
		source?.repositoryIds
			.map((repositoryId) => genealogy.repositories[repositoryId])
			.filter((repository) => repository !== undefined) ?? [];
	const links = validatedLinks([
		citation.page,
		citation.text,
		citation.dataText,
		source?.text,
		source?.publication,
		...repositories.map((repository) => repository.website),
	]);
	const extensionValues = Object.entries(citation.extensions ?? {});

	return (
		<li className="family-tree-citation">
			<p className="family-tree-citation-title">
				{source?.title ?? source?.abbreviation ?? "Source citation"}
			</p>
			{source?.author ? <p>{source.author}</p> : null}
			{source?.publication ? <p>{source.publication}</p> : null}
			{citation.page ? <p>{citation.page}</p> : null}
			{citation.text ? <p>{citation.text}</p> : null}
			{citation.dataText ? <p>{citation.dataText}</p> : null}
			{source?.text ? <p>{source.text}</p> : null}
			{repositories.map((repository) => (
				<div key={repository.id} className="family-tree-repository">
					{repository.name ? <p>{repository.name}</p> : null}
					{repository.address ? <p>{repository.address}</p> : null}
					{repository.phone ? <p>{repository.phone}</p> : null}
					{repository.email ? <p>{repository.email}</p> : null}
				</div>
			))}
			{extensionValues.map(([tag, values]) => (
				<p key={tag} className="family-tree-provider-id">
					{tag.replace(/^_/, "")}: {values.join(", ")}
				</p>
			))}
			{links.length > 0 ? (
				<div className="family-tree-source-links">
					{links.map((url) => (
						<a key={url} href={url} target="_blank" rel="noreferrer">
							{sourceLabel(url)} <ExternalLink aria-hidden="true" size={13} />
						</a>
					))}
				</div>
			) : null}
		</li>
	);
}

function Citations({ citations }: { citations: GenealogyCitation[] }) {
	if (citations.length === 0) {
		return null;
	}
	return (
		<details className="family-tree-citations">
			<summary>
				<BookOpenText aria-hidden="true" size={15} />
				{citations.length} {citations.length === 1 ? "source" : "sources"}
			</summary>
			<ul>
				{citations.map((citation) => (
					<CitationDetails key={citation.id} citation={citation} />
				))}
			</ul>
		</details>
	);
}

function EventCard({
	event,
	context,
}: {
	event: GenealogyEvent;
	context?: string;
}) {
	return (
		<li className="family-tree-event">
			<div className="family-tree-event-heading">
				<span>{event.type}</span>
				{context ? <small>{context}</small> : null}
			</div>
			{event.date ? (
				<p>
					<CalendarDays aria-hidden="true" size={15} /> {event.date}
				</p>
			) : null}
			{event.place ? (
				<p>
					<MapPin aria-hidden="true" size={15} /> {event.place}
				</p>
			) : null}
			{event.value ? <p>{event.value}</p> : null}
			{event.address ? <p>{event.address}</p> : null}
			{event.agency ? <p>{event.agency}</p> : null}
			{event.cause ? <p>Cause: {event.cause}</p> : null}
			{event.description ? <p>{event.description}</p> : null}
			{event.notes.map((note) => (
				<p key={note}>{note}</p>
			))}
			<Citations citations={event.citations} />
		</li>
	);
}

function RelationshipGroup({
	label,
	people,
	onSelect,
}: {
	label: string;
	people: GenealogyPerson[];
	onSelect: (personId: string) => void;
}) {
	if (people.length === 0) {
		return null;
	}
	return (
		<div className="family-tree-relationship-group">
			<h3>{label}</h3>
			<div>
				{people.map((person) => (
					<button
						type="button"
						key={person.id}
						disabled={person.isLiving}
						onClick={() => onSelect(person.id)}
					>
						<span>{person.name.display}</span>
						{person.isLiving ? (
							<LockKeyhole aria-hidden="true" size={13} />
						) : null}
					</button>
				))}
			</div>
		</div>
	);
}

function PersonDetails({
	person,
	onSelect,
}: {
	person: GenealogyPerson;
	onSelect: (personId: string) => void;
}) {
	const related = relationships(person);
	const familyEvents = person.familyAsPartnerIds.flatMap((familyId) => {
		const family = genealogy.families[familyId];
		if (!family) {
			return [];
		}
		const partnerNames = family.partnerIds
			.filter((partnerId) => partnerId !== person.id)
			.map((partnerId) => genealogy.people[partnerId]?.name.display)
			.filter((name) => name !== undefined);
		const context =
			partnerNames.length > 0 ? `with ${partnerNames.join(" & ")}` : undefined;
		return family.events.map((event) => ({ event, context }));
	});
	const mediaLinks = person.media.filter(
		(media) => media.file && validatedLinks([media.file]).length > 0,
	);

	return (
		<aside className="family-tree-details" aria-live="polite">
			<div className="family-tree-details-heading">
				<p>Selected record</p>
				<h2>{person.name.display}</h2>
				{lifespan(person) ? <span>{lifespan(person)}</span> : null}
			</div>

			<div className="family-tree-relationships">
				<RelationshipGroup
					label="Parents"
					people={related.parents}
					onSelect={onSelect}
				/>
				<RelationshipGroup
					label="Partners"
					people={related.partners}
					onSelect={onSelect}
				/>
				<RelationshipGroup
					label="Children"
					people={related.children}
					onSelect={onSelect}
				/>
			</div>

			{person.events.length > 0 || familyEvents.length > 0 ? (
				<section className="family-tree-details-section">
					<h3>Life record</h3>
					<ul className="family-tree-event-list">
						{person.events.map((event) => (
							<EventCard key={event.id} event={event} />
						))}
						{familyEvents.map(({ event, context }) => (
							<EventCard key={event.id} event={event} context={context} />
						))}
					</ul>
				</section>
			) : null}

			{person.notes.length > 0 ? (
				<section className="family-tree-details-section">
					<h3>Notes</h3>
					{person.notes.map((note) => (
						<p key={note}>{note}</p>
					))}
				</section>
			) : null}

			{person.citations.length > 0 ? (
				<section className="family-tree-details-section">
					<h3>Record sources</h3>
					<Citations citations={person.citations} />
				</section>
			) : null}

			{mediaLinks.length > 0 ? (
				<section className="family-tree-details-section">
					<h3>Media</h3>
					<div className="family-tree-media-links">
						{mediaLinks.map((media) => {
							const url = validatedLinks([media.file])[0];
							return url ? (
								<a key={media.id} href={url} target="_blank" rel="noreferrer">
									{media.title ?? "View media"}{" "}
									<ExternalLink aria-hidden="true" size={13} />
								</a>
							) : null;
						})}
					</div>
				</section>
			) : null}
		</aside>
	);
}

function GraphFallback() {
	return (
		<div className="family-tree-graph-loading" role="status">
			<GitBranch aria-hidden="true" />
			<span>Drawing family connections…</span>
		</div>
	);
}

function FamilyTreePage(): JSX.Element {
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	const requestedPerson = search.person
		? genealogy.people[search.person]
		: undefined;
	const selectedPerson =
		requestedPerson && !requestedPerson.isLiving
			? requestedPerson
			: genealogy.people[genealogy.defaultPersonId];
	if (!selectedPerson) {
		throw new Error("The generated genealogy has no default person");
	}

	const [query, setQuery] = useState("");
	const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());
	const results = useMemo(() => {
		if (!deferredQuery) {
			return [];
		}
		return Object.values(genealogy.people)
			.filter(
				(person) =>
					!person.isLiving &&
					person.name.display.toLocaleLowerCase().includes(deferredQuery),
			)
			.sort((first, second) =>
				first.name.display.localeCompare(second.name.display),
			)
			.slice(0, 8);
	}, [deferredQuery]);
	const selectPerson = useCallback(
		(personId: string) => {
			const person = genealogy.people[personId];
			if (!person || person.isLiving) {
				return;
			}
			setQuery("");
			void navigate({ search: { person: personId } });
		},
		[navigate],
	);

	return (
		<main className="family-tree-page">
			<section className="family-tree-hero">
				<div>
					<p className="family-tree-eyebrow">The DiLoreto lineage</p>
					<h1>Explore the family tree</h1>
					<p className="family-tree-intro">
						Travel through generations, open a family record, and follow each
						branch of the story.
					</p>
				</div>
				<div className="family-tree-stats">
					<span>
						<Users aria-hidden="true" size={18} />
						<strong>{genealogy.stats.deceasedPeople}</strong> public records
					</span>
					<span>
						<LockKeyhole aria-hidden="true" size={18} />
						Living relatives are private
					</span>
				</div>
			</section>

			<div className="family-tree-search-wrap">
				<label htmlFor="family-tree-search">Find a family member</label>
				<div className="family-tree-search">
					<Search aria-hidden="true" size={19} />
					<input
						id="family-tree-search"
						type="search"
						value={query}
						onChange={(event) => setQuery(event.currentTarget.value)}
						placeholder="Search public records by name…"
						autoComplete="off"
					/>
				</div>
				{query.trim() ? (
					<div className="family-tree-search-results">
						{results.length > 0 ? (
							<ul>
								{results.map((person) => (
									<li key={person.id}>
										<button
											type="button"
											onClick={() => selectPerson(person.id)}
										>
											<span>{person.name.display}</span>
											{lifespan(person) ? (
												<small>{lifespan(person)}</small>
											) : null}
										</button>
									</li>
								))}
							</ul>
						) : (
							<p>No public records match “{query.trim()}”.</p>
						)}
					</div>
				) : null}
			</div>

			<div className="family-tree-workspace">
				<section
					className="family-tree-canvas"
					aria-labelledby="tree-view-heading"
				>
					<div className="family-tree-canvas-heading">
						<div>
							<p>Two-generation view</p>
							<h2 id="tree-view-heading">
								{selectedPerson.name.display}’s branch
							</h2>
						</div>
						<span>Drag to pan · Scroll to zoom</span>
					</div>
					<div className="family-tree-graph">
						<Suspense fallback={<GraphFallback />}>
							<FamilyTreeGraph
								data={genealogy}
								selectedPersonId={selectedPerson.id}
								onSelect={selectPerson}
							/>
						</Suspense>
					</div>
				</section>
				<PersonDetails person={selectedPerson} onSelect={selectPerson} />
			</div>
		</main>
	);
}

export const Route = createFileRoute("/familytree")({
	validateSearch,
	head: () => ({
		meta: [
			{ title: "DiLoreto Family Tree" },
			{
				name: "description",
				content:
					"Explore the DiLoreto family tree across generations with documented life events, relationships, and genealogy sources.",
			},
		],
	}),
	component: FamilyTreePage,
});
