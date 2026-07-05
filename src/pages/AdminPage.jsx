import ProductForm from '../components/admin/ProductForm';
import AdminProductTable from '../components/admin/AdminProductTable';
import UserList from '../components/admin/UserList';
import CreateAdminForm from '../components/admin/CreateAdminForm';
import OrderList from '../components/admin/OrderList';
import { useCart } from '../context/CartContext';

export default function AdminPage() {
  const { agregarProductoGlobal } = useCart();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-6 shadow-2xl shadow-black/20">
        <h1 className="text-xl font-semibold text-amber-50">Panel de administración</h1>
        <p className="mt-2 text-sm text-amber-200/90">Aquí puedes administrar productos, usuarios y pedidos.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <ProductForm onAgregar={agregarProductoGlobal} />
          <CreateAdminForm />
        </div>

        <div className="space-y-6 lg:col-span-2">
          <AdminProductTable />
          <UserList />
          <OrderList />
        </div>
      </div>
    </div>
  );
}