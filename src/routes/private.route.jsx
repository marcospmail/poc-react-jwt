import { useEffect, useRef, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../contexts/auth'

function PrivateRoute({ children }) {
  const { user, fetching } = useContext(AuthContext)

  if (fetching) return null

  if (!!user) {
    return children
  }

  return <Navigate to="/" />
}

export default PrivateRoute