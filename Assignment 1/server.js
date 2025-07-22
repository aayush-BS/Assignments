const http = require('http');
const handleRoutes = require('./routeHandler');

const server = http.createServer(handleRoutes);

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
