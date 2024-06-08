# Watchlist API

This is a simple API for managing instruments and watchlists with MongoDB as the database.

## Endpoints

### Instruments

- `POST /instruments` - Create a new instrument
- `GET /instruments/:id` - Get an instrument by ID
- `PUT /instruments/:id` - Update an instrument by ID
- `DELETE /instruments/:id` - Delete an instrument by ID

### Watchlists

- `POST /watchlists/:watchlistId/instruments` - Add an instrument to a watchlist
- `DELETE /watchlists/:watchlistId/instruments/:instrumentId` - Remove an instrument from a watchlist

## Usage

To start the server, follow these steps:

1. Install dependencies:

```sh
npm install
