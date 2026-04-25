import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Shield, CheckCircle, Navigation, MapPin, Radio, Zap } from 'lucide-react';
import { quickSOS } from '../services/api';

const Guest = () => {
  const [status, setStatus] = useState('idle'); // idle, sending, success
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    const ripple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setRipples(prev => [...prev, ripple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 2000);
  };

  const handleSOS = async (e) => {
    createRipple(e);
    setStatus('sending');
    try {
      await quickSOS({
        type: 'EMERGENCY',
        location: 'Current GPS Location',
        description: 'CRITICAL SOS SIGNAL: User initiated emergency protocol from tactical portal.',
        reporter_name: 'Guest User',
        reporter_role: 'guest'
      });
      setTimeout(() => setStatus('success'), 2000);
    } catch (err) {
      console.error('SOS failed:', err);
      setStatus('idle');
      alert('Signal Interference Detected. Relocate and retry or find staff.');
    }
  };

  return (
    <div className="min-h-screen fixed inset-0 z-[100] bg-brand-dark overflow-hidden flex flex-col items-center justify-center p-10 bg-grid">
      <div className="scanline"></div>
      
      {/* Background Shockwaves */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 1, border: '4px solid #ff3131' }}
            animate={{ scale: 20, opacity: 0, border: '1px solid #ff3131' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="fixed rounded-full pointer-events-none z-0"
            style={{ 
              left: ripple.x, 
              top: ripple.y, 
              width: '100px', 
              height: '100px', 
              marginLeft: '-50px', 
              marginTop: '-50px' 
            }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {status === 'idle' || status === 'sending' ? (
          <motion.div 
            key="sos-hub"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-16"
          >
            <div className="text-center space-y-6">
               <motion.div 
                 animate={{ opacity: [0.4, 1, 0.4] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/30 cyber-text text-brand-accent"
               >
                  <Radio size={16} />
                  Tactical SOS Link Active
               </motion.div>
               <h1 className="text-7xl font-black text-white italic uppercase tracking-tighter leading-tight text-glow-red">
                  Emergency<br/>Signal Hub
               </h1>
               <p className="cyber-text text-gray-500 max-w-md mx-auto">
                  Hold the trigger below to initialize a high-priority distress sequence. 
                  Satellite tracking will lock onto your signature.
               </p>
            </div>

            <div className="relative">
               {/* Pulse Rings */}
               <AnimatePresence>
                 {status === 'idle' && (
                   <>
                     {[1, 2, 3].map(i => (
                       <motion.div
                         key={i}
                         animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                         transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
                         className="absolute inset-0 rounded-full bg-brand-accent/20 blur-xl"
                       />
                     ))}
                   </>
                 )}
               </AnimatePresence>

               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.92 }}
                 onClick={handleSOS}
                 disabled={status === 'sending'}
                 className={`
                    w-72 h-72 rounded-full futuristic-panel border-8 border-brand-dark relative z-20 flex flex-col items-center justify-center gap-4 transition-all duration-700
                    ${status === 'sending' ? 'bg-gray-900 border-gray-800' : 'bg-brand-accent hover:bg-red-600 shadow-[0_0_100px_rgba(255,49,49,0.4)]'}
                 `}
               >
                  <motion.div 
                    animate={status === 'idle' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="relative"
                  >
                    {status === 'sending' ? (
                       <RefreshCw className="animate-spin text-white" size={84} />
                    ) : (
                       <AlertCircle size={96} className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                    )}
                  </motion.div>
                  <div className="text-center">
                     <span className="text-4xl font-black text-white italic tracking-tighter">SOS</span>
                     <div className="cyber-text text-white/40 mt-1">Press To Trigger</div>
                  </div>
               </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
               <button className="btn-cyber glass group border-brand-info/30 text-brand-info py-5">
                  <MapPin size={20} className="group-hover:scale-125 transition-transform" />
                  SAFE ZONE GPS
               </button>
               <button className="btn-cyber glass group border-brand-purple/30 text-brand-purple py-5">
                  <Shield size={20} className="group-hover:scale-125 transition-transform" />
                  TACTICAL PROTOCOL
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success-matrix"
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(40px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className="relative z-10 w-full max-w-3xl text-center space-y-12"
          >
            <div className="relative inline-block">
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="w-48 h-48 bg-brand-success/10 rounded-full border-4 border-brand-success/30 flex items-center justify-center shadow-[0_0_100px_rgba(57,255,20,0.2)]"
               >
                  <CheckCircle size={96} className="text-brand-success text-glow-green" />
               </motion.div>
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                 className="absolute -inset-8 border-2 border-dashed border-brand-success/20 rounded-full"
               />
            </div>

            <div className="space-y-6">
               <h2 className="text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
                  Help Is<br/><span className="text-brand-success">Deployed</span>
               </h2>
               <p className="text-xl font-bold text-gray-500 max-w-lg mx-auto uppercase tracking-widest leading-relaxed">
                  Multiple tactical units have been dispatched to your current coordinates. 
                  ETA: <span className="text-white text-glow-blue">142 Seconds</span>.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
               {[
                 { label: 'Signal', value: 'Encrypted', color: 'text-brand-info' },
                 { label: 'Priority', value: 'Highest', color: 'text-brand-accent' },
                 { label: 'Tracking', value: 'Satellite', color: 'text-brand-purple' }
               ].map((item, i) => (
                 <div key={i} className="futuristic-panel p-6 bg-brand-dark/40 border-white/5">
                    <div className="cyber-text text-gray-600 mb-2">{item.label}</div>
                    <div className={`text-sm font-black uppercase tracking-widest ${item.color}`}>{item.value}</div>
                 </div>
               ))}
            </div>

            <button 
              onClick={() => setStatus('idle')}
              className="btn-cyber glass group border-white/10 hover:border-white/30 text-gray-400 py-6 px-12"
            >
               ABORT SIGNAL &bull; RESET LINK
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Guest;
