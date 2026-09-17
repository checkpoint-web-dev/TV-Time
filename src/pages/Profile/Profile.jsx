import { useEffect, useState } from 'react'
import { AlertCircle, Eye, LoaderCircle } from 'lucide-react'
import MediaCard from '../../components/MediaCard/MediaCard'
import StatsCard from '../../components/StatsCard/StatsCard'
import { getMediaDetails } from '../../services/tmdb'
import './Profile.css'

const WATCHED_STORAGE_KEY = 'tv-time-watched'

function readWatchedIds() {
  try {
    const storedValue = localStorage.getItem(WATCHED_STORAGE_KEY)
    const parsedValue = storedValue ? JSON.parse(storedValue) : []

    return Array.isArray(parsedValue) ? [...new Set(parsedValue.map(String))] : []
  } catch {
    return []
  }
}

async function loadWatchedMedia(id) {
  try {
    return { ...(await getMediaDetails(id, 'movie')), media_type: 'movie' }
  } catch {
    try {
      return { ...(await getMediaDetails(id, 'tv')), media_type: 'tv' }
    } catch {
      return null
    }
  }
}

function getMediaRuntime(media) {
  if (media.media_type === 'tv') {
    const episodeRuntime = Number(media.episode_run_time?.[0] ?? 0)
    const episodeCount = Number(media.number_of_episodes ?? 0)
    return episodeRuntime * episodeCount
  }

  return Number(media.runtime ?? 0)
}

function getWatchTimeParts(totalMinutes) {
  const days = Math.floor(totalMinutes / (24 * 60))
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60)
  const minutes = totalMinutes % 60

  return { days, hours, minutes }
}

function Profile() {
  const [watchedIds, setWatchedIds] = useState(() => readWatchedIds())
  const [mediaItems, setMediaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadProfileMedia() {
      setIsLoading(true)
      setErrorMessage('')

      if (!watchedIds.length) {
        setMediaItems([])
        setIsLoading(false)
        return
      }

      const loadedItems = await Promise.all(watchedIds.map(loadWatchedMedia))

      if (isMounted) {
        const validItems = loadedItems.filter(Boolean)
        setMediaItems(validItems)
        setErrorMessage(validItems.length ? '' : 'Não foi possível carregar os títulos salvos.')
        setIsLoading(false)
      }
    }

    loadProfileMedia().catch(() => {
      if (isMounted) {
        setMediaItems([])
        setErrorMessage('Não foi possível carregar os títulos salvos.')
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [watchedIds])

  const totalMinutes = mediaItems.reduce((total, media) => total + getMediaRuntime(media), 0)
  const watchTime = getWatchTimeParts(totalMinutes)

  const handleToggleWatched = (media) => {
    const nextWatchedIds = watchedIds.filter((watchedId) => watchedId !== String(media.id))
    localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(nextWatchedIds))
    setWatchedIds(nextWatchedIds)
  }

  return (
    <div className="profile-page">
      <section className="profile-overview">
        <header className="profile-header">
          <div className="profile-avatar" aria-hidden="true">TV</div>
          <div>
            <p className="profile-kicker">Seu espaço</p>
            <h1>Meu perfil</h1>
            <p>Acompanhe as histórias que já fizeram parte da sua maratona.</p>
          </div>
        </header>

        <section className="profile-stats" aria-label="Estatísticas do perfil">
          <StatsCard
            label="Total assistido"
            value={watchedIds.length}
            detail={watchedIds.length === 1 ? 'título salvo' : 'títulos salvos'}
          />
          <StatsCard
            label="Tempo gasto"
            value={(
              <div className="stats-card-value--time" aria-label={`${watchTime.days} dias, ${watchTime.hours} horas e ${watchTime.minutes} minutos`}>
                <span className="stats-card-time-unit">
                  <strong>{watchTime.days}</strong>
                  <small>dias</small>
                </span>
                <span className="stats-card-time-unit">
                  <strong>{watchTime.hours}</strong>
                  <small>horas</small>
                </span>
                <span className="stats-card-time-unit">
                  <strong>{watchTime.minutes}</strong>
                  <small>minutos</small>
                </span>
              </div>
            )}
            detail="estimativa baseada no TMDB"
          />
        </section>
      </section>

      <section className="profile-library" aria-live="polite" aria-busy={isLoading}>
        <div className="profile-section-heading">
          <div>
            <p className="profile-kicker">Sua biblioteca</p>
            <h2>Vistos recentemente</h2>
          </div>
          {!isLoading && mediaItems.length > 0 && <span>{mediaItems.length} itens</span>}
        </div>

        {isLoading && (
          <div className="profile-state" role="status">
            <LoaderCircle className="profile-state-icon profile-state-icon--spin" size={28} aria-hidden="true" />
            <p>Carregando sua biblioteca...</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="profile-state profile-state--error" role="alert">
            <AlertCircle className="profile-state-icon" size={28} aria-hidden="true" />
            <p>{errorMessage}</p>
          </div>
        )}

        {!isLoading && !errorMessage && !mediaItems.length && (
          <div className="profile-state">
            <Eye className="profile-state-icon" size={28} aria-hidden="true" />
            <p>Você ainda não marcou nenhum filme ou série como visto.</p>
          </div>
        )}

        {!isLoading && !errorMessage && mediaItems.length > 0 && (
          <div className="profile-media-grid">
            {mediaItems.map((media) => (
              <MediaCard
                key={`${media.media_type}-${media.id}`}
                media={media}
                isWatched
                onToggleWatched={handleToggleWatched}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Profile