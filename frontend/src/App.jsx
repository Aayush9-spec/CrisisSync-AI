import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Guest from './pages/Guest';

function App() {
  const [role, setRole] = useState('manager'); // default for demo

  return (
    <Router>
      <div className="flex min-h-screen bg-brand-dark text-gray-200">
        {/* Only show Sidebar and Navbar for Staff/Manager roles */}
        {(role === 'staff' || role === 'manager') && <Sidebar />}
        
        <div className="flex-1 flex flex-col">
          {(role === 'staff' || role === 'manager') && (
            <Navbar role={role} setRole={setRole} />
          )}

          <main className="flex-1 overflow-y-auto">
            <Routes>
              {/* Conditional Routing based on role */}
              {role === 'guest' ? (
                <>
                  <Route path="/" element={<Guest />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<Dashboard role={role} />} />
                  <Route path="/incidents" element={<Dashboard role={role} />} />
                  {/* For demo purposes, we map incidents to dashboard */}
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
            </Routes>
          </main>
          
          {/* Mobile Role Switcher for Guest view (Demo Only) */}
          {role === 'guest' && (
            <div className="fixed bottom-6 right-6 z-50">
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="bg-brand-surface border border-white/10 rounded-xl px-4 py-2 text-xs font-black uppercase text-brand-info outline-none shadow-2xl"
              >
                <option value="guest">Guest View</option>
                <option value="staff">Staff View</option>
                <option value="manager">Manager View</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
