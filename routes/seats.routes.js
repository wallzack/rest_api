const express = require('express');
const router = express.Router();
const db = require('../db.js');
const uuidv4 = require('uuid/v4');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id - 1]);
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuidv4();
  const isTaken = db.seats.some(el => el.seat === seat && el.day === day);

  if (isTaken) {
    res.status(403).json({ message: 'The slot is already taken...'});
  } else {
    res.json(db.seats.push({ id: id, day: day, seat: seat, client: client, email: email }));
    req.io.emit('seatsUpdated', db.seats);
  }
});

router.route('/seats:id').delete((req, res) => {
  res.json({ message: 'ok' });
});

router.route('/seats/:id').put((req, res) => {
  res.json({ message: 'ok' });
});

module.exports = router;