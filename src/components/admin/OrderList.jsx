import { useEffect, useState } from 'react';

export default function OrderList() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const cargarPedidos = async () => {
      const token = localStorage.getItem('token_tienda');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      try {
        const res = await fetch(`${API_URL}/orders`, {
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

    cargarPedidos();
  }, []);

  const cambiarEstado = async (id, estado) => {
    const token = localStorage.getItem('token_tienda');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    try {
      const res = await fetch(`${API_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ estado })
      });
      if (res.ok) {
        setPedidos((prev) => prev.map((pedido) => pedido._id === id ? { ...pedido, estado } : pedido));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-5 shadow-2xl shadow-black/20">
      <h2 className="mb-4 text-lg font-semibold text-amber-50">Pedidos</h2>
      <div className="space-y-3">
        {pedidos.map((pedido) => (
          <div key={pedido._id} className="rounded-lg border border-amber-800/70 bg-[#342114] p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium text-amber-50">{pedido.usuario?.name || 'Cliente'}</p>
              <span className="rounded-full bg-amber-900/80 px-2 py-1 text-xs text-amber-100">{pedido.estado}</span>
            </div>
            <p className="text-sm text-amber-200/80">Total: ${pedido.total}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => cambiarEstado(pedido._id, 'Aprobado')} className="rounded bg-emerald-700 px-2 py-1 text-xs text-white transition hover:bg-emerald-600">Aprobar</button>
              <button onClick={() => cambiarEstado(pedido._id, 'Rechazado')} className="rounded bg-rose-700 px-2 py-1 text-xs text-white transition hover:bg-rose-600">Rechazar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
