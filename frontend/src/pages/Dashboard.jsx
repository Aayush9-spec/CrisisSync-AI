import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Activity, 
  Shield, 
  CheckCircle, 
  Plus, 
  RefreshCw,
  Zap,
  Navigation,
  Target
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
          message: `${event.data.type} detected at ${event.data.location}`,
          timestamp: new Date()
        }, ...prev.slice(0, 19)]);
        fetchData();
      } else if (event.type === 'STATUS_UPDATE') {
        setIncidents(prev => prev.map(inc => 
          inc.id === event.data.incident_id ? { ...inc, status: event.data.new_status } : inc
        ));
        setActivity(prev => [{
          type: 'STATUS_UPDATE',
          message: `Incident ${event.data.incident_id.substring(0, 8)} marked as ${event.data.new_status}`,
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
    <div className="flex flex-col gap-8 p-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          icon={AlertCircle} 
          label="Active Alerts" 
          value={stats?.active || 0} 
          trend="up" 
          trendValue="12" 
          color="bg-brand-accent" 
          delay={0.1}
        />
        <StatCard 
          icon={Navigation} 
          label="Responding" 
          value={stats?.in_progress || 0} 
          trend="up" 
          trendValue="5" 
          color="bg-brand-info" 
          delay={0.2}
        />
        <StatCard 
          icon={CheckCircle} 
          label="Resolved Today" 
          value={stats?.resolved || 0} 
          trend="up" 
          trendValue="24" 
          color="bg-brand-success" 
          delay={0.3}
        />
        <StatCard 
          icon={Activity} 
          label="Avg Response" 
          value={`${stats?.avg_response_time || 0}s`} 
          trend="down" 
          trendValue="8" 
          color="bg-purple-500" 
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 min-h-[600px]">
        {/* Left Column: Live Feed */}
        <div className="xl:col-span-8 space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-brand-accent rounded-full"></div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Incident Nexus</h2>
            </div>
            {role === 'manager' && (
              <button 
                onClick={handleSimulate}
                disabled={isSimulating}
                className="btn glass text-[10px] font-black uppercase tracking-widest hover:bg-white/5"
              >
                {isSimulating ? <RefreshCw className="animate-spin" size={14} /> : <Zap size={14} className="text-brand-warning" />}
                Trigger Simulation
              </button>
            )}
          </div>

          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <RefreshCw className="animate-spin text-brand-info" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="col-span-full h-64 glass rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-success/10 flex items-center justify-center text-brand-success">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">All Sectors Secure</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">No active threats detected</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Map View Integration */}
          <div className="h-[400px] glass rounded-3xl overflow-hidden relative group">
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-brand-dark/80 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
              <Target size={16} className="text-brand-accent" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Geospatial Awareness</span>
            </div>
            <MapView incidents={incidents} />
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="flex-1">
            <ActivityFeed events={activity} />
          </div>
          
          <div className="glass p-6 rounded-3xl space-y-4">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Personnel</h4>
            <div className="flex -space-x-3 overflow-hidden">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-brand-surface bg-brand-dark flex items-center justify-center font-bold text-[10px] text-gray-400">
                  U-{i}
                </div>
              ))}
              <div className="flex items-center justify-center h-10 w-10 rounded-full ring-4 ring-brand-surface bg-white/5 text-[10px] font-bold text-gray-400">
                +12
              </div>
            </div>
            <button className="btn btn-primary w-full py-3 text-xs uppercase tracking-[0.2em]">
              Dispatch Global Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
