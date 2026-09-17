import MediaCard from '../MediaCard/MediaCard'
import './GenreRow.css'

function GenreRow({ title, items = [], onToggleWatched }) {
  if (!items.length) {
    return null
  }

  return (
    <section className="genre-row" aria-label={`Seção ${title}`}>
      <div className="genre-row-header">
        <h2>{title}</h2>
      </div>

      <div className="genre-row-track" role="list" aria-label={title}>
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
    </section>
  )
}

export default GenreRow
