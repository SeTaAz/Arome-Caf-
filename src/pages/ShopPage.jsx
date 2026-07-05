import ProductList from '../components/client/ProductList';

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-2 py-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-amber-50">Catálogo de productos</h1>
        <p className="mt-2 text-sm text-amber-200/90">Aquí puedes ver los productos disponibles y agregarlos al carrito.</p>
      </div>

      <ProductList />
    </div>
  );
}