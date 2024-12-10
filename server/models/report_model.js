import { Schema,model } from "mongoose";

const reportSchema = new Schema({
    appointment: {
        type: Schema.Types.ObjectId,
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

const Report = model('Report', reportSchema);

export default Report;