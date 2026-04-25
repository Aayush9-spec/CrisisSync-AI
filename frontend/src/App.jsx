import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GuestPortal from './pages/GuestPortal';
import Dashboard from './pages/Dashboard';

import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sos" element={<GuestPortal />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        
        {/* Footer info for hackathon demo */}
        <footer className="p-8 text-center text-xs text-muted/50 uppercase tracking-widest pointer-events-none">
          CrisisSync AI &bull; Google Solution Challenge 2026 &bull; Build with AI
        </footer>
      </div>
    </Router>
  );
}

export default App;
