const mongoose=require('mongoose')

const connectDB=()=>{
    // mongodb://localhost:27017/property
    // return mongoose.connect('mongodb://localhost:27017/property')
    return mongoose.connect('mongodb+srv://amit8601396382:Amit12345@cluster0.q3gm7jt.mongodb.net/Property?retryWrites=true&w=majority')
    .then(()=>{
        console.log("connection done")
    })
    .catch((error)=>{
        console.log(error)
    })
}
module.exports=connectDB