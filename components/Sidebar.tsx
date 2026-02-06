
import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  Layers,
  Rocket,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Database,
  Users,
  BookOpen,
  Smartphone,
  ShoppingBag,
  Terminal as ConsoleIcon
} from 'lucide-react';
import { COLORS } from '../constants';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activeTab: string;
  setActiveTab: (v: string) => void;
}

const navItems = [
  { id: 'analytics', label: 'Neural Analytics', icon: BarChart3, color: COLORS.cyan },
  { id: 'builder', label: 'App Architect', icon: Layers, color: COLORS.green },
  { id: 'ai', label: 'GenAI Engine', icon: Cpu, color: COLORS.blue },
  { id: 'deploy', label: 'CI/CD Pipeline', icon: Rocket, color: COLORS.cyan },
  { id: 'perf', label: 'Engine Health', icon: Zap, color: COLORS.green },
  { id: 'storage', label: 'Asset Vault', icon: Database, color: COLORS.blue },
  { id: 'users', label: 'User Hub', icon: Users, color: COLORS.cyan },
  { id: 'testing', label: 'Device Lab', icon: Smartphone, color: COLORS.green },
  { id: 'api', label: 'API Terminal', icon: ConsoleIcon, color: COLORS.blue },
  { id: 'marketplace', label: 'Plugin Market', icon: ShoppingBag, color: COLORS.cyan },
  { id: 'docs', label: 'Protocol Docs', icon: BookOpen, color: COLORS.green },
  { id: 'alerts', label: 'System Alerts', icon: Bell, color: COLORS.blue },
  { id: 'settings', label: 'Kernel Config', icon: Settings, color: COLORS.gray },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, activeTab, setActiveTab }) => {
  return (
    <div className="h-full w-full bg-black flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/5 h-16 shrink-0">
        {!collapsed && (
          <div className="w-40 h-16 overflow-hidden flex items-center justify-center">
            <img src="/Logo.svg" alt="Logo" className="w-full h-full object-contain" />
          </div>
        )}
        {collapsed && (
          <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
            <img src="/Logo.svg" alt="Logo" className="w-full h-full object-contain" />
          </div>
        )}
      </div>

      {/* Navigation List - SCROLLABLE SECTION */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 sm:py-4 px-1.5 sm:px-2 custom-sidebar-scroll space-y-0.5 sm:space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full group relative flex items-center gap-2.5 sm:gap-4 p-2 sm:p-2.5 rounded-sm transition-all duration-400 ${activeTab === item.id ? 'bg-white/5 text-white' : 'text-white/30 hover:text-white hover:bg-white/5'
              }`}
          >
            {activeTab === item.id && (
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3/5 rounded-r"
                style={{ backgroundColor: item.color }}
              />
            )}

            <div className="relative shrink-0 flex items-center justify-center w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]">
              <item.icon
                size={16}
                className={`transition-all duration-400 ${activeTab === item.id ? '' : 'grayscale'}`}
                style={{ color: activeTab === item.id ? item.color : undefined }}
              />
              {/* Scanline hover effect on icon */}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:animate-[scanline_2s_linear_infinite] opacity-0 group-hover:opacity-100 pointer-events-none" />
            </div>

            {!collapsed && (
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] transition-opacity duration-300 whitespace-nowrap overflow-hidden text-ellipsis flex-1 text-left leading-tight">
                {item.label}
              </span>
            )}

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none rounded-sm"
              style={{ backgroundColor: item.color }}
            />
          </button>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5 shrink-0 hidden md:block">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 text-white/20 hover:text-white transition-all border border-transparent hover:border-white/5 rounded-sm"
        >
          {collapsed ? <ChevronRight size={14} /> : <div className="flex items-center gap-2"><ChevronLeft size={14} /><span className="text-[9px] uppercase font-bold tracking-[0.2em]">Link_Collapse</span></div>}
        </button>
      </div>

      <style>{`
        .custom-sidebar-scroll::-webkit-scrollbar {
          width: 2px;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-sidebar-scroll:hover::-webkit-scrollbar-thumb {
          background: rgba(0, 246, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
