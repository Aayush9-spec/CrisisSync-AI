import React from 'react';
import { motion } from 'framer-motion';
import { Hotel, Building2, Hospital, Shield, ArrowRight } from 'lucide-react';

const SolutionSection = ({ icon: Icon, title, items, image, reversed }) => (
  <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
    <div className="flex-1 space-y-8">
      <div className="w-20 h-20 bg-brand-info/10 rounded-3xl flex items-center justify-center text-brand-info">
        <Icon size={40} />
      </div>
      <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">{title}</h2>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-4 text-gray-400 font-medium text-lg">
            <div className="w-2 h-2 rounded-full bg-brand-info"></div>
            {item}
          </li>
        ))}
      </ul>
      <button className="btn btn-primary px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-3 group">
        Explore Solution <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
    <div className="flex-1 w-full">
      <div className="glass aspect-video rounded-[3rem] p-4 border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-info/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="w-full h-full bg-brand-dark/50 rounded-[2.5rem] flex items-center justify-center">
            <span className="text-white/5 font-black text-6xl uppercase tracking-tighter">Solution Visual</span>
        </div>
      </div>
    </div>
  </div>
);

const Solutions = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto space-y-48">
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-black text-brand-accent uppercase tracking-[0.3em]"
        >
          <Shield size={14} />
          Industry Vertical Solutions
        </motion.div>
        <h1 className="text-6xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none">
          Protection <br /> <span className="text-gradient-primary">Tailored.</span>
        </h1>
      </section>

      <SolutionSection 
        icon={Hotel}
        title="Hotels & Resorts"
        items={[
          "Smart guest evacuation guidance",
          "Automated room-by-room status monitoring",
          "Tactical staff communication protocols",
          "VIP protection integration"
        ]}
      />

      <SolutionSection 
        icon={Hospital}
        title="Medical Facilities"
        items={[
          "Critical path clearance for emergencies",
          "Patient tracking during evacuations",
          "Secure area lockdown management",
          "Resource allocation optimization"
        ]}
        reversed
      />

      <SolutionSection 
        icon={Building2}
        title="Enterprise Campuses"
        items={[
          "Multi-building coordination mesh",
          "Mass notification systems",
          "Access control synchronization",
          "Real-time density heatmapping"
        ]}
      />
    </div>
  );
};

export default Solutions;
