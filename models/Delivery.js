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
    origLocation: {
        lat : {
            type: String,
            required: true
        },
        lng : {
            type : String,
            required : true
        }
    },
    destLocation: {
        lat : {
            type: String,
            required: true
        },
        lng : {
            type : String,
            required : true
        }
    },
    destLocationID: {
        type: String,
        required: true
    },
    origLocationID: {
        type: String,
        required: true
    },
    destLocationID: {
        type: String,
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
    itemAmount : {
        type: Number,
        required: false, 
        default: 1
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
    distance : {
        type : Number,
        required: true
    },
    totalCost : {
        type : Number,
        required: true
    },
    estimatedDuration : {
        type : String,
        required: true
    },
    actualDuration : {
        type : String,
        required: true
    },
    customer: { 
       type: Schema.Types.ObjectId,
       required: false
    },
    deliveryDate: {
        type: Date,
        default: Date.now
    },
    notes : {
        type: String,
        required: false
    },
});

module.exports = Delivery = mongoose.model("Delivery", DeliverySchema);