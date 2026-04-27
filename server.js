const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css', 
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
  };
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'index.html'), (err2, data2) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data2);
      });
      return;
    }
    res.writeHead(200, {'Content-Type': contentTypes[ext] || 'text/plain'});
    res.end(data);
  });
}).listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
