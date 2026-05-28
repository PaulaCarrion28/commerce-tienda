export function Spinner({ size = 'md', label = 'Cargando...' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className={`${sizes[size]} animate-spin-slow rounded-full border-2 border-dark-500 border-t-accent`}
        style={{ boxShadow: '0 0 15px rgba(108,99,255,0.3)' }} />
      {label && <p className="text-sm text-gray-500 animate-pulse">{label}</p>}
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="skeleton h-44 rounded-t-2xl rounded-b-none" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 rounded w-3/4" />
        <div className="skeleton h-3 rounded w-1/2" />
        <div className="flex justify-between mt-3">
          <div className="skeleton h-7 rounded w-20" />
          <div className="skeleton h-7 rounded w-12" />
        </div>
        <div className="flex gap-2 pt-4 border-t border-white/5">
          <div className="skeleton h-8 rounded-lg flex-1" />
          <div className="skeleton h-8 rounded-lg flex-1" />
        </div>
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-accent/40 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full bg-accent/20 animate-pulse" />
        </div>
        <p className="text-gray-400 text-sm font-medium">Cargando datos...</p>
      </div>
    </div>
  )
}
