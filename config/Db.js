let mongoose=require('mongoose')

let dbConnection=async()=>{
try{
    let res= await mongoose.connect(process.env.MONGODB_URL)
console.log('connected successfully')
}
catch(e){

    console.log('some thing went wrong')
}

}

module.exports={dbConnection}