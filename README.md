# NexStore — Panel Administrativo de E-Commerce

Panel de control para gestión de inventario de una tienda en línea. Permite a los administradores gestionar el catálogo completo de productos con operaciones CRUD, autenticación simulada y una interfaz profesional dark-mode.

---

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **React 18** + **Vite** | Framework y bundler |
| **React Router DOM v6** | Enrutamiento SPA |
| **Axios** | Cliente HTTP |
| **SweetAlert2** | Alertas y confirmaciones |
| **Tailwind CSS v3** | Estilos utilitarios |
| **MockAPI** | API REST simulada |
| **LocalStorage** | Persistencia de sesión |

---

## Funcionalidades

- **Autenticación simulada** — Login con usuario + PIN, protección de rutas, sesión persistente en LocalStorage
- **Dashboard** — Métricas de inventario: total de productos, unidades en stock, precio promedio, alertas de stock bajo
- **Inventario** — Vista en grid con búsqueda por nombre/categoría, filtro por categoría y ordenamiento
- **CRUD completo** — Crear, leer, actualizar y eliminar productos con validaciones
- **Confirmación SweetAlert2** — Modal de confirmación antes de eliminar, alerta de éxito posterior
- **Estados de carga** — Skeletons en grid, PageLoader en transiciones, spinner en formularios
- **Responsivo** — Diseño adaptado para móvil, tablet y escritorio

---

## URL de la API (MockAPI)

```
https://6a14fb2491ff9a63de073f8e.mockapi.io/api/v1/productos
```

Endpoints disponibles:
- `GET /productos` — Listar todos
- `GET /productos/:id` — Obtener uno
- `POST /productos` — Crear
- `PUT /productos/:id` — Actualizar
- `DELETE /productos/:id` — Eliminar

---

## Estructura de Carpetas

```
src/
├── components/       # Componentes reutilizables
│   ├── Loader.jsx    # Spinner, Skeleton, PageLoader
│   ├── Navbar.jsx    # Barra de navegación con menú móvil
│   ├── PrivateRoute.jsx
│   └── ProductCard.jsx
├── context/
│   └── AuthContext.jsx   # Contexto de autenticación
├── hooks/
│   └── useProducts.js    # Custom hook: fetch + CRUD
├── layouts/
│   └── DashboardLayout.jsx
├── pages/
│   ├── DashboardPage.jsx
│   ├── EditProductPage.jsx
│   ├── LoginPage.jsx
│   ├── NewProductPage.jsx
│   └── ProductsPage.jsx
└── services/
    └── productService.js  # Capa de abstracción Axios
```

---

## Instalación y Uso

### Requisitos

- Node.js 18+
- npm 9+

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/commerce-tienda.git
cd commerce-tienda

# 2. Instalar dependencias
npm install

# 3. Correr en desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build de producción

```bash
npm run build
npm run preview
```

---

## Acceso al Panel

Puedes ingresar con **cualquier usuario y PIN** (mínimo 4 caracteres). La sesión persiste en el navegador hasta que presiones "Salir".

---

## Flujo Git

```
main          ← producción
└── develop   ← integración
    ├── feature/auth-system
    ├── feature/product-card
    ├── feature/api-integration
    └── feature/dashboard-stats
```

---

## Deploy

Desplegado en Vercel: **[URL del deploy aquí]**

---

Desarrollado como prueba técnica — Inventario E-Commerce Panel · 2026
