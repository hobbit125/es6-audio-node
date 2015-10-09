import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// Create a basic express application
const app = express();

// Set express up to automatically parse incoming JSON requests
// into the request object
app.use(bodyParser.json());

// Set up static content paths
app.use('/jspm_packages', express.static(`${__dirname}/../jspm_packages`));
app.use('/dist-client', express.static(`${__dirname}/../dist-client`));
app.use('/assets', express.static(`${__dirname}/../assets`));

// Any request without a path should render index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../index.html`));
});

// Any request to /config.js should render the root config.js
app.get('/config.js', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../config.js`));
});

// Store the app globally for convenience
global.app = app;

// Start the web server
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server listening at http://${host}:${port}`);
});
