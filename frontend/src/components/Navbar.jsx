import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, User, Info, Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass sticky top-4 mx-4 md:mx-8 mt-4 z-40 px-6 py-4 flex justify-between items-center border-white/5">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
          <Shield className="text-white" size={24} />
        </div>
        <span className="font-black text-xl tracking-tighter uppercase hidden md:block">
          CrisisSync<span className="text-indigo-400">AI</span>
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <NavLink 
          to="/" 
          className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive ? 'bg-indigo-500/10 text-indigo-400' : 'text-muted hover:text-white'}`}
        >
          <User size={18} />
          <span className="text-sm font-bold hidden sm:block">Guest</span>
        </NavLink>
        <NavLink 
          to="/dashboard" 
          className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive ? 'bg-indigo-500/10 text-indigo-400' : 'text-muted hover:text-white'}`}
        >
          <LayoutDashboard size={18} />
          <span className="text-sm font-bold hidden sm:block">Dashboard</span>
        </NavLink>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-success uppercase">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          System Secure
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
