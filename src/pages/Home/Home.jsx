import { useEffect, useState } from 'react'
import { AlertCircle, LoaderCircle } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import GenreRow from '../../components/GenreRow/GenreRow'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import { getMediaByGenre, getMoviesByGenre, getTrending, searchMedia } from '../../services/tmdb'
import './Home.css'

const ACTION_GENRE_ID = 28
const COMEDY_GENRE_ID = 35
const DRAMA_GENRE_ID = 18
const TV_ACTION_GENRE_ID = 10759

function Home() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('busca')?.trim() ?? ''
  const mediaType = searchParams.get('tipo') ?? ''
  const [featuredMedia, setFeaturedMedia] = useState(null)
  const [actionMedia, setActionMedia] = useState([])
  const [comedyDramaMedia, setComedyDramaMedia] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadHomeCatalog() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        if (searchQuery || mediaType) {
          if (mediaType && !searchQuery) {
            const actionGenre = mediaType === 'tv' ? TV_ACTION_GENRE_ID : ACTION_GENRE_ID
            const [action, comedy, drama] = await Promise.all([
              getMediaByGenre(mediaType, actionGenre),
              getMediaByGenre(mediaType, COMEDY_GENRE_ID),
              getMediaByGenre(mediaType, DRAMA_GENRE_ID),
            ])

            if (!isMounted) {
              return
            }

            setActionMedia((action.results ?? []).map((media) => ({ ...media, media_type: mediaType })))
            setComedyDramaMedia([
              ...(comedy.results ?? []),
              ...(drama.results ?? []),
            ]
              .filter((media, index, items) => items.findIndex((item) => item.id === media.id) === index)
              .map((media) => ({ ...media, media_type: mediaType })))
            setSearchResults([])
            setIsLoading(false)
            return
          }

          const response = await searchMedia(searchQuery)
          const filteredResults = response.results ?? []

          if (!isMounted) {
            return
          }

          setSearchResults(filteredResults
            .filter((media) => media.media_type === mediaType || !media.media_type)
            .map((media) => ({ ...media, media_type: media.media_type ?? mediaType })))
          setIsLoading(false)
          return
        }

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
        setSearchResults([])
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
  }, [searchQuery, mediaType])

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
    <div className={`home-page ${searchQuery || mediaType ? 'home-page--searching' : ''}`}>
      {searchQuery ? (
        <section className="home-search-results" aria-live="polite">
          <div className="home-search-heading">
            <p>{searchQuery ? 'Resultados da busca' : 'Catálogo filtrado'}</p>
            <h1>{searchQuery}</h1>
          </div>
          {searchResults.length ? (
            <GenreRow title="Títulos encontrados" items={searchResults} />
          ) : (
            <div className="home-state">
              <p>Nenhum título encontrado.</p>
            </div>
          )}
        </section>
      ) : mediaType ? (
        <>
          <GenreRow title="Ação" items={actionMedia} />
          <GenreRow title="Comédia/Drama" items={comedyDramaMedia} />
        </>
      ) : (
        <>
          <HeroBanner media={featuredMedia} />
          <GenreRow title="Ação" items={actionMedia} />
          <GenreRow title="Comédia/Drama" items={comedyDramaMedia} />
        </>
      )}
    </div>
  )
}

export default Home