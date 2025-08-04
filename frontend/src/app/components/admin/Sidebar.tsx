'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Layers, Users, FileText, Flag, Settings, Menu, X } from 'lucide-react'

const navItems = [
    { href: '/admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/campaigns', label: 'Campaigns', icon: Layers },
    { href: '/templates', label: 'Templates', icon: FileText },
    { href: '/users', label: 'User Management', icon: Users },
    { href: '/reports', label: 'Reports', icon: Flag },
    { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    return (
        <aside className={`transition-all duration-300 bg-[#1C1B29] h-screen sticky top-0 ${collapsed ? 'w-20' : 'w-64'} p-4`}>
            <div className="h-16 flex items-center justify-between mb-8 px-2">
                {!collapsed && <h2 className="text-xl font-bold text-white">PhishSim</h2>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="ml-auto p-2 rounded hover:bg-[#2a293f] transition"
                >
                    {collapsed ? <Menu size={24} className="text-white" /> : <X size={24} className="text-white" />}
                </button>
            </div>


            <nav className="space-y-2">
                {navItems.map(({ href, label, icon: Icon }) => (
                    <button
                        key={href}
                        onClick={() => router.push(href)}
                        className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-left transition-all ${pathname === href ? 'bg-[#2a293f] text-[#FF2E63]' : 'text-gray-300 hover:text-white'}`}
                    >
                        <Icon size={20} />
                        {!collapsed && <span className="text-sm">{label}</span>}
                    </button>
                ))}
            </nav>
        </aside>
    )
}
