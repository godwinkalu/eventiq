const  mongoose  = require('mongoose')

const hallbookingSchema =  new mongoose.Schema({
  hallId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hall',
    required: true
  },
  individualId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'individual',
    required: true
  },
  hallOwnerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'individual',
    required: true
  },
   Date:{
    type: Date,
    required:true
  },
   totalamount:{
    type: Number,
    required: true
  },
  servicecharge: {
  type: Number,
  default: 0
},
  paymentreference:{
    type: String,
    default: false
  },
  paymentstatus:{
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  bookingstatus:{
    type:String,
    enum:['pending','confirmed','cancelled', 'completed'],
    default:'pending'
  },
  notes:{
   type:String, 
   default:''
  },
  numberofguests:{
    type:Number,
    default:0
  }
 
},{timestamps:true})

const hallbookingModel = mongoose.model('hallbooking', hallbookingSchema)

module.exports = hallbookingModel