const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliveryEventSchema = new Schema({
    delivery: {
        type: Schema.Types.ObjectId,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = DeliveryEvent = mongoose.model("DeliveryEvent", DeliveryEventSchema);