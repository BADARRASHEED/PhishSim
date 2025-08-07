'use client';

import { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';

export default function SettingsPage() {
  type Settings = {
    allowRegistration: boolean;
    defaultRole: string;
    enableGamification: boolean;
    feedbackStyle: string;
    reportFormat: string;
    sessionTimeout: number;
    enable2FA: boolean;
    lockAfterFailedAttempts: number;
    enableRealtimeFeedback: boolean;
    feedbackMessage: string;
    pointsPerSafeAction: number;
    badgeThreshold: number;
  };

  const defaultSettings: Settings = {
    allowRegistration: true,
    defaultRole: 'User',
    enableGamification: false,
    feedbackStyle: 'toast',
    reportFormat: 'PDF',
    sessionTimeout: 30,
    enable2FA: false,
    lockAfterFailedAttempts: 5,
    enableRealtimeFeedback: true,
    feedbackMessage: 'This action was unsafe. Please be cautious next time.',
    pointsPerSafeAction: 10,
    badgeThreshold: 100,
  };

  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (key: keyof Settings, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-screen bg-[#0F0C29] text-white">
      {/* Sidebar */}
      <div className="flex-none">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-6 md:ml-8 p-10 overflow-auto relative">
        {/* Toast Popup */}
        {showPopup && (
          <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 transition-opacity duration-300">
            Settings have been saved successfully.
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-pink-400">System Settings</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Access */}
            <div className="bg-[#1C1B29] p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">User Access</h2>
              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={settings.allowRegistration}
                  onChange={e => handleChange('allowRegistration', e.target.checked)}
                  className="mr-2"
                />
                Allow User Registration
              </label>
              <label className="block mb-3">
                Default Role:
                <select
                  value={settings.defaultRole}
                  onChange={e => handleChange('defaultRole', e.target.value)}
                  className="block mt-1 w-full bg-[#2A2A40] border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option>User</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </label>
            </div>

            {/* Gamification & Feedback */}
            <div className="bg-[#1C1B29] p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Gamification & Feedback</h2>

              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={settings.enableGamification}
                  onChange={e => handleChange('enableGamification', e.target.checked)}
                  className="mr-2"
                />
                Enable Gamification
              </label>

              {settings.enableGamification && (
                <>
                  <label className="block mb-3">
                    Points Per Safe Action:
                    <input
                      type="number"
                      value={settings.pointsPerSafeAction}
                      onChange={e => handleChange('pointsPerSafeAction', parseInt(e.target.value))}
                      className="block mt-1 w-full bg-[#2A2A40] border border-gray-600 rounded px-3 py-2 text-white"
                      min={1}
                    />
                  </label>
                  <label className="block mb-3">
                    Badge Threshold (Points):
                    <input
                      type="number"
                      value={settings.badgeThreshold}
                      onChange={e => handleChange('badgeThreshold', parseInt(e.target.value))}
                      className="block mt-1 w-full bg-[#2A2A40] border border-gray-600 rounded px-3 py-2 text-white"
                      min={1}
                    />
                  </label>
                </>
              )}

              <label className="flex items-center mb-3 mt-2">
                <input
                  type="checkbox"
                  checked={settings.enableRealtimeFeedback}
                  onChange={e => handleChange('enableRealtimeFeedback', e.target.checked)}
                  className="mr-2"
                />
                Enable Real-Time Feedback
              </label>

              {settings.enableRealtimeFeedback && (
                <label className="block mb-3">
                  Custom Feedback Message:
                  <textarea
                    value={settings.feedbackMessage}
                    onChange={e => handleChange('feedbackMessage', e.target.value)}
                    className="block mt-1 w-full bg-[#2A2A40] border border-gray-600 rounded px-3 py-2 text-white"
                    rows={3}
                  />
                </label>
              )}

              <label className="block mb-3">
                Feedback Style:
                <select
                  value={settings.feedbackStyle}
                  onChange={e => handleChange('feedbackStyle', e.target.value)}
                  className="block mt-1 w-full bg-[#2A2A40] border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="toast">Toast</option>
                  <option value="modal">Modal</option>
                  <option value="page">Page Alert</option>
                </select>
              </label>
            </div>

            {/* Reports */}
            <div className="bg-[#1C1B29] p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Reports</h2>
              <label className="block mb-3">
                Default Export Format:
                <select
                  value={settings.reportFormat}
                  onChange={e => handleChange('reportFormat', e.target.value)}
                  className="block mt-1 w-full bg-[#2A2A40] border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option>PDF</option>
                  <option>CSV</option>
                  <option>JSON</option>
                </select>
              </label>
            </div>

            {/* Security */}
            <div className="bg-[#1C1B29] p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Security</h2>
              <label className="block mb-3">
                Session Timeout (minutes):
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={e => handleChange('sessionTimeout', parseInt(e.target.value))}
                  className="block mt-1 w-full bg-[#2A2A40] border border-gray-600 rounded px-3 py-2 text-white"
                  min={1}
                />
              </label>
              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={settings.enable2FA}
                  onChange={e => handleChange('enable2FA', e.target.checked)}
                  className="mr-2"
                />
                Enable Two-Factor Authentication (2FA)
              </label>
              <label className="block mb-3">
                Lock account after failed attempts:
                <input
                  type="number"
                  value={settings.lockAfterFailedAttempts}
                  onChange={e => handleChange('lockAfterFailedAttempts', parseInt(e.target.value))}
                  className="block mt-1 w-full bg-[#2A2A40] border border-gray-600 rounded px-3 py-2 text-white"
                  min={1}
                />
              </label>
            </div>
          </div>

          {/* Save / Cancel Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => {
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);
              }}
              className="bg-pink-500 px-6 py-2 rounded text-white font-medium transition"
            >
              Save Settings
            </button>

            <button
              onClick={() => setSettings(defaultSettings)}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded text-white font-medium transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
