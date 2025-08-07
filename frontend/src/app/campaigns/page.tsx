'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Pencil, Trash2, Eye, Pause, Play } from 'lucide-react';
import Sidebar from '../components/admin/Sidebar';

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year.slice(2)}`;
};

export default function CampaignPage() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [campaigns] = useState([
    {
      id: 1,
      name: 'NHS Simulation',
      status: 'Active',
      difficulty: 'Hard',
      role: 'Admin',
      startDate: '2025-08-01',
      endDate: '2025-08-15',
    },
    {
      id: 2,
      name: 'Phish Awareness',
      status: 'Paused',
      difficulty: 'Easy',
      role: 'User',
      startDate: '2025-07-10',
      endDate: '2025-07-30',
    },
    {
      id: 3,
      name: 'Manager Risk Drill',
      status: 'Active',
      difficulty: 'Moderate',
      role: 'Manager',
      startDate: '2025-08-05',
      endDate: '2025-08-20',
    },
  ]);

  // Filtered campaigns based on search, role, and status
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'All' || c.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [campaigns, search, roleFilter, statusFilter]);

  const total = campaigns.length;
  const active = campaigns.filter(c => c.status === 'Active').length;
  const paused = campaigns.filter(c => c.status === 'Paused').length;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#0F0C29] text-white p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pink-400">Campaign Management</h1>
          <button
            onClick={() => router.push('/campaigns/create')}
            className="flex items-center gap-2 bg-[#FF2E63] px-4 py-2 rounded-md hover:bg-[#e82b58] transition"
          >
            <PlusCircle size={20} /> Create Campaign
          </button>
        </header>

        {/* Summary Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div
            onClick={() => setStatusFilter('All')}
            className="cursor-pointer bg-[#1C1B29] rounded p-4 shadow text-center hover:bg-[#2a293f]"
          >
            <h2 className="text-sm text-gray-400">Total Campaigns</h2>
            <p className="text-xl font-bold">{total}</p>
          </div>
          <div
            onClick={() => setStatusFilter('Active')}
            className="cursor-pointer bg-green-800 rounded p-4 shadow text-center hover:bg-green-700"
          >
            <h2 className="text-sm text-gray-200">Active Campaigns</h2>
            <p className="text-xl font-bold">{active}</p>
          </div>
          <div
            onClick={() => setStatusFilter('Paused')}
            className="cursor-pointer bg-yellow-700 rounded p-4 shadow text-center hover:bg-yellow-600"
          >
            <h2 className="text-sm text-gray-200">Paused Campaigns</h2>
            <p className="text-xl font-bold">{paused}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-3 py-2 rounded bg-[#1C1B29] text-white"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-1/4 px-3 py-2 rounded bg-[#1C1B29] text-white"
          >
            <option value="All">All Roles</option>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-[#1C1B29] rounded-lg p-6 shadow-md overflow-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm border-b border-gray-700">
              <tr>
                <th className="py-2">Campaign</th>
                <th className="py-2">Status</th>
                <th className="py-2">Difficulty</th>
                <th className="py-2">Role</th>
                <th className="py-2">Start Date</th>
                <th className="py-2">End Date</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((c) => (
                <tr key={c.id} className="border-b border-gray-800 hover:bg-[#2a293f]">
                  <td className="py-3 font-medium">{c.name}</td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.status === 'Active' ? 'bg-green-700' : 'bg-yellow-700'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3">{c.difficulty}</td>
                  <td className="py-3">{c.role}</td>
                  <td className="py-3">{formatDate(c.startDate)}</td>
                  <td className="py-3">{formatDate(c.endDate)}</td>
                  <td className="py-3 flex justify-center gap-3">
                    <button
                      title="View"
                      className="hover:text-blue-400"
                      onClick={() => router.push(`/campaigns/${c.id}`)}
                    >
                      <Eye size={18} />
                    </button>

                    <button title="Edit" className="hover:text-yellow-400"><Pencil size={18} /></button>
                    <button title={c.status === 'Active' ? 'Pause' : 'Resume'} className="hover:text-purple-400">
                      {c.status === 'Active' ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button title="Delete" className="hover:text-red-400"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {filteredCampaigns.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No campaigns found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
