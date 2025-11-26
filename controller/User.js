let cloudinary=require('cloudinary').v2
let fs=require('fs').promises
let jwt=require('jsonwebtoken')
let bcrypt=require('bcrypt')
let userModel=require('../models/User')
let CreateUser=async(req,res)=>{
try{

    
       let {name,email,password}=req.body
   let resp=await userModel.findOne({email})
   if(!resp){
   let hashPassword= await bcrypt.hash(password,10)
   let createUser=await userModel.create({name,email,password:hashPassword})
   res.status(200).json({success:true,message:'user register successfully'})
   }
   else{
    res.status(400).json({success:false,message:'user already exist'})
   }
}
catch(error){
     res.status(500).json({success:false,message:'server issue please try again'})
}

}
let login=async(req,res)=>{
  try{
    console.log('req for login')
     let{email,password} =req.body
   let resp=await userModel.findOne({email})
   if(resp){
    let resp1=await bcrypt.compare(password,resp.password)
    if(resp1){
      let token=  jwt.sign({email:resp.email,id:resp._id},process.env.SECRET,{expiresIn:'30m'})
      res.cookie('user',token)
    res.status(200).json({success:true,message:'successFully login',id:resp._id,email,img:resp.img,name:resp.name})
    }
    else{
        res.status(400).json({success:false,message:'something went wrong'})
    }
   }
   else{
    res.status(400).json({success:false,message:'user not register'})
   }
  }
  catch(error){
     res.status(500).json({success:false,message:'server issue please try again'})
  }

}

let lagout=(req,res)=>{

  res.clearCookie('user')

  res.status(200).json({success:true})
  

}
let userImg=async(req,res)=>{
  try{
    let resp=await cloudinary.uploader.upload(req.file.path)
console.log(resp,'img profile url')

let deleteF=await fs.unlink(req.file.path)
let userImg=await userModel.findByIdAndUpdate(req.user.id,{$set:{img:resp.secure_url}},{new:1})

res.status(200).json({success:true,userImg})
  }
  catch(err){
    res.status(500).json({success:false,message:'server issue please try again'})
  }


}
module.exports={CreateUser,login,lagout,userImg}