import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, X, MessageSquare, Zap, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAI } from '../services/api';

const ChatBot = ({ role = 'guest', context = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Operational. I am CrisisSync AI. State your emergency or request tactical guidance.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await chatWithAI({
        message: userMessage,
        role: role,
        context: context
      });
      setMessages(prev => [...prev, { role: 'bot', content: response.data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Signal interference detected. Please proceed to the nearest safe zone.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_15px_30px_rgba(99,102,241,0.4)] flex-center text-white border border-white/20 relative"
          >
            <MessageSquare size={28} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-4 border-bg-black"></span>
          </motion.button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="glass-card w-[400px] h-[600px] flex flex-col overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-white/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex-center text-indigo-400 border border-indigo-500/30">
                  <Bot size={22} />
                </div>
                <div>
                  <div className="font-black text-sm uppercase tracking-tight">CrisisSync AI</div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-success uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
                    Core Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-lg hover:bg-white/5 flex-center text-muted hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white font-medium shadow-lg rounded-tr-none' 
                      : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/10'
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                    <Loader2 className="animate-spin text-indigo-400" size={18} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-white/5 border-t border-white/5">
              <div className="relative flex items-center gap-3">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query system..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="w-12 h-12 rounded-xl bg-indigo-500 hover:bg-indigo-600 flex-center text-white shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </motion.button>
              </div>
              <div className="mt-3 flex justify-center">
                <div className="flex items-center gap-2 text-[8px] font-black text-muted uppercase tracking-[0.3em]">
                  <Zap size={8} /> Protected by Neural Defense
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
