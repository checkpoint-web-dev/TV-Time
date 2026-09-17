import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout/RootLayout'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <div className="placeholder-page">Home</div> },
      { path: 'busca', element: <div className="placeholder-page">Busca</div> },
      {
        path: 'perfil',
        element: (
          <PrivateRoute>
            <div className="placeholder-page">Perfil</div>
          </PrivateRoute>
        ),
      },
      { path: 'midia/:id', element: <div className="placeholder-page">Detalhes</div> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
