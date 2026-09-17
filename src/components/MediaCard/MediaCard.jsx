import { useNavigate } from 'react-router-dom'
import { Eye, Heart } from 'lucide-react'
import './MediaCard.css'

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function getDisplayTitle(media) {
  return media.title ?? media.name ?? 'Sem título'
}

function getReleaseYear(media) {
  const year = media.release_date ?? media.first_air_date

  if (!year) {
    return 'Novo'
  }

  const parsedYear = new Date(year)
  return Number.isNaN(parsedYear.getTime())
    ? 'Novo'
    : parsedYear.getFullYear()
}

function getMediaTypeLabel(media) {
  if (media.media_type === 'tv') {
    return 'Série'
  }

  if (media.media_type === 'movie') {
    return 'Filme'
  }

  return media.original_title ? 'Filme' : 'Série'
}

function MediaCard({ media, isWatched = false, likes = 0, onToggleWatched }) {
  const navigate = useNavigate()
  const posterUrl = media.poster_path
    ? `${POSTER_BASE_URL}${media.poster_path}`
    : 'https://placehold.co/500x750/1c1c1e/efb810?text=TV+Time'
  const title = getDisplayTitle(media)
  const year = getReleaseYear(media)
  const label = getMediaTypeLabel(media)
  const rating = Math.min(Math.max(Number(media.vote_average ?? 0), 0), 10)
  const ratingPercent = rating * 10

  const handleNavigate = () => {
    const mediaType = media.media_type === 'tv' ? 'tv' : 'movie'
    navigate(`/midia/${media.id}?tipo=${mediaType}`)
  }

  const handleToggleWatched = (event) => {
    event.stopPropagation()
    onToggleWatched?.(media)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleNavigate()
    }
  }

  return (
    <article
      className={`media-card ${isWatched ? 'media-card--watched' : ''}`}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Abrir detalhes de ${title}`}
    >
      <div className="media-card-poster-wrap">
        <img
          className="media-card-poster"
          src={posterUrl}
          alt={title}
          loading="lazy"
        />

        <div className="media-card-overlay">
          <button
            type="button"
            className={`media-card-action ${isWatched ? 'is-active' : ''}`}
            aria-label={isWatched ? 'Remover marcação de visto' : 'Marcar como visto'}
            onClick={handleToggleWatched}
          >
            <Eye size={16} aria-hidden="true" />
            <span>{isWatched ? 'Visto' : 'Ver'}</span>
          </button>

          <div className="media-card-overlay-bottom">
            <div className="media-card-details">
              <h3>{title}</h3>
              <p>
                <span>{label}</span>
                <span>{year}</span>
              </p>
            </div>

            <div className="media-card-stat">
              <Heart size={14} aria-hidden="true" />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="media-card-rating"
        role="meter"
        aria-label={`Avaliação ${rating.toFixed(1)} de 10`}
        aria-valuemin="0"
        aria-valuemax="10"
        aria-valuenow={rating}
      >
        <span style={{ width: `${ratingPercent}%` }} />
      </div>
    </article>
  )
}

export default MediaCard
