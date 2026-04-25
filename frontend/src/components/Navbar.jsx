import React from 'react';
import { Bell, User, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import SystemClock from './SystemClock';

const Navbar = ({ role, setRole }) => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-24 sticky top-0 z-40 px-10 flex items-center justify-between pointer-events-none"
    >
      <div className="w-full h-16 futuristic-panel pointer-events-auto px-8 flex items-center justify-between bg-grid">
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse shadow-[0_0_10px_#39ff14]"></div>
              <span className="cyber-text text-brand-success">System Nominal</span>
           </div>
           <div className="hidden lg:flex items-center gap-6 border-l border-white/5 pl-10">
              <div className="flex items-center gap-2">
                 <Cpu size={14} className="text-brand-info" />
                 <span className="cyber-text text-gray-400">Node: us-cent-01</span>
              </div>
              <div className="flex items-center gap-2">
                 <ShieldCheck size={14} className="text-brand-purple" />
                 <span className="cyber-text text-gray-400">Layer: AES-512</span>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-8">
           <SystemClock />

           <div className="h-8 w-[1px] bg-white/5 mx-2"></div>

           <div className="flex items-center gap-4">
              {/* Role Matrix */}
              <div className="relative group">
                 <button className="flex items-center gap-3 px-5 py-2 bg-white/5 rounded-xl border border-white/10 hover:border-brand-info/50 transition-all group">
                    <div className="w-6 h-6 rounded-lg bg-brand-info/20 flex items-center justify-center text-brand-info">
                       <User size={14} />
                    </div>
                    <span className="cyber-text text-white">{role}</span>
                 </button>

                 <div className="absolute top-full right-0 mt-3 w-48 futuristic-panel p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {['Guest', 'Staff', 'Manager'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRole(r.toLowerCase())}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === r.toLowerCase() ? 'bg-brand-info/10 text-brand-info shadow-[0_0_15px_#00d2ff1a]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                      >
                        {r} Access
                      </button>
                    ))}
                 </div>
              </div>

              <button className="relative w-10 h-10 rounded-xl glass-card flex-center border-white/10 hover:border-brand-accent/50 group">
                 <Bell size={18} className="text-gray-400 group-hover:text-white" />
                 <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-accent rounded-full border border-bg-deep shadow-[0_0_10px_#ff3131]"></span>
              </button>
           </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
