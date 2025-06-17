// tcg-backend/src/data/cards.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

async function fetchCards() {
  try {
    const result = await cloudinary.search
      .expression('folder:cards_art')
      .sort_by('public_id', 'asc')
      .max_results(100)
      .execute();

    const cards = result.resources.map((img) => ({
      _id: img.public_id,
      name: img.public_id,
      art_url: img.secure_url
    }));

    return cards;
  } catch (err) {
    console.error('🔴 Error fetching Cloudinary cards:', err);
    return [];
  }
}

module.exports = fetchCards;