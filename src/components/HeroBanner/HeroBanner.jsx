import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, ChevronLeft, ChevronRight, Play, Star, Tv } from 'lucide-react'
import './HeroBanner.css'

const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'

function HeroBanner({ media }) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [showNavigation, setShowNavigation] = useState(false)
  const mediaItems = Array.isArray(media) ? media.slice(0, 5) : media ? [media] : []

  useEffect(() => {
    setActiveIndex(0)
  }, [media])

  useEffect(() => {
    if (mediaItems.length < 2) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % mediaItems.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [mediaItems.length])

  if (!mediaItems.length) {
    return null
  }

  const activeMedia = mediaItems[activeIndex]
  const title = activeMedia.title ?? activeMedia.name ?? 'Título indisponível'
  const overview = activeMedia.overview || 'Nenhuma sinopse disponível no momento.'

  const firstAirYear = activeMedia.first_air_date
    ? new Date(activeMedia.first_air_date).getFullYear()
    : null
  const releaseYear = activeMedia.release_date
    ? new Date(activeMedia.release_date).getFullYear()
    : null
  const year = releaseYear ?? firstAirYear ?? '2024'

  const handleShowDetails = () => {
    const mediaType = activeMedia.media_type === 'tv' ? 'tv' : 'movie'
    navigate(`/midia/${activeMedia.id}?tipo=${mediaType}`)
  }

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const distanceFromEdge = Math.min(event.clientX - bounds.left, bounds.right - event.clientX)
    setShowNavigation(distanceFromEdge <= 120)
  }

  const handlePrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + mediaItems.length) % mediaItems.length)
  }

  const handleNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % mediaItems.length)
  }

  return (
    <section
      className="hero-banner"
      aria-label={`Destaque de ${title}`}
      aria-roledescription="carrossel"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowNavigation(false)}
      onFocus={() => setShowNavigation(true)}
    >
      <div className="hero-banner-backgrounds" aria-hidden="true">
        {mediaItems.map((item, index) => (
          <div
            key={item.id}
            className={`hero-banner-background ${index === activeIndex ? 'is-active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(18, 18, 18, 0.94) 0%, rgba(18, 18, 18, 0.64) 38%, rgba(18, 18, 18, 0.16) 100%), url(${item.backdrop_path ? `${BACKDROP_BASE_URL}${item.backdrop_path}` : 'https://placehold.co/1600x900/1c1c1e/ffd000?text=TV+Time'})`,
            }}
          />
        ))}
      </div>

      <div className="hero-banner-content" key={activeMedia.id}>
        <div className="hero-banner-kicker">Em destaque</div>

        <h1>{title}</h1>

        <div className="hero-banner-meta">
          <span className="meta-pill">
            <Star size={14} aria-hidden="true" />
            {Number(activeMedia.vote_average ?? 0).toFixed(1)}
          </span>
          <span className="meta-pill">
            <CalendarDays size={14} aria-hidden="true" />
            {year}
          </span>
          <span className="meta-pill">
            <Tv size={14} aria-hidden="true" />
            {activeMedia.media_type === 'tv' ? 'Série' : 'Filme'}
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

      {mediaItems.length > 1 && (
        <div className={`hero-banner-navigation ${showNavigation ? 'is-visible' : ''}`} aria-label="Navegação do banner">
          <button type="button" className="hero-banner-arrow hero-banner-arrow--previous" onClick={handlePrevious} aria-label="Destaque anterior">
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button type="button" className="hero-banner-arrow hero-banner-arrow--next" onClick={handleNext} aria-label="Próximo destaque">
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      )}

      {mediaItems.length > 1 && (
        <div className="hero-banner-progress" role="tablist" aria-label="Destaques do banner">
          {mediaItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`hero-banner-progress-segment ${index === activeIndex ? 'is-active' : ''}`}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Ir para o destaque ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default HeroBanner
