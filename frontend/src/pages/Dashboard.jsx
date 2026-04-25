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
  Target,
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { connectSocket, subscribeToEvents } from '../services/socket';
import { getIncidents, simulateIncident, updateIncidentStatus, getAnalytics } from '../services/api';
import IncidentCard from '../components/IncidentCard';
import StatCard from '../components/StatCard';
import MapView from '../components/MapView';
import ActivityFeed from '../components/ActivityFeed';

const DashboardSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-pulse">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="glass h-32 rounded-2xl bg-white/5"></div>
    ))}
  </div>
);

const IncidentSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {[1, 2].map(i => (
      <div key={i} className="glass h-64 rounded-2xl bg-white/5 border border-white/5"></div>
    ))}
  </div>
);

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
        toast.error(`${event.data.type} DETECTED: ${event.data.location}`, {
          icon: <ShieldAlert className="text-brand-accent" />,
          style: { border: '2px solid rgba(239, 68, 68, 0.3)' }
        });
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
        toast.success(`Unit Response: Incident ${event.data.new_status}`, {
          icon: <Shield className="text-brand-info" />
        });
        setActivity(prev => [{
          type: 'STATUS_UPDATE',
          message: `Incident marked as ${event.data.new_status}`,
          timestamp: new Date()
        }, ...prev.slice(0, 19)]);
        fetchData();
      }
    });

    return () => unsubscribe();
  }, [role]);

  const handleRespond = async (id) => {
    toast.promise(updateIncidentStatus(id, { status: 'IN_PROGRESS', updated_by: 'Command Ops' }), {
      loading: 'Deploying Unit...',
      success: 'Unit En Route',
      error: 'Dispatch Failed'
    });
  };

  const handleResolve = async (id) => {
    toast.promise(updateIncidentStatus(id, { status: 'RESOLVED', updated_by: 'Command Ops' }), {
      loading: 'Verifying Resolution...',
      success: 'Area Verified Secure',
      error: 'Verification Failed'
    });
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
    <div className="max-w-[1920px] mx-auto p-6 lg:p-12 space-y-12">
      {/* Dynamic Stats View */}
      {loading && !stats ? <DashboardSkeleton /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard icon={AlertCircle} label="Active Alerts" value={stats?.active || 0} trend="up" trendValue="12" color="bg-brand-accent" delay={0.1} />
          <StatCard icon={Navigation} label="Responding" value={stats?.in_progress || 0} trend="up" trendValue="5" color="bg-brand-info" delay={0.2} />
          <StatCard icon={CheckCircle} label="Resolved" value={stats?.resolved || 0} trend="up" trendValue="24" color="bg-brand-success" delay={0.3} />
          <StatCard icon={Activity} label="Response Time" value={`${stats?.avg_response_time || 0}s`} trend="down" trendValue="8" color="bg-purple-500" delay={0.4} />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-brand-accent/20 p-3 rounded-2xl">
                <LayoutDashboard className="text-brand-accent" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none">Operational Feed</h2>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Live Intelligence Node</p>
              </div>
            </div>
            {role === 'manager' && (
              <button onClick={handleSimulate} disabled={isSimulating} className="btn glass border-brand-accent/20 hover:bg-brand-accent/10 text-brand-accent group">
                {isSimulating ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} className="group-hover:scale-125 transition-transform" />}
                <span className="text-[10px] uppercase font-black tracking-widest">Execute Simulation</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {loading ? <IncidentSkeleton /> : incidents.filter(inc => inc.status !== 'RESOLVED').map(incident => (
                <IncidentCard 
                  key={incident.id} 
                  incident={incident} 
                  role={role} 
                  onRespond={handleRespond} 
                  onResolve={handleResolve} 
                />
              ))}
            </AnimatePresence>
            
            {!loading && incidents.filter(inc => inc.status !== 'RESOLVED').length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full h-96 glass rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5">
                <div className="w-24 h-24 rounded-full bg-brand-success/10 flex items-center justify-center mb-6">
                  <Shield size={48} className="text-brand-success/50" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Property Integrity Verified</h3>
                <p className="text-gray-500 font-medium max-w-sm mt-2">The AI core reports no active threats. Monitoring active nodes.</p>
              </motion.div>
            )}
          </div>

          <div className="h-[500px] glass rounded-[2.5rem] overflow-hidden relative group border border-white/5 shadow-2xl">
            <div className="absolute top-8 left-8 z-10 flex items-center gap-3 bg-brand-dark/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
              <Target size={20} className="text-brand-accent" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Geospatial Intelligence</span>
            </div>
            <MapView incidents={incidents} />
          </div>
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="h-[600px]">
            <ActivityFeed events={activity} />
          </div>
          
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6 bg-gradient-to-br from-brand-surface to-brand-dark">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Global Comms</h4>
              <span className="text-[10px] font-black text-brand-success uppercase">Encrypted</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></div>
                <span className="text-xs font-bold text-gray-200">Broadcast Protocol Alpha</span>
              </div>
              <button className="btn btn-primary w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:shadow-indigo-500/40">
                Initiate Property Lock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
