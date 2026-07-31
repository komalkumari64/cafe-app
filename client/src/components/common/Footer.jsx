function Footer() {
  return (
    <footer className="bg-amber-900 text-white px-6 py-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left side - Brand */}
        <div>
          <h2 className="text-xl font-bold">☕ CafeApp</h2>
          <p className="text-amber-200 text-sm mt-1">
            Fresh coffee, warm vibes.
          </p>
        </div>

        {/* Middle - Quick Links */}
        <div className="flex gap-6 text-sm">
          <a href="/" className="hover:text-amber-300">Home</a>
          <a href="/menu" className="hover:text-amber-300">Menu</a>
          <a href="/cart" className="hover:text-amber-300">Cart</a>
          <a href="/login" className="hover:text-amber-300">Login</a>
        </div>

        {/* Right side - Copyright */}
        <div className="text-amber-200 text-sm">
          © {new Date().getFullYear()} CafeApp. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer