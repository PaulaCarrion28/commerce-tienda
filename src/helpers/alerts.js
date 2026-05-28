import Swal from 'sweetalert2'

// ── SweetAlert2 helpers centralizados ────────────────────────
export const alertaExito = (titulo, html, timer = 2000) =>
  Swal.fire({ title: titulo, html, icon: 'success', timer, showConfirmButton: false })

export const alertaError = (titulo, texto) =>
  Swal.fire({ title: titulo, text: texto, icon: 'error', confirmButtonText: 'Entendido' })

export const alertaConfirmar = (titulo, html) =>
  Swal.fire({
    title: titulo, html, icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  })
