'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Users, Award, Flag, BarChart3, Layers, UserCheck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CampaignStats {
  id: number;
  name: string;
  role: string;
  users: number;
  passed: number;
  failed: number;
  unattempted: number;
  status: string;
  difficulty: string;
  startDate: string;
  endDate: string;
  lastUpdated: string;
  notes: string;
  templates: string[];
  modules: string[];
}

const dummyStats: Record<number, CampaignStats> = {
  1: {
    id: 1,
    name: 'NHS Simulation',
    role: 'Admin',
    users: 50,
    passed: 32,
    failed: 10,
    unattempted: 8,
    status: 'Active',
    difficulty: 'Hard',
    startDate: '2025-08-01',
    endDate: '2025-08-15',
    lastUpdated: '2025-08-04',
    notes: 'Simulates credential-stealing attempts via NHS-themed emails.',
    templates: ['NHS Account Alert', 'Login Verification'],
    modules: ['Safe Email Practices', 'Phishing Red Flags'],
  },
};

export default function CampaignDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const data = dummyStats[Number(id)];

  if (!data) return <div className="p-8 text-white">Campaign not found.</div>;

  const chartData = [
    { name: 'Passed', value: data.passed, color: '#096b30' },
    { name: 'Failed', value: data.failed, color: '#d40428' },
    { name: 'Unattempted', value: data.unattempted, color: '#f5d327' },
  ];

  return (
    <div className="bg-[#0F0C29] min-h-screen p-8 text-white">
      {/* Back Button */}
      <button
        onClick={() => router.push('/campaigns')}
        className="mb-6 flex items-center text-sm text-pink-300 hover:text-white transition"
      >
        <ArrowLeft className="mr-2" size={18} /> Back to Campaigns
      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold text-pink-400 mb-1">{data.name}</h1>
      <p className="text-gray-400 mb-8 text-sm">{data.notes}</p>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <Card icon={<Users size={20} />} label="Total Users" value={data.users} />
        <Card icon={<Award size={20} />} label="Passed" value={data.passed} color="text-green-400" />
        <Card icon={<Flag size={20} />} label="Failed" value={data.failed} color="text-red-400" />
        <Card icon={<BarChart3 size={20} />} label="Unattempted" value={data.unattempted} color="text-yellow-300" />
        <Card icon={<UserCheck size={20} />} label="Role" value={data.role} />
        <Card label="Status" value={data.status} />
        <Card label="Difficulty" value={data.difficulty} />
      </div>

      {/* Progress + Templates & Modules Row */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Left: Pie Chart */}
        <div className="bg-[#1C1B29] rounded-lg p-5 flex-1">
          <h2 className="text-lg font-semibold text-pink-300 mb-4">Progress Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[{ ...data }]} stackOffset="expand">
              <XAxis dataKey="name" hide />
              <YAxis tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} />
              <Tooltip formatter={(value) => `${value} users`} />
              <Legend />
              <Bar dataKey="passed" stackId="a" fill="#16A34A" name="Passed" />
              <Bar dataKey="failed" stackId="a" fill="#DC2626" name="Failed" />
              <Bar dataKey="unattempted" stackId="a" fill="#FBBF24" name="Unattempted" />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex justify-around text-sm text-gray-300 mt-3">
            <span>{((data.passed / data.users) * 100).toFixed(0)}% Passed</span>
            <span>{((data.failed / data.users) * 100).toFixed(0)}% Failed</span>
            <span>{((data.unattempted / data.users) * 100).toFixed(0)}% Unattempted</span>
          </div>
        </div>

        {/* Right: Templates & Modules */}
        <div className="flex-1 flex flex-col gap-6">
          {data.templates.length > 0 && (
            <div className="bg-[#1C1B29] rounded p-5">
              <h3 className="text-pink-300 text-lg font-semibold flex items-center gap-2 mb-2">
                <Layers size={18} /> Templates
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {data.templates.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}

          {data.modules.length > 0 && (
            <div className="bg-[#1C1B29] rounded p-5">
              <h3 className="text-pink-300 text-lg font-semibold flex items-center gap-2 mb-2">
                <Layers size={18} /> Microlearning Modules
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {data.modules.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔁 Reusable Card
function Card({
  label,
  value,
  icon,
  color = 'text-white',
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="bg-[#1C1B29] p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-sm text-gray-400 flex items-center gap-2 mb-1">
        {icon} {label}
      </div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
