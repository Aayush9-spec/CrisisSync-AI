import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Globe2, ShieldCheck } from 'lucide-react';

const Company = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto space-y-48">
      <section className="max-w-4xl space-y-12">
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-6xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8]"
        >
          Securing the <br /> <span className="text-gradient-primary">Future.</span>
        </motion.h1>
        <p className="text-gray-400 text-2xl font-medium leading-relaxed">
          CrisisSync AI was founded on a simple premise: technology should protect life without friction. We are building the world's most advanced safety intelligence platform.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass p-16 rounded-[3rem] space-y-8">
          <div className="w-16 h-16 bg-brand-info/10 rounded-2xl flex items-center justify-center text-brand-info">
            <Target size={32} />
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Our Mission</h2>
          <p className="text-gray-500 text-lg leading-relaxed font-medium">
            To provide every property owner with the tools necessary to safeguard their guests and assets through autonomous intelligence and seamless coordination.
          </p>
        </div>
        <div className="glass p-16 rounded-[3rem] space-y-8">
          <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent">
            <Eye size={32} />
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Our Vision</h2>
          <p className="text-gray-500 text-lg leading-relaxed font-medium">
            A world where emergencies are resolved before they escalate, enabled by a global network of CrisisSync AI nodes working in perfect synchronization.
          </p>
        </div>
      </div>

      <section className="space-y-16">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter text-center">Global Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Active Nodes", val: "45k+" },
            { label: "Lives Protected", val: "12M+" },
            { label: "Countries", val: "84" },
            { label: "Response Time", val: "0.4s" }
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-5xl lg:text-7xl font-black text-white tracking-tighter">{stat.val}</div>
              <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="glass rounded-[3rem] p-12 lg:p-24 bg-brand-info/5 border-brand-info/10 flex flex-col items-center text-center space-y-8">
        <ShieldCheck size={64} className="text-brand-info" />
        <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter">Join the Protocol</h2>
        <p className="text-gray-400 max-w-2xl font-medium">
          We're looking for world-class engineers, designers, and security experts to help us build the next generation of safety intelligence.
        </p>
        <button className="btn btn-primary px-12 py-4 rounded-2xl text-sm font-black uppercase tracking-widest">View Openings</button>
      </div>
    </div>
  );
};

export default Company;
