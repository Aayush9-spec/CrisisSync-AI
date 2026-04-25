import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, User, Activity, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-card sticky top-6 mx-6 md:mx-12 mt-6 z-50 px-8 py-4 flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl shadow-xl">
          <Shield className="text-white" size={26} />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-2xl tracking-tighter uppercase leading-none">
            CrisisSync<span className="text-indigo-400">AI</span>
          </span>
          <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mt-0.5">Hospitality Command</span>
        </div>
      </div>

      <div className="hidden md:flex items-center bg-white/5 p-1.5 rounded-2xl border border-white/5">
        <NavLink 
          to="/" 
          className={({isActive}) => `flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm ${isActive ? 'bg-white/10 text-white shadow-lg' : 'text-muted hover:text-white hover:bg-white/5'}`}
        >
          <User size={18} />
          <span>Guest Portal</span>
        </NavLink>
        <NavLink 
          to="/dashboard" 
          className={({isActive}) => `flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm ${isActive ? 'bg-white/10 text-white shadow-lg' : 'text-muted hover:text-white hover:bg-white/5'}`}
        >
          <LayoutDashboard size={18} />
          <span>Command Center</span>
        </NavLink>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden lg:flex flex-col items-end">
          <div className="flex items-center gap-2 text-[10px] font-black text-success uppercase tracking-widest">
            <motion.div 
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 rounded-full bg-success"
            ></motion.div>
            Network Stable
          </div>
          <span className="text-[9px] text-muted font-bold mt-1 uppercase">us-central1 &bull; live</span>
        </div>
        
        <button className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
          <Bell size={20} className="text-muted hover:text-white" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-bg-black"></span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
