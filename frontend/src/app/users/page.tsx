'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Plus, X } from 'lucide-react'
import Sidebar from '@/app/components/admin/Sidebar'
import { JSX, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation' 

interface RoleData {
    role: string
    count: number
    color: string
    icon: JSX.Element
}

const colorOptions = [
    'bg-yellow-500',
    'bg-purple-600',
    'bg-pink-600',
    'bg-teal-600',
    'bg-orange-600',
    'bg-amber-600',
    'bg-cyan-600',
    'bg-stone-950',
]

const iconOptions = [
    'fas fa-user-shield',
    'fas fa-chart-line',
    'fas fa-user-tie',
    'fas fa-eye',
    'fas fa-pen-nib',
    'fas fa-cogs',
    'fas fa-user-check',
]

function getRandomItem(array: string[]) {
    return array[Math.floor(Math.random() * array.length)]
}

export default function UserManagementOverview() {
    const router = useRouter() // 👈 Initialize router

    const [roles, setRoles] = useState<RoleData[]>([])
    const [showModal, setShowModal] = useState(false)
    const [newRole, setNewRole] = useState({ role: '' })
    const [activeMenu, setActiveMenu] = useState<number | null>(null)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editRoleName, setEditRoleName] = useState('')

    useEffect(() => {
        setRoles([
            {
                role: 'Admin',
                count: 2,
                color: 'bg-red-600',
                icon: <i className="fas fa-user-shield text-xl"></i>,
            },
            {
                role: 'Analyst',
                count: 4,
                color: 'bg-blue-600',
                icon: <i className="fas fa-chart-line text-xl"></i>,
            },
            {
                role: 'Manager',
                count: 3,
                color: 'bg-green-600',
                icon: <i className="fas fa-user-tie text-xl"></i>,
            },
        ])
    }, [])

    const handleAddRole = () => {
        if (!newRole.role) return

        const newData: RoleData = {
            role: newRole.role,
            count: 1,
            color: getRandomItem(colorOptions),
            icon: <i className={`${getRandomItem(iconOptions)} text-xl`}></i>,
        }

        setRoles([...roles, newData])
        setShowModal(false)
        setNewRole({ role: '' })
    }

    const handleDeleteRole = (index: number) => {
        const updated = [...roles]
        updated.splice(index, 1)
        setRoles(updated)
        setActiveMenu(null)
    }

    const handleEditRole = () => {
        if (editingIndex === null || !editRoleName) return
        const updatedRoles = [...roles]
        updatedRoles[editingIndex].role = editRoleName
        setRoles(updatedRoles)
        setEditingIndex(null)
        setEditRoleName('')
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-[#0F0C29] text-white p-10 overflow-y-auto relative">
                <h1 className="text-3xl font-bold mb-8">User Roles Overview</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {roles.map((role, idx) => (
                        <div
                            key={idx}
                            onClick={() => router.push(`/users/details?role=${encodeURIComponent(role.role)}`)}
                            className={`relative rounded-xl shadow-md ${role.color} p-4 h-28 flex flex-col justify-between cursor-pointer hover:opacity-90 transition`}
                        >
                            {/* 3-dot menu */}
                            <div
                                className="absolute top-2 right-2"
                                onClick={e => e.stopPropagation()} // 👈 prevent click bubbling
                            >
                                <button
                                    onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
                                    className="text-white focus:outline-none"
                                >
                                    <DotsHorizontalIcon className="w-5 h-5" />
                                </button>

                                {activeMenu === idx && (
                                    <div className="absolute right-0 mt-2 w-28 bg-white text-black rounded shadow-lg z-50">
                                        <button
                                            onClick={() => {
                                                setEditRoleName(role.role)
                                                setEditingIndex(idx)
                                                setActiveMenu(null)
                                            }}
                                            className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRole(idx)}
                                            className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {role.icon}
                                <span className="text-lg font-semibold">{role.role}</span>
                            </div>
                            <div className="text-right text-2xl font-bold">{role.count}</div>
                        </div>
                    ))}

                    {/* Add New Role Block */}
                    <div
                        onClick={() => setShowModal(true)}
                        className="rounded-xl border border-dashed border-gray-400 p-4 h-28 flex items-center justify-center cursor-pointer hover:bg-gray-800"
                    >
                        <div className="flex flex-col items-center text-gray-400">
                            <Plus className="w-6 h-6 mb-1" />
                            <span className="text-sm">Add Role</span>
                        </div>
                    </div>
                </div>

                {/* Add Role Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-[#1C1B29] p-6 rounded-lg w-full max-w-md text-white">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Add New Role</h2>
                                <button onClick={() => setShowModal(false)}>
                                    <X className="text-white" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Role Name"
                                    value={newRole.role}
                                    onChange={e => setNewRole({ ...newRole, role: e.target.value })}
                                    className="w-full px-3 py-2 rounded bg-[#2A2A40] text-white"
                                />
                                <button
                                    onClick={handleAddRole}
                                    className="bg-[#FF2E63] hover:bg-[#e82b58] px-4 py-2 rounded font-semibold w-full"
                                >
                                    Add Role
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Role Modal */}
                {editingIndex !== null && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-[#1C1B29] p-6 rounded-lg w-full max-w-md text-white">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Edit Role</h2>
                                <button onClick={() => setEditingIndex(null)}>
                                    <X className="text-white" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Role Name"
                                    value={editRoleName}
                                    onChange={e => setEditRoleName(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-[#2A2A40] text-white"
                                />
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setEditingIndex(null)}
                                        className="px-4 py-2 rounded border border-gray-400 text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleEditRole}
                                        className="bg-[#FF2E63] hover:bg-[#e82b58] px-4 py-2 rounded font-semibold"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
