const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: false
    },
    tag: {
        type: String,
        required: true
    },
    capacity : {
        type: Number,
        required : true
    },
    maxWeigth: {
        type: Number,
        required: true
    },
    color : { 
     type: String,
     required : true
    },
    currentLocation: {
            locationID: { 
                type : String,
                required : false
            },
            locationLng : {
                type: String,
                required : false
            }, 
            locationLat : {
                type: String,
                required : false
            }
    }
});

module.exports = Vehicle = mongoose.model("Vehicle", VehicleSchema);