import React from 'react'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import "materialize-css"
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'

const App = () => {
  const { token, login, logout, userId, isReady } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!isReady) return <Loader />

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
      {isAuthenticated ? <Navbar /> : null}
      <div className="container">
        {routes}
      </div>
    </AuthContext.Provider>
  )
}

export default App
