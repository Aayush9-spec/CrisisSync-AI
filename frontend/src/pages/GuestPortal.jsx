import React, { useState } from 'react';
import SOSButton from '../components/SOSButton';
import ChatBot from '../components/ChatBot';
import { Shield, Map, PhoneCall, Info, AlertTriangle } from 'lucide-react';

const GuestPortal = () => {
  const [activeSOS, setActiveSOS] = useState(null);

  const handleSOSTriggered = (incident) => {
    setActiveSOS(incident);
    // You could play a sound or show a persistent alert here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 pt-10 pb-20">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-full bg-indigo-500/10 text-indigo-400 mb-2">
          <Shield size={32} />
        </div>
        <h1 className="text-3xl font-black text-gradient tracking-tighter uppercase">Safety Portal</h1>
        <p className="text-muted">Instant assistance for guests and visitors</p>
      </div>

      {activeSOS ? (
        <div className="glass p-8 border-l-4 border-red-500 space-y-4 animate-slide-up">
          <div className="flex items-center gap-3 text-red-500">
            <AlertTriangle size={28} className="animate-pulse" />
            <h2 className="text-xl font-bold">SOS Alert Active</h2>
          </div>
          <p className="text-gray-300">
            Our security team has been notified of your situation. Assistance is being dispatched to your location.
          </p>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm">
            <div className="font-bold mb-1">Incident ID: {activeSOS.id}</div>
            <div className="text-muted">Status: {activeSOS.status}</div>
          </div>
          <button className="btn btn-ghost w-full" onClick={() => setActiveSOS(null)}>
            Dismiss Alert
          </button>
        </div>
      ) : (
        <SOSButton onTriggered={handleSOSTriggered} />
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 text-center space-y-2 glass-hover cursor-pointer">
          <Map className="mx-auto text-indigo-400" size={24} />
          <div className="text-sm font-bold">View Safe Zones</div>
        </div>
        <div className="glass p-4 text-center space-y-2 glass-hover cursor-pointer">
          <PhoneCall className="mx-auto text-indigo-400" size={24} />
          <div className="text-sm font-bold">Call Security</div>
        </div>
      </div>

      <div className="glass p-6 space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <Info size={18} className="text-indigo-400" />
          Emergency Instructions
        </h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 flex-shrink-0">1</div>
            <div className="text-sm text-gray-300">
              Stay calm and locate the nearest emergency exit indicated on the room door.
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 flex-shrink-0">2</div>
            <div className="text-sm text-gray-300">
              Trigger the SOS alert or use the AI Chat below for specific guidance.
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 flex-shrink-0">3</div>
            <div className="text-sm text-gray-300">
              Follow all staff instructions and move to the designated assembly point.
            </div>
          </div>
        </div>
      </div>

      <ChatBot role="guest" context="Guest SOS Portal" />
    </div>
  );
};

export default GuestPortal;
