import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Crown } from 'lucide-react';

const PricingCard = ({ plan, price, icon: Icon, features, recommended, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`glass p-12 rounded-[3rem] space-y-10 relative flex flex-col ${recommended ? 'border-brand-info/30 bg-brand-info/5 ring-1 ring-brand-info/20' : 'border-white/5'}`}
  >
    {recommended && (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-info rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-xl shadow-brand-info/20">
        Most Deployed
      </div>
    )}
    
    <div className="space-y-6">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${recommended ? 'bg-brand-info text-white' : 'bg-white/5 text-gray-400'}`}>
        <Icon size={32} />
      </div>
      <div>
        <h3 className="text-3xl font-black text-white uppercase tracking-tight">{plan}</h3>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-5xl font-black text-white tracking-tighter">${price}</span>
          <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">/ Node / Mo</span>
        </div>
      </div>
    </div>

    <div className="flex-1 space-y-6">
      <div className="h-[1px] w-full bg-white/5"></div>
      <ul className="space-y-4">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-400">
            <Check size={16} className="text-brand-success" />
            {f}
          </li>
        ))}
      </ul>
    </div>

    <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${recommended ? 'bg-brand-info text-white shadow-xl shadow-brand-info/20 hover:scale-[1.02]' : 'bg-white/5 text-white hover:bg-white/10'}`}>
      Deploy Protocol
    </button>
  </motion.div>
);

const Pricing = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto space-y-32">
      <section className="text-center space-y-8">
        <h1 className="text-6xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none">
          Scalable <br /> <span className="text-gradient-primary">Defense.</span>
        </h1>
        <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">
          Choose the deployment model that matches your property's scale and risk profile.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          plan="Basic"
          price="49"
          icon={Shield}
          features={[
            "Real-time Incident Dashboard",
            "SOS Guest Portal",
            "Basic AI Triage",
            "Email/SMS Notifications",
            "Up to 10 Active Staff"
          ]}
          delay={0.1}
        />
        <PricingCard 
          plan="Professional"
          price="129"
          icon={Zap}
          recommended
          features={[
            "Everything in Basic",
            "Predictive Threat Modeling",
            "Automated Dispatch mesh",
            "API Integration Access",
            "Advanced Analytics Core",
            "24/7 Tactical Support"
          ]}
          delay={0.2}
        />
        <PricingCard 
          plan="Enterprise"
          price="399"
          icon={Crown}
          features={[
            "Everything in Pro",
            "Multi-property Sync",
            "Custom ML Model Training",
            "On-premise Edge Processing",
            "White-labeled Guest Portal",
            "Dedicated Response Manager"
          ]}
          delay={0.3}
        />
      </div>

      <section className="glass p-12 rounded-[3rem] text-center space-y-6">
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Need a custom deployment?</h3>
        <p className="text-gray-500 max-w-lg mx-auto font-medium">For stadiums, airports, or city-scale implementations, contact our tactical solutions team for a custom quote.</p>
        <button className="text-brand-info font-black uppercase text-xs tracking-[0.3em] hover:underline">Contact Solutions &rarr;</button>
      </section>
    </div>
  );
};

export default Pricing;
