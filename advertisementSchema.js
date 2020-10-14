const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Advertisement = new Schema({
    name : {
        type: String
    },
    nic: {
        type: String
    },
    deviceId: {
        type: String
    },
    model:{
        type: String
    },
    colour:{
        type:String 
    },
    brand:{
       type:String
    },
    price:{
        type:String
    },
    status:{
      type:String
    }

});

module.exports = mongoose.model('Advertisement', Advertisement);