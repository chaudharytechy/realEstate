const mongoose=require('mongoose')

const AboutSchema= new mongoose.Schema({
    about_image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    heading1:{
        type:String,
        required:true
    },
    descripation1:{
        type:String,
        required:true
    },
    heading2:{
        type:String,
        required:true 
    },
    descripation2:{
        type:String,
        required:true
    },

})
const AboutModel=mongoose.model('about',AboutSchema)
module.exports=AboutModel