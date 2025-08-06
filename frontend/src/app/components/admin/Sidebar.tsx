'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Layers,
  Users,
  FileText,
  Flag,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  PlusCircle,
} from 'lucide-react'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [templateOpen, setTemplateOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isTemplateActive =
    pathname === '/templates' || pathname === '/templates/create'

  return (
    <aside
      className={`transition-all duration-300 bg-[#1C1B29] h-screen sticky top-0 ${collapsed ? 'w-20' : 'w-64'
        } p-4`}
    >
      <div className="h-16 flex items-center justify-between mb-8 px-2">
        {!collapsed && (
          <h2 className="text-xl font-bold text-white">PhishSim</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-2 rounded hover:bg-[#2a293f] transition"
        >
          {collapsed ? (
            <Menu size={24} className="text-white" />
          ) : (
            <X size={24} className="text-white" />
          )}
        </button>
      </div>

      <nav className="space-y-2">
        {/* Dashboard */}
        <button
          onClick={() => router.push('/admin-dashboard')}
          className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-left transition-all ${pathname === '/admin-dashboard'
            ? 'bg-[#2a293f] text-[#FF2E63]'
            : 'text-gray-300 hover:text-white'
            }`}
        >
          <LayoutDashboard size={20} />
          {!collapsed && <span className="text-sm">Dashboard</span>}
        </button>

        {/* Campaigns */}
        <button
          onClick={() => router.push('/campaigns')}
          className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-left transition-all ${pathname === '/campaigns'
            ? 'bg-[#2a293f] text-[#FF2E63]'
            : 'text-gray-300 hover:text-white'
            }`}
        >
          <Layers size={20} />
          {!collapsed && <span className="text-sm">Campaigns</span>}
        </button>

        {/* Templates Dropdown - THIRD POSITION */}
        <div>
          <button
            onClick={() => setTemplateOpen(!templateOpen)}
            className={`flex w-full items-center justify-between px-3 py-2 rounded-md text-left transition-all ${isTemplateActive
              ? 'bg-[#2a293f] text-[#FF2E63]'
              : 'text-gray-300 hover:text-white'
              }`}
          >
            <span className="flex items-center gap-3">
              <FileText size={20} />
              {!collapsed && <span className="text-sm">Templates</span>}
            </span>
            {!collapsed &&
              (templateOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              ))}
          </button>

          {!collapsed && templateOpen && (
            <div className="ml-7 mt-1 space-y-1">
              <button
                onClick={() => router.push('/templates')}
                className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm w-full text-left transition ${pathname === '/templates'
                  ? 'bg-[#2a293f] text-[#FF2E63]'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                <FileText size={16} /> View Templates
              </button>
              <button
                onClick={() => router.push('/templates/create')}
                className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm w-full text-left transition ${pathname === '/templates/create'
                  ? 'bg-[#2a293f] text-[#FF2E63]'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                <PlusCircle size={16} /> Create New
              </button>
            </div>
          )}
        </div>

        {/* User Management Dropdown */}
        <div>
          <button
            onClick={() => setUserOpen(prev => !prev)}
            className={`flex w-full items-center justify-between px-3 py-2 rounded-md text-left transition-all ${pathname.startsWith('/users')
                ? 'bg-[#2a293f] text-[#FF2E63]'
                : 'text-gray-300 hover:text-white'
              }`}
          >
            <span className="flex items-center gap-3">
              <Users size={20} />
              {!collapsed && <span className="text-sm">User Management</span>}
            </span>
            {!collapsed &&
              (userOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              ))}
          </button>


          {!collapsed && userOpen && (
            <div className="ml-7 mt-1 space-y-1">
              <button
                onClick={() => router.push('/users')}
                className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm w-full text-left transition ${pathname === '/users'
                  ? 'bg-[#2a293f] text-[#FF2E63]'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                <Users size={16} /> Roles
              </button>
              <button
                onClick={() => router.push('/users/invite')}
                className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm w-full text-left transition ${pathname === '/users/invite'
                  ? 'bg-[#2a293f] text-[#FF2E63]'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                <PlusCircle size={16} /> Invite User
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => router.push('/reports')}
          className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-left transition-all ${pathname === '/reports'
            ? 'bg-[#2a293f] text-[#FF2E63]'
            : 'text-gray-300 hover:text-white'
            }`}
        >
          <Flag size={20} />
          {!collapsed && <span className="text-sm">Reports</span>}
        </button>

        <button
          onClick={() => router.push('/settings')}
          className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-left transition-all ${pathname === '/settings'
            ? 'bg-[#2a293f] text-[#FF2E63]'
            : 'text-gray-300 hover:text-white'
            }`}
        >
          <Settings size={20} />
          {!collapsed && <span className="text-sm">Settings</span>}
        </button>
      </nav>
    </aside>
  )
}
