import { useEffect, useState } from 'react';

export default function ProductForm({ onAgregar, onEditar, productoEdicion, onCancelarEdicion }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    if (productoEdicion) {
      setNombre(productoEdicion.nombre || '');
      setPrecio(productoEdicion.precio?.toString() || '');
      setDescripcion(productoEdicion.descripcion || '');
      setImagen(productoEdicion.imagen || '');
    } else {
      setNombre('');
      setPrecio('');
      setDescripcion('');
      setImagen('');
    }
  }, [productoEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosProducto = {
      nombre,
      precio: parseInt(precio, 10),
      descripcion,
      imagen: imagen.trim() !== '' ? imagen : 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80'
    };

    if (productoEdicion) {
      const guardadoExitoso = await onEditar(productoEdicion._id || productoEdicion.id, datosProducto);
      if (guardadoExitoso) {
        onCancelarEdicion();
      }
      return;
    }

    const guardadoExitoso = await onAgregar(datosProducto);

    if (guardadoExitoso) {
      setNombre('');
      setPrecio('');
      setDescripcion('');
      setImagen('');
    }
  };

  return (
    <div className="rounded-2xl border border-amber-900/60 bg-[#24180f] p-6 shadow-2xl shadow-black/20">
      <h2 className="mb-4 text-lg font-semibold text-amber-50">{productoEdicion ? 'Editar producto' : 'Agregar producto'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-amber-100">Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Ej: Café artesanal" />
        </div>

        <div>
          <label className="mb-1 block text-sm text-amber-100">Precio</label>
          <input type="number" step="1" value={precio} onChange={(e) => setPrecio(e.target.value)} required className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Ej: 100000" />
        </div>

        <div>
          <label className="mb-1 block text-sm text-amber-100">Imagen</label>
          <input type="url" value={imagen} onChange={(e) => setImagen(e.target.value)} className="w-full rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="https://imagen.com" />
        </div>

        <div>
          <label className="mb-1 block text-sm text-amber-100">Descripción</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required rows="3" className="w-full resize-none rounded border border-amber-800 bg-[#342114] px-3 py-2 text-sm text-amber-50 placeholder:text-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Escribe una descripción breve" />
        </div>

        <button type="submit" className="w-full rounded bg-amber-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600">
          {productoEdicion ? 'Actualizar producto' : 'Guardar producto'}
        </button>

        {productoEdicion && (
          <button type="button" onClick={onCancelarEdicion} className="w-full rounded border border-amber-700 px-3 py-2 text-sm font-medium text-amber-100 transition hover:bg-amber-900/40">
            Cancelar edición
          </button>
        )}
      </form>
    </div>
  );
}