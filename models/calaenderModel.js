const mongoose = require('mongoose')

const calaenderSchema  = new mongoose.Schema({
  month:{
    type:String,
     enum:['january','february','march', "april", 'may','june','july','august','september','october','november', 'december'],
  },
  dayofweek:{
    type:String,
    enum:['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  },
  status:{
    type:String,
    enum:['available','notavailable'],
    default:'available'
  }
}, {timestamps:true})

const calaenderModel = mongoose.model('calaender', calaenderSchema)

module.exports = calaenderModel