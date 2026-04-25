import React from 'react';
import { MapPin, Clock, Shield, CheckCircle, Navigation, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const IncidentCard = ({ incident, role, onRespond, onResolve }) => {
  const getPriorityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'brand-accent';
      case 'HIGH': return 'brand-warning';
      case 'MEDIUM': return 'brand-info';
      default: return 'gray-500';
    }
  };

  const priorityColor = getPriorityColor(incident.severity);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass rounded-2xl p-6 relative border-l-4 border-${priorityColor} hover:shadow-2xl hover:shadow-${priorityColor}/10 transition-all duration-300 group`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className={`w-12 h-12 rounded-xl bg-${priorityColor}/10 flex items-center justify-center text-${priorityColor}`}>
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="font-black text-lg text-white leading-tight uppercase tracking-tight">{incident.type}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md bg-${priorityColor}/10 text-${priorityColor} border border-${priorityColor}/20`}>
                {incident.severity}
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <Clock size={10} />
                {new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right flex flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`w-1 h-3 rounded-full ${i < (incident.priority_score || 5) ? `bg-${priorityColor}` : 'bg-white/5'}`}></div>
            ))}
          </div>
          <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
            incident.status === 'RESOLVED' ? 'bg-brand-success/10 text-brand-success border-brand-success/20' : 
            incident.status === 'IN_PROGRESS' ? 'bg-brand-info/10 text-brand-info border-brand-info/20' : 
            'bg-brand-accent/10 text-brand-accent border-brand-accent/20'
          }`}>
            {incident.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 p-3 bg-brand-dark/50 rounded-xl border border-white/5">
        <MapPin size={14} className="text-brand-info" />
        <span className="text-xs font-bold text-gray-300">{incident.location}</span>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-xs text-gray-500 leading-relaxed font-medium italic">
          "{incident.description || 'No additional details provided.'}"
        </p>

        {incident.ai_rationale && (
          <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
            <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Tactical Rationale</div>
            <p className="text-[11px] text-gray-400 leading-tight">{incident.ai_rationale}</p>
          </div>
        )}

        {incident.visual_intel && (
          <div className="p-4 rounded-xl bg-brand-success/5 border border-brand-success/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-black text-brand-success uppercase tracking-widest flex items-center gap-1">
                <Camera size={10} /> Visual AI Intel
              </div>
              {incident.threat_confirmed && (
                <div className="text-[8px] font-black text-brand-success uppercase flex items-center gap-1">
                  <ShieldCheck size={10} /> Verified Threat
                </div>
              )}
            </div>
            <div className="flex gap-4">
              {incident.image_url && (
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open(incident.image_url)}>
                  <img src={incident.image_url} alt="Tactical Snap" className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-[11px] text-gray-400 leading-tight italic">
                "{incident.visual_intel}"
              </p>
            </div>
          </div>
        )}
      </div>

      {(role === 'staff' || role === 'manager') && incident.status !== 'RESOLVED' && (
        <div className="flex gap-3 mt-auto">
          {incident.status === 'ACTIVE' && (
            <button 
              onClick={() => onRespond(incident.id)}
              className="btn btn-primary flex-1 py-3 text-xs"
            >
              <Navigation size={14} />
              DISPATCH TEAM
            </button>
          )}
          {incident.status === 'IN_PROGRESS' && (
            <button 
              onClick={() => onResolve(incident.id)}
              className="btn btn-success flex-1 py-3 text-xs"
            >
              <CheckCircle size={14} />
              RESOLVE ALERT
            </button>
          )}
        </div>
      )}

      {incident.status === 'RESOLVED' && (
        <div className="flex items-center justify-center gap-2 p-3 bg-brand-success/5 rounded-xl border border-brand-success/10">
          <Shield size={14} className="text-brand-success" />
          <span className="text-[10px] font-black text-brand-success uppercase tracking-[0.2em]">Verified Secure</span>
        </div>
      )}
    </motion.div>
  );
};

export default IncidentCard;
