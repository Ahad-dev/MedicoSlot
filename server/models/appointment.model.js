const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    token: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Token',
    },
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
    },
    status:{
        type:String,
        enum:["Pending","Completed","Canceled"]
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;