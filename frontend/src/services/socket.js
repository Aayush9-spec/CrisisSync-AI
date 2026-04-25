const WS_URL = import.meta.env.VITE_WS_URL || 'wss://crisis-sync-backend-112365499000.us-central1.run.app/ws';

let socket = null;
let listeners = [];

export const connectSocket = (role) => {
  if (socket) {
    socket.close();
  }

  const url = `${WS_URL}/${role}/${Math.random().toString(36).substring(7)}`;
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log(`[WS] Connected as ${role}`);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    listeners.forEach(callback => callback(data));
  };

  socket.onclose = () => {
    console.log('[WS] Disconnected');
    // Simple reconnect
    setTimeout(() => connectSocket(role), 3000);
  };

  socket.onerror = (err) => {
    console.error('[WS] Error:', err);
  };
};

export const subscribeToEvents = (callback) => {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
};

export const disconnectSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
