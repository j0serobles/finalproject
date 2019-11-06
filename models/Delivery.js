const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
    origAddress: {
        type: String,
        required: false
    },
    destAddress: {
        type: String,
        required: false
    },
    origLocationID: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    driver : {
        type: Schema.Types.ObjectId,
        required: false
    },
    itemDescription : {
        type: String,
        required: true
    },
    itemWeight : {
        type: Number,
        required: false
    },
    itemWeightUnits : {
        type: String,
        required: false
    },
    itemVolume : {
        type: Number,
        required: false
    },
    itemVolUnits : {
        type: String,
        required : false
    },
    totalCost : {
        type : Number,
        required: true
    },
    duration : {
        type : Number,
        required: true
    },
    customer: { 
       type: Schema.Types.ObjectId,
       required: true
    },
    deliveryDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Delivery = mongoose.model("Delivery", DeliverySchema);