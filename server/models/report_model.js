const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    filePath: {
        type: String,
    },
    prescription: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;