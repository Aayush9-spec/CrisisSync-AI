import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { quickSOS } from '../services/api';

const SOSButton = ({ onTriggered }) => {
  const [loading, setLoading] = useState(false);

  const handleSOS = async () => {
    setLoading(true);
    try {
      const response = await quickSOS({
        type: 'OTHER',
        location: 'Current Location',
        description: 'SOS Alert triggered by guest',
        reporter_name: 'Anonymous Guest',
        reporter_role: 'guest'
      });
      if (onTriggered) onTriggered(response.data);
    } catch (error) {
      console.error('SOS Failed:', error);
      alert('Failed to send SOS. Please contact staff immediately.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      className={`btn btn-danger w-full py-8 text-xl flex-col gap-4 ${loading ? 'opacity-70' : ''}`}
      onClick={handleSOS}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" size={48} /> : <AlertCircle size={48} />}
      <span className="text-2xl font-black tracking-tighter uppercase">Send SOS Alert</span>
      <span className="text-xs font-normal opacity-80">Instant notification to all security & staff</span>
    </button>
  );
};

export default SOSButton;
