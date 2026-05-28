import { createBrowserRouter, Navigate } from 'react-router-dom'
import PrivateRoute      from '../components/PrivateRoute'
import DashboardLayout   from '../components/DashboardLayout'
import LoginPage         from '../pages/LoginPage'
import DashboardPage     from '../pages/DashboardPage'
import ProductsPage      from '../pages/ProductsPage'
import NewProductPage    from '../pages/NewProductPage'
import EditProductPage   from '../pages/EditProductPage'

export const router = createBrowserRouter([   // ← export const, no export default
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { index: true,                  element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard',            element: <DashboardPage /> },
      { path: 'productos',            element: <ProductsPage /> },
      { path: 'productos/nuevo',      element: <NewProductPage /> },
      { path: 'productos/editar/:id', element: <EditProductPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
])