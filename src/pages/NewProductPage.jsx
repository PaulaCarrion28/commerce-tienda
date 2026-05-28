import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { productService } from '../services/productService'
import { alertaExito, alertaError } from '../helpers/alerts'
import ProductForm from '../components/ProductForm'

export default function NewProductPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await productService.create(data)
      await alertaExito('¡Producto creado!', `<span style="color:#9999b3">El producto <strong style="color:#f1f1f5">${data.nombre}</strong> fue agregado al catálogo.</span>`)
      navigate('/productos')
    } catch {
      alertaError('Error', 'No se pudo crear el producto. Verifica tu conexión.')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 animate-fade-in">
        <Link to="/productos" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Nuevo Producto</h1>
          <p className="text-gray-500 text-sm">Completa los datos para agregar al catálogo</p>
        </div>
      </div>
      <div className="glass-card p-6 animate-slide-up">
        <ProductForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  )
}
