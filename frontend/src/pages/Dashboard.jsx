import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Activity, 
  Shield, 
  CheckCircle, 
  Zap,
  Navigation,
  Target,
  RefreshCw,
  Cpu,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { connectSocket, subscribeToEvents } from '../services/socket';
import { getIncidents, simulateIncident, updateIncidentStatus, getAnalytics } from '../services/api';
import IncidentCard from '../components/IncidentCard';
import StatCard from '../components/StatCard';
import MapView from '../components/MapView';
import ActivityFeed from '../components/ActivityFeed';

const Dashboard = ({ role }) => {
  const [incidents, setIncidents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const fetchData = async () => {
    try {
      const [incRes, statRes] = await Promise.all([
        getIncidents(),
        getAnalytics()
      ]);
      setIncidents(incRes.data.incidents);
      setStats(statRes.data);
    } catch (err) {
      console.error('Fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    connectSocket(role);

    const unsubscribe = subscribeToEvents((event) => {
      if (event.type === 'NEW_INCIDENT') {
        setIncidents(prev => [event.data, ...prev]);
        setActivity(prev => [{
          type: 'NEW_EVENT',
          message: `${event.data.type} detected at ${event.data.location}. Initializing containment.`,
          timestamp: new Date()
        }, ...prev.slice(0, 19)]);
        fetchData();
      } else if (event.type === 'STATUS_UPDATE') {
        setIncidents(prev => prev.map(inc => 
          inc.id === event.data.incident_id ? { ...inc, status: event.data.new_status } : inc
        ));
        setActivity(prev => [{
          type: 'STATUS_UPDATE',
          message: `Incident ${event.data.incident_id.substring(0, 8)} status updated to ${event.data.new_status}.`,
          timestamp: new Date()
        }, ...prev.slice(0, 19)]);
        fetchData();
      }
    });

    return () => unsubscribe();
  }, [role]);

  const handleRespond = async (id) => {
    try {
      await updateIncidentStatus(id, { status: 'IN_PROGRESS', updated_by: 'Command Center' });
    } catch (err) {
      console.error('Respond failed:', err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await updateIncidentStatus(id, { status: 'RESOLVED', updated_by: 'Command Center' });
    } catch (err) {
      console.error('Resolve failed:', err);
    }
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      await simulateIncident();
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 p-10">
      {/* Hero Experience */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 relative overflow-hidden p-12 rounded-[3rem] futuristic-panel bg-grid"
      >
        <div className="scanline"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-info/10 rounded-full blur-[120px]"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px]"></div>

        <div className="relative z-10 space-y-4">
           <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 rounded-full bg-brand-info/10 border border-brand-info/20 cyber-text text-brand-info flex items-center gap-2">
                 <Radio size={14} className="animate-pulse" />
                 Tactical Matrix Initialized
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-info/30 to-transparent"></div>
           </div>
           
           <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
              Real-Time Crisis<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-info via-brand-purple to-brand-accent">Command Center</span>
           </h1>
           
           <div className="flex items-center justify-between">
              <p className="text-gray-500 font-bold max-w-xl text-lg uppercase tracking-widest leading-relaxed">
                 AI-powered emergency coordination across decentralized hospitality ecosystems.
              </p>
              
              {role === 'manager' && (
                <button 
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="btn-cyber glass group border-brand-warning/30 hover:border-brand-warning/60 text-brand-warning"
                >
                  <Zap size={16} className="group-hover:scale-125 transition-transform" />
                  GENERATE THREAT SIMULATION
                </button>
              )}
           </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <StatCard icon={AlertCircle} label="Active Alerts" value={stats?.active || 0} color="bg-brand-accent" delay={0.1} />
        <StatCard icon={Navigation} label="Responding Units" value={stats?.in_progress || 0} color="bg-brand-info" delay={0.2} />
        <StatCard icon={CheckCircle} label="Resolved Cases" value={stats?.resolved || 0} color="bg-brand-success" delay={0.3} />
        <StatCard icon={Cpu} label="Critical Intelligence" value={stats?.total_incidents || 0} color="bg-brand-purple" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Incident Nexus */}
        <div className="xl:col-span-8 space-y-10">
          <div className="flex items-center justify-between px-4">
             <div className="flex items-center gap-5">
                <Target size={24} className="text-brand-accent animate-spin-slow" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Tactical Nexus Feed</h2>
             </div>
             <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_#ff3131]"></div>
                   <span className="cyber-text text-gray-400">Critical</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-brand-info shadow-[0_0_8px_#00d2ff]"></div>
                   <span className="cyber-text text-gray-400">Tactical</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {incidents.filter(inc => inc.status !== 'RESOLVED').map(incident => (
                <IncidentCard 
                  key={incident.id}
                  incident={incident}
                  role={role}
                  onRespond={handleRespond}
                  onResolve={handleResolve}
                />
              ))}
            </AnimatePresence>
            
            {incidents.filter(inc => inc.status !== 'RESOLVED').length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full h-80 futuristic-panel flex flex-col items-center justify-center space-y-8 bg-grid group"
              >
                <div className="w-24 h-24 rounded-full bg-brand-success/10 flex items-center justify-center text-brand-success border-2 border-brand-success/20 group-hover:scale-110 transition-transform shadow-[0_0_50px_rgba(57,255,20,0.1)]">
                   <Shield size={48} />
                </div>
                <div className="text-center space-y-2">
                   <h3 className="text-2xl font-black text-white uppercase tracking-tight italic">Domain Fully Secured</h3>
                   <p className="cyber-text text-gray-500">Zero active threat signatures detected within property perimeter.</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Geospatial Awareness */}
          <div className="h-[500px] futuristic-panel bg-grid group">
             <div className="absolute top-8 left-8 z-10 px-6 py-2 glass rounded-2xl border border-white/10 flex items-center gap-3">
                <Target size={18} className="text-brand-info" />
                <span className="cyber-text text-white">Geospatial Awareness Hub</span>
             </div>
             <MapView incidents={incidents} />
          </div>
        </div>

        {/* Neural Link Sidebar */}
        <div className="xl:col-span-4 space-y-12">
          <div className="h-[700px]">
            <ActivityFeed events={activity} />
          </div>
          
          <div className="futuristic-panel p-10 space-y-8 bg-grid neon-glow-purple">
             <div className="flex items-center gap-3">
                <Cpu size={24} className="text-brand-purple" />
                <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">Intelligence Core</h4>
             </div>
             
             <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-brand-purple/5 border border-brand-purple/10 space-y-4">
                   <div className="flex justify-between cyber-text">
                      <span className="text-gray-500">Resource Load</span>
                      <span className="text-brand-purple">42%</span>
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '42%' }}
                        className="h-full bg-brand-purple"
                      />
                   </div>
                </div>

                <div className="p-5 rounded-2xl bg-brand-info/5 border border-brand-info/10 space-y-4">
                   <div className="flex justify-between cyber-text">
                      <span className="text-gray-500">Network Latency</span>
                      <span className="text-brand-info">12ms</span>
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '12%' }}
                        className="h-full bg-brand-info"
                      />
                   </div>
                </div>
             </div>

             <button className="btn-cyber w-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30 hover:bg-brand-purple hover:text-white shadow-[0_0_30px_rgba(188,19,254,0.1)]">
                INITIALIZE GLOBAL LOCKDOWN
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
