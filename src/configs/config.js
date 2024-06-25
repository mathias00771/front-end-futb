import io from 'socket.io-client'
import OBSWebSocket from 'obs-websocket-js'

export const PORT = 4000;

let obs = null; // Variable para almacenar la instancia de OBSWebSocket
let isConnected = false; // Estado para indicar si la conexión está activa


export const socket = io('https://backendfut.onrender.com', {
    path: '/socket.io',
    withCredentials: true, // Para enviar cookies y credenciales
    
});

export const connectToOBS = async (serverAddress, password) => {
  try {
      if (isConnected) {
          console.log('Already connected to OBS');
          return obs; // Si ya estamos conectados, devolvemos la instancia existente
      }

      obs = new OBSWebSocket();
      await obs.connect(serverAddress, password, {rejectUnauthorized: false});
      console.log(`Connected to server at ${serverAddress}`);
      isConnected = true; // Marcamos que la conexión está activa
      return obs;
  } catch (error) {
      console.error('Failed to connect', error);
      throw error;
  }
};

export const getObsInstance = () => {
  if (!obs) {
      throw new Error('OBS WebSocket instance not initialized. Call connectToOBS first.');
  }
  return obs;
};

export const disconnectFromOBS = () => {
  if (obs && isConnected) {
      obs.disconnect();
      obs = null;
      isConnected = false;
      console.log('Disconnected from OBS');
  }
};

export const isOBSConnected = () => {
  return isConnected;
};
