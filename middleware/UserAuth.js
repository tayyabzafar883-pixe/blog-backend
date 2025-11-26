let jwt=require('jsonwebtoken')
let userAuth=(req,res,next)=>{

try{

    let token=jwt.verify(req.cookies.user,process.env.SECRET)
    console.log(token)
     req.user = {
      id: token.id,
      email: token.email
    };
    next()
}
catch(error){


res.status(401).json({message:'invalid'})
}

}

module.exports={userAuth}