import { Navigate, useLocation } from 'react-router-dom'

function hasValidSession() {
  try {
    const session = localStorage.getItem('tvtime_session')
    const profile = localStorage.getItem('tvtime_profile')

    if (session) {
      const parsedSession = JSON.parse(session)
      return Boolean(parsedSession && Object.keys(parsedSession).length > 0)
    }

    if (profile) {
      const parsedProfile = JSON.parse(profile)
      return Boolean(parsedProfile && Object.keys(parsedProfile).length > 0)
    }

    return false
  } catch {
    return false
  }
}

function PrivateRoute({ children }) {
  const location = useLocation()

  if (!hasValidSession()) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />
  }

  return children
}

export default PrivateRoute
