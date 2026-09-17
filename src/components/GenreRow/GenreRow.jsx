import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import MediaCard from '../MediaCard/MediaCard'
import './GenreRow.css'

function GenreRow({ title, items = [], onToggleWatched }) {
  const trackRef = useRef(null)

  if (!items.length) {
    return null
  }

  return (
    <section className="genre-row" aria-label={`Seção ${title}`}>
      <div className="genre-row-header">
        <h2>{title}</h2>
      </div>

      <div className="genre-row-carousel">
        <button
          type="button"
          className="genre-row-arrow genre-row-arrow--left"
          aria-label={`Voltar em ${title}`}
          onClick={() => trackRef.current?.scrollBy({ left: -600, behavior: 'smooth' })}
        >
          <ChevronLeft size={28} aria-hidden="true" />
        </button>

        <div ref={trackRef} className="genre-row-track" role="list" aria-label={title}>
        {items.map((media) => (
          <div key={media.id} className="genre-row-item" role="listitem">
            <MediaCard
              media={media}
              isWatched={Boolean(media.isWatched)}
              likes={Number(media.likes ?? media.vote_count ?? 0)}
              onToggleWatched={onToggleWatched}
            />
          </div>
        ))}
        </div>

        <button
          type="button"
          className="genre-row-arrow genre-row-arrow--right"
          aria-label={`Avançar em ${title}`}
          onClick={() => trackRef.current?.scrollBy({ left: 600, behavior: 'smooth' })}
        >
          <ChevronRight size={28} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

export default GenreRow
