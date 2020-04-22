const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    concertId : { type: String, required: true },
});

module.exports = new mongoose.model('Workshop', workshopSchema);