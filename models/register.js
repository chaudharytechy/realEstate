const mongoose=require('mongoose')

const RegisterSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     role:{
      type:String,
      default:"user"
     },
     token:{
      type:String,
      default:''
     }
},{timestamps:true})
const RegisterModel=mongoose.model('register',RegisterSchema)
module.exports=RegisterModel