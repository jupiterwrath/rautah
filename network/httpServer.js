  var PORT = 80; // ignore this error.
  var http = require('http'),
      util = require('./httpUtils'),
      server = http.createServer(util.handleRequest);

server.listen(PORT, function(){
  console.log(
    "\nServer listening on: http://localhost:%s\n"+
    "\n--- DATE ---------- TIME -----------------"+
    "---- IP --------------- REQUEST ---",
    PORT);
});
