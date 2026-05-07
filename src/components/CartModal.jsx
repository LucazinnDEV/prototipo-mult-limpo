export default function CartModal({
  products, cartItems, totalPrice,
  onAdd, onRemove, onClear, onFinish, onClose,
}) {
  const lineItems = Object.entries(cartItems).map(([id, qty]) => {
    const product = products.find(p => p.id === Number(id))
    return { product, qty }
  })

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-gray-900 rounded-t-2xl border-t border-gray-700 flex flex-col max-h-[85vh]">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-600 rounded-full" />
        </div>

        {/* Título */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">🧾 Pedido</h2>
          <button onClick={onClose} className="text-gray-400 text-2xl leading-none">&times;</button>
        </div>

        {/* Lista de itens */}
        <div className="overflow-y-auto flex-1 px-4 py-2 divide-y divide-gray-700">
          {lineItems.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center gap-3 py-3">
              <span className="text-2xl">{product.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{product.name}</p>
                <p className="text-xs text-gray-400">
                  R$ {product.price.toFixed(2).replace('.', ',')} × {qty}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRemove(product.id)}
                  className="w-8 h-8 rounded-full bg-gray-700 text-white font-bold text-lg flex items-center justify-center active:bg-gray-600"
                >
                  −
                </button>
                <span className="text-white font-bold w-5 text-center">{qty}</span>
                <button
                  onClick={() => onAdd(product.id)}
                  className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-lg flex items-center justify-center active:bg-emerald-700"
                >
                  +
                </button>
              </div>
              <p className="text-emerald-400 font-bold text-sm w-16 text-right">
                R$ {(product.price * qty).toFixed(2).replace('.', ',')}
              </p>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="px-4 pt-3 pb-6 border-t border-gray-700 bg-gray-900 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total</span>
            <span className="text-white font-bold text-xl">
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <button
            onClick={onFinish}
            className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold py-4 rounded-xl text-base transition-colors"
          >
            ✅ Finalizar Pedido
          </button>
          <button
            onClick={onClear}
            className="w-full bg-transparent border border-red-500 text-red-400 font-semibold py-3 rounded-xl text-sm active:bg-red-900/30 transition-colors"
          >
            🗑 Limpar Pedido
          </button>
        </div>
      </div>
    </div>
  )
}
