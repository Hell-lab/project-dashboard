const WebSocket = require('ws');

let wss;

const initializeWebSocketServer = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
      console.log(`Received message => ${message}`);
    });
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
};

const notifyClients = (message) => {
  if (!wss) {
    console.error('WebSocket server is not initialized.');
    return;
  }
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

module.exports = { initializeWebSocketServer, notifyClients };
