import { useState } from 'react'
import { useCart } from '../context/CartContext'

function Menu() {
  const { addToCart } = useCart()

  // Dummy menu data
  const menuItems = [
    { id: 1, name: "Cappuccino", price: 150, category: "Coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400", description: "Rich espresso with steamed milk foam" },
    { id: 2, name: "Cold Brew", price: 180, category: "Coffee", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400", description: "Smooth, refreshing iced coffee" },
    { id: 3, name: "Latte", price: 160, category: "Coffee", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400", description: "Creamy espresso with steamed milk" },
    { id: 4, name: "Espresso", price: 100, category: "Coffee", image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400", description: "Bold and strong shot of coffee" },
    { id: 5, name: "Croissant", price: 120, category: "Food", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400", description: "Buttery, flaky, freshly baked" },
    { id: 6, name: "Club Sandwich", price: 220, category: "Food", image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=400", description: "Loaded with veggies and cheese" },
    { id: 7, name: "Pasta Alfredo", price: 280, category: "Food", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400", description: "Creamy white sauce pasta" },
    { id: 8, name: "Chocolate Cake", price: 220, category: "Desserts", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Rich, moist, decadent chocolate layers" },
    { id: 9, name: "Blueberry Muffin", price: 130, category: "Desserts", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400", description: "Soft muffin loaded with blueberries" },
  ]

  const categories = ["All", "Coffee", "Food", "Desserts"]

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-amber-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-amber-900 text-center mb-2">
          Our Menu
        </h1>
        <p className="text-amber-700 text-center mb-10">
          Explore our range of coffee, food, and desserts
        </p>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-full border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Category Tabs */}
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

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
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
                      onClick={() => addToCart(item)}
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