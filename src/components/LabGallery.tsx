import { useCallback, useState } from 'react'
import { ImageLightbox, type GalleryItem } from './ImageLightbox'

type Props = {
  eyebrow: string
  title: string
  items: GalleryItem[]
  dark?: boolean
}

export function LabGallery({ eyebrow, title, items, dark }: Props) {
  const [index, setIndex] = useState<number | null>(null)

  const openAt = (i: number) => setIndex(i)
  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(() => {
    setIndex((i) => {
      if (i == null || !items.length) return i
      return (i - 1 + items.length) % items.length
    })
  }, [items.length])
  const next = useCallback(() => {
    setIndex((i) => {
      if (i == null || !items.length) return i
      return (i + 1) % items.length
    })
  }, [items.length])

  if (!items.length) return null

  const feature = items[0]
  const rail = items.slice(1, 5)
  const strip = items.slice(5)

  return (
    <>
      <section
        className={`vib-gallery${dark ? ' vib-gallery--dark' : ''} factory-bg factory-bg--hatch${dark ? ' factory-bg--on-dark' : ''} is-pattern-on`}
      >
        <div className="wrap vib-gallery__layout">
          <header className="vib-gallery__head">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display">{title}</h2>
          </header>
          <div className="vib-gallery__mosaic">
            <figure className="vib-gallery__feature">
              <button
                type="button"
                className="vib-gallery__hit"
                onClick={() => openAt(0)}
                aria-label={`Open ${feature.title}`}
              >
                <img
                  src={feature.src}
                  alt={feature.alt || feature.title}
                  width={1200}
                  height={900}
                  loading="lazy"
                />
              </button>
            </figure>
            {rail.length ? (
              <div className="vib-gallery__rail">
                {rail.map((item, i) => (
                  <figure key={item.src}>
                    <button
                      type="button"
                      className="vib-gallery__hit"
                      onClick={() => openAt(i + 1)}
                      aria-label={`Open ${item.title}`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt || item.title}
                        width={600}
                        height={450}
                        loading="lazy"
                      />
                    </button>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
          {strip.length ? (
            <div className="vib-gallery__strip">
              {strip.map((item, i) => (
                <figure key={item.src}>
                  <button
                    type="button"
                    className="vib-gallery__hit"
                    onClick={() => openAt(i + 1 + rail.length)}
                    aria-label={`Open ${item.title}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt || item.title}
                      width={500}
                      height={360}
                      loading="lazy"
                    />
                  </button>
                </figure>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <ImageLightbox
        items={items}
        index={index}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  )
}
