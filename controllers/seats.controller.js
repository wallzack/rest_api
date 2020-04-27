const Seat = require('../models/seat.model.js');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {

  try {
    res.json(await Seat.find());
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {

  try {
    const seat = await Seat.findById(req.params.id);

    if (!seat) {
      res.status(404).json({ message: 'Seat not found...' });
    } else {
      res.json(seat);
    }
  } catch(err) {
    res.statu(500).json(err);
  }
};

exports.post = async (req, res) => {

  try {
    const cleanBody = sanitize(req.body);
    const { day, seat, client, email } = cleanBody;

    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    await newSeat.save();
    res.json(newSeat);
    req.io.emit('seatsUpdated', db.seats);
    
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {

  try {
    const seat = await(Seat.findById(req.params.id));

    if (!seat) {
      res.status(404).json({ message: 'Seat not found...' });
    } else {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(seat);
    }
  } catch(err) {
    res.status(500).json(err);
  }
  req.io.emit('seatsUpdated', db.seats);
};

exports.put = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const seatFound = await Seat.findById(req.params.id);

    if (!seatFound) {
      res.status(404).json({ message: 'Seat not found...' });
    } else {
      seatFound.day = day;
      seatFound.seat = seat,
      seatFound.client = client;
      seatFound.email = email;
      await seatFound.save();
      res.json(seatFound);
    }
  } catch(err) {
    res.status(500).json(err);
  }
};