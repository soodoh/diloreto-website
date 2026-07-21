import {
	Background,
	BackgroundVariant,
	Controls,
	type Edge,
	Handle,
	MarkerType,
	type Node,
	type NodeMouseHandler,
	type NodeProps,
	Position,
	ReactFlow,
	type ReactFlowInstance,
} from "@xyflow/react";
import { memo, useCallback, useMemo, useRef } from "react";
import type { GenealogyData, GenealogyPerson } from "~/content/genealogy";
import "@xyflow/react/dist/style.css";

type RelationshipToFocus =
	| "selected"
	| "parent"
	| "spouse-partner"
	| "child"
	| "grandparent"
	| "grandchild"
	| "sibling"
	| "other";

type PersonNodeData = {
	label: string;
	lifespan?: string;
	isFocus: boolean;
	isInFocusBranch: boolean;
	isLiving: boolean;
	onSelect: (personId: string) => void;
	personId: string;
	relationship: RelationshipToFocus;
};

type FamilyNodeData = {
	isInFocusBranch: boolean;
};

type GenerationNodeData = {
	label: string;
};

type PersonFlowNode = Node<PersonNodeData, "person">;
type FamilyFlowNode = Node<FamilyNodeData, "family">;
type GenerationFlowNode = Node<GenerationNodeData, "generation">;
type FamilyTreeFlowNode = PersonFlowNode | FamilyFlowNode | GenerationFlowNode;

type FamilyTreeGraphProps = {
	data: GenealogyData;
	selectedPersonId: string;
	onSelect: (personId: string) => void;
};

const NODE_WIDTH = 216;
const NODE_HEIGHT = 112;
const FAMILY_NODE_SIZE = 12;
const FOCUS_ZOOM = 0.9;
const MOBILE_FOCUS_ZOOM = 0.75;
const COLUMN_GAP = 76;
const ROW_GAP = 208;
const COMPONENT_GAP = 480;

function eventYear(person: GenealogyPerson, type: string): string | undefined {
	const event = person.events.find((candidate) => candidate.type === type);
	return event?.date?.match(/(?<!\d)\d{3,4}(?!\d)/)?.[0];
}

function lifespan(person: GenealogyPerson): string | undefined {
	if (person.isLiving) {
		return undefined;
	}
	const birthYear = eventYear(person, "Birth");
	const deathYear = eventYear(person, "Death");
	if (!birthYear && !deathYear) {
		return undefined;
	}
	return `${birthYear ?? "?"}–${deathYear ?? "?"}`;
}

const relationshipLabels: Record<RelationshipToFocus, string | undefined> = {
	selected: "Selected",
	parent: "Parent",
	"spouse-partner": "Spouse / partner",
	child: "Child",
	grandparent: "Grandparent",
	grandchild: "Grandchild",
	sibling: "Sibling",
	other: undefined,
};

function PersonNode({ data }: NodeProps<PersonFlowNode>) {
	const relationshipLabel = relationshipLabels[data.relationship];
	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
				id="parent-target"
				className="family-tree-handle"
			/>
			<Handle
				type="target"
				position={Position.Left}
				id="partner-target"
				className="family-tree-handle"
			/>
			<button
				type="button"
				disabled={data.isLiving}
				onClick={(event) => {
					event.stopPropagation();
					data.onSelect(data.personId);
				}}
				className={`family-tree-node nodrag family-tree-node-${data.relationship} ${data.isFocus ? "family-tree-node-focus" : ""} ${data.isLiving ? "family-tree-node-private" : ""} ${data.isInFocusBranch ? "" : "family-tree-node-muted"}`}
				aria-label={`${relationshipLabel ? `${relationshipLabel}: ` : ""}${
					data.isLiving
						? "Living person, details are private"
						: `${data.label}${data.lifespan ? `, ${data.lifespan}` : ""}`
				}`}
			>
				{relationshipLabel ? (
					<span className="family-tree-node-relationship">
						{relationshipLabel}
					</span>
				) : null}
				<span className="family-tree-node-name">{data.label}</span>
				{data.lifespan ? (
					<span className="family-tree-node-years">{data.lifespan}</span>
				) : null}
				{data.isLiving ? (
					<span className="family-tree-node-years">Details private</span>
				) : null}
			</button>
			<Handle
				type="source"
				position={Position.Right}
				id="partner-source"
				className="family-tree-handle"
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				id="child-source"
				className="family-tree-handle"
			/>
		</>
	);
}

function FamilyNode({ data }: NodeProps<FamilyFlowNode>) {
	return (
		<div
			className={`family-tree-family-junction ${data.isInFocusBranch ? "" : "family-tree-family-junction-muted"}`}
			aria-hidden="true"
		>
			<Handle
				type="target"
				position={Position.Top}
				id="family-target"
				className="family-tree-handle"
			/>
			<span />
			<Handle
				type="source"
				position={Position.Bottom}
				id="children-source"
				className="family-tree-handle"
			/>
		</div>
	);
}

function GenerationNode({ data }: NodeProps<GenerationFlowNode>) {
	return (
		<div className="family-tree-generation-band" aria-hidden="true">
			<span>{data.label}</span>
		</div>
	);
}

const MemoizedPersonNode = memo(PersonNode);
const MemoizedFamilyNode = memo(FamilyNode);
const MemoizedGenerationNode = memo(GenerationNode);
const nodeTypes = {
	person: MemoizedPersonNode,
	family: MemoizedFamilyNode,
	generation: MemoizedGenerationNode,
};

function parentIds(data: GenealogyData, personId: string): string[] {
	const person = data.people[personId];
	if (!person) {
		return [];
	}
	const parents = new Set<string>();
	for (const familyId of person.familyAsChildIds) {
		const family = data.families[familyId];
		for (const partnerId of family?.partnerIds ?? []) {
			if (partnerId !== personId) {
				parents.add(partnerId);
			}
		}
	}
	return [...parents];
}

function childIds(data: GenealogyData, personId: string): string[] {
	const person = data.people[personId];
	if (!person) {
		return [];
	}
	const descendants = new Set<string>();
	for (const familyId of person.familyAsPartnerIds) {
		const family = data.families[familyId];
		for (const familyChild of family?.children ?? []) {
			descendants.add(familyChild.personId);
		}
	}
	return [...descendants];
}

function partnerIds(data: GenealogyData, personId: string): string[] {
	const person = data.people[personId];
	if (!person) {
		return [];
	}
	const partners = new Set<string>();
	for (const familyId of person.familyAsPartnerIds) {
		const family = data.families[familyId];
		for (const partnerId of family?.partnerIds ?? []) {
			if (partnerId !== personId) {
				partners.add(partnerId);
			}
		}
	}
	return [...partners];
}

function relationshipMap(
	data: GenealogyData,
	selectedPersonId: string,
): Map<string, RelationshipToFocus> {
	const relationships = new Map<string, RelationshipToFocus>([
		[selectedPersonId, "selected"],
	]);
	const setRelationship = (
		personId: string,
		relationship: RelationshipToFocus,
	) => {
		if (!relationships.has(personId)) {
			relationships.set(personId, relationship);
		}
	};

	const parents = parentIds(data, selectedPersonId);
	const children = childIds(data, selectedPersonId);
	for (const parentId of parents) {
		setRelationship(parentId, "parent");
		for (const grandparentId of parentIds(data, parentId)) {
			setRelationship(grandparentId, "grandparent");
		}
	}
	for (const partnerId of partnerIds(data, selectedPersonId)) {
		setRelationship(partnerId, "spouse-partner");
	}
	for (const childId of children) {
		setRelationship(childId, "child");
		for (const grandchildId of childIds(data, childId)) {
			setRelationship(grandchildId, "grandchild");
		}
	}

	const selectedPerson = data.people[selectedPersonId];
	for (const familyId of selectedPerson?.familyAsChildIds ?? []) {
		const family = data.families[familyId];
		for (const sibling of family?.children ?? []) {
			if (sibling.personId !== selectedPersonId) {
				setRelationship(sibling.personId, "sibling");
			}
		}
	}
	return relationships;
}

function focusFamilyIds(
	data: GenealogyData,
	selectedPersonId: string,
): Set<string> {
	const familyIds = new Set<string>();
	const selectedPerson = data.people[selectedPersonId];
	for (const familyId of [
		...(selectedPerson?.familyAsChildIds ?? []),
		...(selectedPerson?.familyAsPartnerIds ?? []),
	]) {
		familyIds.add(familyId);
	}
	for (const parentId of parentIds(data, selectedPersonId)) {
		for (const familyId of data.people[parentId]?.familyAsChildIds ?? []) {
			familyIds.add(familyId);
		}
	}
	for (const childId of childIds(data, selectedPersonId)) {
		for (const familyId of data.people[childId]?.familyAsPartnerIds ?? []) {
			familyIds.add(familyId);
		}
	}
	return familyIds;
}

function collectInitialPersonIds(
	data: GenealogyData,
	selectedPersonId: string,
): Set<string> {
	const personIds = new Set<string>(
		relationshipMap(data, selectedPersonId).keys(),
	);

	let ancestors = [selectedPersonId];
	for (let depth = 1; depth <= 2; depth += 1) {
		const next: string[] = [];
		for (const personId of ancestors) {
			for (const parentId of parentIds(data, personId)) {
				if (!personIds.has(parentId)) {
					personIds.add(parentId);
					next.push(parentId);
				}
			}
		}
		ancestors = next;
	}

	let descendants = [selectedPersonId];
	for (let depth = 1; depth <= 2; depth += 1) {
		const next: string[] = [];
		for (const personId of descendants) {
			for (const childId of childIds(data, personId)) {
				if (!personIds.has(childId)) {
					personIds.add(childId);
					next.push(childId);
				}
			}
		}
		descendants = next;
	}

	for (const partnerId of partnerIds(data, selectedPersonId)) {
		personIds.add(partnerId);
	}
	return personIds;
}

type ComponentPerson = {
	person: GenealogyPerson;
	generation: number;
	distance: number;
};

function collectComponent(
	data: GenealogyData,
	startPersonId: string,
	visitedPersonIds: Set<string>,
): ComponentPerson[] {
	const positions = new Map<string, { generation: number; distance: number }>([
		[startPersonId, { generation: 0, distance: 0 }],
	]);
	const queue = [startPersonId];
	visitedPersonIds.add(startPersonId);

	for (let index = 0; index < queue.length; index += 1) {
		const personId = queue[index];
		const person = personId ? data.people[personId] : undefined;
		const position = personId ? positions.get(personId) : undefined;
		if (!person || !position) {
			continue;
		}

		const addPerson = (relatedPersonId: string, generation: number) => {
			if (visitedPersonIds.has(relatedPersonId)) {
				return;
			}
			visitedPersonIds.add(relatedPersonId);
			positions.set(relatedPersonId, {
				generation,
				distance: position.distance + 1,
			});
			queue.push(relatedPersonId);
		};

		for (const familyId of person.familyAsChildIds) {
			const family = data.families[familyId];
			for (const parentId of family?.partnerIds ?? []) {
				addPerson(parentId, position.generation - 1);
			}
			for (const child of family?.children ?? []) {
				addPerson(child.personId, position.generation);
			}
		}

		for (const familyId of person.familyAsPartnerIds) {
			const family = data.families[familyId];
			for (const partnerId of family?.partnerIds ?? []) {
				addPerson(partnerId, position.generation);
			}
			for (const child of family?.children ?? []) {
				addPerson(child.personId, position.generation + 1);
			}
		}
	}

	return [...positions].flatMap(([personId, position]) => {
		const person = data.people[personId];
		return person ? [{ person, ...position }] : [];
	});
}

function orderGenerationPeople(
	data: GenealogyData,
	people: ComponentPerson[],
	initialPersonIds: Set<string>,
): ComponentPerson[] {
	const sortedPeople = [...people].sort((first, second) => {
		const firstIsInitial = initialPersonIds.has(first.person.id);
		const secondIsInitial = initialPersonIds.has(second.person.id);
		if (firstIsInitial !== secondIsInitial) {
			return firstIsInitial ? -1 : 1;
		}
		return (
			first.distance - second.distance ||
			first.person.name.display.localeCompare(second.person.name.display)
		);
	});
	const rowPersonIds = new Set(sortedPeople.map(({ person }) => person.id));
	const personById = new Map(
		sortedPeople.map((componentPerson) => [
			componentPerson.person.id,
			componentPerson,
		]),
	);
	const sortedPeopleOrder = new Map(
		sortedPeople.map((componentPerson, index) => [componentPerson, index]),
	);
	const visitedPersonIds = new Set<string>();
	const groups: ComponentPerson[][] = [];

	for (const componentPerson of sortedPeople) {
		if (visitedPersonIds.has(componentPerson.person.id)) {
			continue;
		}
		const group: ComponentPerson[] = [];
		const queue = [componentPerson.person.id];
		visitedPersonIds.add(componentPerson.person.id);
		for (let index = 0; index < queue.length; index += 1) {
			const personId = queue[index];
			const groupedPerson = personId ? personById.get(personId) : undefined;
			if (!groupedPerson) {
				continue;
			}
			group.push(groupedPerson);
			for (const partnerId of partnerIds(data, personId)) {
				if (rowPersonIds.has(partnerId) && !visitedPersonIds.has(partnerId)) {
					visitedPersonIds.add(partnerId);
					queue.push(partnerId);
				}
			}
		}
		group.sort(
			(first, second) =>
				(sortedPeopleOrder.get(first) ?? 0) -
				(sortedPeopleOrder.get(second) ?? 0),
		);
		const anchor = group[0];
		if (group.length === 3 && anchor?.distance === 0) {
			const firstPartner = group[1];
			const secondPartner = group[2];
			if (firstPartner && secondPartner) {
				groups.push([firstPartner, anchor, secondPartner]);
				continue;
			}
		}
		groups.push(group);
	}
	return groups.flat();
}

function generationLabel(generation: number): string {
	if (generation === 0) {
		return "Selected generation";
	}
	if (generation === -1) {
		return "Previous generation";
	}
	if (generation === -2) {
		return "Two generations earlier";
	}
	if (generation === 1) {
		return "Next generation";
	}
	if (generation === 2) {
		return "Two generations later";
	}
	return generation < 0 ? "Earlier generations" : "Later generations";
}

function buildGraph(
	data: GenealogyData,
	selectedPersonId: string,
	onSelect: (personId: string) => void,
): {
	nodes: FamilyTreeFlowNode[];
	edges: Edge[];
} {
	const initialPersonIds = collectInitialPersonIds(data, selectedPersonId);
	const selectedRelationships = relationshipMap(data, selectedPersonId);
	const selectedFamilyIds = focusFamilyIds(data, selectedPersonId);
	const visitedPersonIds = new Set<string>();
	const components = [
		collectComponent(data, selectedPersonId, visitedPersonIds),
	];
	for (const personId of Object.keys(data.people)) {
		if (!visitedPersonIds.has(personId)) {
			components.push(collectComponent(data, personId, visitedPersonIds));
		}
	}

	const componentWidths = components.map((component) => {
		const generationCounts = new Map<number, number>();
		for (const { generation } of component) {
			generationCounts.set(
				generation,
				(generationCounts.get(generation) ?? 0) + 1,
			);
		}
		const widestGeneration = Math.max(1, ...generationCounts.values());
		return (
			widestGeneration * NODE_WIDTH +
			Math.max(0, widestGeneration - 1) * COLUMN_GAP
		);
	});

	const componentCenters = [0];
	let nextComponentX = (componentWidths[0] ?? NODE_WIDTH) / 2 + COMPONENT_GAP;
	for (let index = 1; index < components.length; index += 1) {
		const width = componentWidths[index] ?? NODE_WIDTH;
		componentCenters.push(nextComponentX + width / 2);
		nextComponentX += width + COMPONENT_GAP;
	}

	const personNodes: PersonFlowNode[] = [];
	const generationNodes: GenerationFlowNode[] = [];
	for (
		let componentIndex = 0;
		componentIndex < components.length;
		componentIndex += 1
	) {
		const component = components[componentIndex] ?? [];
		const rows = new Map<number, ComponentPerson[]>();
		for (const person of component) {
			const row = rows.get(person.generation) ?? [];
			row.push(person);
			rows.set(person.generation, row);
		}

		for (const [generation, rowPeople] of rows) {
			const people = orderGenerationPeople(data, rowPeople, initialPersonIds);
			for (let index = 0; index < people.length; index += 1) {
				const componentPerson = people[index];
				if (!componentPerson) {
					continue;
				}
				const { person } = componentPerson;
				const relationship = selectedRelationships.get(person.id) ?? "other";
				personNodes.push({
					id: person.id,
					type: "person",
					position: {
						x:
							(componentCenters[componentIndex] ?? 0) +
							(index - (people.length - 1) / 2) * (NODE_WIDTH + COLUMN_GAP) -
							NODE_WIDTH / 2,
						y: generation * ROW_GAP,
					},
					zIndex: 2,
					data: {
						label: person.name.display,
						...(lifespan(person) ? { lifespan: lifespan(person) } : {}),
						isFocus: person.id === selectedPersonId,
						isInFocusBranch: relationship !== "other",
						isLiving: person.isLiving,
						onSelect,
						personId: person.id,
						relationship,
					},
				});
			}
		}
	}

	const selectedNode = personNodes.find((node) => node.id === selectedPersonId);
	if (selectedNode) {
		const bandWidth = Math.min((componentWidths[0] ?? NODE_WIDTH) + 200, 1800);
		const selectedCenterX = selectedNode.position.x + NODE_WIDTH / 2;
		const selectedGenerations = new Set(
			(components[0] ?? []).map(({ generation }) => generation),
		);
		for (const generation of selectedGenerations) {
			generationNodes.push({
				id: `generation:${generation}`,
				type: "generation",
				position: {
					x: selectedCenterX - bandWidth / 2,
					y: generation * ROW_GAP - 44,
				},
				style: { width: bandWidth, height: ROW_GAP - 16 },
				zIndex: 0,
				selectable: false,
				draggable: false,
				connectable: false,
				data: { label: generationLabel(generation) },
			});
		}
	}

	const personNodeById = new Map(personNodes.map((node) => [node.id, node]));
	const familyNodes: FamilyFlowNode[] = [];
	const edges: Edge[] = [];
	for (const family of Object.values(data.families)) {
		const familyIsFocused = selectedFamilyIds.has(family.id);
		const focusClass = familyIsFocused
			? "family-tree-edge-focus"
			: "family-tree-edge-muted";
		const visiblePartners = family.partnerIds
			.map((personId) => personNodeById.get(personId))
			.filter((node) => node !== undefined)
			.sort((first, second) => first.position.x - second.position.x);
		const visibleChildren = family.children
			.map(({ personId }) => personNodeById.get(personId))
			.filter((node) => node !== undefined);

		for (let index = 1; index < visiblePartners.length; index += 1) {
			const firstPartner = visiblePartners[index - 1];
			const secondPartner = visiblePartners[index];
			if (!firstPartner || !secondPartner) {
				continue;
			}
			edges.push({
				id: `${family.id}-partners-${index}`,
				source: firstPartner.id,
				target: secondPartner.id,
				sourceHandle: "partner-source",
				targetHandle: "partner-target",
				type: "straight",
				className: `family-tree-edge family-tree-partner-edge ${focusClass}`,
			});
		}

		if (visiblePartners.length === 0 || visibleChildren.length === 0) {
			continue;
		}
		const familyCenterX =
			visiblePartners.reduce(
				(total, partner) => total + partner.position.x + NODE_WIDTH / 2,
				0,
			) / visiblePartners.length;
		const familyTop =
			Math.max(...visiblePartners.map(({ position }) => position.y)) +
			NODE_HEIGHT +
			28;
		const familyNodeId = `family:${family.id}`;
		familyNodes.push({
			id: familyNodeId,
			type: "family",
			position: {
				x: familyCenterX - FAMILY_NODE_SIZE / 2,
				y: familyTop,
			},
			zIndex: 1,
			selectable: false,
			draggable: false,
			data: { isInFocusBranch: familyIsFocused },
		});

		for (const partner of visiblePartners) {
			edges.push({
				id: `${family.id}-${partner.id}-family`,
				source: partner.id,
				target: familyNodeId,
				sourceHandle: "child-source",
				targetHandle: "family-target",
				type: "smoothstep",
				className: `family-tree-edge family-tree-family-link ${focusClass}`,
			});
		}
		for (const child of visibleChildren) {
			edges.push({
				id: `${family.id}-${child.id}`,
				source: familyNodeId,
				target: child.id,
				sourceHandle: "children-source",
				targetHandle: "parent-target",
				type: "smoothstep",
				markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
				className: `family-tree-edge family-tree-parent-child-edge ${focusClass}`,
			});
		}
	}
	return {
		nodes: [...generationNodes, ...familyNodes, ...personNodes],
		edges,
	};
}

export default function FamilyTreeGraph({
	data,
	selectedPersonId,
	onSelect,
}: FamilyTreeGraphProps) {
	const graph = useMemo(
		() => buildGraph(data, selectedPersonId, onSelect),
		[data, selectedPersonId, onSelect],
	);
	const flowContainerRef = useRef<HTMLDivElement>(null);
	const selectFlowNode = useCallback<NodeMouseHandler<FamilyTreeFlowNode>>(
		(_event, node) => {
			if (node.type === "person" && !node.data.isLiving) {
				onSelect(node.id);
			}
		},
		[onSelect],
	);
	const focusSelectedPerson = useCallback(
		(instance: ReactFlowInstance<FamilyTreeFlowNode, Edge>) => {
			const container = flowContainerRef.current;
			const selectedNode = graph.nodes.find(
				(node) => node.id === selectedPersonId,
			);
			if (!container || !selectedNode) {
				return;
			}

			const { width, height } = container.getBoundingClientRect();
			const zoom = width <= 560 ? MOBILE_FOCUS_ZOOM : FOCUS_ZOOM;
			const selectedCenterX = selectedNode.position.x + NODE_WIDTH / 2;
			const selectedTop = Math.max(48, Math.min(120, height * 0.15));
			void instance.setViewport({
				x: width / 2 - selectedCenterX * zoom,
				y: selectedTop - selectedNode.position.y * zoom,
				zoom,
			});
		},
		[graph.nodes, selectedPersonId],
	);

	return (
		<div ref={flowContainerRef} className="family-tree-flow-container">
			<div
				className="family-tree-legend"
				role="note"
				aria-label="Relationship legend"
			>
				<strong>Relationships</strong>
				<span>
					<i className="family-tree-legend-parent-child" aria-hidden="true" />
					Parent → child
				</span>
				<span>
					<i className="family-tree-legend-partner" aria-hidden="true" />
					Spouse / partner
				</span>
				<span>
					<i className="family-tree-legend-selected" aria-hidden="true" />
					Selected person
				</span>
			</div>
			<ReactFlow<FamilyTreeFlowNode, Edge>
				key={selectedPersonId}
				nodes={graph.nodes}
				edges={graph.edges}
				nodeTypes={nodeTypes}
				onNodeClick={selectFlowNode}
				onInit={focusSelectedPerson}
				minZoom={0.02}
				maxZoom={1.5}
				nodesDraggable={false}
				nodesConnectable={false}
				elementsSelectable={false}
				nodesFocusable={false}
				edgesFocusable={false}
				className="family-tree-flow"
				aria-label="Interactive family relationship chart"
			>
				<Background
					variant={BackgroundVariant.Dots}
					gap={24}
					size={1}
					color="rgba(73, 79, 63, 0.16)"
				/>
				<Controls showInteractive={false} position="bottom-left" />
			</ReactFlow>
		</div>
	);
}
