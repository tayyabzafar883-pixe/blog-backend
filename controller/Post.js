let cloudinary=require('cloudinary').v2
let fs=require('fs').promises
let postModel=require('../models/Post')

let createPost=async(req,res)=>{

try{
    let resp=await cloudinary.uploader.upload(req.file.path)
console.log(resp,'img url')

let deleteF=await fs.unlink(req.file.path)



let CreatePost=await postModel.create({img:resp.secure_url,user:req.user.id})
console.log(CreatePost,'created post',req.user)
res.status(200).json({success:true,CreatePost})
}
catch(error){
    res.status(500).json({success:false,message:'server issue please try again'})
}
}

let createPostt=async(req,res)=>{

  try{
     let {title,blogPara,id,category}=req.body
  let resp= await postModel.findByIdAndUpdate(id,{$set:{title,blogPara,category,createdAt: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })
}})
  
res.status(200).json({success:true})
  }
  catch(error){

    res.status(500).json({success:false,message:'server issue please try again'})
  }

}
let getBlog=async(req,res)=>{
    try{
      console.log(req.params)

    let resp=await postModel.find().populate('user',{password:0})
console.log(resp)

res.status(200).json({success:true,resp})
    }
    catch(error){

      res.status(500).json({success:false,message:'server issue please try again'})
    }

}
let blogDetail=async(req,res)=>{

   try{
    let resp= await postModel.findById(req.params.id).populate('user',{password:0})
   res.status(200).json({success:true,resp})
   }
   catch(err){
        res.status(500).json({success:false,message:'server issue please try again'})
   }

}

let deleteBlog=async(req,res)=>{

  try{
    let resp= await  postModel.findByIdAndDelete(req.params.id)

  res.status(200).json({success:true})
  }
  catch(error){
res.status(500).json({success:false,message:'server issue please try again'})
  }
}

let updateBlog=async(req,res)=>{
try{
  let{id,title,blogPara}=req.body

let resp=await postModel.findByIdAndUpdate(id,{$set:{title,blogPara,createdAt:new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}},{new:1})


res.status(200).json({success:true})
}

catch(err){
 res.status(500).json({success:false,message:'server issue please try again'})
}



}
let getUserBlog=async(req,res)=>{
    try{
      console.log(req.params)

    let resp=await postModel.find({user:req.user.id}).populate('user',{password:0})
console.log(resp,'user blog')

res.status(200).json({success:true,resp})
    }
    catch(error){

      res.status(500).json({success:false,message:'server issue please try again'})
    }

}
let like=async(req,res)=>{
try{
  console.log('req for like',req.params.id)
let postt=await postModel.findById(req.params.id)
console.log(postt)
if(postt.likes.includes(req.user.id)){
  postt.likes.pull(req.user.id)
}
else{
  postt.likes.push(req.user.id)
  postt.dislikes.pull(req.user.id)
}
postt.save()
res.status(200).json({success:true,postt})
}
catch(err){
res.status(500).json({success:false,message:'sever issue please try again'})
}
}
let disLike=async(req,res)=>{
try{
  console.log('req for dislike',req.params.id)
console.log('req for like',req.params.id)
let postt=await postModel.findById(req.params.id)
console.log(postt)
if(postt.dislikes.includes(req.user.id)){
  postt.dislikes.pull(req.user.id)
}
else{
  postt.dislikes.push(req.user.id)
  postt.likes.pull(req.user.id)
}
postt.save()
res.status(200).json({success:true,postt})
}
catch(err){
res.status(500).json({success:false,message:'sever issue please try again'})
}
}

module.exports={createPost,createPostt,getBlog,blogDetail,deleteBlog,updateBlog,getUserBlog,like,disLike}