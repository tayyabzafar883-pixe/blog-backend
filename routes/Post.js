let route=require('express').Router()
let {createPost,createPostt,getBlog,blogDetail,deleteBlog,updateBlog,getUserBlog,like,disLike}=require('../controller/Post')
let {userAuth}=require('../middleware/UserAuth')
let upload=require('../config/Multer')


route.post('/createImg', userAuth,upload.single('blog'), createPost)

route.post('/createpost', userAuth, createPostt)
route.get('/getpost', userAuth, getBlog)
route.get('/getuserpost', userAuth, getUserBlog)
route.get('/getDetail/:id',userAuth,blogDetail)
route.delete('/delete/:id',userAuth,deleteBlog)
route.put('/update',userAuth,updateBlog)

route.put('/like/:id', userAuth, like)
route.put('/disLike/:id', userAuth, disLike)

module.exports=route