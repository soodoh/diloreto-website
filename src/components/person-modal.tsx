import type { JSX, RefObject } from "react";
import ReactMarkdown from "react-markdown";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import type { HomeTile } from "~/content/home";

type PersonTile = Extract<HomeTile, { kind: "person" }>;

type PersonModalProps = {
	open: boolean;
	data: PersonTile;
	onClose: () => void;
	restoreFocusRef: RefObject<HTMLElement | null>;
};

export default function PersonModal({
	open,
	data,
	onClose,
	restoreFocusRef,
}: PersonModalProps): JSX.Element {
	return (
		<Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
			<DialogContent restoreFocusRef={restoreFocusRef}>
				<DialogHeader>
					<DialogTitle className="font-serif italic text-primary text-4xl max-sm:text-2xl">
						{data.fullName}
					</DialogTitle>
				</DialogHeader>

				{data.contact.link ? (
					<a
						href={data.contact.link}
						className="inline-block border border-primary text-primary px-4 py-2 rounded no-underline font-sans hover:bg-primary hover:text-primary-contrast transition-colors w-fit"
					>
						View Portfolio
					</a>
				) : null}

				<div className="font-serif markdown-content">
					<ReactMarkdown>{data.bio}</ReactMarkdown>
				</div>
			</DialogContent>
		</Dialog>
	);
}
