let route=require('express').Router()
let {CreateUser,login,lagout,userImg}=require('../controller/User')
let {userAuth}=require('../middleware/UserAuth')
let upload=require('../config/Multer')
route.post('/create',CreateUser)
route.post('/login',login)
route.get('/logout',lagout)
route.put('/userImg', userAuth,upload.single('blog'), userImg)

module.exports=route