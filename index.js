// Express Web Server

'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server })

wss.on('connection', function (ws) {
    const id = setInterval(function() {
        ws.send(JSON.stringify(process.memoryUsage()), function () {
            //
            // Ignore errors for now.
            //
        });
    }, 100); // milliseconds

    console.log('started client interval');

    ws.on('close', function () {
        console.log('stopping client interval');
        clearInterval(id);
    });
});

// Server listening for connections
server.listen(8080, function () {
    console.log('Listening on http://127.0.0.1:8080');
});
