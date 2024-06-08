const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instruments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' }]
});

module.exports = mongoose.model('Watchlist', watchlistSchema);
