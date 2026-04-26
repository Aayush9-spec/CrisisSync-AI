import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PublicNavbar from './components/PublicNavbar';

// Pages
import Home from './pages/Home';
import Platform from './pages/Platform';
import Solutions from './pages/Solutions';
import Resources from './pages/Resources';
import Company from './pages/Company';
import Pricing from './pages/Pricing';
import Demo from './pages/Demo';
import Dashboard from './pages/Dashboard';
import Guest from './pages/Guest';
import { Analytics, History, Settings } from './pages/PlaceholderPages';

// Scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Wrapper to decide which Navbar/Sidebar to show
const Layout = ({ children, role, setRole }) => {
  const location = useLocation();
  const isPublicPage = ['/', '/platform', '/solutions', '/resources', '/company', '/pricing', '/demo'].includes(location.pathname);
  const isDashboardPage = ['/dashboard', '/incidents', '/analytics', '/history', '/settings'].includes(location.pathname);
  const isGuestPortal = location.pathname === '/guest' || location.pathname === '/sos';

  return (
    <div className="flex min-h-screen bg-brand-dark text-gray-200 selection:bg-brand-info/30 selection:text-white overflow-x-hidden">
      <ScrollToTop />
      
      {/* Sidebar - Only on Dashboard */}
      {isDashboardPage && (role === 'staff' || role === 'manager') && <Sidebar />}
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Navbar Selection */}
        {isPublicPage && <PublicNavbar />}
        {isDashboardPage && (role === 'staff' || role === 'manager') && (
          <Navbar role={role} setRole={setRole} />
        )}

        <main className={`flex-1 ${isPublicPage ? 'pt-0' : ''}`}>
          {children}
        </main>
        
        {/* Persona Switcher - Fixed at bottom left */}
        <div className="fixed bottom-6 left-6 z-[60] flex gap-2">
          <div className="glass p-1.5 rounded-2xl flex items-center gap-1 shadow-2xl border-white/10 backdrop-blur-2xl">
            {[
              { id: 'guest', label: 'Guest', path: '/guest' },
              { id: 'staff', label: 'Staff', path: '/dashboard' },
              { id: 'manager', label: 'Manager', path: '/dashboard' }
            ].map(r => (
              <button 
                key={r.id}
                onClick={() => {
                  setRole(r.id);
                  window.location.href = r.path; // Force navigation for cleaner role switch
                }}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${role === r.id ? 'bg-brand-info text-white shadow-lg shadow-brand-info/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
          <div className="glass p-12 rounded-[3rem] space-y-6 border-white/5">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">System Failure</h1>
            <p className="text-gray-500 font-medium">Critical node error. The AI core is recalibrating.</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary px-10 py-4 rounded-2xl uppercase tracking-widest text-xs">Reboot System</button>
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
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'glass !bg-brand-surface !text-white !border-white/10 !rounded-2xl !p-4 !font-bold',
            duration: 5000,
          }}
        />
        <Layout role={role} setRole={setRole}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/company" element={<Company />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/demo" element={<Demo />} />

            {/* Application Routes */}
            <Route path="/guest" element={<Guest />} />
            <Route path="/sos" element={<Navigate to="/guest" />} />
            
            <Route path="/dashboard" element={<Dashboard role={role} />} />
            <Route path="/incidents" element={<Dashboard role={role} />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
