import React, { useState, useEffect } from 'react';
import { connectSocket, subscribeToEvents } from '../services/socket';
import { getIncidents, simulateIncident, updateIncidentStatus, getAnalytics } from '../services/api';
import IncidentCard from '../components/IncidentCard';
import { Activity, Shield, AlertCircle, CheckCircle, Plus, RefreshCw, BarChart3, Bell, Zap, TrendingUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const fetchData = async () => {
    try {
      const [incidentsRes, statsRes] = await Promise.all([
        getIncidents(),
        getAnalytics()
      ]);
      setIncidents(incidentsRes.data.incidents);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    connectSocket('manager');
    
    const unsubscribe = subscribeToEvents((event) => {
      if (event.type === 'NEW_INCIDENT') {
        setIncidents(prev => [event.data, ...prev]);
        fetchData();
      } else if (event.type === 'STATUS_UPDATE') {
        setIncidents(prev => prev.map(inc => 
          inc.id === event.data.incident_id ? { ...inc, status: event.data.new_status } : inc
        ));
        fetchData();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      await simulateIncident();
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateIncidentStatus(id, { status, updated_by: 'Command Ops' });
    } catch (error) {
      console.error('Update status failed:', error);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color, delay }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-6 flex flex-col gap-4 overflow-hidden relative group"
    >
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-2xl ${color}`}></div>
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${color.replace('bg-', 'text-')}`}>
          <Icon size={24} />
        </div>
        <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">{label}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-4xl font-black tracking-tighter text-white">{value}</div>
        <div className="text-[10px] font-bold text-success flex items-center gap-1">
          <TrendingUp size={10} /> +2.4%
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-[1600px] mx-auto p-6 md:p-12 space-y-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
            <Zap size={12} className="animate-pulse" />
            AI Operations Active
          </div>
          <h1 className="heading-xl">COMMAND<br/><span className="text-gradient-primary">CENTER</span></h1>
          <p className="text-muted text-lg max-w-xl font-medium leading-relaxed">
            Real-time emergency intelligence and response coordination for premium hospitality venues. 
            AI-driven prioritization for immediate life-safety actions.
          </p>
        </div>
        
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSimulate} 
            disabled={isSimulating}
            className="btn-premium glass-card text-white hover:bg-white/10"
          >
            {isSimulating ? <RefreshCw className="animate-spin" size={18} /> : <Plus size={18} />}
            Trigger Simulation
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-premium btn-premium-primary"
          >
            <Bell size={18} />
            Alert Property
          </motion.button>
        </div>
      </motion.div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={AlertCircle} label="Active Alerts" value={stats?.active || 0} color="bg-red-500" delay={0.1} />
        <StatCard icon={Activity} label="Avg Response" value={`${stats?.avg_response_time || 0}s`} color="bg-indigo-500" delay={0.2} />
        <StatCard icon={Shield} label="Deployed Units" value={stats?.in_progress || 0} color="bg-amber-500" delay={0.3} />
        <StatCard icon={Users} label="Total Managed" value={stats?.total_incidents || 0} color="bg-emerald-500" delay={0.4} />
      </div>

      {/* Operational Hub */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Incident Feed */}
        <div className="xl:col-span-8 space-y-8">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
              Live Operations Feed
            </h2>
            <div className="flex items-center gap-4 text-[10px] font-black text-muted uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Critical
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Active
              </span>
            </div>
          </div>
          
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <motion.div key="loader" className="flex-center p-32">
                  <RefreshCw className="animate-spin text-indigo-500" size={64} />
                </motion.div>
              ) : incidents.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-24 text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex-center mx-auto border border-emerald-500/20">
                    <CheckCircle size={48} className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">All Clear</h3>
                    <p className="text-muted mt-2">No active emergencies detected across the property.</p>
                  </div>
                </motion.div>
              ) : (
                incidents.map(incident => (
                  <div key={incident.id} className="relative group">
                    <IncidentCard 
                      incident={incident} 
                      onClick={() => setSelectedIncident(incident)}
                    />
                    
                    <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      {incident.status === 'ACTIVE' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleUpdateStatus(incident.id, 'IN_PROGRESS'); }}
                          className="btn-premium btn-premium-primary py-2 px-4 text-xs"
                        >
                          Deploy
                        </button>
                      )}
                      {incident.status === 'IN_PROGRESS' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleUpdateStatus(incident.id, 'RESOLVED'); }}
                          className="btn-premium bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 text-xs"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="xl:col-span-4">
          <motion.div 
            className="glass-card p-8 sticky top-32 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="text-indigo-400" size={24} />
              <h2 className="text-xl font-extrabold tracking-tight">AI Intelligence</h2>
            </div>
            
            <AnimatePresence mode="wait">
              {selectedIncident ? (
                <motion.div 
                  key={selectedIncident.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 block">Incident Signature</label>
                    <div className="text-2xl font-extrabold text-white">{selectedIncident.type}</div>
                    <div className="text-xs font-bold text-indigo-400 mt-1 uppercase tracking-tighter">ID: {selectedIncident.id}</div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={12} /> AI Strategy Analysis
                    </label>
                    <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 leading-relaxed text-sm italic text-indigo-100">
                      "{selectedIncident.ai_analysis || 'Generating deep analysis...'}"
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest">Tactical Recommendations</label>
                    <div className="space-y-3">
                      {(selectedIncident.ai_recommendations || []).map((rec, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-3 text-sm font-medium text-gray-300 items-start"
                        >
                          <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex-center flex-shrink-0 text-[10px] font-black text-indigo-400">
                            {i + 1}
                          </div>
                          {rec}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-3 block">Deployment Registry</label>
                    <div className="flex flex-wrap gap-2">
                      {(selectedIncident.assigned_to || []).map((team, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-black border border-white/10 uppercase tracking-wider text-white">
                          {team}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex-center mx-auto border border-white/10">
                    <Shield size={32} className="text-white/20" />
                  </div>
                  <p className="text-sm font-medium text-muted max-w-[200px] mx-auto">
                    Select an operational incident from the feed to unlock AI intelligence and tactical insights.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
