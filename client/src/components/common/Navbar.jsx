import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { totalItems } = useCart()
  const { user, logoutUser } = useAuth()

  return (
    <nav className="bg-amber-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">☕ CafeApp</Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-amber-200">Home</Link>
        <Link to="/menu" className="hover:text-amber-200">Menu</Link>
        <Link to="/contact" className="hover:text-amber-200">Contact</Link>
        <Link to="/cart" className="hover:text-amber-200 relative">
          Cart {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-white text-amber-900 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/orders" className="hover:text-amber-200 text-sm">My Orders</Link>
            <span className="text-amber-200 text-sm">Hi, {user.name}</span>
            <button
              onClick={logoutUser}
              className="bg-white text-amber-900 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-amber-100 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="hover:text-amber-200">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar