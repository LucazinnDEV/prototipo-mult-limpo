export default function Header() {
  return (
    <header className="bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
      <div className="bg-emerald-500 rounded-lg w-9 h-9 flex items-center justify-center text-lg">
        🛒
      </div>
      <div>
        <p className="text-xs text-gray-400 leading-none">Vendedor</p>
        <p className="font-bold text-white leading-tight">Maquininha de Pedidos</p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-xs text-gray-400">Hoje</p>
        <p className="text-xs text-emerald-400 font-semibold">
          {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </header>
  )
}
