import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function OrdersPage() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [cargandoId, setCargandoId] = useState(null);

  useEffect(() => {
    const cargarPedidos = async () => {
      const token = localStorage.getItem('token_tienda');
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

  const cancelarPedido = async (id) => {
    const confirmar = window.confirm('¿Deseas cancelar este pedido pendiente?');
    if (!confirmar) return;

    const token = localStorage.getItem('token_tienda');
    setCargandoId(id);

    try {
      const res = await fetch(`${API_URL}/orders/${id}/cancel`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'No se pudo cancelar el pedido');

      setPedidos((prev) => prev.map((pedido) =>
        pedido._id === id ? { ...pedido, estado: data.pedido.estado } : pedido
      ));
    } catch (error) {
      alert(error.message);
    } finally {
      setCargandoId(null);
    }
  };

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
              <div className="flex flex-col gap-3 text-sm text-amber-200/80 md:flex-row md:items-center md:justify-between">
                <div>
                  <p>Total: {formatoCOP.format(pedido.total)}</p>
                  <p>Productos: {pedido.items.length}</p>
                </div>

                {pedido.estado === 'Pendiente' && (
                  <button
                    onClick={() => cancelarPedido(pedido._id)}
                    disabled={cargandoId === pedido._id}
                    className="rounded-lg bg-rose-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {cargandoId === pedido._id ? 'Cancelando...' : 'Cancelar pedido'}
                  </button>
                )}
              </div>

              <div className="mt-4 rounded-xl border border-amber-800/60 bg-[#342114] p-3">
                <p className="mb-2 font-medium text-amber-50">Productos pedidos</p>
                <div className="space-y-2">
                  {pedido.items.map((item, index) => (
                    <div key={`${pedido._id}-${index}`} className="flex items-center justify-between rounded-lg bg-[#24180f] px-3 py-2 text-sm text-amber-200/80">
                      <div>
                        <p>{item.nombre}</p>
                        <p className="text-xs text-amber-300/70">{formatoCOP.format(item.precio)} c/u</p>
                      </div>
                      <div className="text-right">
                        <p>x{item.cantidad}</p>
                        <p>{formatoCOP.format(item.precio * item.cantidad)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
