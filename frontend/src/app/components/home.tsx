'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HomeHero() {
  return (
    <section className="relative bg-[#0F0C29] text-white min-h-screen flex items-center pt-20"> 
      {/* Left: Text content */}
      <div className="w-full md:w-1/2 z-10 px-6 md:px-20 py-20">
        <p className="text-[#FF2E63] font-semibold tracking-wide uppercase mb-3">
          Best Cyber Security For You
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          We Are Ready To <br />
          Protect Your Data <br />
          From Hackers
        </h1>
        <p className="text-gray-300 text-lg mb-8 max-w-xl">
          Empower your workforce with phishing simulations and futuristic learning environments that reduce human error and reinforce digital safety.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="#contact"
            className="bg-[#FF2E63] text-white px-6 py-3 rounded-full hover:opacity-90 transition shadow"
          >
            Contact Us
          </a>
          <Link
            href="/demo"
            className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#0F0C29] transition"
          >
            Schedule a Demo
          </Link>
        </div>
      </div>

      {/* Right: Smaller fixed-size image */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <Image
          src="/assets/home.png"
          alt="Cyber Sphere"
          width={360} // Adjust size here
          height={360}
          className="object-contain"
          priority
        />
      </div>
    </section>
  )
}
