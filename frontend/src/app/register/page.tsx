'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Home } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0F0C29] flex items-center justify-center relative px-4 py-10">

      {/* Home Icon */}
      <Link href="/" className="absolute top-6 left-6 z-50 text-white hover:text-[#FF2E63] transition">
        <Home className="w-6 h-6" />
      </Link>

      {/* Register Card */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0F0C29] via-[#1F1C3A] to-[#2C2B4F]">

        {/* Left: Form */}
        <div className="p-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-center">Create Account</h2>
          <p className="text-center text-gray-300 mb-6">
            Sign up to get started with <span className="text-[#FF2E63] font-semibold">PhishSim</span>
          </p>

          <form className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-md bg-[#1C1B29] text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF2E63]"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-[#1C1B29] text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF2E63]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-md bg-[#1C1B29] text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF2E63]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF2E63] hover:bg-[#e82b58] text-white font-semibold py-2 rounded-md transition-all duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#FF2E63] hover:underline">Login here</Link>
          </p>
        </div>

        {/* Right: Image */}
        <div className="relative w-full h-64 md:h-auto">
          <Image
            src="/assets/login.jpg" 
            alt="Register Visual"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
