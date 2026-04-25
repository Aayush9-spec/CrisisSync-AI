import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, LayoutDashboard, Zap, Globe, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const PortalCard = ({ icon: Icon, title, desc, onClick, color, delay }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="glass-card group p-10 flex flex-col items-center text-center gap-6 cursor-pointer hover:bg-white/5 border-2 border-transparent hover:border-indigo-500/30 transition-all"
    >
      <div className={`p-6 rounded-3xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={48} className={color.replace('bg-', 'text-')} />
      </div>
      <div className="space-y-3">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">{title}</h2>
        <p className="text-muted font-medium leading-relaxed max-w-[280px]">
          {desc}
        </p>
      </div>
      <div className="w-12 h-12 rounded-full bg-white/5 flex-center group-hover:bg-indigo-500 group-hover:text-white transition-all">
        <Zap size={20} />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-[80vh] flex-center flex-col p-6 md:p-12 space-y-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">
          <Globe size={14} className="animate-spin-slow" />
          Global Hospitality Safety Protocol v2026
        </div>
        <h1 className="heading-xl leading-none">
          SECURE YOUR<br/><span className="text-gradient-primary">PROPERTY.</span>
        </h1>
        <p className="text-muted text-xl font-medium max-w-2xl mx-auto">
          CrisisSync AI is the world's most advanced emergency coordination engine for hospitality. 
          Instant detection. Intelligent response. Total protection.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        <PortalCard 
          icon={User}
          title="Guest Portal"
          desc="Immediate emergency reporting, SOS assistance, and AI-guided safe-zone navigation."
          color="bg-accent"
          delay={0.2}
          onClick={() => navigate('/')}
        />
        <PortalCard 
          icon={LayoutDashboard}
          title="Command Center"
          desc="Tactical oversight for security and management. Real-time AI coordination and team deployment."
          color="bg-indigo-500"
          delay={0.3}
          onClick={() => navigate('/dashboard')}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-12 pt-10 border-t border-white/5"
      >
        <div className="flex items-center gap-3 text-muted">
          <HeartPulse size={20} className="text-accent" />
          <span className="text-sm font-bold uppercase tracking-widest">Life Safety First</span>
        </div>
        <div className="flex items-center gap-3 text-muted">
          <Shield size={20} className="text-indigo-400" />
          <span className="text-sm font-bold uppercase tracking-widest">Zero-Latency AI</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
