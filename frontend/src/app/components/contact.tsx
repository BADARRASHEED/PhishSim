'use client'

export default function ContactSection() {
  return (
    <section className="bg-[#0F0C29] py-24 px-6 text-white" id="contact">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#FF2E63] mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-300">
          Have questions or need a custom phishing simulation? Fill out the form below, and we'll get back to you within 24 hours.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-[#1c1b29] rounded-2xl shadow-lg p-8 border border-white/10">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              className="mt-1 w-full px-4 py-2 rounded-md bg-[#2d2a4a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#43A047]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 rounded-md bg-[#2d2a4a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#43A047]"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Write your message here..."
              className="mt-1 w-full px-4 py-2 rounded-md bg-[#2d2a4a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#43A047]"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-[#FF2E63] to-[#FF2E63] hover:from-[#388E3C] hover:to-[#4CAF50] text-white font-semibold py-2 px-6 rounded-md transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
