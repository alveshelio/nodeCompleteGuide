const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Registering middleware
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method}: ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', 'utf8', (err) => {
    if (err) {
      throw Error(err);
    }
  });
  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// Registering Helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Express Website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About',
    welcomeMessage: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'There was a problem with your request'
  });
});

app.listen(3000, () => {
  console.log('Server is up in port 3000');
});
