import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setError('')
    setPlacing(true)

    try {
      const orderItems = cartItems.map((item) => ({
        menuItem: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))

      await axios.post(
        'http://localhost:5000/api/orders',
        { items: orderItems, totalAmount: totalPrice },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )

      clearCart()
      navigate('/order-success')
    } catch (err) {
      setError('Something went wrong while placing order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-4">Your Cart is Empty</h1>
        <p className="text-amber-700 mb-6">Looks like you haven't added anything yet.</p>
        <Link
          to="/menu"
          className="bg-amber-800 text-white px-6 py-3 rounded-full hover:bg-amber-900 transition"
        >
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">
          Your Cart
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-grow">
                <h3 className="font-semibold text-amber-900">{item.name}</h3>
                <p className="text-amber-700 text-sm">₹{item.price} each</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="w-8 h-8 bg-amber-100 text-amber-800 rounded-full font-bold hover:bg-amber-200"
                >
                  −
                </button>
                <span className="font-medium w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="w-8 h-8 bg-amber-100 text-amber-800 rounded-full font-bold hover:bg-amber-200"
                >
                  +
                </button>
              </div>

              <div className="w-20 text-right font-semibold text-amber-900">
                ₹{item.price * item.quantity}
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-amber-900">Total Amount</span>
            <span className="text-2xl font-bold text-amber-800">₹{totalPrice}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={placing}
            className="w-full bg-amber-800 text-white py-3 rounded-full font-semibold hover:bg-amber-900 transition disabled:opacity-50"
          >
            {placing ? 'Placing Order...' : 'Proceed to Checkout'}
          </button>
          {!user && (
            <p className="text-center text-sm text-amber-700 mt-3">
              You'll need to login to place your order
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart