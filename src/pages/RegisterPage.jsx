import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDirection] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nombre, email, password, telefono, direccion })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'No se pudo registrar');

      alert('Registro correcto. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center py-8">
      <div className="w-full max-w-md rounded-2xl border border-amber-900/60 bg-[#24180f] p-8 shadow-2xl shadow-black/30">
        <h2 className="mb-6 text-center text-2xl font-semibold text-amber-50">Crear cuenta</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-amber-100">Nombre completo</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Juan Pérez" />
          </div>

          <div>
            <label className="mb-1 block text-sm text-amber-100">Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="tu@correo.com" />
          </div>

          <div>
            <label className="mb-1 block text-sm text-amber-100">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="••••••••" />
          </div>

          <div>
            <label className="mb-1 block text-sm text-amber-100">Teléfono</label>
            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="3001234567" />
          </div>

          <div>
            <label className="mb-1 block text-sm text-amber-100">Dirección</label>
            <input type="text" value={direccion} onChange={(e) => setDirection(e.target.value)} required className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Calle 10 #25-45" />
          </div>

          <button type="submit" className="w-full rounded bg-amber-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}