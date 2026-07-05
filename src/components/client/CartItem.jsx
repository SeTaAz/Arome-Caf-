export default function CartItem({ item, onEliminar }) {
  const formatoCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl mb-3">
      <div className="flex items-center gap-4">
        <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-lg bg-zinc-800" />
        <div>
          <h4 className="font-semibold text-white">{item.nombre}</h4>
          <p className="text-sm text-zinc-400">{formatoCOP.format(item.precio)} {item.cantidad > 1 && `x ${item.cantidad}`}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-zinc-400 text-sm bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700">
          Cant: <strong className="text-white">{item.cantidad}</strong>
        </span>
        <button 
          onClick={() => onEliminar(item.id)} 
          className="text-sm text-red-400 hover:text-red-300 font-medium cursor-pointer transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}