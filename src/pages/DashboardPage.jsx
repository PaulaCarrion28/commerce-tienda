import { useAuth } from '../context/AuthContext'
import { useProducts } from '../hooks/useProducts'
import { Link } from 'react-router-dom'
import { PageLoader } from '../components/Loader'

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
  }).sort((a, b) => b.count - a.count).slice(0, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{hour < 12 ? '☀️' : hour < 18 ? '🌤️' : '🌙'}</span>
          <h1 className="font-display font-bold text-2xl text-white">
            {greeting}, <span className="text-accent capitalize">{user?.username}</span>
          </h1>
        </div>
        <p className="text-gray-500 text-sm ml-10">
          Aquí tienes el resumen del inventario de NexStore.
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
          icon={<svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
        />
        <StatCard
          label="Unidades en Stock"
          value={totalStock.toLocaleString()}
          sub="unidades disponibles"
          color="bg-neon-green"
          delay={80}
          icon={<svg className="w-5 h-5 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          label="Precio Promedio"
          value={`$${Number(avgPrice).toLocaleString('es-CO')}`}
          sub="por producto"
          color="bg-neon-blue"
          delay={160}
          icon={<svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          label="Stock Bajo"
          value={lowStock}
          sub="productos críticos"
          color="bg-neon-pink"
          delay={240}
          icon={<svg className="w-5 h-5 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories breakdown */}
        <div className="glass-card p-6 lg:col-span-2 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-base text-white">Productos por Categoría</h2>
            <span className="badge bg-accent/15 text-accent border border-accent/20">{categories.length} categorías</span>
          </div>
          {categoryStats.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No hay productos aún</p>
          ) : (
            <div className="space-y-3">
              {categoryStats.map(({ cat, count, stock }) => {
                const pct = Math.round((count / totalProducts) * 100)
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-300 font-medium">{cat}</span>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{count} productos</span>
                        <span className="font-mono text-accent">{pct}%</span>
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
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '380ms', animationFillMode: 'both' }}>
          <h2 className="font-display font-bold text-base text-white mb-5">Acciones Rápidas</h2>
          <div className="space-y-3">
            <Link to="/productos/nuevo" className="flex items-center gap-3 p-3 rounded-xl bg-accent/10 hover:bg-accent/15 border border-accent/20 transition-all duration-200 group">
              <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-200">Nuevo Producto</p>
                <p className="text-xs text-gray-500">Agregar al catálogo</p>
              </div>
            </Link>

            <Link to="/productos" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 transition-all duration-200 group">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-200">Ver Inventario</p>
                <p className="text-xs text-gray-500">{totalProducts} productos</p>
              </div>
            </Link>

            {lowStock > 0 && (
              <Link to="/productos" className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 transition-all duration-200 group">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-300">Revisar Stock</p>
                  <p className="text-xs text-gray-500">{lowStock} producto(s) crítico(s)</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
