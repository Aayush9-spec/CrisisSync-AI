import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Shield, CheckCircle, Navigation, MapPin, Radio } from 'lucide-react';
import { quickSOS } from '../services/api';

const Guest = () => {
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSOS = async () => {
    setStatus('sending');
    try {
      await quickSOS({
        type: 'EMERGENCY',
        location: 'Lobby - Floor 1',
        description: 'Direct SOS Triggered from Guest Portal',
        reporter_name: 'Guest User',
        reporter_role: 'guest'
      });
      setTimeout(() => setStatus('success'), 1500);
    } catch (err) {
      console.error('SOS failed:', err);
      setStatus('idle');
      alert('Network Error. Find nearest staff immediately.');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <AnimatePresence mode="wait">
        {status === 'idle' || status === 'sending' ? (
          <motion.div 
            key="sos"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-12 w-full max-w-sm"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-black text-brand-accent uppercase tracking-[0.3em]">
                <Radio size={12} className="animate-pulse" />
                Live Network Active
              </div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Emergency Hub</h1>
              <p className="text-gray-500 font-medium text-sm px-4">
                Tap and hold for 1 second in case of immediate danger. Security will be dispatched to your location instantly.
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <AnimatePresence>
                {status === 'idle' && (
                  <>
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute w-64 h-64 bg-brand-accent rounded-full blur-3xl"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                      className="absolute w-48 h-48 bg-brand-accent rounded-full blur-2xl"
                    />
                  </>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={status === 'sending'}
                onClick={handleSOS}
                className={`
                  relative z-10 w-64 h-64 rounded-full flex flex-col items-center justify-center gap-4 transition-all duration-500
                  border-8 border-brand-dark shadow-[0_0_50px_rgba(239,68,68,0.3)]
                  ${status === 'sending' ? 'bg-gray-800' : 'bg-brand-accent hover:bg-red-600'}
                `}
              >
                {status === 'sending' ? (
                  <RefreshCw className="animate-spin text-white" size={64} />
                ) : (
                  <AlertCircle size={84} className="text-white drop-shadow-2xl" />
                )}
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-white tracking-tighter">SOS</span>
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none">Press To Alert</span>
                </div>
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-2xl flex flex-col items-center gap-2">
                <MapPin size={20} className="text-brand-info" />
                <span className="text-[10px] font-black text-gray-400 uppercase">Map View</span>
              </div>
              <div className="glass p-4 rounded-2xl flex flex-col items-center gap-2">
                <Shield size={20} className="text-brand-success" />
                <span className="text-[10px] font-black text-gray-400 uppercase">Procedures</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 w-full max-w-sm"
          >
            <div className="w-32 h-32 bg-brand-success/20 rounded-full flex items-center justify-center mx-auto border-4 border-brand-success/30 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
              <CheckCircle size={64} className="text-brand-success" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Help is Coming</h2>
              <p className="text-gray-500 font-medium">
                Security units have been dispatched to your signature. Please stay in your current location if safe.
              </p>
            </div>
            <div className="p-6 glass rounded-3xl border-l-4 border-brand-info space-y-4 text-left">
              <div className="flex items-center gap-2 text-brand-info font-black text-[10px] uppercase tracking-widest">
                <Navigation size={14} /> Live Tracking Active
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="h-full w-1/3 bg-brand-info"
                  />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Officer Response Time: ~2 mins</p>
              </div>
            </div>
            <button 
              onClick={() => setStatus('idle')}
              className="btn glass w-full py-4 text-sm uppercase tracking-widest"
            >
              Cancel Alert
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Guest;
