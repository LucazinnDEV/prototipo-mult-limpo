export default function ProductCard({ product, quantity, onAdd }) {
  return (
    <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-3 flex flex-col gap-2 active:scale-95 transition-transform">
      {quantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
          {quantity}
        </span>
      )}

      <div className="text-3xl text-center">{product.emoji}</div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-white leading-tight line-clamp-2">
          {product.name}
        </p>
        <p className="text-emerald-400 font-bold text-base mt-1">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </p>
      </div>

      <button
        onClick={() => onAdd(product.id)}
        className="mt-auto w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold py-2 rounded-lg text-lg transition-colors"
      >
        +
      </button>
    </div>
  )
}
