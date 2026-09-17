import { useNavigate } from 'react-router-dom'
import { CalendarDays, Play, Star, Tv } from 'lucide-react'
import './HeroBanner.css'

const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'

function HeroBanner({ media }) {
  const navigate = useNavigate()

  if (!media) {
    return null
  }

  const title = media.title ?? media.name ?? 'Título indisponível'
  const overview = media.overview || 'Nenhuma sinopse disponível no momento.'
  const backdropUrl = media.backdrop_path
    ? `${BACKDROP_BASE_URL}${media.backdrop_path}`
    : 'https://placehold.co/1600x900/0f2d43/ffd000?text=TV+Time'

  const firstAirYear = media.first_air_date
    ? new Date(media.first_air_date).getFullYear()
    : null
  const releaseYear = media.release_date
    ? new Date(media.release_date).getFullYear()
    : null
  const year = releaseYear ?? firstAirYear ?? '2024'

  const handleShowDetails = () => {
    const mediaType = media.media_type === 'tv' ? 'tv' : 'movie'
    navigate(`/midia/${media.id}?tipo=${mediaType}`)
  }

  return (
    <section
      className="hero-banner"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(7, 28, 45, 0.92) 0%, rgba(7, 28, 45, 0.6) 38%, rgba(7, 28, 45, 0.2) 100%), url(${backdropUrl})` }}
      aria-label={`Destaque de ${title}`}
    >
      <div className="hero-banner-content">
        <div className="hero-banner-kicker">Em destaque</div>

        <h1>{title}</h1>

        <div className="hero-banner-meta">
          <span className="meta-pill">
            <Star size={14} aria-hidden="true" />
            {Number(media.vote_average ?? 0).toFixed(1)}
          </span>
          <span className="meta-pill">
            <CalendarDays size={14} aria-hidden="true" />
            {year}
          </span>
          <span className="meta-pill">
            <Tv size={14} aria-hidden="true" />
            {media.media_type === 'tv' ? 'Série' : 'Filme'}
          </span>
        </div>

        <p>{overview.length > 220 ? `${overview.slice(0, 220)}...` : overview}</p>

        <div className="hero-banner-actions">
          <button type="button" className="hero-banner-button primary" onClick={handleShowDetails}>
            <Play size={16} aria-hidden="true" />
            Ver detalhes
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
