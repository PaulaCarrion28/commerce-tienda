// ── Utilidades de formato ─────────────────────────────────────
export const formatearPrecio = (valor) =>
  Number(valor).toLocaleString('es-CO', { minimumFractionDigits: 0 })

export const obtenerIniciales = (username = '') =>
  username.slice(0, 2).toUpperCase()

export const obtenerSaludo = () => {
  const h = new Date().getHours()
  if (h < 12) return { texto: 'Buenos días', emoji: '☀️' }
  if (h < 18) return { texto: 'Buenas tardes', emoji: '🌤️' }
  return { texto: 'Buenas noches', emoji: '🌙' }
}
