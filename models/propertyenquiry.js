const mongoose=require('mongoose')

const CustomerSchema= new mongoose.Schema({

    property_name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    name:{
        type:String ,
        reqiured:true
    },
    email:{
        type:String ,
        reqiured:true
    },
    phone:{
        type:String ,
        reqiured:true
    },
},{timestamps:true})

const CustomerModel=mongoose.model('customer',CustomerSchema)
module.exports=CustomerModel