let mongoose=require('mongoose')



let userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    img:{
        type:String,
        default:''
    }
})

module.exports=mongoose.model('user',userSchema)