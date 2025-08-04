'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Home } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === 'admin@gmail.com' && password === 'admin') {
      router.push('/admin-dashboard')
    } else {
      router.push('/user-dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0C29] flex items-center justify-center relative px-4 py-10">
      {/* Home Icon */}
      <Link href="/" className="absolute top-6 left-6 z-50 text-white hover:text-[#FF2E63] transition">
        <Home className="w-6 h-6" />
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0F0C29] via-[#1F1C3A] to-[#2C2B4F]">

        {/* Left: Image with fixed height */}
        <div className="relative w-full h-64 md:h-auto">
          <Image
            src="/assets/login.jpg"
            alt="Login Visual"
            fill
            className="object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="p-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-center">Welcome!</h2>
          <p className="text-center text-gray-300 mb-6">
            Enter your credentials to log in to <span className="text-[#FF2E63] font-semibold">PhishSim</span>
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-md bg-[#1C1B29] text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF2E63]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF2E63] hover:bg-[#e82b58] text-white font-semibold py-2 rounded-md transition-all duration-300"
            >
              Log in
            </button>

            <p className="text-center text-sm text-gray-400 mt-6">
              Don&#39;t have an account?{' '}
              <Link href="/register" className="text-[#FF2E63] hover:underline">Register here</Link>
            </p>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-[#FF2E63] hover:underline">Terms</a> and{' '}
            <a href="#" className="text-[#FF2E63] hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
