'use client';
import { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import Sidebar from '../components/admin/Sidebar';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
);

export default function ReportsPage() {
    const [filter, setFilter] = useState({ role: '', campaign: '', result: '' });

    const summaryData = {
        totalCampaigns: 5,
        completed: 4,
        ongoing: 1,
        successRate: '68%'
    };

    const userStats = {
        totalUsers: 50,
        passed: 34,
        failed: 16,
        ctr: '38%',
        falseReports: 7
    };

    const campaignStats = [
        { name: 'Campaign A', date: '2025-07-20', targeted: 20, passed: 15, failed: 5, ctr: 35, avgTime: '2m 15s' },
        { name: 'Campaign B', date: '2025-07-25', targeted: 15, passed: 10, failed: 5, ctr: 40, avgTime: '1m 50s' },
        { name: 'Campaign C', date: '2025-07-30', targeted: 15, passed: 9, failed: 6, ctr: 45, avgTime: '3m 10s' }
    ];

    const roleRisk = [
        { role: 'Admin', users: 5, failed: 3, risk: 'High' },
        { role: 'HR', users: 10, failed: 3, risk: 'Medium' },
        { role: 'Finance', users: 8, failed: 5, risk: 'High' },
        { role: 'IT', users: 12, failed: 2, risk: 'Low' }
    ];

    const pieData = {
        labels: ['Passed', 'Failed'],
        datasets: [
            {
                data: [userStats.passed, userStats.failed],
                backgroundColor: ['#4CAF50', '#F44336'],
            },
        ],
    };

    const barData = {
        labels: campaignStats.map(c => c.name),
        datasets: [
            {
                label: 'CTR (%)',
                data: campaignStats.map(c => c.ctr),
                backgroundColor: '#2196F3',
            },
        ],
    };

    return (
        <div className="flex min-h-screen bg-[#0F0C29] text-white">
            {/* Sidebar */}
            <div className="w-64 flex-none">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10 overflow-auto">
                <h1 className="text-3xl font-bold mb-6 text-pink-400">Reports Overview</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                    {Object.entries(summaryData).map(([key, value], idx) => (
                        <div key={idx} className="bg-[#1C1B29] p-4 rounded shadow">
                            <p className="text-sm uppercase text-gray-400">{key.replace(/([A-Z])/g, ' $1')}</p>
                            <p className="text-xl font-bold text-pink-400">{value}</p>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-[#1C1B29] p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">User Pass vs Fail</h2>
                        <Pie data={pieData} />
                    </div>
                    <div className="bg-[#1C1B29] p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">CTR by Campaign</h2>
                        <Bar data={barData} />
                    </div>
                </div>

                {/* Role-Based Risk Table */}
                <div className="bg-[#1C1B29] p-6 rounded shadow mb-10">
                    <h2 className="text-xl font-bold mb-4">Role-Based Risk Insights</h2>
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr>
                                {['Role', 'Users', 'Failed (%)', 'Risk'].map((h, i) => (
                                    <th key={i} className="text-left py-2 px-4 border-b border-gray-600">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {roleRisk.map((role, i) => (
                                <tr key={i}>
                                    <td className="py-2 px-4 border-b border-gray-700">{role.role}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{role.users}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{Math.round((role.failed / role.users) * 100)}%</td>
                                    <td className="py-2 px-4 border-b border-gray-700 text-pink-400">{role.risk}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Campaign-wise Drilldown */}
                <div className="bg-[#1C1B29] p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">Campaign-Wise Details</h2>
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr>
                                {['Name', 'Date', 'Targeted', 'Passed', 'Failed', 'CTR (%)', 'Avg Time'].map((h, i) => (
                                    <th key={i} className="text-left py-2 px-4 border-b border-gray-600">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {campaignStats.map((c, i) => (
                                <tr key={i}>
                                    <td className="py-2 px-4 border-b border-gray-700">{c.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{c.date}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{c.targeted}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{c.passed}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{c.failed}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{c.ctr}%</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{c.avgTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={() => alert('Exporting report...')}
                        className="mt-4 bg-pink-600 hover:bg-pink-500 text-white py-2 px-4 rounded"
                    >
                        Export as PDF/CSV
                    </button>
                </div>
            </div>
        </div>
    );
}
