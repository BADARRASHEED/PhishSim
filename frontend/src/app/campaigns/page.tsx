'use client'

import { useState } from 'react'
import { PlusCircle, Pencil, Trash2, Eye, Pause, Play } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '../components/admin/Sidebar'

const mockCampaigns = [
  {
    id: 1,
    name: 'NHS Trap',
    status: 'Active',
    templates: 3,
    users: 42,
    startDate: 'Aug 01',
    endDate: 'Aug 15',
  },
  {
    id: 2,
    name: 'Bank Reset',
    status: 'Paused',
    templates: 1,
    users: 88,
    startDate: 'Jul 10',
    endDate: 'Jul 30',
  },
]

export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState(mockCampaigns)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[#0F0C29] text-white p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Campaign Management</h1>
          <Link
            href="/campaigns/create"
            className="flex items-center gap-2 bg-[#FF2E63] px-4 py-2 rounded-md hover:bg-[#e82b58] transition"
          >
            <PlusCircle size={20} /> Create Campaign
          </Link>
        </header>

        <div className="bg-[#1C1B29] rounded-lg p-6 shadow-md overflow-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm border-b border-gray-700">
              <tr>
                <th className="py-2">Campaign</th>
                <th className="py-2">Status</th>
                <th className="py-2">Templates</th>
                <th className="py-2">Users</th>
                <th className="py-2">Start Date</th>
                <th className="py-2">End Date</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-gray-800 hover:bg-[#2a293f]">
                  <td className="py-3 font-medium">{c.name}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.status === 'Active' ? 'bg-green-700' : 'bg-yellow-700'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3">{c.templates}</td>
                  <td className="py-3">{c.users}</td>
                  <td className="py-3">{c.startDate}</td>
                  <td className="py-3">{c.endDate}</td>
                  <td className="py-3 flex justify-center gap-3">
                    <button title="View" className="hover:text-blue-400">
                      <Eye size={18} />
                    </button>
                    <button title="Edit" className="hover:text-yellow-400">
                      <Pencil size={18} />
                    </button>
                    <button
                      title={c.status === 'Active' ? 'Pause' : 'Resume'}
                      className="hover:text-purple-400"
                    >
                      {c.status === 'Active' ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button title="Delete" className="hover:text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
