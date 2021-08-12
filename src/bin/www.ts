#!/usr/bin/env node

/**
 * Module dependencies.
 */

// import http from 'http'
import app from '../app';

/**
 * Get port from environment and store in Express.
 */

const PORT = normalizePort(process.env.PORT || '3000');
app.set('port', PORT);

/**
 * Create HTTP server.
 */

// const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen(PORT);
// server.on('error', onError);
// server.on('listening', onListening);

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
