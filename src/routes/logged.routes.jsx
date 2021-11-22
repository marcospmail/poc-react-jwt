import { Routes, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'

function LoggedRoutes() {
  return (
    <Routes>
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default LoggedRoutes