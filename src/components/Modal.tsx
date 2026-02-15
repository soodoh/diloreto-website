import { useRef, useEffect, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="w-full max-w-xl rounded-lg p-0 backdrop:bg-black/50 open:animate-slide-up"
    >
      <div className="relative p-6">
        <h1 className="font-serif italic text-primary text-4xl max-sm:text-2xl pr-10">
          {title}
        </h1>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 cursor-pointer bg-transparent border-none text-2xl leading-none"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="mt-4">
          {children}
        </div>
      </div>
    </dialog>
  )
}
