import { useEffect, useState } from 'react';

export default function UserList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      const token = localStorage.getItem('token_tienda');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
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

    cargarUsuarios();
  }, []);

  return (
    <div className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-5 shadow-2xl shadow-black/20">
      <h2 className="mb-4 text-lg font-semibold text-amber-50">Usuarios registrados</h2>
      <div className="space-y-3">
        {usuarios.map((usuario) => (
          <div key={usuario._id} className="rounded-lg border border-amber-800/70 bg-[#342114] p-3">
            <p className="font-medium text-amber-50">{usuario.name}</p>
            <p className="text-sm text-amber-200/80">{usuario.email}</p>
            <p className="text-sm text-amber-300/80">Rol: {usuario.rol}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
