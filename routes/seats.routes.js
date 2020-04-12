const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const SeatController = require('../controllers/seats.controller');

router.route('/seats').get(SeatController.getAll);

router.route('/seats/:id').get(SeatController.getOne);

router.route('/seats').post(SeatController.post);

router.route('/seats/:id').delete(SeatController.delete);

router.route('/seats/:id').put(SeatController.put);

module.exports = router;