const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_LANGUAGE = 'pt-BR'

const tmdbToken = import.meta.env.VITE_TMDB_TOKEN

function createRequestUrl(path, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${path}`)
  url.search = new URLSearchParams({
    language: TMDB_LANGUAGE,
    ...params,
  })

  return url
}

async function requestTmdb(path, params = {}) {
  if (!tmdbToken) {
    throw new Error('Configure VITE_TMDB_TOKEN para acessar o TMDB.')
  }

  try {
    const response = await fetch(createRequestUrl(path, params), {
      headers: {
        Authorization: `Bearer ${tmdbToken}`,
        accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`TMDB respondeu com status ${response.status}.`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('TMDB respondeu')) {
      throw error
    }

    throw new Error('Nao foi possivel conectar ao TMDB.', { cause: error })
  }
}

export async function getPopularMovies(page = 1) {
  return requestTmdb('/movie/popular', { page: String(page) })
}

export async function getPopularTvShows(page = 1) {
  return requestTmdb('/tv/popular', { page: String(page) })
}

export async function getTrending(mediaType = 'all', timeWindow = 'week') {
  return requestTmdb(`/trending/${mediaType}/${timeWindow}`)
}

export async function getMoviesByGenre(genreId, page = 1) {
  return requestTmdb('/discover/movie', {
    with_genres: String(genreId),
    sort_by: 'popularity.desc',
    page: String(page),
  })
}

export async function getMovieDetails(id) {
  return requestTmdb(`/movie/${id}`)
}

export async function getTvDetails(id) {
  return requestTmdb(`/tv/${id}`)
}

export async function getMediaDetails(id, mediaType = 'movie') {
  return requestTmdb(`/${mediaType}/${id}`)
}

export async function searchMedia(query, page = 1) {
  const normalizedQuery = query.trim()

  if (!normalizedQuery) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 }
  }

  return requestTmdb('/search/multi', {
    query: normalizedQuery,
    page: String(page),
    include_adult: 'false',
  })
}
