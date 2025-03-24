const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    phone: { type: String, required: true},
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', reportSchema);
