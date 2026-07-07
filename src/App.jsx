import ProtectedRoute from './context/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

function NavbarYContenido() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <nav className="border-b border-amber-900/70 bg-[#1d120c]/95 px-6 py-4 shadow-lg shadow-black/20 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-amber-100">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">☕</span>
            Aroma Café
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-amber-200">
            <Link to="/" className="transition hover:text-amber-300">Inicio</Link>
            <Link to="/tienda" className="transition hover:text-amber-300">Tienda</Link>
            <Link to="/carrito" className="transition hover:text-amber-300">Carrito</Link>
            {user && <Link to="/mis-pedidos" className="transition hover:text-amber-300">Pedidos</Link>}

            {user?.rol === 'admin' && (
              <Link to="/admin" className="font-medium text-amber-400 transition hover:text-amber-300">Admin</Link>
            )}

            {!user ? (
              <>
                <Link to="/login" className="rounded-full border border-amber-800 px-3 py-1.5 transition hover:border-amber-600 hover:text-amber-300">Login</Link>
                <Link to="/registro" className="rounded-full bg-amber-700 px-3 py-1.5 text-white transition hover:bg-amber-600">Registro</Link>
              </>
            ) : (
              <div className="flex flex-wrap items-center gap-3 border-l border-amber-800 pl-3">
                <span className="rounded-full bg-amber-900/80 px-2.5 py-1 text-xs font-medium text-amber-100">{user.nombre}</span>
                <button
                  type="button"
                  onClick={logout}
                  className="cursor-pointer text-xs font-medium text-red-400 transition hover:text-red-300"
                >
                  Salir
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-transparent p-6 text-amber-50">
        <Routes>
          {/* 🔓 RUTAS PÚBLICAS: Accesibles para cualquier visitante */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/mis-pedidos" element={<OrdersPage />} />
          
          {/* Tienda liberada: ya no requiere iniciar sesión */}
          <Route path="/tienda" element={<ShopPage />} />

          {/* 🔒 RUTAS PROTEGIDAS: Solo para el rol Administrador */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* Ruta para manejar errores 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavbarYContenido />
      </CartProvider>
    </AuthProvider>
  );
}