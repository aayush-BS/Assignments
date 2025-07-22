const express = require('express');
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');

const app = express();
const PORT = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', mainRoutes);

app.use((req, res) => {
  res.status(404).type('text').send('404 - Page Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
