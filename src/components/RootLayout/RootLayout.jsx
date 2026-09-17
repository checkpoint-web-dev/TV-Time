import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './RootLayout.css'

function RootLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
