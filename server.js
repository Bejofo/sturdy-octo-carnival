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
	if(data.split('|')[0] === process.env.key){
	console.log('authed');
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.split('|')[1]);
      }
    });
  }
  });
});