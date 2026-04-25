import React from 'react';
import { Bell, User, Clock, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ role, setRole }) => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-20 glass sticky top-0 z-40 px-8 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-brand-success uppercase tracking-[0.2em] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></span>
              Live Node: Central-01
            </span>
          </div>
          <div className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
            <Clock size={12} />
            {time.toLocaleTimeString([], { hour12: false })} &bull; {time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Role Selector */}
        <div className="flex items-center bg-brand-dark/50 p-1.5 rounded-2xl border border-white/10 group relative">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-lg bg-brand-info/20 flex items-center justify-center text-brand-info">
              <User size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-500 uppercase leading-none mb-1">Access Level</span>
              <span className="text-sm font-bold text-white uppercase">{role}</span>
            </div>
            <ChevronDown size={16} className="text-gray-500 ml-2" />
          </div>

          <div className="absolute top-full left-0 w-full mt-2 bg-brand-surface border border-white/10 rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl">
            {['Guest', 'Staff', 'Manager'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r.toLowerCase())}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${role === r.toLowerCase() ? 'bg-brand-info/10 text-brand-info' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 relative hover:bg-white/10 transition-all">
          <Bell size={20} className="text-gray-400" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-brand-accent rounded-full border-2 border-[#111827]"></span>
        </button>

        <div className="h-10 w-[1px] bg-white/5"></div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-black text-white shadow-xl">
            {role.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
