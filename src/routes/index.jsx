import { Routes as RouterRoutes, Route } from 'react-router-dom'

import PrivateRoute from "./private.route"

import Dashboard from '../pages/Dashboard'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

function Routes() {

  return (
    <RouterRoutes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/Dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>}
      />
    </RouterRoutes>
  )
}

export default Routes