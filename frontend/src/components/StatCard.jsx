import React from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, color, delay }) => {
  const count = React.useRef(null);

  React.useEffect(() => {
    const controls = animate(0, parseInt(value) || 0, {
      duration: 2,
      onUpdate(value) {
        if (count.current) count.current.textContent = Math.round(value);
      }
    });
    return () => controls.stop();
  }, [value]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`futuristic-panel p-8 group cursor-pointer bg-grid ${color === 'bg-brand-accent' ? 'neon-glow-red' : color === 'bg-brand-info' ? 'neon-glow-blue' : color === 'bg-brand-success' ? 'neon-glow-green' : 'neon-glow-purple'}`}
    >
      <div className="flex justify-between items-start mb-8">
        <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-20 flex items-center justify-center ${color.replace('bg-', 'text-')} relative`}>
          <Icon size={28} className="z-10" />
          <div className={`absolute inset-0 rounded-2xl ${color} opacity-20 blur-xl group-hover:opacity-60 transition-opacity`}></div>
        </div>
        <div className="flex flex-col items-end">
           <span className="cyber-text text-gray-500 mb-1">Status</span>
           <span className={`text-[10px] font-black uppercase tracking-widest ${color.replace('bg-', 'text-')}`}>Operational</span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="cyber-text text-gray-400 mb-2">{label}</span>
        <div className="flex items-baseline gap-2">
           <span ref={count} className="text-5xl font-black text-white tracking-tighter italic">0</span>
           {typeof value === 'string' && value.includes('s') && <span className="text-xl font-bold text-gray-500 uppercase">Sec</span>}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
         <div className="h-0.5 flex-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.5, delay: delay + 0.5 }}
              className={`h-full w-full ${color}`}
            />
         </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
