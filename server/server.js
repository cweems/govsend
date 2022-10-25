require('dotenv').config({ path: '../.env' })

var http = require('http');
var net = require('net');
var URL = require('url').URL;

var host = process.env.PROXY_HOST || '0.0.0.0';
var port = process.env.PROXY_PORT || 443

// Create an HTTP tunneling proxy
var proxy = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
  console.log(req, res);
});

proxy.on('connect', (req, clientSocket, head) => {
  console.log('Proxy received incoming connect request.\n\n');
  console.log(req.headers);
  const {port, hostname} = new URL(`http://${req.url}`);
  const serverSocket = net.connect(port || 80, hostname, () => {
    console.log(`\n\nEstablishing proxy connection to ${hostname} on port ${port}.\n\n`);

    clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

// Now that proxy is running
proxy.listen(port, host, (req, res) => {
    console.log('Listning for incoming connections on ' + host + ':' + port);
});