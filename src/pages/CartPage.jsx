import { useCart } from '../context/CartContext';
import CartItem from '../components/client/CartItem';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, crearPedido } = useCart();
  const { user } = useAuth();

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const formatoCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });

  const handleFinalizarPedido = async () => {
    if (!user) {
      alert('Debes iniciar sesión para realizar un pedido.');
      return;
    }

    const ok = await crearPedido({
      items: cart.map((item) => ({
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        imagen: item.imagen
      })),
      total,
      direccion: user.direccion || '',
      telefono: user.telefono || ''
    });

    if (ok) {
      alert('¡Pedido realizado con éxito!');
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-amber-50">Tu carrito</h1>
        {cart.length > 0 && (
          <button onClick={clearCart} className="text-sm text-amber-200 hover:text-red-400">
            Vaciar carrito
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-12 text-center shadow-2xl shadow-black/20">
          <p className="mb-6 text-amber-200">Tu carrito está vacío.</p>
          <Link to="/tienda" className="inline-block rounded-lg bg-amber-700 px-4 py-2 text-white transition hover:bg-amber-600">
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <CartItem key={item.id || item._id} item={item} onEliminar={removeFromCart} />
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-amber-900/60 bg-[#24180f] p-6 shadow-2xl shadow-black/20">
            <h3 className="mb-4 text-lg font-semibold text-amber-50">Resumen del pedido</h3>
            <div className="space-y-3 border-b border-amber-800/70 pb-4 text-sm text-amber-200">
              <div className="flex justify-between">
                <span>Productos ({cart.reduce((acc, item) => acc + item.cantidad, 0)})</span>
                <span>{formatoCOP.format(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
            </div>

            <div className="mb-6 flex justify-between pt-4 text-lg font-semibold text-amber-50">
              <span>Total</span>
              <span className="text-amber-400">{formatoCOP.format(total)}</span>
            </div>

            <button onClick={handleFinalizarPedido} className="w-full rounded-lg bg-amber-700 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-amber-600">
              Realizar pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}