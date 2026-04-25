import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

const SystemClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end font-mono">
      <div className="flex items-center gap-2 text-xl font-bold text-white text-glow-blue tracking-wider">
        <ClockIcon size={18} className="text-brand-info" />
        {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
      <div className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">
        UTC-5 &bull; {time.toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' })}
      </div>
    </div>
  );
};

export default SystemClock;
