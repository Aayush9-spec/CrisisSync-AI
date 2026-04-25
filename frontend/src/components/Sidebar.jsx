import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Shield, 
  Activity,
  History
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: AlertTriangle, label: 'Live Incidents', path: '/incidents' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: History, label: 'History', path: '/history' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-72 bg-[#0b1220] border-r border-white/5 flex flex-col h-screen sticky top-0">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-brand-accent p-2 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)]">
          <Shield className="text-white" size={28} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tighter text-white">CrisisSync <span className="text-brand-accent">AI</span></span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest -mt-1">Command Ops</span>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300
              ${isActive 
                ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
            {item.label === 'Live Incidents' && (
              <span className="ml-auto w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-success/10 flex items-center justify-center">
              <Activity className="text-brand-success" size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-500 uppercase">System Status</div>
              <div className="text-sm font-bold text-white">All Units Active</div>
            </div>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              className="h-full bg-brand-success"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
