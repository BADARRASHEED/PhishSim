'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select, { MultiValue, ActionMeta } from 'react-select';
import Sidebar from '@/app/components/admin/Sidebar';

const roleOptions = ['User', 'Manager', 'Admin'];

const templatesByRole: Record<string, string[]> = {
    User: ['Email Awareness', 'Basic Link Safety'],
    Manager: ['Email Awareness', 'Manager Risk Scenarios'],
    Admin: ['System Access Alerts', 'Advanced Phishing'],
};

const modulesByRole: Record<string, string[]> = {
    User: ['safe-email', 'url-check'],
    Manager: ['phishing-examples', 'reporting-emails'],
    Admin: ['incident-response', 'multi-factor-authentication'],
};

type SelectOption = { value: string; label: string };

export default function CreateCampaignPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        role: 'User',
        templates: [] as string[],
        difficulty: 'Easy',
        microModules: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'role') {
            setFormData(prev => ({
                ...prev,
                role: value,
                templates: [],
                microModules: [],
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleMultiSelect = (
        selected: MultiValue<SelectOption>,
        actionMeta: ActionMeta<SelectOption>
    ) => {
        const values = selected.map((item) => item.value);

        if (values.length > 5) return;

        const key = actionMeta.name as 'templates' | 'microModules';
        setFormData(prev => ({ ...prev, [key]: values }));
    };


    const handleSubmit = () => {
        if (!formData.name || formData.templates.length === 0 || formData.microModules.length === 0) {
            return alert('All fields are required.');
        }

        console.log('✅ Campaign Created:', formData);
        router.push('/campaigns');
    };

    const filteredTemplates = templatesByRole[formData.role] || [];
    const filteredModules = modulesByRole[formData.role] || [];

    const toSelectOptions = (arr: string[]): SelectOption[] =>
        arr.map(item => ({ value: item, label: item }));

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-[#0F0C29] text-white p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6 text-pink-400">Create New Campaign</h1>

                <div className="space-y-4 max-w-4xl w-full mx-auto">
                    <input
                        name="name"
                        placeholder="Campaign Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded bg-[#1C1B29] text-white"
                    />

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-sm text-gray-300 mb-1 block">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full bg-[#1C1B29] p-2 rounded text-white"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm text-gray-300 mb-1 block">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full bg-[#1C1B29] p-2 rounded text-white"
                            />
                        </div>
                    </div>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded bg-[#1C1B29] text-white"
                    >
                        {roleOptions.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>

                    {/* Templates Select */}
                    <div>
                        <label className="text-sm text-gray-300 block mb-1">Templates</label>
                        <Select
                            name="templates"
                            isMulti
                            value={formData.templates.map(t => ({ value: t, label: t }))}
                            onChange={handleMultiSelect}
                            options={toSelectOptions(filteredTemplates)}
                            className="text-black"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: '#1C1B29',
                                    borderColor: '#333',
                                    color: 'white',
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: '#FF2E63',
                                    color: 'white',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: '#1C1B29',
                                    color: 'white',
                                }),
                                option: (base, { isFocused }) => ({
                                    ...base,
                                    backgroundColor: isFocused ? '#FF2E63' : '#1C1B29',
                                    color: 'white',
                                }),
                            }}
                        />
                    </div>

                    {/* Modules Select */}
                    <div>
                        <label className="text-sm text-gray-300 block mb-1">Microlearning Modules</label>
                        <Select
                            name="microModules"
                            isMulti
                            value={formData.microModules.map(m => ({ value: m, label: m }))}
                            onChange={handleMultiSelect}
                            options={toSelectOptions(filteredModules)}
                            className="text-black"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: '#1C1B29',
                                    borderColor: '#333',
                                    color: 'white',
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: '#FF2E63',
                                    color: 'white',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: '#1C1B29',
                                    color: 'white',
                                }),
                                option: (base, { isFocused }) => ({
                                    ...base,
                                    backgroundColor: isFocused ? '#FF2E63' : '#1C1B29',
                                    color: 'white',
                                }),
                            }}
                        />
                    </div>

                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded bg-[#1C1B29] text-white"
                    >
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Hard">Hard</option>
                    </select>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            onClick={() => router.push('/campaigns')}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-[#FF2E63] hover:bg-[#e82b58] text-white rounded"
                        >
                            Create Campaign
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
