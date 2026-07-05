import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function OrdersPage() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const cargarPedidos = async () => {
      const token = localStorage.getItem('token_tienda');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      try {
        const res = await fetch(`${API_URL}/orders/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPedidos(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) cargarPedidos();
  }, [user]);

  const formatoCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-amber-50">Mis pedidos</h1>

      {pedidos.length === 0 ? (
        <div className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-8 text-center text-amber-200/90 shadow-2xl shadow-black/20">
          Aún no has realizado pedidos.
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div key={pedido._id} className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-5 shadow-2xl shadow-black/20">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-amber-50">Pedido #{pedido._id.slice(-6)}</p>
                  <p className="text-sm text-amber-300/80">{new Date(pedido.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="rounded-full bg-amber-900/80 px-3 py-1 text-sm text-amber-100">{pedido.estado}</span>
              </div>
              <div className="text-sm text-amber-200/80">
                <p>Total: {formatoCOP.format(pedido.total)}</p>
                <p>Productos: {pedido.items.length}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
