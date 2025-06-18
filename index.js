const express = require('express');
const cors = require('cors');
const fetchCards = require('./src/data/cards'); // Live-fetching from Cloudinary

const app = express();
const port = process.env.PORT || 5000;

// ─── CORS Middleware ────────────────────────────────────────────
app.use(cors({
  origin: 'https://tcg-frontend.netlify.app'
}));

// ─── Health Check Route ─────────────────────────────────────────
app.get('/health', (req, res) => {
  res.send('OK');
});

// ─── Cards Route: add `image_name` to each card ─────────────────
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await fetchCards(); // get live cards from Cloudinary

    const cardsWithImageName = cards.map(card => {
      const url = card.art_url || '';
      const fileName = url.split('/').pop()?.split('.')[0] || 'unknown_card';

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
