import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { guardarUsuario, haySession } from '../helpers/localStorage'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form,    setForm]    = useState({ username: '', pin: '' })
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const [showPin, setShowPin] = useState(false)

  if (haySession()) return <Navigate to="/dashboard" replace />

  const validate = () => {
    const e = {}
    if (!form.username.trim()) e.username = 'Ingresa tu nombre de usuario'
    if (!form.pin.trim())      e.pin = 'Ingresa tu PIN'
    else if (form.pin.length < 4) e.pin = 'El PIN debe tener al menos 4 caracteres'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    guardarUsuario(form.username.trim(), form.pin)
    navigate('/dashboard')
  }

  const hc = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-neon-blue/6 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(108,99,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-5 shadow-neon">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-2">Nex<span className="text-accent">Store</span></h1>
          <p className="text-gray-500 text-sm">Panel Administrativo · Acceso Seguro</p>
        </div>

        <div className="glass-card p-8">
          <div className="mb-6">
            <h2 className="font-display font-bold text-xl text-white">Iniciar Sesión</h2>
            <p className="text-gray-500 text-sm mt-1">Ingresa tus credenciales para continuar</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-field">Nombre de usuario</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <input name="username" value={form.username} onChange={hc} placeholder="admin" autoComplete="username"
                  className={`input-field pl-10 ${errors.username ? 'border-red-500/50' : ''}`} />
              </div>
              {errors.username && <p className="mt-1.5 text-xs text-red-400">{errors.username}</p>}
            </div>
            <div>
              <label className="label-field">PIN de acceso</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input name="pin" type={showPin ? 'text' : 'password'} value={form.pin} onChange={hc} placeholder="••••••" autoComplete="current-password"
                  className={`input-field pl-10 pr-11 ${errors.pin ? 'border-red-500/50' : ''}`} />
                <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {showPin
                      ? <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      : <><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                    }
                  </svg>
                </button>
              </div>
              {errors.pin && <p className="mt-1.5 text-xs text-red-400">{errors.pin}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base mt-2">
              {loading
                ? <><svg className="w-4 h-4 animate-spin-slow" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Autenticando...</>
                : <>Ingresar al Panel<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></>
              }
            </button>
          </form>
          <p className="text-center text-xs text-gray-600 mt-5">Puedes usar cualquier usuario y PIN para ingresar.</p>
        </div>
      </div>
    </div>
  )
}
