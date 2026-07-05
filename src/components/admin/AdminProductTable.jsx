import { useCart } from "../../context/CartContext";

export default function AdminProductTable() {
  const { productos, eliminarProductoGlobal } = useCart();

  const formatoCOP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  if (productos.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-8 text-center text-sm text-amber-200/80 shadow-2xl shadow-black/20">
        No hay productos registrados.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-900/60 bg-[#24180f] shadow-2xl shadow-black/20">
      <div className="border-b border-amber-800/70 p-4">
        <h2 className="text-lg font-semibold text-amber-50">Inventario</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-amber-800/70 bg-[#342114] text-xs font-semibold uppercase tracking-wide text-amber-200/80">
              <th className="p-4">Producto</th>
              <th className="p-4">Precio</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productos.map((prod) => {
              const id = prod._id || prod.id;
              return (
                <tr key={id} className="hover:bg-[#342114]">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={prod.imagen} alt={prod.nombre} className="h-12 w-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-amber-50">{prod.nombre}</p>
                        <p className="text-xs text-amber-200/70">{prod.descripcion}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-amber-100">{formatoCOP.format(prod.precio)}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => { if (confirm(`¿Deseas eliminar "${prod.nombre}"?`)) { eliminarProductoGlobal(id); } }} className="rounded bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600">
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
