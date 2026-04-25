import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet + Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ incidents }) => {
  // Default center (can be property coordinates)
  const center = [13.0827, 80.2707]; // Example: Chennai coordinates

  const getMarkerIcon = (severity) => {
    const color = severity === 'CRITICAL' ? '#ef4444' : severity === 'HIGH' ? '#f59e0b' : '#3b82f6';
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px ${color};"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  };

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer center={center} zoom={15} className="h-full w-full" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {incidents.filter(inc => inc.status !== 'RESOLVED').map(incident => (
          <Marker 
            key={incident.id} 
            position={center} // In a real app, use incident.lat/lng
            icon={getMarkerIcon(incident.severity)}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <div className="font-bold text-brand-dark">{incident.type}</div>
                <div className="text-[10px] text-gray-500 uppercase">{incident.location}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute bottom-6 right-6 z-[1000] glass p-4 rounded-2xl flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-white tracking-widest">
          <span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_5px_#ef4444]"></span> Critical
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-white tracking-widest">
          <span className="w-2 h-2 rounded-full bg-brand-warning shadow-[0_0_5px_#f59e0b]"></span> Warning
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-white tracking-widest">
          <span className="w-2 h-2 rounded-full bg-brand-info shadow-[0_0_5px_#3b82f6]"></span> Active
        </div>
      </div>
    </div>
  );
};

export default MapView;
