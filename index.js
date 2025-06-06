// index.js
const express = require('express');
const cors = require('cors'); // ← Add this

const app = express();
const port = process.env.PORT || 5000;

// ─── CORS Middleware ────────────────────────────────────────────
// Allow requests only from your frontend (Netlify)
app.use(cors({
  origin: 'https://tcg-frontend.netlify.app'
}));

// ─── Health Check Route ─────────────────────────────────────────
app.get('/health', (req, res) => {
  res.send('OK');
});

// ─── Start Server ───────────────────────────────────────────────
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});