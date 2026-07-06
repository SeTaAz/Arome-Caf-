/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error('Error al obtener los productos');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error('Error cargando el catálogo:', error);
      }
    };

    obtenerProductos();
  }, []);

  const addToCart = (producto) => {
    setCart((prevCart) => {
      const productoId = producto._id || producto.id;
      const existe = prevCart.find((item) => (item._id || item.id) === productoId);

      if (existe) {
        return prevCart.map((item) =>
          (item._id || item.id) === productoId ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...prevCart, { ...producto, id: productoId, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => (item._id || item.id) !== id));
  };

  const clearCart = () => setCart([]);

  const agregarProductoGlobal = async (nuevoProducto) => {
    const token = localStorage.getItem('token_tienda');
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(nuevoProducto)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'No se pudo crear el producto');

      setProductos((prevProductos) => [...prevProductos, data.producto || data]);
      alert('¡Producto creado exitosamente en la base de datos!');
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const editarProductoGlobal = async (id, datosProducto) => {
    const token = localStorage.getItem('token_tienda');
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosProducto)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'No se pudo editar el producto');

      setProductos((prevProductos) =>
        prevProductos.map((prod) => (prod._id === id || prod.id === id ? data.producto || data : prod))
      );
      alert('Producto actualizado correctamente.');
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const eliminarProductoGlobal = async (id) => {
    const token = localStorage.getItem('token_tienda');
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'No se pudo eliminar el producto');

      setProductos((prevProductos) => prevProductos.filter((prod) => prod._id !== id && prod.id !== id));
      removeFromCart(id);
      alert('Producto eliminado del inventario.');
    } catch (error) {
      alert(error.message);
    }
  };

  const crearPedido = async (datosPedido) => {
    const token = localStorage.getItem('token_tienda');
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosPedido)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'No se pudo crear el pedido');

      clearCart();
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      productos,
      agregarProductoGlobal,
      editarProductoGlobal,
      eliminarProductoGlobal,
      crearPedido
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}