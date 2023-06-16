const express = require('express');
const bodyParser = require('body-parser');
const playersData = require('./players.json');

const app = express();
app.use(bodyParser.json());

// Add a new player
app.post('/players', (req, res) => {
  const newPlayer = req.body;
  playersData.push(newPlayer);
  res.status(201).json({ message: 'Player added successfully', player: newPlayer });
});

// Delete a player by ID
app.delete('/players/:name', (req, res) => {
    const playerName = req.params.name;
    const playerIndex = playersData.findIndex(player => player.name === playerName);
  
    if (playerIndex !== -1) {
      const deletedPlayer = playersData.splice(playerIndex, 1);
      res.status(200).json({ message: 'Player deleted successfully', player: deletedPlayer });
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  });

// Update a player by ID
app.put('/players/:name', (req, res) => {
    const playerName = req.params.name;
    const updatedPlayer = req.body;
    const playerIndex = playersData.findIndex(player => player.name === playerName);
  
    if (playerIndex !== -1) {
      playersData[playerIndex] = { ...playersData[playerIndex], ...updatedPlayer };
      res.status(200).json({ message: 'Player updated successfully', player: playersData[playerIndex] });
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  });

// Retrieve all players
app.get('/players', (req, res) => {
  res.status(200).json(playersData);
});


// Utility function to find player with the most value for a given property
function findPlayerWithMost(property) {
  let maxPlayer = null;
  for (const player of playersData) {
    if (!maxPlayer || player[property] > maxPlayer[property]) {
      maxPlayer = player;
    }
  }
  return maxPlayer;
}

// Get the player with the most goals
app.get('/players/most-goals', (req, res) => {
  const maxGoalsPlayer = findPlayerWithMost('goals');
  res.status(200).json(maxGoalsPlayer);
});

// Get the player with the most assists
app.get('/players/most-assists', (req, res) => {
  const maxAssistsPlayer = findPlayerWithMost('assists');
  res.status(200).json(maxAssistsPlayer);
});

// Get the player with the most chances created
app.get('/players/most-chances-created', (req, res) => {
  const maxChancesCreatedPlayer = findPlayerWithMost('chancesCreated');
  res.status(200).json(maxChancesCreatedPlayer);
});

// Get the player with the most interceptions
app.get('/players/most-interceptions', (req, res) => {
  const maxInterceptionsPlayer = findPlayerWithMost('interceptions');
  res.status(200).json(maxInterceptionsPlayer);
});

// Get the player with the most minutes played
app.get('/players/most-minutes-played', (req, res) => {
  const maxMinutesPlayedPlayer = findPlayerWithMost('minutesPlayed');
  res.status(200).json(maxMinutesPlayedPlayer);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
