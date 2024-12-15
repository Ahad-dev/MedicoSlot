const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: null
    },
    CNIC:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['Patient','Doctor','Admin'],
        default:'Patient'
    },
    password:{
        type: String,
        required: true
    },


}, {
    timestamps: true
});

//Patient Schema
const patientSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        default: []
    }],

})

//Doctor Schema
const doctorSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: false
    }],
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    availability_days: {
        type: [String],
        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"]
    },
    available_timeslots: {
        type: [String],
        default: ["9:00 AM - 12:00 PM","12:00 PM - 4:00 PM"]
    },
})

const User = mongoose.model('User', userSchema);

const Patient = mongoose.model('Patient', patientSchema);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports =  { User, Patient, Doctor };
