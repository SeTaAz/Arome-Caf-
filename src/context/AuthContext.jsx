/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      const token = localStorage.getItem('token_tienda');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/perfil`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const datosUsuario = await res.json();
          setUser(datosUsuario);
        } else {
          localStorage.removeItem('token_tienda');
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error);
      } finally {
        setLoading(false);
      }
    };

    verificarSesion();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.mensaje || 'Error en el inicio de sesión');
      }

      localStorage.setItem('token_tienda', data.token);
      
      setUser(data.usuario);
      
      return data.usuario.rol;
    } catch (error) {
      alert(error.message);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token_tienda');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}