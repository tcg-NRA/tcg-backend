// tcg-backend/src/data/cards.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dkbr3jpmr',
  api_key: '528683194961272',
  api_secret: '8bjqyK9gkpBDgJleY6I5Gvz5xzM'
});

async function fetchCards() {
  try {
    const result = await cloudinary.search
      .expression('folder:cards_art')
      .sort_by('public_id', 'asc')
      .max_results(100)
      .execute();

    console.log("✅ Cloudinary search result:", result); // ADD THIS

    const cards = result.resources.map((img) => ({
      _id: img.public_id,
      name: img.public_id,
      art_url: img.secure_url
    }));

    return cards;
  } catch (err) {
    console.error('🔴 Error fetching Cloudinary cards:', err); // Already exists
    return [];
  }
}


module.exports = fetchCards;