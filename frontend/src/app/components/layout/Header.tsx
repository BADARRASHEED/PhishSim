'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0F0C29] py-4">
      <div className="w-[90%] max-w-7xl mx-auto border-2 border-white rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FF2E63] rounded-full flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <span className="text-white font-semibold text-lg">PhishSim</span>
        </div>

        {/* Center nav links */}
        <ul className="hidden md:flex gap-6 text-white font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/features">Features</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Auth actions */}
        <div className="flex gap-3">
          <Link
            href="/login"
            className="text-white font-medium px-4 py-2 hover:underline"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-[#FF2E63] text-white px-4 py-2 rounded-full hover:opacity-90 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  )
}
