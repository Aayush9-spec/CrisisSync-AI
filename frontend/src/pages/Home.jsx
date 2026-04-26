import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Globe, HeartPulse, Star, ArrowRight, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col pt-32 lg:pt-48 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto overflow-hidden">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
        {/* Background Glow */}
        <div className="absolute -top-64 -left-64 w-[600px] h-[600px] bg-brand-info/10 rounded-full blur-[120px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-brand-info uppercase tracking-[0.4em] backdrop-blur-xl">
            <Zap size={14} className="fill-brand-info" />
            AI-Powered Safety Intelligence
          </div>
          
          <div className="space-y-6">
            <h1 className="text-7xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.8] uppercase">
              EVERY<br/>SECOND.<br/><span className="text-gradient-primary">EVERY LIFE.</span>
            </h1>
            <p className="text-gray-500 text-xl lg:text-2xl font-medium max-w-xl leading-relaxed">
              CrisisSync AI unifies real-time data, predictive intelligence, and automated response to safeguard your people, wherever they are.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="glass p-1.5 rounded-2xl flex items-center gap-1">
              <button 
                onClick={() => navigate('/guest')}
                className="px-6 py-3 bg-brand-info text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-info/20 hover:scale-105 transition-all"
              >
                Guest
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 text-gray-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Staff
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 text-gray-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Manager
              </button>
            </div>

            <button 
              onClick={() => navigate('/guest')}
              className="px-8 py-4 glass border-brand-accent/20 hover:bg-brand-accent/5 rounded-2xl text-xs font-black uppercase tracking-widest text-brand-accent flex items-center gap-3 transition-all group"
            >
              Guest Safety <HeartPulse size={20} className="group-hover:animate-pulse" />
            </button>
          </div>
        </motion.div>

        {/* Dashboard Preview Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative lg:h-[800px] flex items-center justify-center"
        >
          {/* Main Preview Container */}
          <div className="w-full h-[600px] glass rounded-[3rem] p-4 relative border-white/10 shadow-2xl overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-brand-info/10 to-transparent"></div>
             <div className="w-full h-full bg-brand-dark/40 rounded-[2.5rem] flex items-center justify-center border border-white/5 relative overflow-hidden">
                {/* Simulated Image */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                   <Shield size={200} className="text-white" />
                </div>
                
                {/* Floating UI Elements */}
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute top-10 right-10 w-72 glass p-6 rounded-3xl space-y-4 border-white/10 shadow-2xl"
                >
                   <div className="flex items-center gap-2 text-brand-info text-[10px] font-black uppercase tracking-widest">
                      <Activity size={14} /> AI Triage
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold">
                         <span className="text-gray-500 uppercase">Incident Type</span>
                         <span className="text-white uppercase">Medical Emergency</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold">
                         <span className="text-gray-500 uppercase">Location</span>
                         <span className="text-white uppercase">Floor 6 - Room 603</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold">
                         <span className="text-gray-500 uppercase">Severity Score</span>
                         <span className="text-brand-accent font-black">92 / 100</span>
                      </div>
                   </div>
                   <button className="w-full btn btn-primary py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">Deploy Response</button>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                   className="absolute bottom-10 left-10 w-72 glass p-6 rounded-3xl space-y-4 border-white/10 shadow-2xl"
                >
                   <div className="flex items-center gap-2 text-brand-info text-[10px] font-black uppercase tracking-widest">
                      <Activity size={14} /> Live Stat Tracking
                   </div>
                   <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[8px] font-black uppercase text-gray-500">
                          <span>Occupancy</span>
                          <span>243 / 500</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-brand-info w-[48%]"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                         <span className="text-[8px] font-black uppercase text-gray-500">Active Incidents</span>
                         <span className="text-2xl font-black text-brand-accent">3</span>
                      </div>
                   </div>
                </motion.div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Section */}
      <div className="pt-48 space-y-16">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-1 text-brand-warning">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">The New Standard in Tactical Safety</h3>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-16 lg:gap-32 opacity-20 grayscale">
          {['MARRIOTT', 'HILTON', 'HYATT', 'ACCOR', 'IHG'].map(brand => (
            <span key={brand} className="text-3xl lg:text-5xl font-black tracking-tighter italic">{brand}</span>
          ))}
        </div>
      </div>
      
      {/* Social Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-48 pt-12 border-t border-white/5 opacity-50">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-brand-info" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">CrisisSync AI &bull; Tactical Node V2.0.4</span>
        </div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Legal</span>
          <span className="hover:text-white cursor-pointer transition-colors">Status</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
