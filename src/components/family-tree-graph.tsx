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

type PersonNodeData = {
	label: string;
	lifespan?: string;
	isFocus: boolean;
	isLiving: boolean;
	onSelect: (personId: string) => void;
	personId: string;
};

type PersonFlowNode = Node<PersonNodeData, "person">;

type FamilyTreeGraphProps = {
	data: GenealogyData;
	selectedPersonId: string;
	onSelect: (personId: string) => void;
};

const NODE_WIDTH = 216;
const FOCUS_ZOOM = 0.9;
const MOBILE_FOCUS_ZOOM = 0.75;
const COLUMN_GAP = 64;
const ROW_GAP = 168;
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

function PersonNode({ data }: NodeProps<PersonFlowNode>) {
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
				className={`family-tree-node nodrag ${data.isFocus ? "family-tree-node-focus" : ""} ${data.isLiving ? "family-tree-node-private" : ""}`}
				aria-label={
					data.isLiving
						? "Living person, details are private"
						: `${data.label}${data.lifespan ? `, ${data.lifespan}` : ""}`
				}
			>
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

const MemoizedPersonNode = memo(PersonNode);
const nodeTypes = { person: MemoizedPersonNode };

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

function collectInitialPersonIds(
	data: GenealogyData,
	selectedPersonId: string,
): Set<string> {
	const personIds = new Set<string>([selectedPersonId]);

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

function centeredColumn(index: number): number {
	if (index === 0) {
		return 0;
	}
	const distanceFromCenter = Math.ceil(index / 2);
	return index % 2 === 0 ? distanceFromCenter : -distanceFromCenter;
}

function buildGraph(
	data: GenealogyData,
	selectedPersonId: string,
	onSelect: (personId: string) => void,
): {
	nodes: PersonFlowNode[];
	edges: Edge[];
} {
	const initialPersonIds = collectInitialPersonIds(data, selectedPersonId);
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

	const nodes: PersonFlowNode[] = [];
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

		for (const [generation, people] of rows) {
			people.sort((first, second) => {
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
			for (let index = 0; index < people.length; index += 1) {
				const componentPerson = people[index];
				if (!componentPerson) {
					continue;
				}
				const { person } = componentPerson;
				nodes.push({
					id: person.id,
					type: "person",
					position: {
						x:
							(componentCenters[componentIndex] ?? 0) +
							centeredColumn(index) * (NODE_WIDTH + COLUMN_GAP) -
							NODE_WIDTH / 2,
						y: generation * ROW_GAP,
					},
					data: {
						label: person.name.display,
						...(lifespan(person) ? { lifespan: lifespan(person) } : {}),
						isFocus: person.id === selectedPersonId,
						isLiving: person.isLiving,
						onSelect,
						personId: person.id,
					},
				});
			}
		}
	}

	const visibleIds = new Set(nodes.map((node) => node.id));
	const edges: Edge[] = [];
	for (const family of Object.values(data.families)) {
		for (const parentId of family.partnerIds) {
			if (!visibleIds.has(parentId)) {
				continue;
			}
			for (const familyChild of family.children) {
				if (!visibleIds.has(familyChild.personId)) {
					continue;
				}
				edges.push({
					id: `${family.id}-${parentId}-${familyChild.personId}`,
					source: parentId,
					target: familyChild.personId,
					sourceHandle: "child-source",
					targetHandle: "parent-target",
					type: "smoothstep",
					markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
					className: "family-tree-edge",
				});
			}
		}
		const visiblePartners = family.partnerIds.filter((personId) =>
			visibleIds.has(personId),
		);
		if (visiblePartners.length === 2) {
			const firstPartner = visiblePartners[0];
			const secondPartner = visiblePartners[1];
			if (firstPartner && secondPartner) {
				edges.push({
					id: `${family.id}-partners`,
					source: firstPartner,
					target: secondPartner,
					sourceHandle: "partner-source",
					targetHandle: "partner-target",
					type: "straight",
					className: "family-tree-edge family-tree-partner-edge",
				});
			}
		}
	}
	return { nodes, edges };
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
	const selectFlowNode = useCallback<NodeMouseHandler<PersonFlowNode>>(
		(_event, node) => {
			if (!node.data.isLiving) {
				onSelect(node.id);
			}
		},
		[onSelect],
	);
	const focusSelectedPerson = useCallback(
		(instance: ReactFlowInstance<PersonFlowNode, Edge>) => {
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
			<ReactFlow
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
