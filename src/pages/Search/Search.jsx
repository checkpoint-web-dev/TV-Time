import { useEffect, useState } from 'react'
import { AlertCircle, LoaderCircle, Search as SearchIcon } from 'lucide-react'
import MediaCard from '../../components/MediaCard/MediaCard'
import { searchMedia } from '../../services/tmdb'
import './Search.css'

function Search() {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadSearchResults() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await searchMedia(submittedQuery)
        const mediaResults = (response.results ?? []).filter(
          (media) => media.media_type === 'movie' || media.media_type === 'tv',
        )

        if (isMounted) {
          setResults(mediaResults)
        }
      } catch (error) {
        if (isMounted) {
          setResults([])
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Não foi possível realizar a busca.',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (!submittedQuery) {
      return () => {
        isMounted = false
      }
    }

    loadSearchResults()

    return () => {
      isMounted = false
    }
  }, [submittedQuery])

  const handleSubmit = (event) => {
    event.preventDefault()
    const normalizedQuery = query.trim()

    setHasSearched(true)
    setErrorMessage('')
    setResults([])
    setSubmittedQuery(normalizedQuery)
  }

  return (
    <div className="search-page">
      <header className="search-page-header">
        <p className="search-page-kicker">Catálogo</p>
        <h1>Encontre sua próxima história</h1>
        <p>Pesquise por filmes e séries para descobrir algo novo.</p>
      </header>

      <form className="search-form" onSubmit={handleSubmit} role="search">
        <label className="search-form-label" htmlFor="media-search">
          Buscar filmes e séries
        </label>
        <div className="search-form-row">
          <div className="search-input-wrap">
            <SearchIcon size={20} aria-hidden="true" />
            <input
              id="media-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Digite um título..."
              autoComplete="off"
            />
          </div>
          <button type="submit" className="search-submit">
            Buscar
          </button>
        </div>
      </form>

      <section className="search-results" aria-live="polite" aria-busy={isLoading}>
        {isLoading && (
          <div className="search-state" role="status">
            <LoaderCircle className="search-state-icon search-state-icon--spin" size={28} aria-hidden="true" />
            <p>Buscando títulos...</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="search-state search-state--error" role="alert">
            <AlertCircle className="search-state-icon" size={28} aria-hidden="true" />
            <p>{errorMessage}</p>
          </div>
        )}

        {!isLoading && !errorMessage && hasSearched && !results.length && (
          <div className="search-state">
            <p>Nenhum filme ou série encontrado para “{submittedQuery}”.</p>
          </div>
        )}

        {!isLoading && !errorMessage && !hasSearched && (
          <div className="search-state">
            <p>Digite um título para começar sua busca.</p>
          </div>
        )}

        {!isLoading && !errorMessage && results.length > 0 && (
          <>
            <div className="search-results-header">
              <h2>Resultados para “{submittedQuery}”</h2>
              <span>{results.length} títulos</span>
            </div>
            <div className="search-results-grid">
              {results.map((media) => (
                <MediaCard key={`${media.media_type}-${media.id}`} media={media} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Search
