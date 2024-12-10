const { Schema,model } = require("mongoose");

const tokenSchema = new Schema({    
    appointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    time_slot: {
        type: String,
        required: true
    },
});

const Token = model('Token', tokenSchema);

module.exports = Token;