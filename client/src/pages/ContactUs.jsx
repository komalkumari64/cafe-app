function ContactUs() {
  return (
    <div className="min-h-screen bg-amber-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-amber-900 text-center mb-2">
          Visit Us
        </h1>
        <p className="text-amber-700 text-center mb-12">
          We'd love to see you at our cafe
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left Side - Info + Form */}
          <div>
            {/* Contact Info Cards */}
            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <h3 className="font-semibold text-amber-900">Address</h3>
                  <p className="text-gray-600 text-sm">
                    123 Coffee Street, Connaught Place, New Delhi, 110001
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <h3 className="font-semibold text-amber-900">Phone</h3>
                  <p className="text-gray-600 text-sm">+91 98765 43210</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <h3 className="font-semibold text-amber-900">Email</h3>
                  <p className="text-gray-600 text-sm">hello@cafeapp.com</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-4">
                <span className="text-2xl">🕒</span>
                <div>
                  <h3 className="font-semibold text-amber-900">Hours</h3>
                  <p className="text-gray-600 text-sm">Mon - Sun: 8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-amber-900 mb-4">Send us a message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-amber-800 text-white py-3 rounded-full font-semibold hover:bg-amber-900 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="rounded-xl overflow-hidden shadow-md h-[500px] lg:h-auto">
            <iframe
              title="Cafe Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2496338314144!2d77.21493731508095!3d28.631855082425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4d5c0abbf3%3A0x1e8a4c40e2c8a04c!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactUs