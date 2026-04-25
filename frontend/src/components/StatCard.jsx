import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, trend, trendValue, color, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="stat-card"
    >
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[60px] opacity-10 ${color}`}></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center ${color.replace('bg-', 'text-')}`}>
          <Icon size={28} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${trend === 'up' ? 'text-brand-success bg-brand-success/10' : 'text-brand-accent bg-brand-accent/10'}`}>
            {trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {trendValue}%
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</span>
        <span className="text-4xl font-black text-white tracking-tighter">{value}</span>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1, delay: delay + 0.5 }}
          className={`h-full w-full ${color}`}
        />
      </div>
    </motion.div>
  );
};

export default StatCard;
