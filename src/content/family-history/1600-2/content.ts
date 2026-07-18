import damicoFamilyTreeImage from "~/assets/images/family-history/family-trees/damico-family-tree.jpg?responsive";
import diloretoFamilyTree1797Image from "~/assets/images/family-history/family-trees/diloreto-family-tree-1797-1938.gif?responsive";
import diloretoFamilyTree1600sImage from "~/assets/images/family-history/family-trees/diloreto-family-tree-mid-1600s.gif?responsive";
import type { HistoryRecordMetadata } from "../types";

export default {
	title: "Family Trees",
	galleryPhotos: [
		{
			title: "Hand-drawn DiLoreto family tree (1797-1938)",
			alt: "Hand-drawn DiLoreto family tree documenting relatives from 1797 through 1938",
			...diloretoFamilyTree1797Image,
		},
		{
			title: "DiLoreto family tree dating to the mid-1600s",
			alt: "DiLoreto ancestor chart tracing the family to the mid-1600s",
			...diloretoFamilyTree1600sImage,
		},
		{
			title: "D'Amico family tree",
			alt: "D'Amico family tree with names and relationships across multiple generations",
			...damicoFamilyTreeImage,
		},
	],
} satisfies HistoryRecordMetadata;
