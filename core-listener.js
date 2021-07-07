const net = require('net');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Mission Control Server Waiting For Commands');
  res.end();
}).listen(8666);
