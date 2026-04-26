import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, ShieldCheck, Globe, Database } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass p-10 rounded-[2.5rem] space-y-6 hover:bg-white/5 transition-all duration-500 border border-white/5"
  >
    <div className="w-16 h-16 bg-brand-info/10 rounded-2xl flex items-center justify-center text-brand-info">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h3>
    <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
  </motion.div>
);

const Platform = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto space-y-32">
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-info/10 border border-brand-info/20 text-[10px] font-black text-brand-info uppercase tracking-[0.3em]"
        >
          <Cpu size={14} />
          System Architecture
        </motion.div>
        <h1 className="text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none">
          The Intelligence <br /> <span className="text-gradient-primary">Engine.</span>
        </h1>
        <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">
          CrisisSync AI is built on a proprietary neural mesh that processes millions of data points per second to ensure total property security.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Zap}
          title="AI Detection"
          desc="Real-time behavioral analysis and anomaly detection using edge computing nodes deployed across your property."
          delay={0.1}
        />
        <FeatureCard 
          icon={Activity}
          title="Real-time Coordination"
          desc="Automated incident dispatch and tactical communication between staff members without manual intervention."
          delay={0.2}
        />
        <FeatureCard 
          icon={Database}
          title="Unified Core"
          desc="Centralized data lake that aggregates CCTV, sensor data, and staff reports into a single actionable truth."
          delay={0.3}
        />
      </div>

      <section className="glass rounded-[3rem] p-12 lg:p-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-info/20 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter">
              Dashboard <br /> Intelligence
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Our intuitive control center provides a 360-degree view of your operations. Heatmaps, live status tracking, and predictive threat modeling are all available at your fingertips.
            </p>
            <div className="space-y-4">
              {[
                "Sub-second latency visualization",
                "Predictive incident modeling",
                "Automated protocol execution",
                "Multi-property synchronization"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white font-bold uppercase text-xs tracking-widest">
                  <ShieldCheck size={16} className="text-brand-success" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-3xl p-2 border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
            <div className="bg-brand-dark rounded-2xl h-[400px] flex items-center justify-center border border-white/5">
                <span className="text-brand-info/20 font-black text-4xl uppercase tracking-tighter">Preview Image</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Platform;
