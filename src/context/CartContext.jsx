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
      const existe = prevCart.find((item) => item.id === producto.id || item._id === producto._id);
      const idLlave = producto._id ? '_id' : 'id';

      if (existe) {
        return prevCart.map((item) =>
          item[idLlave] === producto[idLlave] ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id && item._id !== id));
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