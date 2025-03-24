const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    type: { type: String, required: true },
    userId:{type:String,required:true}, 
    description: { type: String, required: false },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    media: [String], // URLs for uploaded photos, videos, or audio
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);
