import Header from '../components/Header'
import ProductCard from '../components/ProductCard'

export default function OrderPage({ products, cartItems, onAdd }) {
  return (
    <div className="pb-24">
      <Header />

      <div className="px-3 pt-4 pb-2">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
          Catálogo de produtos
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-3">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cartItems[product.id] || 0}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  )
}
