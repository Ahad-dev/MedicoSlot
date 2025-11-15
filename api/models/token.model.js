const { Schema,model } = require("mongoose");

const tokenSchema = new Schema({    
    appointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    day: {
        type: String,
        required: true
    },
    time_slot: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

const Token = model('Token', tokenSchema);

module.exports = Token;