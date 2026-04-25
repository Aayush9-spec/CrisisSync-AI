import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Bell, Shield, CheckCircle } from 'lucide-react';

const ActivityFeed = ({ events }) => {
  return (
    <div className="glass h-full flex flex-col rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
        <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2 text-white">
          <Activity size={16} className="text-brand-info" />
          Live Activity
        </h3>
        <span className="text-[10px] font-bold text-brand-info animate-pulse uppercase">Syncing...</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {events.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
              <Shield size={48} />
              <p className="text-xs font-bold uppercase tracking-widest">Awaiting Events</p>
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 relative"
              >
                {index !== events.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-white/5"></div>
                )}
                
                <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                  event.type === 'NEW_EVENT' ? 'bg-brand-accent/20 text-brand-accent' :
                  event.type === 'STATUS_UPDATE' ? 'bg-brand-info/20 text-brand-info' :
                  'bg-brand-success/20 text-brand-success'
                }`}>
                  {event.type === 'NEW_EVENT' ? <Bell size={12} /> : 
                   event.type === 'STATUS_UPDATE' ? <Activity size={12} /> : 
                   <CheckCircle size={12} />}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-200 leading-tight">
                    {event.message}
                  </p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour12: false })}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityFeed;
