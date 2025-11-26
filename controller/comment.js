let commentModel=require('../models/Comment')


let createComment=async(req,res)=>{
try{
    console.log(req.body,req.user)
let resp=await commentModel.create({blog_id:req.body.id,title:req.body.comment,user:req.user.id,createdAt:new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })})

console.log(resp,'comment')
res.status(200).json({success:true})
}
catch(err){

res.status(500).json({success:false,message:'server issue please try again'})
}
}


let getComment=async(req,res)=>{
   try{
    let resp= await commentModel.find({blog_id:req.params.id}).populate('user')

   res.status(200).json({success:true,resp})
   }
   catch(error){
    res.status(500).json({success:false,message:'server issue please try again'})
   }
}
let deleteC=async(req,res)=>{
    try{
        console.log('req for del')
let resp= await commentModel.findByIdAndDelete(req.params.id)
res.status(200).json({success:true})
    }
    catch(error){
res.status(500).json({success:false,message:'server issue please try again'})
    }
}
module.exports={createComment,getComment,deleteC}