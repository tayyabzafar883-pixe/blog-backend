let mongoose=require('mongoose')



let comment=new mongoose.Schema({
    title:String,

    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
      createdAt: {
    type: String,
    default: () => new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })
  },
  blog_id:String
  
})

module.exports=mongoose.model('postC',comment)