import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ShieldCheck, PlayCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Demo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Tactical request received. Coordinating briefing...');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight">
              Request a <br /> <span className="text-gradient-primary">Briefing.</span>
            </h1>
            <p className="text-gray-500 text-xl font-medium leading-relaxed max-w-lg">
              Experience the power of CrisisSync AI. Schedule a 1-on-1 tactical demo with our security engineers.
            </p>
          </div>

          <div className="space-y-8">
            {[
              "Live incident simulation walkthrough",
              "Custom property risk assessment",
              "Hardware integration consultation",
              "Deployment timeline & ROI analysis"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 text-white font-bold uppercase text-xs tracking-widest">
                <div className="w-8 h-8 rounded-lg bg-brand-info/10 flex items-center justify-center text-brand-info">
                  <ShieldCheck size={18} />
                </div>
                {text}
              </div>
            ))}
          </div>

          <button className="flex items-center gap-4 p-6 glass rounded-3xl group hover:bg-white/5 transition-all">
            <PlayCircle size={48} className="text-brand-info group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Instant Preview</div>
              <div className="text-lg font-bold text-white uppercase">Watch Platform Overview</div>
            </div>
          </button>
        </div>

        <div className="glass p-12 lg:p-16 rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-info"></div>
          
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-[500px] flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="w-24 h-24 bg-brand-success/10 rounded-full flex items-center justify-center text-brand-success">
                <CheckCircle2 size={64} />
              </div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Request Received</h2>
              <p className="text-gray-500 font-medium">A tactical coordinator will contact you at {formData.email} within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-brand-info font-black uppercase text-xs tracking-widest hover:underline">Send another request</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. John Wick"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-brand-info transition-colors font-medium"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Work Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@continental.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-brand-info transition-colors font-medium"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Company / Venue Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="The Continental"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-brand-info transition-colors font-medium"
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Briefly describe your property</label>
                  <textarea 
                    rows="4"
                    placeholder="Tell us about your security needs..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-brand-info transition-colors font-medium resize-none"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" className="w-full btn btn-primary py-6 rounded-2xl text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 group">
                Submit Request <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
