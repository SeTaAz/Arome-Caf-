import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function UserList() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoId, setCargandoId] = useState(null);

  const cargarUsuarios = async () => {
    const token = localStorage.getItem('token_tienda');
    try {
      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const eliminarUsuario = async (id, nombre) => {
    const confirmar = window.confirm(`¿Seguro que deseas eliminar a ${nombre}?`);
    if (!confirmar) return;

    const token = localStorage.getItem('token_tienda');
    setCargandoId(id);

    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'No se pudo eliminar el usuario');

      setUsuarios((prev) => prev.filter((usuario) => usuario._id !== id));
      alert(data.mensaje || 'Usuario eliminado correctamente.');
    } catch (error) {
      alert(error.message);
    } finally {
      setCargandoId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-5 shadow-2xl shadow-black/20">
      <h2 className="mb-4 text-lg font-semibold text-amber-50">Usuarios registrados</h2>
      <div className="space-y-3">
        {usuarios.map((usuario) => (
          <div key={usuario._id} className="rounded-lg border border-amber-800/70 bg-[#342114] p-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="font-medium text-amber-50 truncate">{usuario.name}</p>
                <p className="text-sm text-amber-200/80 truncate">{usuario.email}</p>
                <p className="text-sm text-amber-300/80">Rol: {usuario.rol}</p>
              </div>
              {usuario.rol !== 'admin' && (
                <button
                  onClick={() => eliminarUsuario(usuario._id, usuario.name)}
                  disabled={cargandoId === usuario._id}
                  className="rounded-lg bg-rose-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {cargandoId === usuario._id ? 'Eliminando...' : 'Eliminar'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
