"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { User, MailCheck, TrendingUp, Flag, Menu, X } from 'lucide-react'
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
  Legend
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

// ChartJS registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const stats = [
  {
    icon: <User size={28} className="text-blue-500" />,
    value: '154',
    label: 'Total Users',
    sub: '+5 this week',
  },
  {
    icon: <MailCheck size={28} className="text-purple-500" />,
    value: '12 / 17',
    label: 'Active Campaigns',
    sub: '2 new',
  },
  {
    icon: <TrendingUp size={28} className="text-green-500" />,
    value: '17%',
    label: 'CTR (7 Days)',
    sub: '▲ +2%',
  },
  {
    icon: <Flag size={28} className="text-red-500" />,
    value: '8',
    label: 'Reports Pending',
    sub: '5 urgent',
  },
]

// Dummy chart data
const lineData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Click-Through Rate (%)',
      data: [12, 15, 14, 18, 17, 20, 19],
      fill: false,
      borderColor: '#FF2E63',
      tension: 0.3,
    },
  ],
}

const barData = {
  labels: ['HMRC', 'NHS', 'Bank', 'Amazon', 'Facebook'],
  datasets: [
    {
      label: 'Clicks Per Template',
      data: [35, 22, 45, 30, 25],
      backgroundColor: '#1F1C3A',
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: 'white',
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#ccc' },
      grid: { color: '#333' },
    },
    y: {
      ticks: { color: '#ccc' },
      grid: { color: '#333' },
    },
  },
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/admin-dashboard', label: 'Dashboard' },
    { href: '/campaigns', label: 'Campaigns' },
    { href: '/templates', label: 'Templates' },
    { href: '/users', label: 'User Management' },
    { href: '/reports', label: 'Reports' },
    { href: '/settings', label: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-[#0F0C29] text-white flex">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#1C1B29] p-6 space-y-6 transform transition-transform duration-200 md:relative md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">PhishSim Admin</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block hover:text-white ${
                pathname === item.href ? 'text-[#FF2E63]' : 'text-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-400">Welcome, Admin</p>
            <button className="bg-[#FF2E63] px-4 py-2 text-sm rounded-md hover:bg-[#e82b58] transition">Logout</button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#1C1B29] rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-black/20 rounded-full p-2">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl font-semibold">{stat.value}</p>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 italic">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
          {/* Line Chart */}
          <div className="bg-[#1C1B29] p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Click-Through Rate (Last 7 Days)</h2>
            <Line data={lineData} options={options} />
          </div>

          {/* Bar Chart */}
          <div className="bg-[#1C1B29] p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Top Clicked Email Templates</h2>
            <Bar data={barData} options={options} />
          </div>
        </section>
      </main>
    </div>
  )
}
