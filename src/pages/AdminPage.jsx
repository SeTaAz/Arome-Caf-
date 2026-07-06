import ProductForm from '../components/admin/ProductForm';
import AdminProductTable from '../components/admin/AdminProductTable';
import UserList from '../components/admin/UserList';
import CreateAdminForm from '../components/admin/CreateAdminForm';
import OrderList from '../components/admin/OrderList';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function AdminPage() {
  const { agregarProductoGlobal, editarProductoGlobal } = useCart();
  const [productoEdicion, setProductoEdicion] = useState(null);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-6 shadow-2xl shadow-black/20">
        <h1 className="text-xl font-semibold text-amber-50">Panel de administración</h1>
        <p className="mt-2 text-sm text-amber-200/90">Aquí puedes administrar productos, usuarios y pedidos.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <ProductForm
            onAgregar={agregarProductoGlobal}
            onEditar={editarProductoGlobal}
            productoEdicion={productoEdicion}
            onCancelarEdicion={() => setProductoEdicion(null)}
          />
          <CreateAdminForm />
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-amber-900/60 bg-[#24180f] p-4 shadow-2xl shadow-black/20 sm:p-6">
            <AdminProductTable onEditar={setProductoEdicion} />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="min-w-0">
              <UserList />
            </div>
            <div className="min-w-0">
              <OrderList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}