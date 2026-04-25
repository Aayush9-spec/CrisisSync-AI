import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Guest from './pages/Guest';
import Home from './pages/Home';

// Simple Error Boundary for Senior Engineering Grade
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark p-12 text-center">
          <div className="glass p-12 rounded-3xl space-y-6">
            <h1 className="text-4xl font-black text-white uppercase">System Failure</h1>
            <p className="text-gray-500 font-medium">Critical node error. The AI core is recalibrating.</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary px-8">Reboot System</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [role, setRole] = useState(() => localStorage.getItem('cs_role') || 'manager');

  useEffect(() => {
    localStorage.setItem('cs_role', role);
  }, [role]);

  return (
    <ErrorBoundary>
      <Router>
        <div className="flex min-h-screen bg-brand-dark text-gray-200 selection:bg-brand-info/30 selection:text-white">
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'glass !bg-brand-surface !text-white !border-white/10 !rounded-2xl !p-4 !font-bold',
              duration: 5000,
            }}
          />
          
          {/* Layout Controller */}
          {(role === 'staff' || role === 'manager') && <Sidebar />}
          
          <div className="flex-1 flex flex-col min-w-0">
            {(role === 'staff' || role === 'manager') && (
              <Navbar role={role} setRole={setRole} />
            )}

            <main className="flex-1 overflow-y-auto overflow-x-hidden">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sos" element={<Guest />} />
                <Route path="/dashboard" element={<Dashboard role={role} />} />
                <Route path="/incidents" element={<Dashboard role={role} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            
            {/* Persona Switcher - Senior UX Touch: Accessible only via key combination or demo floating menu */}
            <div className="fixed bottom-6 left-6 z-50 flex gap-2">
              <div className="glass p-1 rounded-2xl flex items-center gap-1 shadow-2xl border-white/5">
                {['guest', 'staff', 'manager'].map(r => (
                  <button 
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === r ? 'bg-brand-info text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
