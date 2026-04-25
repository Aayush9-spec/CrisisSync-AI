import React from 'react';
import { MapPin, Clock, AlertTriangle, User, ChevronRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const IncidentCard = ({ incident, onClick }) => {
  const isCritical = incident.severity === 'CRITICAL' || incident.severity === 'HIGH';
  
  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'border-red-500/50 bg-red-500/5 text-red-400';
      case 'HIGH': return 'border-orange-500/50 bg-orange-500/5 text-orange-400';
      case 'MEDIUM': return 'border-amber-500/50 bg-amber-500/5 text-amber-400';
      default: return 'border-indigo-500/50 bg-indigo-500/5 text-indigo-400';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'IN_PROGRESS': return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'RESOLVED': return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30';
      default: return 'bg-white/10 text-white/50 border-white/20';
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className={`glass-card p-6 cursor-pointer border-l-[6px] ${isCritical ? 'animate-pulse-glow' : ''} ${getSeverityStyles(incident.severity)}`}
      onClick={() => onClick && onClick(incident)}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl ${isCritical ? 'bg-red-500/20' : 'bg-indigo-500/20'}`}>
            {isCritical ? <ShieldAlert size={24} /> : <AlertTriangle size={24} />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-xl tracking-tight text-white">{incident.type}</h3>
              <span className={`badge-premium ${getStatusBadge(incident.status)}`}>
                {incident.status.replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted">
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-indigo-400" />
                <span>{incident.location}</span>
              </div>
              <span className="opacity-20">•</span>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-indigo-400" />
                <span>{new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-40">Severity</div>
          <div className={`text-sm font-extrabold uppercase tracking-widest ${isCritical ? 'text-red-400' : 'text-indigo-400'}`}>
            {incident.severity}
          </div>
        </div>
      </div>
      
      <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-gray-300 leading-relaxed italic">
        {incident.description || 'No additional details provided for this event.'}
      </div>

      <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-black text-white">
            {incident.reporter_name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">{incident.reporter_name}</span>
            <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">{incident.reporter_role}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs font-bold text-indigo-400 group">
          View Intel
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default IncidentCard;
