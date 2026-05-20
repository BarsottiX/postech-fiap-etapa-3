import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()


const USUARIO = 'professor'
const SENHA = '123456'

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    () => localStorage.getItem('usuario') || null
  )

  function login(user, pass) {
    if (user === USUARIO && pass === SENHA) {
      localStorage.setItem('usuario', user)
      setUsuario(user)
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}