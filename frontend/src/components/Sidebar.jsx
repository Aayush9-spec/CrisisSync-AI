import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Shield, 
  Activity,
  History,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Tactical Hub', path: '/dashboard' },
    { icon: AlertTriangle, label: 'Live Intel', path: '/incidents' },
    { icon: Cpu, label: 'AI Analytics', path: '/analytics' },
    { icon: History, label: 'Event Logs', path: '/history' },
    { icon: Settings, label: 'Neural Config', path: '/settings' },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-24 lg:w-72 fixed left-0 top-0 h-screen z-50 p-6 pointer-events-none"
    >
      <div className="h-full futuristic-panel pointer-events-auto flex flex-col items-center lg:items-stretch relative bg-grid">
        <div className="scanline"></div>
        
        <div className="p-8 flex items-center gap-4 border-b border-white/5">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            <Shield className="text-white" size={28} />
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="font-black text-2xl tracking-tighter text-white uppercase italic">CrisisSync</span>
            <span className="cyber-text text-brand-info">Protocol 4.0</span>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-500 group relative
                ${isActive 
                  ? 'bg-brand-info/10 text-brand-info border border-brand-info/20 shadow-[0_0_20px_rgba(0,210,255,0.1)]' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <item.icon size={22} className={`${isActive ? 'text-glow-blue' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="hidden lg:block text-sm uppercase tracking-widest">{item.label}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-8 bg-brand-info rounded-full shadow-[0_0_15px_#00d2ff]"
                />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="hidden lg:block bg-brand-dark/50 rounded-2xl p-6 border border-white/5 relative group overflow-hidden">
             <div className="absolute inset-0 bg-brand-info/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="flex items-center justify-between mb-4">
                <span className="cyber-text text-gray-500">Neural Link</span>
                <Activity size={14} className="text-brand-success animate-pulse" />
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                   <span className="text-gray-400">Sync Rate</span>
                   <span className="text-brand-success">98.2%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '98.2%' }}
                    className="h-full bg-brand-success shadow-[0_0_10px_#39ff14]"
                  />
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
