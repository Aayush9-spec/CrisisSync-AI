import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  ChevronRight, 
  Activity, 
  Shield, 
  Zap, 
  Globe, 
  Map, 
  Eye,
  ArrowRight,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-brand-info/30 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[100] glass border-b border-white/5 px-6 md:px-12 py-4 flex justify-between items-center bg-black/20 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-info rounded-lg flex items-center justify-center">
            <Shield className="text-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">CrisisSync AI</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          {['Platform', 'Solutions', 'Resources', 'Company', 'Pricing'].map(item => (
            <a key={item} href="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{item}</a>
          ))}
        </div>

        <button className="btn btn-primary px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest">
          Book a Demo
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Column: Headline */}
        <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-info/10 border border-brand-info/20 text-[10px] font-black text-brand-info uppercase tracking-[0.3em]"
          >
            <Activity size={12} className="animate-pulse" />
            AI-Powered Safety Intelligence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase"
          >
            Every Second.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Every Life.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 font-medium max-w-xl leading-relaxed mx-auto lg:mx-0"
          >
            CrisisSync AI unifies real-time data, predictive intelligence, and automated response to safeguard your people, wherever they are.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-brand-info/20 group"
            >
              Tactical Hub <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/sos')}
              className="btn glass px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-3 border-brand-accent/20 text-brand-accent group"
            >
              Guest Safety <Activity className="group-hover:scale-125 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Center/Right: Building & Floating Cards */}
        <div className="flex-1 relative w-full h-[600px] lg:h-[800px] flex items-center justify-center">
          
          {/* Main Building Asset (Using provided image vibe) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* The Building Glow */}
            <div className="absolute w-[80%] h-[80%] bg-brand-info/10 rounded-full blur-[120px] animate-pulse"></div>
            
            {/* Visual Representation of the Building */}
            <div className="relative z-0 w-full h-full overflow-hidden rounded-[4rem] border border-white/5 shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" 
                    alt="Tactical Asset" 
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
            </div>
          </motion.div>

          {/* Floating Card: AI Triage (Right Top) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-10 -right-4 lg:right-0 z-20 w-[280px] glass p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4"
          >
            <div className="flex items-center gap-2 text-[10px] font-black text-brand-info uppercase tracking-widest">
              <div className="w-5 h-5 bg-brand-info/20 rounded-md flex items-center justify-center">
                <Zap size={12} />
              </div>
              AI Triage
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Incident Type</span>
                <span className="text-[10px] text-white font-black uppercase">Medical Emergency</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Location</span>
                <span className="text-[10px] text-white font-black uppercase">Floor 6 - Room 603</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Severity Score</span>
                <span className="text-[10px] text-brand-accent font-black">92 / 100</span>
              </div>
            </div>
            <button className="btn btn-primary w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">
              Deploy Response
            </button>
          </motion.div>

          {/* Floating Card: Live Stat Tracking (Left Bottom) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-20 -left-4 lg:left-0 z-20 w-[240px] glass p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4"
          >
            <div className="flex items-center gap-2 text-[10px] font-black text-brand-info uppercase tracking-widest">
              <Activity size={14} /> Live Stat Tracking
            </div>
            <div className="space-y-4">
               <div className="space-y-1">
                 <div className="flex justify-between text-[8px] font-bold text-gray-500 uppercase">
                    <span>Occupancy</span>
                    <span>243 / 500</span>
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[48%] bg-brand-info"></div>
                 </div>
               </div>
               <div className="flex justify-between">
                 <span className="text-[10px] font-bold text-gray-400 uppercase">Active Incidents</span>
                 <span className="text-[10px] font-black text-brand-accent uppercase">3</span>
               </div>
               <div className="flex justify-between items-center pt-2 border-t border-white/5">
                 <span className="text-[10px] font-bold text-gray-500 uppercase">System Status</span>
                 <div className="flex items-center gap-1 text-[8px] font-black text-brand-success uppercase">
                    <div className="w-1.5 h-1.5 bg-brand-success rounded-full animate-pulse"></div>
                    Operational
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Floating Card: Gemini Vision (Right Bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-10 right-0 z-20 w-[300px] glass p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4"
          >
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              <Bot size={14} /> Gemini Vision Analysis
            </div>
            <div className="h-32 bg-white/5 rounded-2xl border border-white/5 overflow-hidden group cursor-pointer relative">
               <img 
                 src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" 
                 alt="Vision Analysis" 
                 className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-brand-accent rounded-sm animate-pulse"></div>
               </div>
            </div>
            <p className="text-[10px] text-gray-400 font-medium leading-tight">
              AI Confirmation: Smoke detected in corridor on Floor 6. Initiating area isolation protocols.
            </p>
            <button className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest hover:gap-3 transition-all">
              View Full Analysis <ChevronRight size={12} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Row */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-gradient-to-b from-transparent to-brand-info/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: Eye, title: 'Situational Awareness', desc: 'Real-time property-wide visibility.' },
            { icon: Zap, title: 'Risk Intelligence', desc: 'Predictive modeling for future threats.' },
            { icon: Bot, title: 'Automated Response', desc: 'Instant dispatch & coordination.' },
            { icon: Globe, title: 'Unified Network', desc: 'Connected ecosystem for all stakeholders.' },
          ].map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-info border border-white/10">
                <f.icon size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-black uppercase tracking-widest text-white">{f.title}</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 text-center space-y-12">
        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Trusted by Leading Brands Worldwide</h4>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all">
           {['Marriott', 'Hilton', 'Hyatt', 'Accor', 'IHG'].map(brand => (
             <span key={brand} className="text-2xl font-black tracking-tighter uppercase">{brand}</span>
           ))}
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-12 px-6 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
        <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">© 2026 CrisisSync AI • All Systems Operational</div>
        <div className="flex gap-8">
           {['Terms', 'Privacy', 'Security', 'SLA'].map(item => (
             <a key={item} href="#" className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">{item}</a>
           ))}
        </div>
      </footer>

    </div>
  );
};

export default Home;
