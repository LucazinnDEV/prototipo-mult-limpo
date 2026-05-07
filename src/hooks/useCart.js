import { useState } from 'react'
import { products } from '../data/products'

export function useCart() {
  const [cartItems, setCartItems] = useState({})

  function addToCart(id) {
    setCartItems(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  function removeFromCart(id) {
    setCartItems(prev => {
      const next = { ...prev }
      if (next[id] > 1) next[id] -= 1
      else delete next[id]
      return next
    })
  }

  function clearCart() {
    setCartItems({})
  }

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0)

  const totalPrice = Object.entries(cartItems).reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === Number(id))
    return sum + (product?.price || 0) * qty
  }, 0)

  return { cartItems, totalItems, totalPrice, addToCart, removeFromCart, clearCart }
}
