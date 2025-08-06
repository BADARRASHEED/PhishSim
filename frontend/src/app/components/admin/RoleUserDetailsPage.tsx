'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

interface UserData {
    name: string
    email: string
    role: string
    campaigns: number
    clicks: number
    falseReports: number
    result: 'Passed' | 'Failed'
    risk: 'Low' | 'Medium' | 'High'
}

export default function RoleUserDetailsPage() {
    const router = useRouter()
    const params = useSearchParams()
    const selectedRole = params.get('role')

    const [users, setUsers] = useState<UserData[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterResult, setFilterResult] = useState('')
    const [filterRisk, setFilterRisk] = useState('')

    // Roles (fetched from dummy user list)
    const [availableRoles, setAvailableRoles] = useState<string[]>([])

    // Modal State
    const [showInviteModal, setShowInviteModal] = useState(false)
    const [inviteEmail, setInviteEmail] = useState('')
    const [inviteRole, setInviteRole] = useState('')
    const [inviteSent, setInviteSent] = useState(false)

    useEffect(() => {
        if (!selectedRole) return

        const dummyUsers: UserData[] = [
            {
                name: 'John Doe',
                email: 'john@example.com',
                role: 'Admin',
                campaigns: 2,
                clicks: 2,
                falseReports: 0,
                result: 'Failed',
                risk: 'High',
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                role: 'Manager',
                campaigns: 1,
                clicks: 0,
                falseReports: 1,
                result: 'Passed',
                risk: 'Medium',
            },
            {
                name: 'Ali Raza',
                email: 'ali@example.com',
                role: 'Analyst',
                campaigns: 2,
                clicks: 1,
                falseReports: 1,
                result: 'Failed',
                risk: 'High',
            },
            {
                name: 'Sara Khan',
                email: 'sara@example.com',
                role: 'User',
                campaigns: 1,
                clicks: 0,
                falseReports: 2,
                result: 'Passed',
                risk: 'Low',
            },
            {
                name: 'Bilal Ahmed',
                email: 'bilal@example.com',
                role: 'User',
                campaigns: 2,
                clicks: 3,
                falseReports: 0,
                result: 'Failed',
                risk: 'High',
            },
        ]

        setUsers(dummyUsers)

        // Extract unique roles from users
        const roles = Array.from(new Set(dummyUsers.map(u => u.role)))
        setAvailableRoles(roles)

        // Pre-fill inviteRole with current role
        setInviteRole(selectedRole ?? '')
    }, [selectedRole])

    const filteredUsers = users.filter(user => {
        const matchSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchResult = filterResult ? user.result === filterResult : true
        const matchRisk = filterRisk ? user.risk === filterRisk : true
        return matchSearch && matchResult && matchRisk
    })

    return (
        <div className="min-h-screen bg-[#0F0C29] text-white p-10">
            {/* Back button */}
            <button
                onClick={() => router.replace('/users')}
                className="text-pink-400 hover:text-pink-300 text-sm mb-6 underline"
            >
                ← Back to Roles Overview
            </button>

            {/* Heading & Invite Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <h1 className="text-3xl font-bold">
                    Users with Role:{' '}
                    <span className="text-pink-400">{selectedRole}</span>
                </h1>
                <button
                    onClick={() => setShowInviteModal(true)}
                    className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-white text-sm font-semibold"
                >
                    + Invite User
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="px-4 py-2 rounded bg-[#1C1B29] border border-gray-600 text-white w-full sm:w-1/3"
                />
                <select
                    value={filterResult}
                    onChange={e => setFilterResult(e.target.value)}
                    className="px-4 py-2 rounded bg-[#1C1B29] border border-gray-600 text-white w-full sm:w-1/4"
                >
                    <option value="">Filter by Result</option>
                    <option value="Passed">Passed</option>
                    <option value="Failed">Failed</option>
                </select>
                <select
                    value={filterRisk}
                    onChange={e => setFilterRisk(e.target.value)}
                    className="px-4 py-2 rounded bg-[#1C1B29] border border-gray-600 text-white w-full sm:w-1/4"
                >
                    <option value="">Filter by Risk</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            {/* User Table */}
            {filteredUsers.length === 0 ? (
                <p>No users found for this role.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-700 text-sm">
                        <thead className="bg-[#1C1B29]">
                            <tr>
                                {['Name', 'Email', 'Campaigns', 'Clicks', 'False Reports', 'Result', 'Risk', ''].map((heading, i) => (
                                    <th key={i} className="py-3 px-4 border-b border-gray-700 text-center font-semibold">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, idx) => (
                                <tr key={idx} className="hover:bg-[#2A2A40] transition">
                                    <td className="py-3 px-4 border-b border-gray-700 text-center">{user.name}</td>
                                    <td className="py-3 px-4 border-b border-gray-700 text-center">{user.email}</td>
                                    <td className="py-3 px-4 border-b border-gray-700 text-center">{user.campaigns}</td>
                                    <td className="py-3 px-4 border-b border-gray-700 text-center">{user.clicks}</td>
                                    <td className="py-3 px-4 border-b border-gray-700 text-center">{user.falseReports}</td>
                                    <td className="py-3 px-4 border-b border-gray-700 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${user.result === 'Passed' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                                            {user.result}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b border-gray-700 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${user.risk === 'Low' ? 'bg-green-700' : user.risk === 'Medium' ? 'bg-yellow-600' : 'bg-red-700'} text-white`}>
                                            {user.risk}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b border-gray-700 text-center">
                                        <button
                                            onClick={() => router.push(`/users/email?email=${encodeURIComponent(user.email)}`)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1 mx-auto"
                                        >
                                            <Eye className="w-4 h-4" /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1C1B29] p-6 rounded-lg w-full max-w-md text-white">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Invite New User</h2>
                            <button onClick={() => setShowInviteModal(false)} className="text-white text-lg">&times;</button>
                        </div>

                        <input
                            type="email"
                            placeholder="Enter email address"
                            value={inviteEmail}
                            onChange={e => {
                                setInviteEmail(e.target.value)
                                setInviteSent(false)
                            }}
                            className="w-full px-3 py-2 mb-4 rounded bg-[#2A2A40] border border-gray-600"
                        />

                        <select
                            value={inviteRole}
                            onChange={e => setInviteRole(e.target.value)}
                            className="w-full px-3 py-2 mb-4 rounded bg-[#2A2A40] border border-gray-600"
                        >
                            <option value="">Select Role</option>
                            {availableRoles.map((role, i) => (
                                <option key={i} value={role}>{role}</option>
                            ))}
                        </select>

                        <button
                            onClick={() => {
                                if (!inviteEmail || !inviteRole) return
                                setInviteSent(true)
                                setTimeout(() => {
                                    setInviteEmail('')
                                    setInviteRole('')
                                    setShowInviteModal(false)
                                    setInviteSent(false)
                                }, 2000)
                            }}
                            className={`w-full py-2 rounded font-semibold transition ${inviteSent ? 'bg-green-600 cursor-default' : 'bg-pink-600 hover:bg-pink-700'}`}
                            disabled={inviteSent}
                        >
                            {inviteSent ? 'Invitation Sent' : 'Send Invite'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
