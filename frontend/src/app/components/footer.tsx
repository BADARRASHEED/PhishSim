'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0F0C29] via-[#1F1C3A] to-[#2C2B4F] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div className="col-span-1">
          <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#FF6B6B]">
            PhishSim
          </h3>
          <p className="text-sm text-white/80">
            A modern cybersecurity training platform that simulates real-world phishing threats to help your team stay safe.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[#FF2E63]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/login" className="hover:text-white transition">Login</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[#FF2E63]">Resources</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Use</Link></li>
            <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[#FF2E63]">Contact</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Mail size={16} color="#FF6B6B" /> support@phishsim.com</li>
            <li className="flex items-center gap-2"><Phone size={16} color="#FF6B6B" /> +1 (800) 123‑4567</li>
            <li className="flex items-center gap-2"><MapPin size={16} color="#FF6B6B" /> Cyber Park, Secure City</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-12 border-t border-white/10 pt-4 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} <span className="text-[#FF2E63]">PhishSim</span>. All rights reserved.
      </div>
    </footer>
  )
}
