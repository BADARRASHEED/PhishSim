'use client'

import { ShieldCheck, Fingerprint, Headset } from 'lucide-react'

const features = [
    {
        title: 'Phishing Threat Simulation',
        description: 'Simulate real‑world phishing attacks to train your team against social engineering.',
        Icon: ShieldCheck,
        glow: ['#FF6B6B', '#FFF'],
    },
    {
        title: 'Real‑Time Detection',
        description: 'Monitor suspicious email behavior and alert in real‑time to prevent attacks.',
        Icon: Fingerprint,
        glow: ['#4FC3F7', '#FFF'],
    },
    {
        title: '24/7 Security Support',
        description: 'Expert user support and compliance tracking, anytime.',
        Icon: Headset,
        glow: ['#BA68C8', '#FFF'],
    },
]

export default function FeaturesSection() {
    return (
        <section className="bg-[#0F0C29] py-24 px-6 text-white text-center" id="features" >
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFF]">Manage Security Services</h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-12">
                Train your team with realistic phishing simulations and intelligent tools that strengthen your cybersecurity posture.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {features.map(({ title, description, Icon, glow }, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-2xl p-8 bg-gradient-to-br from-[#1c1b29] to-[#2d2a4a] border border-white/10 hover:shadow-2xl transition-all"
                    >
                        {/* Glow circle behind icon */}
                        <div
                            className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full blur-3xl"
                            style={{
                                background: `radial-gradient(circle, ${glow[0]}33, ${glow[1]}00)`,
                            }}
                        />

                        {/* Icon */}
                        <div className="relative z-10 flex items-center justify-center w-20 h-20 mx-auto mb-6">
                            <Icon size={64} strokeWidth={1.5} style={{ color: glow[0] }} />
                        </div>


                        <h3 className="text-lg font-semibold mb-2 text-[#FB8C00] ">{title}</h3>
                        <p className="text-sm text-gray-400">{description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
