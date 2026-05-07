export default function Cart({ totalItems, totalPrice, onOpen }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-20 p-3 bg-gray-950 border-t border-gray-700">
      <button
        onClick={onOpen}
        className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl py-4 px-5 flex items-center justify-between transition-colors shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="bg-white text-emerald-700 font-bold text-sm w-7 h-7 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
          <span className="font-semibold text-base">Ver Pedido</span>
        </div>
        <span className="font-bold text-lg">
          R$ {totalPrice.toFixed(2).replace('.', ',')}
        </span>
      </button>
    </div>
  )
}
