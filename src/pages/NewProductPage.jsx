import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { productService } from '../services/productService'
import ProductForm from '../components/ProductForm'

export default function NewProductPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await productService.create(data)
      await Swal.fire({
        title: '¡Producto creado!',
        html: `<span style="color:#9999b3">El producto <strong style="color:#f1f1f5">${data.nombre}</strong> fue agregado al catálogo correctamente.</span>`,
        icon: 'success',
        timer: 2200,
        showConfirmButton: false,
      })
      navigate('/productos')
    } catch {
      Swal.fire('Error', 'No se pudo crear el producto. Verifica tu conexión e intenta de nuevo.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 animate-fade-in">
        <Link
          to="/productos"
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Nuevo Producto</h1>
          <p className="text-gray-500 text-sm">Completa los datos para agregar al catálogo</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/8 border border-accent/15 animate-fade-in">
        <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-gray-400 leading-relaxed">
          Los campos de <span className="text-accent font-semibold">precio</span> y <span className="text-accent font-semibold">stock</span> deben ser valores positivos. La imagen es opcional — si no se proporciona, se asignará un placeholder automáticamente.
        </p>
      </div>

      {/* Form card */}
      <div className="glass-card p-6 animate-slide-up">
        <ProductForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  )
}
