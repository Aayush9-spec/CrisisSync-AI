import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const PublicNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Platform', path: '/platform' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Resources', path: '/resources' },
    { name: 'Company', path: '/company' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between">
      <div className="max-w-[1920px] mx-auto w-full flex items-center justify-between px-8 py-4 glass rounded-3xl border-white/5">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-info rounded-xl flex items-center justify-center shadow-lg shadow-brand-info/20 group-hover:scale-110 transition-transform duration-500">
            <Shield size={24} className="text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase">CrisisSync AI</span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-white ${
                isActive(link.path) ? 'text-brand-info' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/Aayush9-spec/CrisisSync-AI" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          >
            GitHub
          </a>
          <button 
            onClick={() => navigate('/demo')}
            className="btn btn-primary px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:scale-105 transition-all duration-300 shadow-2xl shadow-brand-info/20"
          >
            Book a Demo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
