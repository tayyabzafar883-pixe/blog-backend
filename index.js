require('dotenv').config()
let express=require('express')
require('./config/Cloudinry')
let comment=require('./routes/comment')
let cookie=require('cookie-parser')
let cors=require('cors')
let {dbConnection}=require('./config/Db')
let userRoutes=require('./routes/User')
let posts=require('./routes/Post')
require('dotenv').config()

let app=express()

dbConnection()

app.use(cookie())
app.use(express.json())
app.use(cors({
origin:'*',
  
    credentials:true
}))
app.use('/user',userRoutes)

app.use('/post',posts)
app.use('/comment',comment)

app.get('/home',(req,res)=>{
    res.send('running')
})


app.listen(3000)