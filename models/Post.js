let mongoose=require('mongoose')



let postSchema=new mongoose.Schema({

    title:{
        type:String,
        default:''
    },
    blogPara:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
      createdAt: {
    type: String,
    default: () => new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })
  },
  category:{
    type:String,
    default:''
  },
   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
})

module.exports=mongoose.model('post',postSchema)