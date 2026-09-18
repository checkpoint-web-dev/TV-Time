import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, UserRound } from 'lucide-react'
import './Navbar.css'

const navItems = [
  { to: '/', icon: Home },
  { to: '/perfil', icon: UserRound },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState(() => new URLSearchParams(location.search).get('busca') ?? '')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef(null)
  const activeType = new URLSearchParams(location.search).get('tipo') ?? ''

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus()
    }
  }, [isSearchOpen])

  const handleSubmit = (event) => {
    event.preventDefault()
    const normalizedQuery = query.trim()
    const typeParam = activeType ? `&tipo=${activeType}` : ''
    navigate(normalizedQuery ? `/?busca=${encodeURIComponent(normalizedQuery)}${typeParam}` : activeType ? `/?tipo=${activeType}` : '/')
  }

  const handleTypeFilter = (type) => {
    const queryParam = query.trim() ? `busca=${encodeURIComponent(query.trim())}&` : ''
    navigate(`/?${queryParam}tipo=${type}`)
  }

  return (
    <header className="navbar-shell">
      <nav className="navbar" aria-label="Navegação principal">
        <div className="navbar-left">
          <NavLink to="/" className="navbar-brand" aria-label="TV Time">
            <span className="brand-mark">TV</span>
            <span className="brand-name">Time</span>
          </NavLink>

          <div className="navbar-categories" aria-label="Categorias">
            <button type="button" className={activeType === 'tv' ? 'is-active' : ''} onClick={() => handleTypeFilter('tv')}>Séries</button>
            <button type="button" className={activeType === 'movie' ? 'is-active' : ''} onClick={() => handleTypeFilter('movie')}>Filmes</button>
          </div>
        </div>

        <form className={`navbar-search${isSearchOpen ? ' is-open' : ''}`} onSubmit={handleSubmit} role="search">
          <button
            type="button"
            className="navbar-search-toggle"
            onClick={() => setIsSearchOpen((open) => !open)}
            aria-label={isSearchOpen ? 'Fechar busca' : 'Abrir busca'}
            aria-expanded={isSearchOpen}
          >
            <Search size={18} aria-hidden="true" />
          </button>
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar títulos"
            aria-label="Pesquisar títulos"
          />
        </form>

        <ul className="nav-list">
          {navItems.map(({ to, icon: Icon }) => (
            <li key={to} className="nav-item">
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => {
                  const classes = ['nav-link']
                  if (isActive) classes.push('active')
                  if (to === '/perfil') classes.push('profile-link')
                  return classes.join(' ')
                }
              }>
                <Icon size={18} aria-hidden="true" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
