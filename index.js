// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Simple health check route
app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});