import { useEffect, useId } from 'react'
import './ImageLightbox.css'

export type GalleryItem = {
  src: string
  title: string
  detail: string
  alt?: string
}

type Props = {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function ImageLightbox({ items, index, onClose, onPrev, onNext }: Props) {
  const titleId = useId()
  const open = index != null && items[index]

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, onPrev, onNext])

  if (!open || index == null) return null

  const item = items[index]
  const pos = `${index + 1} / ${items.length}`

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="lightbox__backdrop"
        aria-label="Close gallery"
        onClick={onClose}
      />
      <div className="lightbox__panel">
        <div className="lightbox__toolbar">
          <p className="lightbox__count">{pos}</p>
          <button type="button" className="lightbox__close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="lightbox__media">
          <img src={item.src} alt={item.alt || item.title} />
        </div>
        <div className="lightbox__details">
          <h3 id={titleId} className="display">
            {item.title}
          </h3>
          <p>{item.detail}</p>
        </div>
        <div className="lightbox__nav">
          <button type="button" className="btn btn-line" onClick={onPrev}>
            Before
          </button>
          <button type="button" className="btn btn-solid" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
