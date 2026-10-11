import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'

function Menu() {
  const { addToCart } = useCart()

  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://cafe-app-a7xq.onrender.com/api/menu')
      .then((response) => {
        setMenuItems(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching menu:', error)
        setLoading(false)
      })
  }, [])

  const categories = ["All", "Coffee", "Food", "Desserts"]

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-amber-800 text-lg">Loading menu... (pehli baar 30-50 sec lag sakte hain)</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-amber-900 text-center mb-2">
          Our Menu
        </h1>
        <p className="text-amber-700 text-center mb-10">
          Explore our range of coffee, food, and desserts
        </p>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-full border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? 'bg-amber-800 text-white'
                  : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-amber-900">
                      {item.name}
                    </h3>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-amber-800 font-bold">₹{item.price}</span>
                    <button
                      onClick={() => addToCart({ ...item, id: item._id })}
                      className="bg-amber-800 text-white text-sm px-4 py-2 rounded-full hover:bg-amber-900 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No items found matching your search.
          </p>
        )}

      </div>
    </div>
  )
}

export default Menu