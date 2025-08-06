'use client'

import { useState, useEffect } from 'react'
import Sidebar from '../../components/admin/Sidebar'

interface InviteData {
  email: string
  role: string
  status: 'Pending' | 'Accepted'
}

export default function InviteUsersPage() {
  const [showModal, setShowModal] = useState(false)

  const [invitations, setInvitations] = useState<InviteData[]>([
    { email: 'alice@example.com', role: 'Admin', status: 'Pending' },
    { email: 'bob@example.com', role: 'Manager', status: 'Accepted' },
    { email: 'charlie@example.com', role: 'Analyst', status: 'Pending' },
    { email: 'david@example.com', role: 'User', status: 'Accepted' },
  ])

  // Fetch or hardcode roles from /users page
  const [availableRoles, setAvailableRoles] = useState<string[]>([])

  useEffect(() => {
    // Simulating fetch from "/users" endpoint
    const fetchedRoles = ['Admin', 'Manager', 'Analyst', 'User']
    setAvailableRoles(fetchedRoles)
  }, [])

  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState('')

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail || !newRole) return

    setInvitations(prev => [
      ...prev,
      { email: newEmail.trim(), role: newRole, status: 'Pending' }
    ])
    setNewEmail('')
    setNewRole('')
    setShowModal(false)
  }

  return (
    <div className="flex min-h-screen bg-[#0F0C29] text-white">
      {/* Sidebar */}
      <div className="flex-none">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-pink-400">Invited Users</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded font-medium"
          >
            + Invite User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-sm">
            <thead className="bg-[#1C1B29]">
              <tr>
                <th className="py-3 px-4 border-b border-gray-700 text-left">Email</th>
                <th className="py-3 px-4 border-b border-gray-700 text-left">Role</th>
                <th className="py-3 px-4 border-b border-gray-700 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((invite, idx) => (
                <tr key={idx} className="hover:bg-[#2A2A40] transition">
                  <td className="py-3 px-4 border-b border-gray-700">{invite.email}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{invite.role}</td>
                  <td className="py-3 px-4 border-b border-gray-700">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${invite.status === 'Pending'
                        ? 'bg-yellow-600'
                        : 'bg-green-700'
                        } text-white`}
                    >
                      {invite.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal with blur background */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1C1B29] text-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Invite New User</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full border border-gray-600 rounded px-3 py-2 bg-[#2A2A40] text-white"
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full border border-gray-600 rounded px-3 py-2 bg-[#2A2A40] text-white"
                  required
                >
                  <option value="">Select Role</option>
                  {availableRoles.map((role, idx) => (
                    <option key={idx} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-500 text-white"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
