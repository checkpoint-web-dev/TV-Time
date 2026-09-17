import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, UserRound } from 'lucide-react'
import './Navbar.css'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/perfil', label: 'Perfil', icon: UserRound },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState(() => new URLSearchParams(location.search).get('busca') ?? '')
  const activeType = new URLSearchParams(location.search).get('tipo') ?? ''

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get('busca') ?? '')
  }, [location.search])

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

        <form className="navbar-search" onSubmit={handleSubmit} role="search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar títulos"
            aria-label="Pesquisar títulos"
          />
        </form>

        <ul className="nav-list">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to} className="nav-item">
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
