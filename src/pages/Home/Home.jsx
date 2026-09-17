import { useEffect, useState } from 'react'
import { AlertCircle, LoaderCircle } from 'lucide-react'
import GenreRow from '../../components/GenreRow/GenreRow'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import { getMoviesByGenre, getTrending } from '../../services/tmdb'
import './Home.css'

const ACTION_GENRE_ID = 28
const COMEDY_GENRE_ID = 35
const DRAMA_GENRE_ID = 18

function Home() {
  const [featuredMedia, setFeaturedMedia] = useState(null)
  const [actionMedia, setActionMedia] = useState([])
  const [comedyDramaMedia, setComedyDramaMedia] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadHomeCatalog() {
      try {
        const [trending, action, comedy, drama] = await Promise.all([
          getTrending(),
          getMoviesByGenre(ACTION_GENRE_ID),
          getMoviesByGenre(COMEDY_GENRE_ID),
          getMoviesByGenre(DRAMA_GENRE_ID),
        ])

        if (!isMounted) {
          return
        }

        const trendingMedia = (trending.results ?? []).filter(
          (media) => media.media_type === 'movie' || media.media_type === 'tv',
        )

        setFeaturedMedia(trendingMedia[0] ?? action.results?.[0] ?? null)
        setActionMedia(
          (action.results ?? []).map((media) => ({ ...media, media_type: 'movie' })),
        )
        setComedyDramaMedia([
          ...(comedy.results ?? []),
          ...(drama.results ?? []),
        ]
          .filter((media, index, items) => items.findIndex((item) => item.id === media.id) === index)
          .map((media) => ({ ...media, media_type: 'movie' })))
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar o catálogo.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadHomeCatalog()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <div className="home-state" role="status">
        <LoaderCircle className="home-state-icon home-state-icon--spin" size={28} aria-hidden="true" />
        <p>Carregando destaques...</p>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="home-state home-state--error" role="alert">
        <AlertCircle className="home-state-icon" size={28} aria-hidden="true" />
        <p>{errorMessage}</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      <HeroBanner media={featuredMedia} />
      <GenreRow title="Ação" items={actionMedia} />
      <GenreRow title="Comédia/Drama" items={comedyDramaMedia} />
    </div>
  )
}

export default Home