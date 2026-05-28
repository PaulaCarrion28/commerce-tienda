import { Navigate } from 'react-router-dom'
import { haySession } from '../helpers/localStorage'

// Protege rutas — redirige a /login si no hay sesión activa
export default function PrivateRoute({ children }) {
  return haySession() ? children : <Navigate to="/login" replace />
}
