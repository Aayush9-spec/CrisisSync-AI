import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Bell, Shield, CheckCircle, Terminal } from 'lucide-react';

const TypewriterText = ({ text }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.span>
  );
};

const ActivityFeed = ({ events }) => {
  return (
    <div className="futuristic-panel h-full flex flex-col bg-grid relative">
      <div className="scanline"></div>
      
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5 relative z-10">
        <h3 className="cyber-text text-brand-info flex items-center gap-3">
          <Terminal size={18} className="text-glow-blue" />
          Neural Link Logs
        </h3>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-brand-info animate-ping"></div>
           <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Live Link</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {events.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-20">
              <Activity size={48} className="text-brand-info animate-pulse" />
              <p className="cyber-text">Awaiting Telemetry</p>
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                className="group relative"
              >
                <div className="flex gap-5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 z-10 relative overflow-hidden ${
                    event.type === 'NEW_EVENT' ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' :
                    event.type === 'STATUS_UPDATE' ? 'bg-brand-info/20 text-brand-info border border-brand-info/30' :
                    'bg-brand-success/20 text-brand-success border border-brand-success/30'
                  }`}>
                    <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                    {event.type === 'NEW_EVENT' ? <Bell size={14} /> : 
                     event.type === 'STATUS_UPDATE' ? <Activity size={14} /> : 
                     <CheckCircle size={14} />}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                       <span className={`cyber-text text-[9px] ${
                         event.type === 'NEW_EVENT' ? 'text-brand-accent' :
                         event.type === 'STATUS_UPDATE' ? 'text-brand-info' :
                         'text-brand-success'
                       }`}>
                         {event.type.replace('_', ' ')}
                       </span>
                       <span className="cyber-text text-[8px] text-gray-600 font-bold">
                         {new Date(event.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                       </span>
                    </div>
                    <p className="text-xs font-bold text-gray-300 leading-snug group-hover:text-white transition-colors">
                      <TypewriterText text={event.message} />
                    </p>
                    <div className="flex gap-2">
                       <div className="h-[1px] w-8 bg-brand-info/20"></div>
                       <div className="h-[1px] w-2 bg-brand-info/40"></div>
                    </div>
                  </div>
                </div>
                
                {index !== events.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-[-32px] w-[1px] bg-gradient-to-b from-white/10 to-transparent"></div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-6 bg-brand-dark/40 border-t border-white/5 backdrop-blur-md">
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand-info animate-pulse shadow-[0_0_8px_#00d2ff]"></div>
            <span className="cyber-text text-gray-500 text-[8px]">Protocol v2026.04.25-BETA</span>
         </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
