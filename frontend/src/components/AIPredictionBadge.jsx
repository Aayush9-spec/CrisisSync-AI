import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const AIPredictionBadge = ({ level = 'High' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-purple/10 border border-brand-purple/30 text-brand-purple"
    >
      <div className="relative">
        <Zap size={14} className="fill-brand-purple animate-pulse" />
        <motion.div 
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 bg-brand-purple rounded-full"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[8px] font-black uppercase tracking-widest opacity-60">AI Prediction</span>
        <span className="text-[10px] font-black uppercase">{level} Risk Zone</span>
      </div>
    </motion.div>
  );
};

export default AIPredictionBadge;
