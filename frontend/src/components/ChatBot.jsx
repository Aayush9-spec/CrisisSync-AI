import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, X, MessageSquare } from 'lucide-react';
import { chatWithAI } from '../services/api';

const ChatBot = ({ role = 'guest', context = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am CrisisSync AI. How can I help you in this emergency?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      console.error('Chat AI failed:', error);
      setMessages(prev => [...prev, { role: 'bot', content: 'I am sorry, I am having trouble connecting. Please follow staff instructions.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="btn btn-primary rounded-full w-14 h-14 p-0 shadow-2xl animate-bounce"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="glass w-80 md:w-96 h-[500px] flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-indigo-500/10">
            <div className="flex items-center gap-2">
              <Bot className="text-indigo-400" size={20} />
              <span className="font-bold">CrisisSync AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
                  <Loader2 className="animate-spin text-indigo-400" size={16} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="btn btn-primary p-2 rounded-lg"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
