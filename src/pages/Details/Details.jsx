import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Eye, LoaderCircle, Star } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getMediaDetails } from '../../services/tmdb'
import './Details.css'

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w780'
const WATCHED_STORAGE_KEY = 'tv-time-watched'

function readWatchedIds() {
  try {
    const storedValue = localStorage.getItem(WATCHED_STORAGE_KEY)
    const parsedValue = storedValue ? JSON.parse(storedValue) : []

    return Array.isArray(parsedValue) ? parsedValue.map(String) : []
  } catch {
    return []
  }
}

function getMediaTitle(media) {
  return media.title ?? media.name ?? 'Título indisponível'
}

function Details() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [media, setMedia] = useState(null)
  const [isWatched, setIsWatched] = useState(() => readWatchedIds().includes(String(id)))
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const mediaType = new URLSearchParams(location.search).get('tipo') === 'tv' ? 'tv' : 'movie'

  useEffect(() => {
    let isMounted = true

    async function loadDetails() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await getMediaDetails(id, mediaType)

        if (isMounted) {
          setMedia(response)
          setIsWatched(readWatchedIds().includes(String(id)))
        }
      } catch (error) {
        if (isMounted) {
          setMedia(null)
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Não foi possível carregar os detalhes.',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDetails()

    return () => {
      isMounted = false
    }
  }, [id, mediaType])

  const handleToggleWatched = () => {
    const watchedIds = readWatchedIds()
    const normalizedId = String(id)
    const nextWatchedIds = isWatched
      ? watchedIds.filter((watchedId) => watchedId !== normalizedId)
      : [...new Set([...watchedIds, normalizedId])]

    localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(nextWatchedIds))
    setIsWatched(!isWatched)
  }

  if (isLoading) {
    return (
      <div className="details-state" role="status">
        <LoaderCircle className="details-state-icon details-state-icon--spin" size={28} aria-hidden="true" />
        <p>Carregando detalhes...</p>
      </div>
    )
  }

  if (errorMessage || !media) {
    return (
      <div className="details-state details-state--error" role="alert">
        <p>{errorMessage || 'Título não encontrado.'}</p>
        <button type="button" className="details-back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={17} aria-hidden="true" />
          Voltar
        </button>
      </div>
    )
  }

  const title = getMediaTitle(media)
  const posterUrl = media.poster_path
    ? `${POSTER_BASE_URL}${media.poster_path}`
    : 'https://placehold.co/780x1170/1c1c1e/ffd000?text=TV+Time'
  const releaseDate = media.release_date ?? media.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'Ano indisponível'
  const mediaLabel = mediaType === 'tv' ? 'Série' : 'Filme'

  return (
    <article className="details-page">
      <button type="button" className="details-back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={17} aria-hidden="true" />
        Voltar
      </button>

      <div className="details-content">
        <img className="details-poster" src={posterUrl} alt={`Pôster de ${title}`} />

        <div className="details-copy">
          <p className="details-kicker">{mediaLabel} · {year}</p>
          <h1>{title}</h1>

          <div className="details-rating">
            <Star size={18} fill="currentColor" aria-hidden="true" />
            <strong>{Number(media.vote_average ?? 0).toFixed(1)}</strong>
            <span>/ 10 no TMDB</span>
          </div>

          <p className="details-overview">
            {media.overview || 'Nenhuma sinopse disponível no momento.'}
          </p>

          <button
            type="button"
            className={`details-watched-button ${isWatched ? 'is-active' : ''}`}
            onClick={handleToggleWatched}
          >
            {isWatched ? <Check size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
            {isWatched ? 'Visto' : 'Marcar como Visto'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default Details