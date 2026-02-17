import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import type { Person } from '~/types'

interface PersonModalProps {
  open: boolean
  data: Person | null
  onClose: () => void
}

export default function PersonModal({ open, data, onClose }: PersonModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif italic text-primary text-4xl max-sm:text-2xl">
            {data?.fullName || ''}
          </DialogTitle>
        </DialogHeader>

        {data?.link && (
          <a
            href={data.link}
            className="inline-block border border-primary text-primary px-4 py-2 rounded no-underline font-sans hover:bg-primary hover:text-primary-contrast transition-colors w-fit"
          >
            View Portfolio
          </a>
        )}

        {data?.bio && (
          <div
            className="font-serif markdown-content"
            dangerouslySetInnerHTML={{ __html: data.bio }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
