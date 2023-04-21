const mongoose=require('mongoose')

const AgentSchema= new mongoose.Schema({
    agent_image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    name:{
        type:String,
        required:true
    },
    descripation:{
        type:String,
        required:true
    },
   email:{
    type:String,
    required:true
   },
   phone_number:{
    type:String,
    required:true
   }

},{timestamps:true})
const AgentModel=mongoose.model('agent',AgentSchema)
module.exports=AgentModel