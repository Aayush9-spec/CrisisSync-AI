import React, { useState } from 'react';
import SOSButton from '../components/SOSButton';
import ChatBot from '../components/ChatBot';
import { Shield, Map, PhoneCall, Info, AlertTriangle, ChevronRight, Zap, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GuestPortal = () => {
  const [activeSOS, setActiveSOS] = useState(null);

  const handleSOSTriggered = (incident) => {
    setActiveSOS(incident);
  };

  const ActionCard = ({ icon: Icon, label, sublabel }) => (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass-card p-6 flex items-center gap-5 cursor-pointer hover:bg-white/5 transition-all group"
    >
      <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-black text-white uppercase tracking-tight">{label}</div>
        <div className="text-[10px] font-bold text-muted uppercase tracking-wider mt-0.5">{sublabel}</div>
      </div>
      <ChevronRight size={18} className="text-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 pb-32">
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-black text-accent uppercase tracking-widest mb-2">
          <Radio size={12} className="animate-pulse" />
          24/7 Rapid Response Enabled
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter text-white uppercase">
          STAY <span className="text-gradient-primary">SECURE</span>
        </h1>
        <p className="text-muted font-medium max-w-md mx-auto leading-relaxed">
          Your safety is our absolute priority. Use the emergency controls below for immediate tactical assistance.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeSOS ? (
          <motion.div 
            key="active"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="glass-card p-10 border-l-[8px] border-accent space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <AlertTriangle size={120} className="text-accent" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex-center text-accent animate-pulse">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">SOS Active</h2>
                <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                  Command Units Dispatched
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4 leading-relaxed">
              <p className="text-gray-200 font-medium italic">
                "Our rapid response team is en route to your current signature. Please remain in a safe, visible location and keep this portal open for AI guidance."
              </p>
              <div className="flex items-center gap-4 text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                <span>Log ID: {activeSOS.id}</span>
                <span>&bull;</span>
                <span>Response Status: {activeSOS.status}</span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-premium w-full bg-white/5 hover:bg-white/10 text-white font-black"
              onClick={() => setActiveSOS(null)}
            >
              Cancel Alert
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SOSButton onTriggered={handleSOSTriggered} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActionCard icon={Map} label="Tactical Map" sublabel="Live Safe-Zone Navigation" />
        <ActionCard icon={PhoneCall} label="Direct Comms" sublabel="Priority Line to Command" />
      </div>

      {/* Emergency Intelligence Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-10 space-y-8"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold flex items-center gap-3">
            <Zap size={20} className="text-indigo-400" />
            AI Safety Guidance
          </h3>
          <span className="text-[10px] font-black text-muted uppercase tracking-widest">Protocol v4.2</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Stay Calm', desc: 'Identify your nearest exit signature and move toward it calmly.' },
            { step: '02', title: 'Open Port', desc: 'Keep your mobile data active for real-time AI coordinate tracking.' },
            { step: '03', title: 'Follow AI', desc: 'Execute tactical instructions provided by the CrisisSync AI bot.' }
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              <div className="text-3xl font-black text-white/10">{item.step}</div>
              <div className="text-sm font-black text-white uppercase tracking-tight">{item.title}</div>
              <p className="text-xs font-medium text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <ChatBot role="guest" context="Guest SOS Tactical Portal" />
    </div>
  );
};

export default GuestPortal;
