import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] text-center px-4">
      <h1 className="text-7xl font-extrabold text-zinc-700">404</h1>
      <h2 className="text-2xl font-bold text-white mt-4">Página no encontrada ❌</h2>
      <p className="text-zinc-400 mt-2 max-w-md">
        Lo sentimos, la ruta a la que intentas acceder no existe o fue movida temporalmente.
      </p>
      <Link 
        to="/" 
        className="mt-6 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium rounded-lg transition-colors duration-200"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}