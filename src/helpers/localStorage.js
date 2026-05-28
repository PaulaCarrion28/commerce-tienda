// ── Sesión de usuario (LocalStorage) ─────────────────────────
const USER_KEY = 'nexstore_user'

export const guardarUsuario = (username, pin) => {
  const userData = { username, pin, loginAt: new Date().toISOString() }
  localStorage.setItem(USER_KEY, JSON.stringify(userData))
  return userData
}

export const obtenerUsuario = () => {
  const stored = localStorage.getItem(USER_KEY)
  return stored ? JSON.parse(stored) : null
}

export const eliminarUsuario = () => localStorage.removeItem(USER_KEY)

export const haySession = () => localStorage.getItem(USER_KEY) !== null
