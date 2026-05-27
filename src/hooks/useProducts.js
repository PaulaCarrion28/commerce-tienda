import { useState, useEffect, useCallback } from 'react'
import { productService } from '../services/productService'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await productService.getAll()
      setProducts(data)
    } catch {
      // 'err' removed — unused variable warning fix
      setError('No se pudieron cargar los productos.')
    } finally {
      setLoading(false)
    }
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchProducts() }, [])

  const addProduct = async (productData) => {
    const { data } = await productService.create(productData)
    setProducts((prev) => [...prev, data])
    return data
  }

  const updateProduct = async (id, productData) => {
    const { data } = await productService.update(id, productData)
    setProducts((prev) => prev.map((p) => (p.id === id ? data : p)))
    return data
  }

  const removeProduct = async (id) => {
    await productService.delete(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return { products, loading, error, fetchProducts, addProduct, updateProduct, removeProduct }
}
