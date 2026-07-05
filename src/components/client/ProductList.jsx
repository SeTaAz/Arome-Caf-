import ProductCard from './ProductCard';
import { useCart } from '../../context/CartContext';

export default function ProductList() {
  const { productos, addToCart } = useCart();

  if (!productos || productos.length === 0) {
    return (
      <div className="py-10 text-center text-amber-200/80">
        No hay productos disponibles en este momento.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-full overflow-hidden px-2 py-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productos.map((producto) => (
          <ProductCard key={producto._id || producto.id} producto={producto} onAgregar={addToCart} />
        ))}
      </div>
    </div>
  );
}