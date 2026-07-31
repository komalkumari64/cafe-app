import { Link } from 'react-router-dom'

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-bold text-amber-900 mb-2">
        Order Placed Successfully!
      </h1>
      <p className="text-amber-700 mb-8">
        Thank you for your order. We're preparing it fresh for you.
      </p>
      <Link
        to="/menu"
        className="bg-amber-800 text-white px-6 py-3 rounded-full hover:bg-amber-900 transition"
      >
        Order More
      </Link>
    </div>
  )
}

export default OrderSuccess