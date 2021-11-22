import { useState } from 'react'

function SignUp() {
  const [form, setForm] = useState({ email: '', password: '' })

  function onChangeSignIn(e) {
    const { name, value } = e.target
    setForm(v => ({ ...v, [name]: value }))
  }

  async function signUp(e) {
    e.preventDefault()

    await fetch('http://localhost:3000/auth/signup', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      })
    })
  }
  
  return (
    <form onSubmit={signUp}>
      <h2>SignUp</h2><br />
      <input name="name" placeholder="Name" onChange={onChangeSignIn} value={form.name} />
      <input name="email" placeholder="Email" onChange={onChangeSignIn} value={form.email} />
      <input name="password" placeholder="Password" onChange={onChangeSignIn} value={form.password} />
      <button type="submit" >Login</button>
    </form>
  )
}

export default SignUp