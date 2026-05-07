export default function SuccessPage({ order, onNewOrder }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 gap-6">
      <div className="text-7xl animate-bounce">✅</div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Pedido Confirmado!</h1>
        {order.customerName && (
          <p className="text-gray-400 mt-1">Cliente: <span className="text-white font-semibold">{order.customerName}</span></p>
        )}
      </div>

      <div className="w-full bg-gray-800 rounded-2xl divide-y divide-gray-700">
        <div className="flex justify-between px-5 py-4">
          <span className="text-gray-400">Total pago</span>
          <span className="text-emerald-400 font-bold text-lg">
            R$ {order.totalPrice.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div className="flex justify-between px-5 py-4">
          <span className="text-gray-400">Pagamento</span>
          <span className="text-white font-semibold capitalize">{order.payment}</span>
        </div>
        {order.payment === 'dinheiro' && (
          <div className="flex justify-between px-5 py-4">
            <span className="text-gray-400">Troco</span>
            <span className="text-white font-semibold">
              R$ {order.change.toFixed(2).replace('.', ',')}
            </span>
          </div>
        )}
        <div className="flex justify-between px-5 py-4">
          <span className="text-gray-400">Horário</span>
          <span className="text-white font-semibold">
            {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      <button
        onClick={onNewOrder}
        className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold py-4 rounded-xl text-base transition-colors"
      >
        + Novo Pedido
      </button>
    </div>
  )
}
