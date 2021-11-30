const dotenv = require('dotenv').config({ path: './src/config/config.env' });

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

const name = 'Aaron Gibson';

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name,
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'This is the help message!',
    name,
  });
});

app.get('/weather', (req, res) => {
  const { address = '' } = req.query;

  if (!address) return res.send({ error: 'Please enter an address query' });

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecast) => {
      if (error) return res.send({ error });
      res.send({ forecast, location, address });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search)
    return res.send({ error: 'Please enter a search query' });

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res, next) => {
  res.status(404).render('404', {
    title: 'Help article not found',
    message: 'This article does not exist.',
    name,
  });
});

app.get('*', (req, res, next) => {
  res.status(404).render('404', {
    title: '404 Page Not Found',
    message: 'The page does not exist.',
    name,
  });
});

const PORT = process.env.NODE_ENV === 'development' ? 3000 : process.env.PORT;
app.listen(PORT, () => {
  console.log('Running on port ' + PORT);
});
