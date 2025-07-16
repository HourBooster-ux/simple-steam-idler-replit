const steamUser = require('steam-user');
const keep_alive = require('./keep_alive.js');

const games = [730, 440, 570];
const status = 1;

const accounts = [];

// Dynamically collect accounts from env variables
for (let i = 1; ; i++) {
  const username = process.env[`username${i}`];
  const password = process.env[`password${i}`];

  if (!username || !password) break;  // stop if no more accounts

  accounts.push({ username, password });
}

if (accounts.length === 0) {
  console.error('No accounts found in environment variables.');
  process.exit(1);
}

accounts.forEach(({ username, password }) => {
  const user = new steamUser();

  user.logOn({ accountName: username, password: password });

  user.on('loggedOn', () => {
    console.log(`${username} - Successfully logged on`);
    user.setPersona(status);
    user.gamesPlayed(games);
  });

  user.on('error', (err) => {
    console.error(`${username} - Error:`, err);
  });
});



