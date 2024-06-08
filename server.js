require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Instrument = require('./models/Instrument');
const Watchlist = require('./models/Watchlist');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// CRUD Operations for Instruments
app.post('/instruments', async (req, res) => {
  try {
    const instrument = new Instrument(req.body);
    await instrument.save();
    res.status(201).json(instrument);
  } catch (error) {
    res.status(500).json({ message: 'Error creating instrument', error });
  }
});

app.get('/instruments/:id', async (req, res) => {
  try {
    const instrument = await Instrument.findById(req.params.id);
    if (!instrument) {
      return res.status(404).json({ message: 'Instrument not found' });
    }
    res.json(instrument);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving instrument', error });
  }
});

app.put('/instruments/:id', async (req, res) => {
  try {
    const instrument = await Instrument.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!instrument) {
      return res.status(404).json({ message: 'Instrument not found' });
    }
    res.json(instrument);
  } catch (error) {
    res.status(500).json({ message: 'Error updating instrument', error });
  }
});

app.delete('/instruments/:id', async (req, res) => {
  try {
    await Instrument.findByIdAndDelete(req.params.id);
    res.json({ message: 'Instrument deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting instrument', error });
  }
});

// Add/Remove API for Watchlist
app.post('/watchlists/:watchlistId/instruments', async (req, res) => {
  try {
    const watchlist = await Watchlist.findById(req.params.watchlistId);
    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }
    watchlist.instruments.push(req.body.instrumentId);
    await watchlist.save();
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Error adding instrument to watchlist', error });
  }
});

app.delete('/watchlists/:watchlistId/instruments/:instrumentId', async (req, res) => {
  try {
    const watchlist = await Watchlist.findById(req.params.watchlistId);
    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }
    watchlist.instruments.pull(req.params.instrumentId);
    await watchlist.save();
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Error removing instrument from watchlist', error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
