// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Load raw card data (each object has at least `name` and `art_url`)
const cards = require('./data/cards');

// ─── CORS Middleware ────────────────────────────────────────────
app.use(cors({
  origin: 'https://tcg-frontend.netlify.app'
}));

// ─── Health Check Route ─────────────────────────────────────────
app.get('/health', (req, res) => {
  res.send('OK');
});

// ─── Cards Route: add `image_name` to each card ─────────────────
app.get('/api/cards', (req, res) => {
  try {
    const cardsWithImageName = cards.map(card => {
      // art_url might look like:
      // https://res.cloudinary.com/dbkr3jpmr/image/upload/.../cards/tw_013_2_vtl97f.png
      const url = card.art_url || '';
      // grab "tw_013_2_vtl97f.png" then strip ".png"
      const fileName = url.split('/').pop()       // "tw_013_2_vtl97f.png"
                           .split('.')[0]         // "tw_013_2_vtl97f"
                           || 'unknown_card';      // fallback

      return {
        ...card,
        image_name: fileName
      };
    });

    res.json(cardsWithImageName);

  } catch (err) {
    console.error("🔴 Error in /api/cards:", err);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// ─── Start Server ───────────────────────────────────────────────
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
