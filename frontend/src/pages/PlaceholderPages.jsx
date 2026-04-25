import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  History as HistoryIcon, 
  Settings as SettingsIcon,
  ShieldCheck,
  Activity,
  Lock,
  Globe,
  Bell
} from 'lucide-react';

const PlaceholderPage = ({ title, icon: Icon, desc }) => (
  <div className="p-12 space-y-8 max-w-7xl mx-auto">
    <div className="flex items-center gap-4">
      <div className="bg-brand-info/10 p-4 rounded-3xl text-brand-info">
        <Icon size={32} />
      </div>
      <div>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">{title}</h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">{desc}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="glass h-48 rounded-3xl animate-pulse bg-white/5 border border-white/5"></div>
      ))}
    </div>
    
    <div className="glass p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6 border border-white/5 border-dashed">
      <div className="w-20 h-20 bg-brand-info/10 rounded-full flex items-center justify-center text-brand-info/50">
        <Icon size={40} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-white uppercase">Operational Module Locked</h2>
        <p className="text-gray-500 max-w-sm">This tactical module is reserved for **CrisisSync Enterprise** subscribers. Contact your regional coordinator for access.</p>
      </div>
      <button className="btn btn-primary px-8 py-4 uppercase tracking-widest text-xs">Request Access</button>
    </div>
  </div>
);

export const Analytics = () => <PlaceholderPage title="Analytics Core" icon={BarChart3} desc="Deep Intelligence & Predictive Modeling" />;
export const History = () => <PlaceholderPage title="Incident Registry" icon={HistoryIcon} desc="Complete Audit Trail & Forensic Logs" />;
export const Settings = () => <PlaceholderPage title="System Config" icon={SettingsIcon} desc="Node Management & Security Protocols" />;

export default PlaceholderPage;
