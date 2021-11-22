import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/auth'

function SignIn() {
  const { setAccessToken } = useContext(AuthContext)

  const navigate = useNavigate()

  const [signInForm, setSignInForm] = useState({ email: '', password: '' })

  function onChangeSignIn(e) {
    const { name, value } = e.target
    setSignInForm(v => ({ ...v, [name]: value }))
  }

  async function signIn(e) {
    e.preventDefault()

    const response = await fetch('http://localhost:3000/auth/login', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInForm.email,
        password: signInForm.password
      })
    })

    if (!response.ok) {
      alert('Invalid credentials')
      return
    }

    const { access_token } = await response.json()

    setAccessToken(access_token)
    
    navigate('dashboard')
  }

  return (
    <form onSubmit={signIn}>
      <h2>SignIn</h2><br />
      <input name="email" placeholder="Email" onChange={onChangeSignIn} value={signInForm.email} />
      <input name="password" placeholder="Password" onChange={onChangeSignIn} value={signInForm.password} />
      <button type="submit" >Login</button>
    </form>
  )
}

export default SignIn