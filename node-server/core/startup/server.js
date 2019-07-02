'use strict';
// require http modules first
const http = require('http');
//import app.js file
const app = require('./app');

// define port to be used
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const config = require('./config')

server.listen(port, () => {
    console.log("Server restarted successfully " + port)
});


function stop() {

    server.close();
    console.log("Server stopped Successfully");
}
module.exports = server;
module.exports.stop = stop;