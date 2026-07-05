import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rol = await login(email, password);

    if (rol) {
      alert(`Inicio de sesión correcto. Rol: ${rol}`);
      if (rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/tienda');
      }
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-amber-900/60 bg-[#24180f] p-8 shadow-2xl shadow-black/30">
        <h2 className="mb-2 text-center text-2xl font-semibold text-amber-50">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-amber-100">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-amber-100">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full rounded bg-amber-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}