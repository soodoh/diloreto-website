import type { JSX, RefObject } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import type { Contact } from "~/content/contacts";

type ContactModalProps = {
	open: boolean;
	onClose: () => void;
	contacts: Contact[];
	restoreFocusRef: RefObject<HTMLElement | null>;
};

export default function ContactModal({
	open,
	onClose,
	contacts,
	restoreFocusRef,
}: ContactModalProps): JSX.Element {
	return (
		<Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
			<DialogContent restoreFocusRef={restoreFocusRef}>
				<DialogHeader>
					<DialogTitle className="font-serif italic text-primary text-4xl max-sm:text-2xl">
						Contact Us
					</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-[30%_1fr] max-sm:grid-cols-1 gap-y-1">
					{contacts.map((contact) => (
						<div key={contact.firstName} className="contents">
							<h5 className="font-serif text-xl m-0">{`${contact.firstName}:`}</h5>

							<h5 className="font-serif text-xl m-0 text-right max-sm:text-center max-sm:text-base max-sm:mb-2">
								<a className="contact-email" href={`mailto:${contact.email}`}>
									{contact.email}
								</a>
							</h5>

							<div className="col-span-2 max-sm:col-span-1 mb-8">
								{contact.firstName === "John" ? (
									<i>For any questions regarding DiLoreto genealogy.</i>
								) : null}
								{contact.link ? (
									<a
										href={contact.link}
										className="inline-block border border-primary text-primary px-4 py-2 rounded no-underline font-sans hover:bg-primary hover:text-primary-contrast transition-colors"
									>
										View Portfolio
									</a>
								) : null}
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
