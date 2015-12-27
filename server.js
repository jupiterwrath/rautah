var path = require('path');
global.appRoot = path.resolve(__dirname);

var config = require(appRoot + '/conf/server');
var util = require(appRoot + '/lib/httpUtils');
var http = require('http');
var server = http.createServer(util.handleRequest);

var serverListenAddress = config.server.bind.address || 'localhost';
var serverListenPort = config.server.bind.port || 80;

server.listen(serverListenPort, serverListenAddress, function(){
  console.log(
    "\nServer listening on: http://%s:%s\n"+
    "\n--- DATE ---------- TIME -----------------"+
    "---- IP --------------- REQUEST ---",
    serverListenAddress, serverListenPort);
});
