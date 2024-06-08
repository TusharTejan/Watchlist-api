const mongoose = require('mongoose');

const instrumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  token: { type: String, required: true },
  categoryId: { type: String, required: true },
  expiry: { type: Date, required: true }
});

module.exports = mongoose.model('Instrument', instrumentSchema);
