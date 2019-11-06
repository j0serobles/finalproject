const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    personType: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    address1 : {
        type: String,
        required : true
    },
    address2: {
        type: String,
        required: true
    },
    addressCity : { 
     type: String,
     required : true
    },
    addressState: {
        type: String,
        required: true
    },
    addressZip: {
        type: String,
        required: true
    },
    addressZip5: {
        type: String,
        required: true
    },
    driverID: {
        type: String,
        required: false 
    },
    driverIDExpire: {
        type: Date,
        required: false
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        required: false
    }
});

module.exports = Person = mongoose.model("Person", PersonSchema);