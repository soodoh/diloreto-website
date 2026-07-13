import type { JSX } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import type { Person } from "~/content/people";

type ContactModalProps = {
	open: boolean;
	onClose: () => void;
	people: Person[];
};

export default function ContactModal({
	open,
	onClose,
	people,
}: ContactModalProps): JSX.Element {
	return (
		<Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="font-serif italic text-primary text-4xl max-sm:text-2xl">
						Contact Us
					</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-[30%_1fr] max-sm:grid-cols-1 gap-y-1">
					{people.map((person) => (
						<div key={person.firstName} className="contents">
							<h5 className="font-serif text-xl m-0">{`${person.firstName}:`}</h5>

							<h5 className="font-serif text-xl m-0 text-right max-sm:text-center max-sm:text-base max-sm:mb-2">
								<a className="contact-email" href={`mailto:${person.email}`}>
									{person.email}
								</a>
							</h5>

							<div className="col-span-2 max-sm:col-span-1 mb-8">
								{person.firstName === "John" && (
									<i>For any questions regarding DiLoreto genealogy.</i>
								)}
								{person.link && (
									<a
										href={person.link}
										className="inline-block border border-primary text-primary px-4 py-2 rounded no-underline font-sans hover:bg-primary hover:text-primary-contrast transition-colors"
									>
										View Portfolio
									</a>
								)}
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
