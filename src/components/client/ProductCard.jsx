export default function ProductCard({ producto, onAgregar }) {
  const formatoCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });

  return (
    <div className="flex w-full max-w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-amber-900/60 bg-[#24180f] shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden bg-amber-950/60">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-amber-50">{producto.nombre}</h3>
          <p className="mb-4 text-sm leading-6 text-amber-200/80">{producto.descripcion}</p>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-amber-200/70">Precio</span>
            <span className="text-lg font-semibold text-amber-800">{formatoCOP.format(producto.precio)}</span>
          </div>

          <button
            onClick={() => onAgregar(producto)}
            className="w-full cursor-pointer rounded-xl bg-amber-800 px-3 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-amber-900"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}