import {
	Background,
	BackgroundVariant,
	Controls,
	type Edge,
	Handle,
	MarkerType,
	type Node,
	type NodeProps,
	Position,
	ReactFlow,
} from "@xyflow/react";
import { memo, useMemo } from "react";
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
const COLUMN_GAP = 64;
const ROW_GAP = 168;

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
				onClick={() => data.onSelect(data.personId)}
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

function collectGenerations(
	data: GenealogyData,
	selectedPersonId: string,
): Map<string, number> {
	const generations = new Map<string, number>([[selectedPersonId, 0]]);

	let ancestors = [selectedPersonId];
	for (let depth = 1; depth <= 2; depth += 1) {
		const next: string[] = [];
		for (const personId of ancestors) {
			for (const parentId of parentIds(data, personId)) {
				if (!generations.has(parentId)) {
					generations.set(parentId, -depth);
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
				if (!generations.has(childId)) {
					generations.set(childId, depth);
					next.push(childId);
				}
			}
		}
		descendants = next;
	}

	for (const partnerId of partnerIds(data, selectedPersonId)) {
		if (!generations.has(partnerId)) {
			generations.set(partnerId, 0);
		}
	}
	return generations;
}

function buildGraph(
	data: GenealogyData,
	selectedPersonId: string,
	onSelect: (personId: string) => void,
): { nodes: PersonFlowNode[]; edges: Edge[] } {
	const generations = collectGenerations(data, selectedPersonId);
	const rows = new Map<number, GenealogyPerson[]>();
	for (const [personId, generation] of generations) {
		const person = data.people[personId];
		if (!person) {
			continue;
		}
		const row = rows.get(generation) ?? [];
		row.push(person);
		rows.set(generation, row);
	}

	const nodes: PersonFlowNode[] = [];
	for (const [generation, people] of rows) {
		people.sort((first, second) =>
			first.name.display.localeCompare(second.name.display),
		);
		const rowWidth =
			people.length * NODE_WIDTH + Math.max(0, people.length - 1) * COLUMN_GAP;
		for (let index = 0; index < people.length; index += 1) {
			const person = people[index];
			if (!person) {
				continue;
			}
			nodes.push({
				id: person.id,
				type: "person",
				position: {
					x: -rowWidth / 2 + index * (NODE_WIDTH + COLUMN_GAP),
					y: (generation + 2) * ROW_GAP,
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

	const visibleIds = new Set(generations.keys());
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

	return (
		<ReactFlow
			key={selectedPersonId}
			nodes={graph.nodes}
			edges={graph.edges}
			nodeTypes={nodeTypes}
			fitView
			fitViewOptions={{ padding: 0.2, maxZoom: 1.05 }}
			minZoom={0.25}
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
	);
}
