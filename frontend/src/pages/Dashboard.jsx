import React, { useState, useEffect } from 'react';
import { connectSocket, subscribeToEvents } from '../services/socket';
import { getIncidents, simulateIncident, updateIncidentStatus, getAnalytics } from '../services/api';
import IncidentCard from '../components/IncidentCard';
import { Activity, Shield, AlertCircle, CheckCircle, Plus, RefreshCw, BarChart3, Bell } from 'lucide-react';

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
        fetchData(); // Refresh stats
      } else if (event.type === 'STATUS_UPDATE') {
        setIncidents(prev => prev.map(inc => 
          inc.id === event.data.incident_id ? { ...inc, status: event.data.new_status } : inc
        ));
        fetchData(); // Refresh stats
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
      await updateIncidentStatus(id, { status, updated_by: 'Manager' });
      // WS will trigger update
    } catch (error) {
      console.error('Update status failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gradient uppercase tracking-tighter">Crisis Command</h1>
          <p className="text-muted flex items-center gap-2">
            <Activity size={16} className="text-success animate-pulse" />
            Live Property Monitoring Center
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSimulate} 
            disabled={isSimulating}
            className="btn btn-ghost"
          >
            {isSimulating ? <RefreshCw className="animate-spin" size={18} /> : <Plus size={18} />}
            Simulate Crisis
          </button>
          <button className="btn btn-primary">
            <Bell size={18} />
            Alert Teams
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted font-semibold uppercase">Active Cases</span>
            <AlertCircle className="text-red-500" size={20} />
          </div>
          <div className="text-3xl font-bold">{stats?.active || 0}</div>
        </div>
        <div className="glass p-6 border-l-4 border-indigo-500">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted font-semibold uppercase">Avg Response</span>
            <Activity className="text-indigo-500" size={20} />
          </div>
          <div className="text-3xl font-bold">{stats?.avg_response_time || 0}s</div>
        </div>
        <div className="glass p-6 border-l-4 border-warning">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted font-semibold uppercase">In Progress</span>
            <Shield className="text-warning" size={20} />
          </div>
          <div className="text-3xl font-bold">{stats?.in_progress || 0}</div>
        </div>
        <div className="glass p-6 border-l-4 border-success">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted font-semibold uppercase">Resolved</span>
            <CheckCircle className="text-success" size={20} />
          </div>
          <div className="text-3xl font-bold">{stats?.resolved || 0}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Incident List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity size={20} className="text-indigo-400" />
              Live Incident Feed
            </h2>
            <div className="text-xs text-muted">Auto-updating</div>
          </div>
          
          {loading ? (
            <div className="flex justify-center p-20">
              <RefreshCw className="animate-spin text-primary" size={48} />
            </div>
          ) : incidents.length === 0 ? (
            <div className="glass p-20 text-center space-y-4">
              <CheckCircle size={48} className="mx-auto text-success/50" />
              <p className="text-muted text-lg">No active crises. Property is secure.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {incidents.map(incident => (
                <div key={incident.id} className="relative">
                  <IncidentCard 
                    incident={incident} 
                    onClick={() => setSelectedIncident(incident)}
                  />
                  {incident.status !== 'RESOLVED' && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      {incident.status === 'ACTIVE' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleUpdateStatus(incident.id, 'IN_PROGRESS'); }}
                          className="btn btn-primary p-1 px-3 text-xs"
                        >
                          Respond
                        </button>
                      )}
                      {incident.status === 'IN_PROGRESS' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleUpdateStatus(incident.id, 'RESOLVED'); }}
                          className="btn btn-success p-1 px-3 text-xs"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar / AI Analysis */}
        <div className="space-y-6">
          <div className="glass p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-pink-400" />
              Incident Insights
            </h2>
            
            {selectedIncident ? (
              <div className="space-y-6 animate-slide-up">
                <div>
                  <label className="text-xs font-bold text-muted uppercase">Selected Incident</label>
                  <div className="text-lg font-bold">{selectedIncident.type}</div>
                </div>

                {selectedIncident.ai_analysis && (
                  <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                    <label className="text-xs font-bold text-indigo-400 uppercase flex items-center gap-1 mb-1">
                      <Shield size={12} /> AI Analysis
                    </label>
                    <p className="text-sm italic text-gray-300">
                      "{selectedIncident.ai_analysis}"
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-muted uppercase mb-2 block">Action Items</label>
                  <ul className="space-y-2">
                    {(selectedIncident.ai_recommendations || []).map((rec, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-300">
                        <span className="text-indigo-400 font-bold">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <label className="text-xs font-bold text-muted uppercase mb-2 block">Assigned Teams</label>
                  <div className="flex flex-wrap gap-2">
                    {(selectedIncident.assigned_to || []).map((team, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs border border-white/10 uppercase">
                        {team}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-muted space-y-2">
                <Shield size={32} className="mx-auto opacity-20" />
                <p className="text-sm">Select an incident to view AI recommendations and details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
