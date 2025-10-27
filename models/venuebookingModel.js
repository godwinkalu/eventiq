const  mongoose  = require('mongoose')

const venuebookingSchema =  new mongoose.Schema({
  venueId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'venues',
    required: true
  },
  clientId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients',
    required: true
  },
  venueOwnerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'venueOwners',
    required: true
  },
   date:{
    type: String,
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
   cautionfeestatus: {
   type: String,
    enum: ['pending', 'refunded'],
    default: 'pending',
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

const venuebookingModel = mongoose.model('venuebooking', venuebookingSchema)

module.exports = venuebookingModel