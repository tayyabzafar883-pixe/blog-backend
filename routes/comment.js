let route=require('express').Router()
let{createComment,getComment,deleteC}=require('../controller/comment')
let {userAuth}=require('../middleware/UserAuth')
route.post('/create',userAuth,createComment)
route.get('/get/:id',userAuth,getComment)
route.delete('/delete/:id',userAuth,deleteC)


module.exports=route