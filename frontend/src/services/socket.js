let socket = null;
let listeners = [];

export const connectSocket = (role = 'guest') => {
  const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';
  
  if (socket) {
    socket.close();
  }

  socket = new WebSocket(`${WS_URL}?role=${role}`);

  socket.onopen = () => {
    console.log(`Connected to CrisisSync WS as ${role}`);
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      listeners.forEach(callback => callback(data));
    } catch (error) {
      console.error('WS Message Error:', error);
      listeners.forEach(callback => callback({ type: 'MESSAGE', data: event.data }));
    }
  };

  socket.onclose = () => {
    console.log('Disconnected from CrisisSync WS');
    // Simple reconnect logic
    setTimeout(() => connectSocket(role), 3000);
  };

  socket.onerror = (error) => {
    console.error('WS Socket Error:', error);
  };
};

export const subscribeToEvents = (callback) => {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
};

export const sendMessage = (data) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
};
