const mongoose = require('mongoose')

const hallSchema = new mongoose.Schema({
  hallownerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'hallOwners',
    required:true
  },
  hallname:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  capacity:{
    type:Number,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  type:{
    type:String,
    enum:['indoor', 'outdoor', 'rooftop', 'marquee', 'multipurpose'],
    default:'indoor',
  },
  amenities:{
    type:[String],
    default:[],
  },
  image:[{
    url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
  }],
  isfeatured:{
    type:Boolean,
    default:false
  },
  rating:{
    type:Number,
    default:0
  },
  isavailable:{
    type:Boolean,
    default:true
  },
}, {timestamps:true})

const hallModel = mongoose.model('hall', hallSchema)

module.exports = hallModel