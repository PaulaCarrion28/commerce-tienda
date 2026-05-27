import { useAuth } from '../context/AuthContext'
import { useProducts } from '../hooks/useProducts'
import { Link } from 'react-router-dom'
import { PageLoader } from '../components/Loader'

const CATEGORY_COLORS = {
  Ropa: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  Electrónica: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Hogar: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Deportes: 'text-green-400 bg-green-500/10 border-green-500/20',
  Juguetes: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  default: 'text-accent bg-accent/10 border-accent/20',
}

function StatCard({ label, value, sub, icon, color, delay }) {
  return (
    <div
      className="stat-card animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 ${color}`} />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</p>
          <p className="font-display font-bold text-3xl text-white">{value}</p>
          {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} bg-opacity-20`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { products, loading } = useProducts()

  if (loading) return <PageLoader />

  const totalProducts = products.length
  const totalStock = products.reduce((s, p) => s + Number(p.stock), 0)
  const avgPrice = totalProducts > 0
    ? (products.reduce((s, p) => s + Number(p.precio), 0) / totalProducts).toFixed(0)
    : 0
  const lowStock = products.filter((p) => Number(p.stock) <= 5).length

  const categories = [...new Set(products.map((p) => p.categoria))]
  const categoryStats = categories.map((cat) => {
    const items = products.filter((p) => p.categoria === cat)
    return {
      cat,
      count: items.length,
      stock: items.reduce((s, p) => s + Number(p.stock), 0),
    }
  }).sort((a, b) => b.count - a.count).slice(0, 6)

  // Recent products (last 5 by array order / id)
  const recentProducts = [...products].reverse().slice(0, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'
  const greetEmoji = hour < 12 ? '☀️' : hour < 18 ? '🌤️' : '🌙'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{greetEmoji}</span>
            <h1 className="font-display font-bold text-2xl text-white">
              {greeting}, <span className="text-accent capitalize">{user?.username}</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            Sistema activo
          </div>
        </div>
        <p className="text-gray-500 text-sm ml-10">
          Resumen del inventario de NexStore — {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Productos"
          value={totalProducts}
          sub="en catálogo"
          color="bg-accent"
          delay={0}
          icon={
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        />
        <StatCard
          label="Unidades en Stock"
          value={totalStock.toLocaleString('es-CO')}
          sub="unidades disponibles"
          color="bg-neon-green"
          delay={80}
          icon={
            <svg className="w-5 h-5 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Precio Promedio"
          value={`$${Number(avgPrice).toLocaleString('es-CO')}`}
          sub="por producto"
          color="bg-neon-blue"
          delay={160}
          icon={
            <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Stock Bajo"
          value={lowStock}
          sub={lowStock === 0 ? 'todo en orden' : 'productos críticos'}
          color={lowStock > 0 ? 'bg-neon-pink' : 'bg-neon-green'}
          delay={240}
          icon={
            <svg className={`w-5 h-5 ${lowStock > 0 ? 'text-neon-pink' : 'text-neon-green'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories breakdown */}
        <div
          className="glass-card p-6 lg:col-span-2 animate-slide-up"
          style={{ animationDelay: '300ms', animationFillMode: 'both' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-base text-white">Distribución por Categoría</h2>
            <span className="badge bg-accent/15 text-accent border border-accent/20">
              {categories.length} categorías
            </span>
          </div>
          {categoryStats.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No hay productos registrados aún</p>
              <Link to="/productos/nuevo" className="btn-primary mt-4 inline-flex text-xs">
                Agregar primero
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {categoryStats.map(({ cat, count, stock }) => {
                const pct = Math.round((count / totalProducts) * 100)
                const colorClass = CATEGORY_COLORS[cat] || CATEGORY_COLORS.default
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`badge border text-xs ${colorClass}`}>{cat}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{count} {count === 1 ? 'producto' : 'productos'}</span>
                        <span className="text-gray-600">·</span>
                        <span>{stock} uds.</span>
                        <span className="font-mono text-accent font-semibold w-8 text-right">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-neon-blue rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div
          className="glass-card p-6 animate-slide-up"
          style={{ animationDelay: '380ms', animationFillMode: 'both' }}
        >
          <h2 className="font-display font-bold text-base text-white mb-5">Acciones Rápidas</h2>
          <div className="space-y-3">
            <Link
              to="/productos/nuevo"
              className="flex items-center gap-3 p-3 rounded-xl bg-accent/10 hover:bg-accent/15 border border-accent/20 transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors shrink-0">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-200">Nuevo Producto</p>
                <p className="text-xs text-gray-500">Agregar al catálogo</p>
              </div>
              <svg className="w-4 h-4 text-gray-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/productos"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-200">Ver Inventario</p>
                <p className="text-xs text-gray-500">{totalProducts} productos registrados</p>
              </div>
              <svg className="w-4 h-4 text-gray-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {lowStock > 0 && (
              <Link
                to="/productos"
                className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-300">Revisar Stock</p>
                  <p className="text-xs text-gray-500">{lowStock} producto(s) con stock bajo</p>
                </div>
                <svg className="w-4 h-4 text-gray-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Recent products table */}
      {recentProducts.length > 0 && (
        <div
          className="glass-card p-6 animate-slide-up"
          style={{ animationDelay: '460ms', animationFillMode: 'both' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-base text-white">Últimos Productos</h2>
            <Link to="/productos" className="text-xs text-accent hover:text-accent-light transition-colors font-medium">
              Ver todos →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-gray-500 font-semibold uppercase tracking-wider pb-3">Producto</th>
                  <th className="text-left text-xs text-gray-500 font-semibold uppercase tracking-wider pb-3 hidden sm:table-cell">Categoría</th>
                  <th className="text-right text-xs text-gray-500 font-semibold uppercase tracking-wider pb-3">Precio</th>
                  <th className="text-right text-xs text-gray-500 font-semibold uppercase tracking-wider pb-3">Stock</th>
                  <th className="text-right text-xs text-gray-500 font-semibold uppercase tracking-wider pb-3 hidden md:table-cell">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentProducts.map((p) => {
                  const stock = Number(p.stock)
                  const stockBadge =
                    stock === 0
                      ? <span className="badge bg-red-500/15 text-red-400 border border-red-500/20">Sin stock</span>
                      : stock <= 5
                      ? <span className="badge bg-amber-500/15 text-amber-400 border border-amber-500/20">Stock bajo</span>
                      : <span className="badge bg-neon-green/15 text-neon-green border border-neon-green/20">OK</span>
                  return (
                    <tr key={p.id} className="group hover:bg-white/2 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imagen || `https://picsum.photos/seed/${p.id}/40/40`}
                            alt={p.nombre}
                            className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0"
                            onError={(e) => { e.target.src = `https://picsum.photos/seed/${p.id}/40/40` }}
                          />
                          <span className="text-gray-200 font-medium line-clamp-1">{p.nombre}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 hidden sm:table-cell">
                        <span className={`badge border text-xs ${CATEGORY_COLORS[p.categoria] || CATEGORY_COLORS.default}`}>
                          {p.categoria}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right font-display font-bold text-white">
                        ${Number(p.precio).toLocaleString('es-CO')}
                      </td>
                      <td className="py-3 pr-4 text-right font-mono text-gray-300">
                        {stock}
                      </td>
                      <td className="py-3 text-right hidden md:table-cell">
                        {stockBadge}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
