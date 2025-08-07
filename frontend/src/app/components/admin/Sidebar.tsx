'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [campaignOpen, setCampaignOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // You can also clear cookies/localStorage here
    setShowLogoutModal(false);
    router.push('/');
  };

  const isTemplateActive =
    pathname === '/templates' || pathname === '/templates/create';

  const isCampaignActive =
    pathname === '/campaigns' || pathname === '/campaigns/create';

  const isUserManagementActive =
    pathname === '/users' || pathname === '/users/create';

  return (
    <>
      <aside
        className={`transition-all duration-300 bg-[#1C1B29] h-screen sticky top-0 flex flex-col justify-between ${collapsed ? 'w-20' : 'w-64'
          } p-4`}
      >
        {/* Top Section */}
        <div>
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
            <SidebarButton
              collapsed={collapsed}
              active={pathname === '/admin-dashboard'}
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              onClick={() => router.push('/admin-dashboard')}
            />

            {/* Campaigns */}
            <div>
              <SidebarDropdownToggle
                label="Campaigns"
                collapsed={collapsed}
                open={campaignOpen}
                setOpen={setCampaignOpen}
                icon={<Layers size={20} />}
                active={isCampaignActive}
              />
              {!collapsed && campaignOpen && (
                <SidebarDropdownItems
                  pathname={pathname}
                  items={[
                    {
                      label: 'View Campaigns',
                      icon: <Layers size={16} />,
                      path: '/campaigns',
                    },
                    {
                      label: 'Create Campaign',
                      icon: <PlusCircle size={16} />,
                      path: '/campaigns/create',
                    },
                  ]}
                  router={router}
                />
              )}
            </div>


            {/* Templates */}
            <div>
              <SidebarDropdownToggle
                label="Templates"
                collapsed={collapsed}
                open={templateOpen}
                setOpen={setTemplateOpen}
                icon={<FileText size={20} />}
                active={isTemplateActive}
              />
              {!collapsed && templateOpen && (
                <SidebarDropdownItems
                  pathname={pathname}
                  items={[
                    {
                      label: 'View Templates',
                      icon: <FileText size={16} />,
                      path: '/templates',
                    },
                    {
                      label: 'Create New',
                      icon: <PlusCircle size={16} />,
                      path: '/templates/create',
                    },
                  ]}
                  router={router}
                />
              )}
            </div>

            {/* User Management */}
            <div>
              <SidebarDropdownToggle
                label="User Management"
                collapsed={collapsed}
                open={userOpen}
                setOpen={setUserOpen}
                icon={<Users size={20} />}
                active={pathname.startsWith('/users')}
              />
              {!collapsed && userOpen && (
                <SidebarDropdownItems
                  pathname={pathname}
                  items={[
                    {
                      label: 'Roles',
                      icon: <Users size={16} />,
                      path: '/users',
                    },
                    {
                      label: 'Invite User',
                      icon: <PlusCircle size={16} />,
                      path: '/users/invite',
                    },
                  ]}
                  router={router}
                />
              )}
            </div>

            <SidebarButton
              collapsed={collapsed}
              active={pathname === '/reports'}
              icon={<Flag size={20} />}
              label="Reports"
              onClick={() => router.push('/reports')}
            />

            <SidebarButton
              collapsed={collapsed}
              active={pathname === '/settings'}
              icon={<Settings size={20} />}
              label="Settings"
              onClick={() => router.push('/settings')}
            />
          </nav>
        </div>

        {/* Logout Button */}
        <div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md transition text-gray-300 hover:text-white hover:bg-[#2a293f]"
          >
            <LogOut size={20} />
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1C1B29] p-6 rounded-lg shadow-lg text-white w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm rounded bg-gray-600 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded bg-[#FF2E63] hover:bg-[#e82b58]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Reusable Button
function SidebarButton({
  collapsed,
  active,
  icon,
  label,
  onClick,
}: {
  collapsed: boolean;
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-left transition-all ${active ? 'bg-[#2a293f] text-[#FF2E63]' : 'text-gray-300 hover:text-white'
        }`}
    >
      {icon}
      {!collapsed && <span className="text-sm">{label}</span>}
    </button>
  );
}

// Reusable Dropdown Toggle
function SidebarDropdownToggle({
  label,
  collapsed,
  open,
  setOpen,
  icon,
  active,
}: {
  label: string;
  collapsed: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={`flex w-full items-center justify-between px-3 py-2 rounded-md text-left transition-all ${active ? 'bg-[#2a293f] text-[#FF2E63]' : 'text-gray-300 hover:text-white'
        }`}
    >
      <span className="flex items-center gap-3">
        {icon}
        {!collapsed && <span className="text-sm">{label}</span>}
      </span>
      {!collapsed &&
        (open ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
    </button>
  );
}

// Reusable Dropdown Items
function SidebarDropdownItems({
  pathname,
  items,
  router,
}: {
  pathname: string;
  items: { label: string; icon: React.ReactNode; path: string }[];
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <div className="ml-7 mt-1 space-y-1">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => router.push(item.path)}
          className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm w-full text-left transition ${pathname === item.path
            ? 'bg-[#2a293f] text-[#FF2E63]'
            : 'text-gray-300 hover:text-white'
            }`}
        >
          {item.icon} {item.label}
        </button>
      ))}
    </div>
  );
}
