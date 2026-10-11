import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useAuth } from '../context/AuthContext'

function OrderHistory() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // Orders fetch karo
    axios.get('https://cafe-app-a7xq.onrender.com/api/orders/my-orders', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then((response) => {
        setOrders(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching orders:', error)
        setLoading(false)
      })

    // Socket.io connection banao
    const socket = io('https://cafe-app-a7xq.onrender.com')

    // Apna order room join karo
    socket.emit('joinOrderRoom', user._id)

    // Order status update listen karo
    socket.on('orderStatusUpdated', (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      )
    })

    // Cleanup - jab component unmount ho to socket disconnect karo
    return () => {
      socket.disconnect()
    }
  }, [user, navigate])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed': return 'bg-blue-100 text-blue-700'
      case 'Preparing': return 'bg-yellow-100 text-yellow-700'
      case 'Ready': return 'bg-green-100 text-green-700'
      case 'Completed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-amber-800 text-lg">Loading your orders...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-4">No Orders Yet</h1>
        <p className="text-amber-700 mb-6">You haven't placed any orders yet.</p>
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
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-6">

              <div className="flex justify-between items-start mb-4 pb-4 border-b border-amber-100">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono text-sm text-amber-900">{order._id}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full transition ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-amber-900 font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-amber-100">
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <span className="font-bold text-amber-800">
                  Total: ₹{order.totalAmount}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory