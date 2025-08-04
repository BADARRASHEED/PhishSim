'use client'

import { useState } from 'react'
import { PlusCircle, Pencil, Trash2, Eye, Pause, Play, X } from 'lucide-react'


export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'NHS Trap',
      status: 'Active',
      templates: 3,
      users: 42,
      difficulty: 'Hard',
      startDate: '2025-08-01',
      endDate: '2025-08-15',
    },
    {
      id: 2,
      name: 'Bank Reset',
      status: 'Paused',
      templates: 1,
      users: 88,
      difficulty: 'Moderate',
      startDate: '2025-07-10',
      endDate: '2025-07-30',
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    users: '',
    templates: '',
    difficulty: 'Easy',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCreate = () => {
    if (!formData.name) return
    const newCampaign = {
      id: Date.now(),
      name: formData.name,
      status: 'Active',
      templates: parseInt(formData.templates),
      users: parseInt(formData.users),
      difficulty: formData.difficulty,
      startDate: formData.startDate,
      endDate: formData.endDate,
    }
    setCampaigns([...campaigns, newCampaign])
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      users: '',
      templates: '',
      difficulty: 'Easy',
    })
    setShowModal(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    return `${day}/${month}/${year}`
  }


  return (
    <div className="flex h-screen overflow-hidden">
      

      <main className="flex-1 overflow-y-auto bg-[#0F0C29] text-white p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Campaign Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#FF2E63] px-4 py-2 rounded-md hover:bg-[#e82b58] transition"
          >
            <PlusCircle size={20} /> Create Campaign
          </button>
        </header>

        <div className="bg-[#1C1B29] rounded-lg p-6 shadow-md overflow-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm border-b border-gray-700">
              <tr>
                <th className="py-2">Campaign</th>
                <th className="py-2">Status</th>
                <th className="py-2">Difficulty</th>
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
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${c.status === 'Active' ? 'bg-green-700' : 'bg-yellow-700'
                        }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3">{c.difficulty}</td>
                  <td className="py-3">{c.templates}</td>
                  <td className="py-3">{c.users}</td>
                  <td className="py-3">{formatDate(c.startDate)}</td>
                  <td className="py-3">{formatDate(c.endDate)}</td>

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

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#1C1B29] rounded-lg p-6 w-full max-w-xl relative">
            <button
              onClick={() => {
                setShowModal(false)
                setFormData({
                  name: '',
                  startDate: '',
                  endDate: '',
                  users: '',
                  templates: '',
                  difficulty: 'Easy',
                })
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <X size={22} />
            </button>

            <h2 className="text-lg font-bold mb-4 text-white">Create New Campaign</h2>

            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <label className="text-sm text-gray-300 mb-1 block">Campaign Name</label>
                <input
                  name="name"
                  placeholder="Campaign Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#2a293f] p-2 rounded text-white"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-300 mb-1 block">Difficulty Level</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full bg-[#2a293f] p-2 rounded text-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <label className="text-sm text-gray-300 mb-1 block">Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full bg-[#2a293f] p-2 rounded text-white"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-300 mb-1 block">End Date</label>
                <input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full bg-[#2a293f] p-2 rounded text-white"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="text-sm text-gray-300 mb-1 block">Number of Users</label>
                <input
                  name="users"
                  type="number"
                  value={formData.users}
                  onChange={handleChange}
                  className="w-full bg-[#2a293f] p-2 rounded text-white"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-300 mb-1 block">Templates Assigned</label>
                <input
                  name="templates"
                  type="number"
                  value={formData.templates}
                  onChange={handleChange}
                  className="w-full bg-[#2a293f] p-2 rounded text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-[#FF2E63] hover:bg-[#e82b58] text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
