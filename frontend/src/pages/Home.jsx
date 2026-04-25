import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, LayoutDashboard, Zap, Globe, HeartPulse, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const PortalCard = ({ icon: Icon, title, desc, onClick, color, delay }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onClick={onClick}
      className="glass rounded-[2.5rem] group p-12 flex flex-col items-center text-center gap-8 cursor-pointer hover:bg-white/5 border-2 border-transparent hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden"
    >
      <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] opacity-10 ${color}`}></div>
      <div className={`p-8 rounded-[2rem] ${color} bg-opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl`}>
        <Icon size={56} className={color.replace('bg-', 'text-')} />
      </div>
      <div className="space-y-4 relative">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{title}</h2>
        <p className="text-gray-400 font-medium leading-relaxed max-w-[320px]">
          {desc}
        </p>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">
        Access Portal <ArrowRight size={14} />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col p-6 md:p-12 lg:p-24 space-y-24 max-w-[1920px] mx-auto">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-10"
      >
        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] shadow-2xl backdrop-blur-xl">
          <Globe size={16} className="animate-spin-slow" />
          The Standard in Hospitality Intelligence
        </div>
        
        <div className="space-y-4">
          <h1 className="text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase">
            SECURE YOUR<br/><span className="text-gradient-primary">PROPERTY.</span>
          </h1>
          <p className="text-gray-500 text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            CrisisSync AI orchestrates total property awareness. From localized threats to global emergencies, our AI core detects and resolves in milliseconds.
          </p>
        </div>

        <div className="flex items-center justify-center gap-12 pt-8 opacity-40">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black text-white">12k+</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Active Venues</span>
          </div>
          <div className="h-10 w-[1px] bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black text-white">0.4s</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Response Latency</span>
          </div>
          <div className="h-10 w-[1px] bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black text-white">99.9</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Detection Acc.</span>
          </div>
        </div>
      </motion.div>

      {/* Portal Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
        <PortalCard 
          icon={User}
          title="Guest Safety"
          desc="Immediate SOS reporting, AI-guided evacuation routes, and priority tactical assistance."
          color="bg-brand-accent"
          delay={0.2}
          onClick={() => navigate('/sos')}
        />
        <PortalCard 
          icon={LayoutDashboard}
          title="Tactical Hub"
          desc="Comprehensive monitoring and coordination for security staff. Real-time unit deployment."
          color="bg-brand-info"
          delay={0.3}
          onClick={() => navigate('/dashboard')}
        />
      </div>

      {/* Social Proof / Trust Bar - Senior Designer Touch */}
      <div className="pt-24 border-t border-white/5 space-y-12 pb-12">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-1 text-brand-warning">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Trusted by Global Leaders</h3>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-16 lg:gap-32 opacity-20 grayscale">
          {['MARRIOTT', 'HILTON', 'HYATT', 'ACCOR', 'IHG'].map(brand => (
            <span key={brand} className="text-2xl font-black tracking-tighter italic">{brand}</span>
          ))}
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5 opacity-50">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-indigo-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">CrisisSync AI &bull; Protocol V2.0.4</span>
        </div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Core</span>
          <span className="hover:text-white cursor-pointer transition-colors">Tactical Support</span>
          <span className="hover:text-white cursor-pointer transition-colors">Global Node Status</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
