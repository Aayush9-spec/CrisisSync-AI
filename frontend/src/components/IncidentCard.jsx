import React from 'react';
import { MapPin, Clock, AlertTriangle, User, ChevronRight } from 'lucide-react';

const IncidentCard = ({ incident, onClick }) => {
  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'status-critical';
      case 'HIGH': return 'status-critical';
      case 'MEDIUM': return 'status-progress';
      default: return 'status-active';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'ACTIVE': return 'status-critical';
      case 'IN_PROGRESS': return 'status-progress';
      case 'RESOLVED': return 'status-active';
      default: return 'status-progress';
    }
  };

  return (
    <div 
      className="glass glass-hover card animate-slide-up cursor-pointer"
      onClick={() => onClick && onClick(incident)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' : 'bg-indigo-500/20 text-indigo-500'}`}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{incident.type}</h3>
            <div className="flex items-center gap-1 text-sm text-muted">
              <MapPin size={14} />
              <span>{incident.location}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`status-badge ${getSeverityClass(incident.severity)}`}>
            {incident.severity}
          </span>
          <span className={`status-badge ${getStatusClass(incident.status)}`}>
            {incident.status.replace('_', ' ')}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-300 line-clamp-2 mt-2">
        {incident.description || 'No description provided.'}
      </p>

      <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/5">
        <div className="flex items-center gap-1 text-xs text-muted">
          <Clock size={12} />
          <span>{new Date(incident.timestamp).toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted">
          <User size={12} />
          <span>{incident.reporter_name}</span>
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;
