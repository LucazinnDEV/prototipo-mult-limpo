import { useState } from 'react'
import { products } from './data/products'
import { useCart } from './hooks/useCart'
import OrderPage from './pages/OrderPage'
import CheckoutPage from './pages/CheckoutPage'
import SuccessPage from './pages/SuccessPage'
import Cart from './components/Cart'
import CartModal from './components/CartModal'

// screen: 'order' | 'checkout' | 'success'

export default function App() {
  const { cartItems, totalItems, totalPrice, addToCart, removeFromCart, clearCart } = useCart()
  const [modalOpen, setModalOpen] = useState(false)
  const [screen, setScreen] = useState('order')
  const [lastOrder, setLastOrder] = useState(null)

  function goToCheckout() {
    setModalOpen(false)
    setScreen('checkout')
  }

  function handleConfirm(orderDetails) {
    setLastOrder({ ...orderDetails, totalPrice })
    clearCart()
    setScreen('success')
  }

  function handleNewOrder() {
    setLastOrder(null)
    setScreen('order')
  }

  function handleClear() {
    clearCart()
    setModalOpen(false)
  }

  if (screen === 'checkout') {
    return (
      <CheckoutPage
        cartItems={cartItems}
        totalPrice={totalPrice}
        onConfirm={handleConfirm}
        onBack={() => setScreen('order')}
      />
    )
  }

  if (screen === 'success') {
    return <SuccessPage order={lastOrder} onNewOrder={handleNewOrder} />
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-md mx-auto min-h-screen bg-gray-900 relative">
        <OrderPage
          products={products}
          cartItems={cartItems}
          onAdd={addToCart}
        />

        {totalItems > 0 && (
          <Cart
            totalItems={totalItems}
            totalPrice={totalPrice}
            onOpen={() => setModalOpen(true)}
          />
        )}

        {modalOpen && (
          <CartModal
            products={products}
            cartItems={cartItems}
            totalPrice={totalPrice}
            onAdd={addToCart}
            onRemove={removeFromCart}
            onClear={handleClear}
            onFinish={goToCheckout}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
