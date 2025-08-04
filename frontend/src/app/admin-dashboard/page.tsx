/* Updated Admin Dashboard with collapsible sidebar and icon-based navigation */

'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { User, MailCheck, TrendingUp, Flag, Menu, X, LayoutDashboard, Layers, Users, FileText, Settings } from 'lucide-react'
import Link from 'next/link'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const stats = [
    {
        icon: <User size={28} className="text-blue-500" />, value: '154', label: 'Total Users', sub: '+5 this week',
    },
    {
        icon: <MailCheck size={28} className="text-purple-500" />, value: '12 / 17', label: 'Active Campaigns', sub: '2 new',
    },
    {
        icon: <TrendingUp size={28} className="text-green-500" />, value: '17%', label: 'CTR (7 Days)', sub: '▲ +2%',
    },
    {
        icon: <Flag size={28} className="text-red-500" />, value: '8', label: 'Reports Pending', sub: '5 urgent',
    },
]

const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ label: 'Click-Through Rate (%)', data: [12, 15, 14, 18, 17, 20, 19], borderColor: '#FF2E63', tension: 0.3 }],
}

const barData = {
    labels: ['HMRC', 'NHS', 'Bank', 'Amazon', 'Facebook'],
    datasets: [{ label: 'Clicks Per Template', data: [35, 22, 45, 30, 25], backgroundColor: '#1F1C3A' }],
}

const options = {
    responsive: true,
    plugins: {
        legend: { labels: { color: 'white' } },
    },
    scales: {
        x: { ticks: { color: '#ccc' }, grid: { color: '#333' } },
        y: { ticks: { color: '#ccc' }, grid: { color: '#333' } },
    },
}

const navItems = [
    { href: '/admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/campaigns', label: 'Campaigns', icon: Layers },
    { href: '/templates', label: 'Templates', icon: FileText },
    { href: '/users', label: 'User Management', icon: Users },
    { href: '/reports', label: 'Reports', icon: Flag },
    { href: '/settings', label: 'Settings', icon: Settings },
]

export default function AdminDashboard() {
    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-[#0F0C29] text-white flex">

            {/* Sidebar */}
            <aside className={`transition-all duration-300 bg-[#1C1B29] h-screen sticky top-0 ${collapsed ? 'w-20' : 'w-64'} p-4`}>
                <div className="h-16 flex items-center justify-between mb-8 px-2">
                    {!collapsed && <h2 className="text-xl font-bold">PhishSim</h2>}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="ml-auto p-2 rounded hover:bg-[#2a293f] transition"
                    >
                        {collapsed ? <Menu size={24} /> : <X size={24} />} {/* You can replace <X /> with <ChevronLeft /> or <ArrowLeft /> */}
                    </button>
                </div>



                <nav className="space-y-2">
                    {navItems.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${pathname === href ? 'bg-[#2a293f] text-[#FF2E63]' : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            <Icon size={20} />
                            {!collapsed && <span className="text-sm">{label}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10">
                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-400">Welcome, Admin</p>
                        <button className="bg-[#FF2E63] px-4 py-2 text-sm rounded-md hover:bg-[#e82b58] transition">Logout</button>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-[#1C1B29] rounded-xl p-5 shadow-md hover:shadow-xl">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="bg-black/20 rounded-full p-2">{stat.icon}</div>
                                <div>
                                    <p className="text-xl font-semibold">{stat.value}</p>
                                    <p className="text-gray-300 text-sm">{stat.label}</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 italic">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
                    <div className="bg-[#1C1B29] p-6 rounded-xl shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Click-Through Rate (Last 7 Days)</h2>
                        <Line data={lineData} options={options} />
                    </div>
                    <div className="bg-[#1C1B29] p-6 rounded-xl shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Top Clicked Email Templates</h2>
                        <Bar data={barData} options={options} />
                    </div>
                </section>
            </main>
        </div>
    )
}
