// ── Hook de autenticación (reemplaza AuthContext) ─────────────
// Usa localStorage directamente a través del helper localStorage.js
import { useState } from 'react'
import { guardarUsuario, obtenerUsuario, eliminarUsuario } from './localStorage'

export function useAuthState() {
  const [user, setUser] = useState(() => obtenerUsuario())

  const login = (username, pin) => {
    const userData = guardarUsuario(username, pin)
    setUser(userData)
  }

  const logout = () => {
    eliminarUsuario()
    setUser(null)
  }

  return { user, login, logout }
}
