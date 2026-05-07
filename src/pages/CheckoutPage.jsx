import { useState } from 'react'
import { products } from '../data/products'

const PAYMENT_METHODS = [
  { id: 'dinheiro', label: 'Dinheiro',  emoji: '💵' },
  { id: 'pix',      label: 'Pix',       emoji: '📱' },
  { id: 'debito',   label: 'Débito',    emoji: '💳' },
  { id: 'credito',  label: 'Crédito',   emoji: '💳' },
]

export default function CheckoutPage({ cartItems, totalPrice, onConfirm, onBack }) {
  const [customerName, setCustomerName] = useState('')
  const [payment, setPayment] = useState('')
  const [cashInput, setCashInput] = useState('')

  const lineItems = Object.entries(cartItems).map(([id, qty]) => ({
    product: products.find(p => p.id === Number(id)),
    qty,
  }))

  const cashValue = parseFloat(cashInput.replace(',', '.')) || 0
  const change = payment === 'dinheiro' ? cashValue - totalPrice : 0
  const canConfirm = payment !== '' && (payment !== 'dinheiro' || cashValue >= totalPrice)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-300 active:bg-gray-700"
        >
          ←
        </button>
        <div>
          <p className="text-xs text-gray-400 leading-none">Etapa 2 de 2</p>
          <p className="font-bold text-white leading-tight">Finalizar Pedido</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-32">

        {/* Resumo dos itens */}
        <section>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
            Resumo
          </p>
          <div className="bg-gray-800 rounded-xl divide-y divide-gray-700">
            {lineItems.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-xl">{product.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">
                    {qty}× R$ {product.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <p className="text-emerald-400 font-bold text-sm">
                  R$ {(product.price * qty).toFixed(2).replace('.', ',')}
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-gray-300 font-semibold">Total</span>
              <span className="text-white font-bold text-lg">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </section>

        {/* Nome do cliente */}
        <section>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
            Cliente
          </p>
          <input
            type="text"
            placeholder="Nome do cliente (opcional)"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
          />
        </section>

        {/* Forma de pagamento */}
        <section>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
            Forma de Pagamento
          </p>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.map(m => (
              <button
                key={m.id}
                onClick={() => { setPayment(m.id); setCashInput('') }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors
                  ${payment === m.id
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 active:bg-gray-700'
                  }`}
              >
                <span>{m.emoji}</span> {m.label}
              </button>
            ))}
          </div>
        </section>

        {/* Troco (só para dinheiro) */}
        {payment === 'dinheiro' && (
          <section>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
              Troco
            </p>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">Valor recebido</span>
                <div className="flex-1 flex items-center gap-1">
                  <span className="text-gray-400 text-sm">R$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="0,00"
                    value={cashInput}
                    onChange={e => setCashInput(e.target.value)}
                    className="flex-1 bg-transparent text-white font-bold text-right focus:outline-none text-base"
                  />
                </div>
              </div>
              {cashValue > 0 && (
                <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                  <span className="text-gray-400 text-sm">Troco</span>
                  <span className={`font-bold text-lg ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    R$ {Math.max(change, 0).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              )}
              {cashValue > 0 && cashValue < totalPrice && (
                <p className="text-red-400 text-xs text-center">Valor insuficiente</p>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Botão confirmar fixo */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-950 border-t border-gray-700">
        <button
          onClick={() => canConfirm && onConfirm({ customerName, payment, change: Math.max(change, 0) })}
          disabled={!canConfirm}
          className={`w-full py-4 rounded-xl font-bold text-base transition-colors
            ${canConfirm
              ? 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
        >
          ✅ Confirmar Pedido
        </button>
      </div>
    </div>
  )
}
