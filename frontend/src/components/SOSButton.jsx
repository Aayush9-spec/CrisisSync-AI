import React, { useState } from 'react';
import { AlertCircle, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { quickSOS } from '../services/api';

const SOSButton = ({ onTriggered }) => {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSOS = async () => {
    setLoading(true);
    try {
      const response = await quickSOS({
        type: 'OTHER',
        location: 'Current Location',
        description: 'Critical SOS Alert triggered by guest',
        reporter_name: 'Anonymous Guest',
        reporter_role: 'guest'
      });
      if (onTriggered) onTriggered(response.data);
    } catch (error) {
      console.error('SOS Failed:', error);
      alert('Connection error. Please find the nearest staff member immediately.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-center py-10">
      {/* Background Pulse Rings */}
      <AnimatePresence>
        {isHovered && !loading && (
          <>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.2 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute w-64 h-64 bg-accent rounded-full blur-3xl pointer-events-none"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
              className="absolute w-64 h-64 bg-accent rounded-full blur-3xl pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative z-10 w-72 h-72 rounded-full glass-card flex flex-col items-center justify-center gap-4 transition-all duration-500 overflow-hidden group border-2 ${loading ? 'border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.3)]' : 'border-accent/40 shadow-[0_0_50px_rgba(244,63,94,0.2)]'}`}
        onClick={handleSOS}
        disabled={loading}
      >
        {/* Animated Inner Glow */}
        <div className={`absolute inset-0 opacity-20 transition-opacity duration-500 ${loading ? 'bg-indigo-500' : 'bg-accent group-hover:opacity-40'}`}></div>
        
        {loading ? (
          <Loader2 className="animate-spin text-white" size={64} />
        ) : (
          <div className="relative">
            <AlertCircle size={84} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:scale-110 transition-transform duration-500" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute inset-0 bg-white rounded-full blur-xl opacity-0 group-hover:opacity-20"
            />
          </div>
        )}

        <div className="flex flex-col items-center text-center px-6">
          <span className="text-3xl font-black tracking-tight text-white uppercase mb-1">
            {loading ? 'Alerting...' : 'SEND SOS'}
          </span>
          <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] leading-tight">
            Instant Satellite<br/>Emergency Response
          </span>
        </div>
        
        {/* Scanning Line Effect */}
        {!loading && (
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="absolute left-0 w-full h-[2px] bg-white/20 blur-[2px]"
          />
        )}
      </motion.button>
    </div>
  );
};

export default SOSButton;
