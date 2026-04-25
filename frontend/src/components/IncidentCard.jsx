import React, { useRef } from 'react';
import { MapPin, Clock, Shield, CheckCircle, Navigation, AlertCircle, Zap } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AIPredictionBadge from './AIPredictionBadge';

const IncidentCard = ({ incident, role, onRespond, onResolve }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getPriorityClasses = (severity) => {
    switch (severity) {
      case 'CRITICAL': return { 
        text: 'text-brand-accent', 
        bg: 'bg-brand-accent/10', 
        border: 'border-brand-accent', 
        borderLight: 'border-brand-accent/20',
        glow: 'neon-glow-red' 
      };
      case 'HIGH': return { 
        text: 'text-brand-warning', 
        bg: 'bg-brand-warning/10', 
        border: 'border-brand-warning', 
        borderLight: 'border-brand-warning/20',
        glow: 'neon-glow-red' 
      };
      case 'MEDIUM': return { 
        text: 'text-brand-info', 
        bg: 'bg-brand-info/10', 
        border: 'border-brand-info', 
        borderLight: 'border-brand-info/20',
        glow: 'neon-glow-blue' 
      };
      default: return { 
        text: 'text-slate-500', 
        bg: 'bg-slate-500/10', 
        border: 'border-slate-500', 
        borderLight: 'border-slate-500/20',
        glow: '' 
      };
    }
  };

  const theme = getPriorityClasses(incident.severity);
  const isCritical = incident.severity === 'CRITICAL';

  return (
    <motion.div 
      layout
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`futuristic-panel p-8 group transition-all duration-300 border-l-[6px] ${
        isCritical ? 'animate-pulse-fast' : ''
      } ${theme.glow} ${theme.border}`}
    >
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-5">
           <div className={`w-14 h-14 rounded-2xl ${theme.bg} flex items-center justify-center ${theme.text} border ${theme.borderLight} relative`}>
              <AlertCircle size={28} />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`absolute inset-0 ${theme.bg.split('/')[0]} rounded-2xl blur-lg`}
              />
           </div>
           <div>
              <div className="flex items-center gap-3 mb-1">
                 <h3 className="font-black text-2xl text-white uppercase tracking-tighter italic">{incident.type}</h3>
                 <span className={`text-[9px] font-black px-2 py-0.5 rounded ${theme.bg.replace('/10', '/20')} ${theme.text} border ${theme.borderLight.replace('/20', '/30')} cyber-text`}>
                    {incident.severity}
                 </span>
              </div>
              <div className="flex items-center gap-4">
                 <span className="cyber-text text-gray-500 flex items-center gap-1.5">
                    <Clock size={12} className="text-brand-info" />
                    {new Date(incident.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                 </span>
                 <span className="cyber-text text-gray-500 flex items-center gap-1.5">
                    <MapPin size={12} className="text-brand-info" />
                    {incident.location}
                 </span>
              </div>
           </div>
        </div>

        <div className="flex flex-col items-end">
           <span className="cyber-text text-gray-600 mb-1">Protocol Status</span>
           <div className={`flex items-center gap-2 px-4 py-1 rounded-full border ${
              incident.status === 'RESOLVED' ? 'bg-brand-success/10 text-brand-success border-brand-success/20' : 
              incident.status === 'IN_PROGRESS' ? 'bg-brand-info/10 text-brand-info border-brand-info/20' : 
              'bg-brand-accent/10 text-brand-accent border-brand-accent/20'
           }`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                 incident.status === 'RESOLVED' ? 'bg-brand-success' : 
                 incident.status === 'IN_PROGRESS' ? 'bg-brand-info' : 'bg-brand-accent'
              }`}></div>
              <span className="text-[10px] font-black uppercase tracking-widest">{incident.status.replace('_', ' ')}</span>
           </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-brand-dark/60 border border-white/5 mb-8 relative group/inner">
         <div className="absolute top-3 right-4 opacity-10 group-hover/inner:opacity-30 transition-opacity">
            <Zap size={40} className={theme.text} />
         </div>
         <p className="text-sm font-medium text-gray-300 leading-relaxed italic pr-12 relative z-10">
            "{incident.description || 'System awaiting telemetric confirmation of event signature.'}"
         </p>
         
         {isCritical && (
           <div className="mt-4 flex gap-4 border-t border-white/5 pt-4">
              <AIPredictionBadge level="Extreme" />
           </div>
         )}
      </div>

      {(role === 'staff' || role === 'manager') && incident.status !== 'RESOLVED' && (
        <div className="flex gap-4">
           {incident.status === 'ACTIVE' ? (
             <button 
               onClick={() => onRespond(incident.id)}
               className="btn-cyber flex-1 bg-brand-info/20 text-brand-info border border-brand-info/30 hover:bg-brand-info hover:text-white group/btn"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                <Navigation size={16} />
                INITIALIZE RESPONSE
             </button>
           ) : (
             <button 
               onClick={() => onResolve(incident.id)}
               className="btn-cyber flex-1 bg-brand-success/20 text-brand-success border border-brand-success/30 hover:bg-brand-success hover:text-white group/btn"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                <CheckCircle size={16} />
                FINALIZE PROTOCOL
             </button>
           )}
        </div>
      )}

      {incident.status === 'RESOLVED' && (
        <div className="h-12 flex items-center justify-center gap-3 bg-brand-success/5 rounded-xl border border-brand-success/10 border-dashed">
           <Shield size={16} className="text-brand-success" />
           <span className="cyber-text text-brand-success">Threat Nullified &bull; Log Closed</span>
        </div>
      )}
    </motion.div>
  );
};

export default IncidentCard;
