import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Details from './pages/Details/Details'
import Profile from './pages/Profile/Profile'
import RootLayout from './components/RootLayout/RootLayout'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'busca', element: <Search /> },
      { path: 'perfil', element: <Profile /> },
      { path: 'midia/:id', element: <Details /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
