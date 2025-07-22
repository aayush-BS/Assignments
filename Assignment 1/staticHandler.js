const fs = require('fs');
const path = require('path');

function staticHandler(req, res) {
  const filePath = path.join(__dirname, req.url);
  const ext = path.extname(filePath);

  const contentType = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.css': 'text/css',
    '.js': 'application/javascript',
  }[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - File Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

module.exports = staticHandler;