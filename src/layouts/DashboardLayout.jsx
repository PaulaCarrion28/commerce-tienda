import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-white/5 py-4 text-center text-xs text-gray-600">
        NexStore Admin © {new Date().getFullYear()} — Panel de Control
      </footer>
    </div>
  )
}
