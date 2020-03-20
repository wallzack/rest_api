const express = require('express');
const cors = require('cors');
const uuidv4 = require('uuid/v4');

const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[req.params.id - 1]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Oops... something went wrong...git' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});