const express=require('express')
const ImageKit = require('imagekit')
const PORT=process.env.PORT || 3000
const app=express()
const cors=require('cors')
const url=require('url')
const { default: mongoose } = require('mongoose')
const Chat  = require('./models/chat')
const UserChats = require('./models/userChats')
const { ClerkExpressRequireAuth } =require('@clerk/clerk-sdk-node')
const path = require('path')
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use(express.json())
const Dbconnect=async()=>{
 try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("mongodb Connection successfull")
 } catch (error) {
    console.log(error)
 }
} 
// const myfilename = url.fileURLToPath(new URL(process.env.CLIENT_URL));

// const mydirname=path.resolve()
// app.use(express.static(path.join(mydirname,"../client")))
const imagekit=new ImageKit({
    urlEndpoint:process.env.VITE_IMAGE_KIT_ENDPOINT,
    publicKey:process.env.VITE_IMAGE_KIT_PUBLIC_KEY,
    privateKey:process.env.VITE_IMAGE_KIT_PRIVATE_KEY
})
// app.get('*', (req, res) => {
//     res.sendFile(path.join(mydirname,"../client",'index.html'))
//   });
app.get('/api/upload',(req,res)=>{
    const result=imagekit.getAuthenticationParameters()
    res.send(result)
})
// app.get("/api/test",ClerkExpressRequireAuth(),(req,res)=>{
//     res.send("Success!")
// })
app.post('/api/chats',ClerkExpressRequireAuth(),async(req,res)=>{
    const userId=req.auth.userId
    const {text}=req.body
    // console.log("text",text)
    try {
        const newChat=new Chat({
            userId:userId,
            history:{role:"user",parts:[{text}]}
        })
        const savedChat=await newChat.save()
        // console.log(savedChat)
        const userChats=await UserChats.find({userId:userId})
        if(!userChats.length){
            const newUserChats=new UserChats({
                userId:userId,
                chats:[{
                    _id:savedChat._id,
                    title:text.substring(0,40)
            }]
            })
            // console.log("new user chats")
            await newUserChats.save()
            return res.status(201).send(savedChat._id);
        }
        else{
          await UserChats.updateOne({userId:userId},{
            $push:{
                chats:{
                    _id:savedChat._id,
                    title:text.substring(0,40)
                }
            }
            
          })
          return res.status(201).send(savedChat._id)
        }
    } catch (error) {
        console.log(error)
       return res.status(500).send("Error Creating chat!")
    }
})
app.get("/api/userchats",ClerkExpressRequireAuth(),async(req,res)=>{
    const userId=req.auth.userId
    try {
        const userChats=await UserChats.find({userId})
        if (!userChats.length || !userChats[0]?.chats) {
            return res.status(200).send([]);
          }      
        else{
      return  res.status(200).send( userChats[0].chats )
        }
    } catch (error) {
        console.log(error)
       return res.status(500).send("Error while fetching userchats")
    }

})
app.get("/api/chats/:id",ClerkExpressRequireAuth(),async(req,res)=>{
    const userId=req.auth.userId
    try {
        const chat=await Chat.findOne({_id:req.params.id,userId})
        if(!chat){
            return res.status(200).send([])
        }
      return  res.status(200).send(chat)
    } catch (error) {
        console.log(error)
       return res.status(500).send("Error while fetching chat")
    }

})
app.put('/api/chats/:id',ClerkExpressRequireAuth(),async(req,res)=>{
    const userId=req.auth.userId
    const {question,answer,image}=req.body
    console.log("data for chat",question,answer,image)
    const newItems = [
        ...(question
          ? [{ role: "user", parts: [{ text: question }], ...(image && { image }) }]
          : []),
        { role: "model", parts: [{ text: answer }] },
      ];
    try {
        const updatedChat=await Chat.updateOne({_id:req.params.id,userId},{
            $push:{
                history:{
                    $each:newItems
                }
            }
        })
        console.log(updatedChat)
       return res.status(200).send(updatedChat)
    } catch (error) {
        console.log(error)
       return res.status(500).send("Error adding conversation")
    }
})
app.use((err, req, res, next) => {
    console.error(err.stack)
   return res.status(401).send('Unauthenticated!')
  })
app.listen(PORT,()=>{
    Dbconnect()
    console.log(`server is running succesfully at ${PORT} port`)
})