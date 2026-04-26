import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Video, Play, Download, HelpCircle } from 'lucide-react';

const ResourceCard = ({ icon: Icon, type, title, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="glass group p-8 rounded-3xl space-y-6 hover:bg-white/5 transition-all duration-500 cursor-pointer border-white/5"
  >
    <div className="flex justify-between items-start">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-brand-info transition-colors">
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{type}</span>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-white uppercase tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm font-medium">Detailed documentation and technical specs for CrisisSync AI Core.</p>
    </div>
    <div className="flex items-center gap-2 text-[10px] font-black text-brand-info uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
      Access Content <Play size={10} />
    </div>
  </motion.div>
);

const Resources = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto space-y-32">
      <section className="text-center space-y-8">
        <h1 className="text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter">
          Knowledge <br /> <span className="text-gradient-primary">Database.</span>
        </h1>
        <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">
          Access technical documentation, implementation guides, and operational case studies.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResourceCard icon={FileText} type="Documentation" title="API Reference & Integration" delay={0.1} />
        <ResourceCard icon={BookOpen} type="Guide" title="Operational Playbooks" delay={0.2} />
        <ResourceCard icon={Video} type="Training" title="Staff Certification Course" delay={0.3} />
        <ResourceCard icon={HelpCircle} type="Support" title="System Troubleshooting" delay={0.4} />
      </div>

      <section className="glass rounded-[3rem] p-12 lg:p-24 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">How it Works</h2>
            <p className="text-gray-500 max-w-md">Understand the lifecycle of an incident from detection to resolution within the CrisisSync mesh.</p>
          </div>
          <button className="btn btn-primary px-8 py-3 rounded-xl text-xs uppercase tracking-widest">Download Overview PDF</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Ingestion", desc: "Sensors and AI nodes scan for anomalies across the property perimeter." },
            { step: "02", title: "Triage", desc: "The AI Core classifies the threat level and activates specific response protocols." },
            { step: "03", title: "Response", desc: "Tactical units are dispatched and guests receive guided evacuation instructions." }
          ].map((item, i) => (
            <div key={i} className="space-y-6 relative">
              <span className="text-8xl font-black text-white/5 absolute -top-8 -left-4 select-none">{item.step}</span>
              <h3 className="text-2xl font-black text-white uppercase relative z-10">{item.title}</h3>
              <p className="text-gray-500 font-medium relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resources;
