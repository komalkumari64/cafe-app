import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'

function Home() {
  const { addToCart } = useCart()

  // Slider images
  const sliderImages = [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200",
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Featured items - backend se aayenge
  const [featuredItems, setFeaturedItems] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then((response) => {
        setFeaturedItems(response.data.slice(0, 4))
      })
      .catch((error) => {
        console.error('Error fetching featured items:', error)
      })
  }, [])

  return (
    <div className="min-h-screen bg-amber-50">

      {/* 1. Hero Section with Slider */}
      <section className="relative h-[500px] overflow-hidden">
        {sliderImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to CafeApp ☕
          </h1>
          <p className="text-amber-100 text-lg md:text-xl mb-8 max-w-xl">
            Freshly brewed coffee, cozy vibes, and a menu made with love.
          </p>
          <div className="flex gap-4">
            <Link
              to="/menu"
              className="bg-white text-amber-900 font-semibold px-6 py-3 rounded-full hover:bg-amber-100 transition"
            >
              Order Now
            </Link>
            <Link
              to="/reservation"
              className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-amber-900 transition"
            >
              Book a Table
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. Featured Items Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-2">
          Our Popular Picks
        </h2>
        <p className="text-amber-700 text-center mb-10">
          Customer favorites, made fresh every day
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
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
                <h3 className="text-lg font-semibold text-amber-900">
                  {item.name}
                </h3>
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
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-2">
            Why Choose Us
          </h2>
          <p className="text-amber-700 text-center mb-12">
            What makes CafeApp special
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl mb-4">
                🌱
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Fresh Ingredients
              </h3>
              <p className="text-gray-600 text-sm">
                We source the finest beans and freshest ingredients daily.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl mb-4">
                ⚡
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Fast Service
              </h3>
              <p className="text-gray-600 text-sm">
                Quick order tracking so you know exactly when it's ready.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl mb-4">
                🏡
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Cozy Atmosphere
              </h3>
              <p className="text-gray-600 text-sm">
                A warm, comfortable space to relax, work, or catch up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Reservation CTA Section */}
      <section className="bg-amber-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">
            Reserve Your Table Today
          </h2>
          <p className="text-amber-200 mb-8">
            Planning a visit? Book a table in advance and skip the wait.
          </p>
          <Link
            to="/reservation"
            className="inline-block bg-white text-amber-900 font-semibold px-8 py-3 rounded-full hover:bg-amber-100 transition"
          >
            Book a Table
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home