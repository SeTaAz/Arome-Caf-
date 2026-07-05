import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-2 py-10">
      <div className="overflow-hidden rounded-3xl border border-amber-900/60 bg-gradient-to-br from-[#2b1a10] via-[#5b341d] to-[#140d08] p-8 text-white shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-amber-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg">☕</span>
              Café artesanal • Delivery
            </div>
            <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-sm font-medium">Café artesanal • Delivery</p>
            <h1 className="text-4xl font-bold tracking-tight">Bienvenido a Aroma Café</h1>
            <p className="mt-4 text-lg text-amber-50">
              Descubre cafés seleccionados, disfruta una experiencia acogedora y gestiona tus pedidos con estilo.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/tienda" className="rounded-full bg-white px-5 py-2.5 font-semibold text-amber-900 transition hover:bg-amber-50">
                Ver productos
              </Link>
              <Link to="/login" className="rounded-full border border-white/30 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10">
                Iniciar sesión
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-100">Hoy destacamos</p>
            <p className="mt-1 text-xl font-semibold">Latte de almendra</p>
            <p className="text-sm text-amber-50">Café suave, aroma intenso y crema perfecta.</p>
          </div>
        </div>
      </div>
    </div>
  );
}