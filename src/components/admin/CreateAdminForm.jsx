import { useState } from 'react';

export default function CreateAdminForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token_tienda');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

    try {
      const res = await fetch(`${API_URL}/auth/create-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: nombre, email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'No se pudo crear el administrador');
      alert('Administrador creado correctamente');
      setNombre('');
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-5 shadow-2xl shadow-black/20">
      <h2 className="mb-4 text-lg font-semibold text-amber-50">Crear administrador</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Nombre" className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Correo" className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Contraseña" className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70" />
        <button type="submit" className="w-full rounded bg-amber-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600">
          Crear
        </button>
      </form>
    </div>
  );
}
