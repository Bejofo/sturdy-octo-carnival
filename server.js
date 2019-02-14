const express = require('express');
const WebSocket = require('ws');

const SocketServer = WebSocket.Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', function connection(ws) {
  console.log('WS opened');
  ws.on('message', function incoming(data) {
    console.log(data);
    // Broadcast to everyone else.
	if(message.split('|')[0] === process.env.key){
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.split('|')[1]);
      }
    });
  }
  });
});