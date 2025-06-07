// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Load card data
const cards = require('./data/cards');

// ─── CORS Middleware ────────────────────────────────────────────
app.use(cors({
  origin: 'https://tcg-frontend.netlify.app'
}));

// ─── Health Check Route ─────────────────────────────────────────
app.get('/health', (req, res) => {
  res.send('OK');
});

// ─── API: Get all cards ─────────────────────────────────────────
app.get('/api/cards', (req, res) => {
  res.json(cards);
});

// ─── Start Server ───────────────────────────────────────────────
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});