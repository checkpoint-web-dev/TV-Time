import { NavLink } from 'react-router-dom'
import { Home, Search, UserRound } from 'lucide-react'
import './Navbar.css'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/busca', label: 'Busca', icon: Search },
  { to: '/perfil', label: 'Perfil', icon: UserRound },
]

function Navbar() {
  return (
    <header className="navbar-shell">
      <nav className="navbar" aria-label="Navegação principal">
        <div className="navbar-brand" aria-label="TV Time">
          <span className="brand-mark">TV</span>
          <span className="brand-name">Time</span>
        </div>

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
