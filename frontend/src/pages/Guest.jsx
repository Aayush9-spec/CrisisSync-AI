import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  Shield, 
  CheckCircle, 
  Navigation, 
  MapPin, 
  Radio, 
  RefreshCw, 
  X,
  MessageSquare,
  Bot,
  Send,
  Zap,
  Camera,
  Eye,
  ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import { quickSOS, chatWithAI, uploadVisualIntel } from '../services/api';
import MapView from '../components/MapView';

const Guest = () => {
  const [status, setStatus] = useState('idle'); // idle, sending, success
  const [incidentId, setIncidentId] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', content: 'Operational. State your emergency or request tactical guidance.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [visualAnalysis, setVisualAnalysis] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleSOS = async () => {
    setStatus('sending');
    try {
      const res = await quickSOS({
        type: 'EMERGENCY',
        location: 'Lobby - Floor 1',
        description: 'Direct SOS Triggered from Guest Portal',
        reporter_name: 'Guest User',
        reporter_role: 'guest'
      });
      setIncidentId(res.data.incident.id);
      setTimeout(() => setStatus('success'), 1500);
    } catch (err) {
      console.error('SOS failed:', err);
      setStatus('idle');
      toast.error('Network Error. Find nearest staff.');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !incidentId) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setIsUploading(true);
      toast.loading('AI Analyzing Visual Threat...', { id: 'vision' });
      try {
        const res = await uploadVisualIntel(incidentId, base64);
        setVisualAnalysis(res.data.visual_intel.visual_analysis);
        toast.success('Visual Intelligence Verified', { id: 'vision' });
      } catch (err) {
        toast.error('Visual Analysis Failed', { id: 'vision' });
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
    setChatLoading(true);
    try {
      const res = await chatWithAI({ message: msg, role: 'guest', context: 'Guest SOS Portal' });
      setChatMessages(prev => [...prev, { role: 'bot', content: res.data.response }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'bot', content: 'Signal interference. Use SOS.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-accent rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-info rounded-full blur-[120px]"></div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' || status === 'sending' ? (
          <motion.div 
            key="sos"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-12 w-full max-w-sm relative z-10"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-black text-brand-accent uppercase tracking-[0.3em]">
                <Radio size={12} className="animate-pulse" />
                RAPID RESPONSE ACTIVE
              </div>
              <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">EMERGENCY<br/>HUB</h1>
              <p className="text-gray-500 font-medium text-sm px-4 leading-relaxed">
                Tap the SOS button for immediate tactical assistance. Security will be dispatched to your location instantly.
              </p>
            </div>

            <div className="relative flex items-center justify-center py-4">
              <AnimatePresence>
                {status === 'idle' && (
                  <>
                    <motion.div 
                      animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.2, 0.1] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className="absolute w-64 h-64 bg-brand-accent rounded-full blur-3xl"
                    />
                  </>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={status === 'sending'}
                onClick={handleSOS}
                className={`
                  relative z-10 w-64 h-64 rounded-full flex flex-col items-center justify-center gap-4 transition-all duration-500
                  border-8 border-brand-dark shadow-[0_0_80px_rgba(239,68,68,0.4)]
                  ${status === 'sending' ? 'bg-gray-800' : 'bg-brand-accent hover:bg-red-600'}
                `}
              >
                {status === 'sending' ? (
                  <RefreshCw className="animate-spin text-white" size={64} />
                ) : (
                  <AlertCircle size={84} className="text-white drop-shadow-2xl" />
                )}
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-white tracking-tighter">SOS</span>
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none mt-1">Press To Alert</span>
                </div>
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMap(true)}
                className="glass p-6 rounded-3xl flex flex-col items-center gap-3 cursor-pointer hover:bg-white/5 border border-white/5 transition-all"
              >
                <div className="p-3 bg-brand-info/10 rounded-2xl text-brand-info">
                  <MapPin size={24} />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Tactical Map</span>
              </motion.div>
              <motion.div 
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChat(true)}
                className="glass p-6 rounded-3xl flex flex-col items-center gap-3 cursor-pointer hover:bg-white/5 border border-white/5 transition-all"
              >
                <div className="p-3 bg-brand-success/10 rounded-2xl text-brand-success">
                  <MessageSquare size={24} />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">AI Guidance</span>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 w-full max-w-sm relative z-10"
          >
            <div className="w-32 h-32 bg-brand-success/20 rounded-full flex items-center justify-center mx-auto border-4 border-brand-success/30 shadow-[0_0_60px_rgba(34,197,94,0.3)]">
              <CheckCircle size={64} className="text-brand-success" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">UNITS<br/>EN ROUTE</h2>
              <p className="text-gray-400 font-medium px-6 leading-relaxed text-center">
                Security and tactical medical units have been dispatched.
              </p>
            </div>

            {/* Unique Feature: AI Vision Intelligence */}
            <div className="p-6 glass rounded-[2.5rem] border border-white/5 space-y-4 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                  <Camera size={14} /> AI Visual Intel
                </div>
                {visualAnalysis && (
                  <div className="flex items-center gap-1 text-[8px] font-black text-brand-success uppercase">
                    <ShieldCheck size={10} /> Verified
                  </div>
                )}
              </div>
              
              {visualAnalysis ? (
                <div className="space-y-3">
                  <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                    <p className="text-[11px] text-gray-300 leading-tight italic text-left">
                      "{visualAnalysis}"
                    </p>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase text-gray-400"
                  >
                    Update Visual Feed
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-tight text-center">
                    Upload a photo for AI analysis to confirm threat type and urgency.
                  </p>
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    disabled={isUploading}
                    className="btn btn-primary w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                  >
                    {isUploading ? <RefreshCw className="animate-spin" size={16} /> : <Eye size={16} />}
                    Tactical Snap
                  </button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            <div className="p-6 glass rounded-[2.5rem] border-l-4 border-brand-info space-y-4 text-left w-full">
              <div className="flex items-center gap-2 text-brand-info font-black text-[10px] uppercase tracking-widest">
                <Navigation size={14} className="animate-pulse" /> Live Tracking
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} className="h-full w-1/3 bg-brand-info shadow-[0_0_15px_#3b82f6]" />
              </div>
            </div>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setShowChat(true)}
                className="btn glass flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-brand-success/20 text-brand-success"
              >
                <MessageSquare size={14} /> AI Guidance
              </button>
              <button 
                onClick={() => setStatus('idle')} 
                className="btn glass flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100"
              >
                Cancel Alert
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Overlay */}
      <AnimatePresence>
        {showMap && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-2xl p-6 md:p-12"
          >
            <div className="h-full w-full flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <MapPin className="text-brand-info" size={24} />
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Tactical Awareness Map</h3>
                </div>
                <button onClick={() => setShowMap(false)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
                <MapView incidents={[]} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Overlay */}
      <AnimatePresence>
        {showChat && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-2xl p-6 md:p-12 flex flex-col"
          >
            <div className="max-w-2xl mx-auto w-full h-full flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Bot className="text-brand-success" size={24} />
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">AI Tactical Guidance</h3>
                </div>
                <button onClick={() => setShowChat(false)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 glass rounded-[2.5rem] flex flex-col overflow-hidden border border-white/10 shadow-2xl">
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  {chatMessages.map((m, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-5 rounded-3xl text-sm font-medium leading-relaxed ${
                        m.role === 'user' ? 'bg-brand-info text-white rounded-tr-none' : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                      }`}>
                        {m.content}
                      </div>
                    </motion.div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 p-5 rounded-3xl rounded-tl-none border border-white/5">
                        <RefreshCw className="animate-spin text-brand-info" size={20} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8 bg-white/5 border-t border-white/5">
                  <div className="relative flex items-center gap-4">
                    <input 
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                      placeholder="Request guidance..."
                      className="flex-1 bg-brand-dark/50 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-brand-info/50 transition-all text-white"
                    />
                    <button 
                      onClick={handleChatSend}
                      disabled={chatLoading || !chatInput.trim()}
                      className="w-14 h-14 rounded-2xl bg-brand-info flex items-center justify-center text-white shadow-xl shadow-brand-info/20 disabled:opacity-50"
                    >
                      <Send size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Guest;
