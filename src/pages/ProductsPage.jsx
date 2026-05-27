import { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/Loader'

const CATEGORIES = ['Todas', 'Ropa', 'Electrónica', 'Hogar', 'Deportes', 'Juguetes', 'Belleza', 'Alimentos', 'Otro']

export default function ProductsPage() {
  const { products, loading, error, removeProduct } = useProducts()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Todas')
  const [sortBy, setSortBy] = useState('default')

  const filtered = products
    .filter((p) => {
      const matchSearch =
        p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        p.categoria?.toLowerCase().includes(search.toLowerCase())
      const matchCat = categoryFilter === 'Todas' || p.categoria === categoryFilter
      return matchSearch && matchCat
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return Number(a.precio) - Number(b.precio)
      if (sortBy === 'price-desc') return Number(b.precio) - Number(a.precio)
      if (sortBy === 'stock') return Number(b.stock) - Number(a.stock)
      if (sortBy === 'name') return a.nombre?.localeCompare(b.nombre)
      return 0
    })

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      html: `<span style="color:#9999b3">Estás a punto de eliminar <strong style="color:#f1f1f5">${product.nombre}</strong>.<br/>Esta acción no se puede deshacer.</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    })

    if (!result.isConfirmed) return

    try {
      await removeProduct(product.id)
      await Swal.fire({
        title: '¡Eliminado!',
        html: `<span style="color:#9999b3">El producto fue eliminado del catálogo.</span>`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch {
      Swal.fire('Error', 'No se pudo eliminar el producto.', 'error')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Inventario</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {loading ? 'Cargando...' : `${filtered.length} de ${products.length} productos`}
          </p>
        </div>
        <Link to="/productos/nuevo" className="btn-primary self-start sm:self-auto">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Producto
        </Link>
      </div>

      {/* Filters bar */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o categoría..."
            className="input-field pl-10 py-2.5"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="input-field py-2.5 sm:w-44"
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field py-2.5 sm:w-44"
        >
          <option value="default">Sin ordenar</option>
          <option value="name">Nombre A-Z</option>
          <option value="price-asc">Precio ↑</option>
          <option value="price-desc">Precio ↓</option>
          <option value="stock">Mayor stock</option>
        </select>
      </div>

      {/* Error state */}
      {error && (
        <div className="glass-card p-6 border-red-500/20 text-center">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-dark-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium">No se encontraron productos</p>
          <p className="text-gray-600 text-sm mt-1">Intenta con otros filtros o agrega nuevos productos.</p>
          <Link to="/productos/nuevo" className="btn-primary mt-5 inline-flex">
            Agregar producto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
