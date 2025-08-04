'use client'

import { User, MailCheck, TrendingUp, Flag } from 'lucide-react'
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
  return (
    <div className="min-h-screen bg-[#0F0C29] text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#1C1B29] p-6 space-y-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">PhishSim Admin</h2>
        <nav className="space-y-4">
          <Link href="/admin-dashboard" className="block text-gray-300 hover:text-white">Dashboard</Link>
          <Link href="/campaigns" className="block text-gray-300 hover:text-white">Campaigns</Link>
          <Link href="/templates" className="block text-gray-300 hover:text-white">Templates</Link>
          <Link href="/users" className="block text-gray-300 hover:text-white">User Management</Link>
          <Link href="/reports" className="block text-gray-300 hover:text-white">Reports</Link>
          <Link href="/settings" className="block text-gray-300 hover:text-white">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
