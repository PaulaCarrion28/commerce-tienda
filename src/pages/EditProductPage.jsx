import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { productService } from '../services/productService'
import { alertaExito, alertaError } from '../helpers/alerts'
import { PageLoader } from '../components/Loader'
import ProductForm from '../components/ProductForm'

export default function EditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product,    setProduct]    = useState(null)
  const [loadingProd,setLoadingProd]= useState(true)
  const [saving,     setSaving]     = useState(false)

  useEffect(() => {
    productService.getById(id)
      .then(({ data }) => setProduct(data))
      .catch(() => { alertaError('Error', 'No se encontró el producto.'); navigate('/productos') })
      .finally(() => setLoadingProd(false))
  }, [id, navigate])

  const handleSubmit = async (data) => {
    setSaving(true)
    try {
      await productService.update(id, data)
      await alertaExito('¡Cambios guardados!', '<span style="color:#9999b3">El producto fue actualizado correctamente.</span>', 2000)
      navigate('/productos')
    } catch {
      alertaError('Error', 'No se pudo actualizar el producto.')
    } finally { setSaving(false) }
  }

  if (loadingProd) return <PageLoader />

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 animate-fade-in">
        <Link to="/productos" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Editar Producto</h1>
          <p className="text-gray-500 text-sm line-clamp-1">{product?.nombre}</p>
        </div>
      </div>
      {product && (
        <div className="glass-card p-4 flex items-center gap-4 animate-fade-in">
          <img src={product.imagen||`https://picsum.photos/seed/${product.id}/80/80`} alt={product.nombre}
            className="w-14 h-14 rounded-xl object-cover border border-white/10"
            onError={e=>{e.target.src=`https://picsum.photos/seed/${product.id}/80/80`}} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-200 truncate">{product.nombre}</p>
            <p className="text-xs text-gray-500 mt-0.5">ID: <span className="font-mono text-gray-400">{product.id}</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Precio actual</p>
            <p className="font-display font-bold text-white">${Number(product.precio).toLocaleString('es-CO')}</p>
          </div>
        </div>
      )}
      <div className="glass-card p-6 animate-slide-up">
        <ProductForm initialData={product} onSubmit={handleSubmit} loading={saving} />
      </div>
    </div>
  )
}
