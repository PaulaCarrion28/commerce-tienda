import { useState, useEffect } from 'react'

const CATEGORIES = ['Ropa', 'Electrónica', 'Hogar', 'Deportes', 'Juguetes', 'Belleza', 'Alimentos', 'Otro']

const toForm = (data) => ({
  nombre:    data?.nombre    ?? '',
  precio:    data?.precio    ?? '',
  categoria: data?.categoria ?? '',
  stock:     data?.stock     ?? '',
  imagen:    data?.imagen    ?? '',
})

export default function ProductForm({ initialData = null, onSubmit, loading = false }) {
  const [form,     setForm]     = useState(() => toForm(initialData))
  const [errors,   setErrors]   = useState({})
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (initialData) { setForm(toForm(initialData)); setImgError(false) }
  }, [initialData?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const validate = () => {
    const e = {}
    if (!form.nombre.trim())                      e.nombre    = 'El nombre es obligatorio'
    if (form.precio === '' || isNaN(form.precio)) e.precio    = 'Ingresa un precio válido'
    else if (Number(form.precio) < 0)             e.precio    = 'El precio no puede ser negativo'
    if (!form.categoria)                          e.categoria = 'Selecciona una categoría'
    if (form.stock === '' || isNaN(form.stock))   e.stock     = 'Ingresa un stock válido'
    else if (Number(form.stock) < 0)              e.stock     = 'El stock no puede ser negativo'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'imagen') setImgError(false)
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    const payload = { nombre: form.nombre.trim(), precio: Number(form.precio), categoria: form.categoria, stock: Number(form.stock) }
    if (form.imagen.trim()) payload.imagen = form.imagen.trim()
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="label-field">Nombre del producto</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Camiseta Premium Algodón"
          className={`input-field ${errors.nombre ? 'border-red-500/50' : ''}`} />
        {errors.nombre && <p className="mt-1.5 text-xs text-red-400">{errors.nombre}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-field">Precio (COP)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-mono">$</span>
            <input name="precio" type="number" min="0" step="0.01" value={form.precio} onChange={handleChange} placeholder="0"
              className={`input-field pl-7 ${errors.precio ? 'border-red-500/50' : ''}`} />
          </div>
          {errors.precio && <p className="mt-1.5 text-xs text-red-400">{errors.precio}</p>}
        </div>
        <div>
          <label className="label-field">Stock disponible</label>
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="0"
            className={`input-field ${errors.stock ? 'border-red-500/50' : ''}`} />
          {errors.stock && <p className="mt-1.5 text-xs text-red-400">{errors.stock}</p>}
        </div>
      </div>

      <div>
        <label className="label-field">Categoría</label>
        <select name="categoria" value={form.categoria} onChange={handleChange}
          className={`input-field ${errors.categoria ? 'border-red-500/50' : ''}`}>
          <option value="">— Selecciona una categoría —</option>
          {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        {errors.categoria && <p className="mt-1.5 text-xs text-red-400">{errors.categoria}</p>}
      </div>

      <div>
        <label className="label-field">URL de imagen <span className="text-gray-600 normal-case font-normal">(opcional)</span></label>
        <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" className="input-field" />
        {form.imagen.trim() && (
          <div className="mt-3 rounded-xl overflow-hidden border border-white/10 h-36 bg-dark-700 flex items-center justify-center">
            {!imgError
              ? <img src={form.imagen} alt="Vista previa" className="w-full h-full object-cover" onError={() => setImgError(true)} />
              : <p className="text-xs text-gray-600">URL inválida o imagen no disponible</p>
            }
          </div>
        )}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base">
        {loading
          ? <><svg className="w-4 h-4 animate-spin-slow" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Guardando...</>
          : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>{initialData ? 'Guardar Cambios' : 'Crear Producto'}</>
        }
      </button>
    </form>
  )
}
