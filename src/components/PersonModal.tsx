import Modal from './Modal'
import type { Person } from '~/types'

interface PersonModalProps {
  open: boolean
  data: Person | null
  onClose: () => void
}

export default function PersonModal({ open, data, onClose }: PersonModalProps) {
  return (
    <Modal open={open} title={data?.fullName || ''} onClose={onClose}>
      <>
        {data?.link && (
          <a
            href={data.link}
            className="inline-block border border-primary text-primary px-4 py-2 rounded no-underline font-sans hover:bg-primary hover:text-primary-contrast transition-colors mb-4"
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
      </>
    </Modal>
  )
}
