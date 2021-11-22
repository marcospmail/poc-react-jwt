import { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";
import { differenceInMilliseconds } from 'date-fns'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState()
  const [user, setUser] = useState()
  const [fetching, setFetching] = useState(true)

  async function refreshJwtToken() {
    try {
      const response = await fetch('http://localhost:3000/auth/refreshjwt', {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        setUser(null)
        setAccessToken(null)
        setFetching(false)
        return
      }

      const { user, access_token } = await response.json()
      setUser(user)
      setAccessToken(access_token)

      // const { exp } = jwtDecode(access_token)

      // const reaminingTimeToExpireJwtInMillis = Math.abs(differenceInMilliseconds(new Date(exp * 1000), new Date()))

      // setTimeout(() => {
      //   refreshJwtToken()
      // }, reaminingTimeToExpireJwtInMillis)

    } catch (error) {
      setUser(undefined)
      setAccessToken(undefined)
    }

    setFetching(false)
  }

  useEffect(() => {
    refreshJwtToken()
  }, [])

  useEffect(() => {
    if (!accessToken) return

    const { exp } = jwtDecode(accessToken)

    const reaminingTimeToExpireJwtInMillis = Math.abs(differenceInMilliseconds(new Date(exp * 1000), new Date()))

    setTimeout(() => {
      refreshJwtToken()
    }, reaminingTimeToExpireJwtInMillis)

  }, [accessToken])

  return (
    <AuthContext.Provider value={{ user, accessToken, setUser, setAccessToken, fetching }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider