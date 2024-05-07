import sample from 'lodash.sample';
import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'oh-so-not-meh',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];

// Display the homepage
app.get('/', (req, res) => {
  res.render('index.html');
});

// Display a form that asks for the user's name.
app.get('/hello', (req, res) => {
  res.render('hello.html');
});

// Handle the form from /hello and greet the user.
app.get('/greet', (req, res) => {
  const name = req.query.name || 'stranger';
  const compliment = sample(COMPLIMENTS);
  res.render('greet.html',{
    name: name,
    compliment: compliment
  });
});

app.get('/game', (req, res) => {
  const play = req.query.play;

  if (play === 'no') {
    return res.render('goodbye.html', {message: "Goodbye! You'll be missed"});
      } else if (play === 'yes'){
        res.render('game.html');
      }
});

app.post('/madlib', (req, res) => {
  const person = req.body.person;
  const color = req.body.color;
  const noun = req.body.noun;
  const adjective = req.body.adjective;

  res.render('madlib.html', {person, color, noun, adjective});
});





