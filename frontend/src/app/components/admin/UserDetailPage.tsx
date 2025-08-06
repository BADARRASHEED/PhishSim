'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Download } from 'lucide-react'

interface CampaignData {
  name: string
  clicked: boolean | 'Pending'
  reported: boolean | 'Pending'
  reassigned?: boolean
  completed?: boolean
}

interface UserData {
  name: string
  email: string
  role: string
  department: string
  campaigns: CampaignData[]
}

export default function UserDetailPage() {
  const params = useSearchParams()
  const email = params.get('email')

  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    if (!email) return

    const dummyUser: UserData = {
      name: 'Ali Raza',
      email: email,
      role: 'Analyst',
      department: 'IT',
      campaigns: [
        { name: 'NHS Trap', clicked: true, reported: false },
        { name: 'Bank Reset', clicked: false, reported: true },
        { name: 'Finance Fraud', clicked: true, reported: true },
      ],
    }

    setUser(dummyUser)
  }, [email])

  if (!user) return <div className="text-white p-10">Loading...</div>

  const total = user.campaigns.length
  const passed = user.campaigns.filter(c => c.clicked !== true || c.reported === true).filter(c => c.clicked !== 'Pending' && c.reported !== 'Pending').length
  const failed = user.campaigns.filter(c => c.clicked === true && c.reported !== true).length
  const ctr = ((user.campaigns.filter(c => c.clicked === true).length / total) * 100).toFixed(1)

  const handleExport = () => {
    const data = [
      ['Name', 'Email', 'Role', 'Department', 'Campaign', 'Clicked', 'Reported'],
      ...user.campaigns.map(c => [
        user.name,
        user.email,
        user.role,
        user.department,
        c.name,
        c.clicked === 'Pending' ? 'Pending' : c.clicked ? 'Yes' : 'No',
        c.reported === 'Pending' ? 'Pending' : c.reported ? 'Yes' : 'No'
      ])
    ]
    const csvContent = 'data:text/csv;charset=utf-8,' + data.map(e => e.join(",")).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${user.name}_report.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleReassign = (index: number) => {
    const updatedUser = { ...user }
    updatedUser.campaigns[index].reassigned = true
    updatedUser.campaigns[index].completed = true
    updatedUser.campaigns.push({
      name: updatedUser.campaigns[index].name,
      clicked: 'Pending',
      reported: 'Pending',
      reassigned: true,
    })
    setUser(updatedUser)
  }

  return (
    <div className="min-h-screen bg-[#0F0C29] text-white p-10">
      <Link href="/users/details" className="text-pink-400 hover:underline">← Back to Role Users</Link>

      <div className="mt-6 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1">User Detail: <span className="text-pink-400">{user.name}</span></h1>
          <p className="text-sm text-gray-300">{user.email} | Role: {user.role} | Dept: {user.department}</p>
        </div>
        <button
          onClick={handleExport}
          className="flex gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded items-center"
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded shadow">Total Campaigns: <span className="font-bold">{total}</span></div>
        <div className="bg-green-700 p-4 rounded shadow">Passed: <span className="font-bold">{passed}</span></div>
        <div className="bg-red-700 p-4 rounded shadow">Failed: <span className="font-bold">{failed}</span></div>
        <div className="bg-yellow-700 p-4 rounded shadow">CTR: <span className="font-bold">{ctr}%</span></div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 text-sm">
          <thead className="bg-[#1C1B29] text-center">
            <tr>
              <th className="py-3 px-4 border-b border-gray-700">Campaign</th>
              <th className="py-3 px-4 border-b border-gray-700">Clicked</th>
              <th className="py-3 px-4 border-b border-gray-700">Reported</th>
              <th className="py-3 px-4 border-b border-gray-700">Status</th>
              <th className="py-3 px-4 border-b border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.campaigns.map((c, idx) => {
              const isPending = c.clicked === 'Pending' || c.reported === 'Pending'
              const isFailed = c.clicked === true && c.reported !== true
              const isPassed = !isFailed && !isPending

              return (
                <tr key={idx} className="hover:bg-[#2A2A40] text-center">
                  <td className="py-3 px-4 border-b border-gray-700">{c.name}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{c.clicked === 'Pending' ? 'Pending' : c.clicked ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{c.reported === 'Pending' ? 'Pending' : c.reported ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-4 border-b border-gray-700">
                    {isPending ? (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded">Pending</span>
                    ) : isFailed ? (
                      <span className="bg-red-500 text-white px-2 py-1 rounded">Failed</span>
                    ) : (
                      <span className="bg-green-500 text-white px-2 py-1 rounded">Passed</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-700">
                    {c.completed ? (
                      <button className="bg-gray-600 text-white px-3 py-1 rounded cursor-default" disabled>Completed</button>
                    ) : isFailed ? (
                      <button
                        onClick={() => handleReassign(idx)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                      >
                        Reassign
                      </button>
                    ) : isPending ? (
                      <button className="bg-green-600 text-white px-3 py-1 rounded cursor-default" disabled>Pending</button>
                    ) : (
                      <button className="bg-gray-600 text-white px-3 py-1 rounded cursor-default" disabled>Completed</button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
