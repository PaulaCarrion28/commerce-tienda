import { Link } from 'react-router-dom'
import { formatearPrecio } from '../helpers/formatters'

const CATEGORY_COLORS = {
  Ropa:        'bg-pink-500/15 text-pink-400 border-pink-500/20',
  Electrónica: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  Hogar:       'bg-amber-500/15 text-amber-400 border-amber-500/20',
  Deportes:    'bg-green-500/15 text-green-400 border-green-500/20',
  Juguetes:    'bg-purple-500/15 text-purple-400 border-purple-500/20',
  default:     'bg-accent/15 text-accent border-accent/20',
}

function StockBadge({ stock }) {
  const n = Number(stock)
  if (n === 0) return <span className="badge bg-red-500/15 text-red-400 border border-red-500/20">Sin stock</span>
  if (n <= 5)  return <span className="badge bg-amber-500/15 text-amber-400 border border-amber-500/20">Stock bajo</span>
  return <span className="badge bg-neon-green/15 text-neon-green border border-neon-green/20">En stock</span>
}

export default function ProductCard({ product, onDelete }) {
  const imgSrc    = product.imagen || `https://picsum.photos/seed/${product.id}/400/300`
  const catStyle  = CATEGORY_COLORS[product.categoria] || CATEGORY_COLORS.default

  return (
    <div className="glass-card-hover group animate-slide-up overflow-hidden">
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <img src={imgSrc} alt={product.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${product.id}/400/300` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`badge border ${catStyle}`}>{product.categoria}</span>
        </div>
        <div className="absolute top-3 right-3">
          <StockBadge stock={product.stock} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-gray-100 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-white transition-colors">
          {product.nombre}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Precio</p>
            <p className="font-display font-bold text-xl text-white">${formatearPrecio(product.precio)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-0.5">Stock</p>
            <p className="font-mono font-bold text-lg text-gray-200">{product.stock}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
          <Link to={`/productos/editar/${product.id}`} className="btn-edit flex-1 justify-center text-xs">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </Link>
          <button onClick={() => onDelete(product)} className="btn-danger flex-1 justify-center text-xs">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
