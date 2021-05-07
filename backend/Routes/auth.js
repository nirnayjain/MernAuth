import express from 'express'
import bcrypt from 'bcrypt'
import User from '../Model/User.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import {OAuth2Client} from 'google-auth-library'
import dotenv from 'dotenv'
const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const router=express.Router()
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.USER,
        pass:process.env.PASSWORD
    }
});

router.post('/register',async(req,res)=>{

 const emailExist=await User.findOne({email:req.body.email})
     if(emailExist) return res.status(400).send("Email already registered")
     const salt=await bcrypt.genSalt(10)
     const hashedpassword=await bcrypt.hash(req.body.password,salt)
      const token=jwt.sign({email:req.body.email,password:req.body.password},process.env.SECRET_KEY)

    const user=new User({
         name:req.body.name,
        userName:req.body.userName,
        email:req.body.email,
        password:hashedpassword,
        confirmationCode:token
    })
    try{
    const savedUser=await user.save()
    
let mailOptions = {
    from: process.env.USER,
    to: req.body.email,
    subject: 'Account Activation Link',
    html:` 
      <h1>Email Confirmation</h1>
        <h2>Hello ${req.body.name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/confirm/${token}> Click here</a>
        `,
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
});
   
     res.send({status:"ok"})
    
    }
    
    catch(err){
        res.json({message:err})
        console.log(err)
    }
    

}


)

router.post('/login',async(req,res)=>{
    const user= await User.findOne({userName:req.body.userName})
    if(!user) return res.status(400).send("Username or Password Wrong")
    const valid=await bcrypt.compare(req.body.password,user.password)
    if(!valid) return res.status(400).send("Username or Password Wrong")

if (user.status != "Active") {
        return res.status(401).send(
          "Pending Account. Please Verify Your Email!",
        );
      }

    const token=jwt.sign({_id:user.id},process.env.SECRET_KEY)
       res.cookie("token",token,{
           httpOnly:true,
           
           maxAge:24*60*60*1000
       })
       res.json(token)
  
       
})
router.get('/auth',(req,res)=>{
     const cookie=req.cookies["token"]

    const claims=  jwt.verify(cookie,process.env.SECRET_KEY)
     
     if(!claims)
     {
         return res.status(401).send("Unauthenticated")

    }
    // const user=await User.findOne({_id
    //     :claims._id})
    // res.json(user)
    // res.json(claims)
    res.send(cookie)


})
router.get('/confirm/:confirmationCode',async(req,res)=>{
    const user=await User.findOne({confirmationCode:req.params.confirmationCode})
    if(!user) return res.status(400).send("Email is wrong")
    user.status="Active"
    try{
        await user.save()
        res.send("Success")
    }
    catch(error){
        res.json({message:error})

    }
    
    
 


    
})
router.post('/googleLogin',(req,res)=>{
    const {tokenId}=req.body
     client.verifyIdToken({idToken:tokenId,audience:process.env.GOOGLE_CLIENT_ID}).then(response=>{
         const{email_verified,name,email}=response.payload;
      if(email_verified)
      {
          const user=  User.findOne({email:email})
          if(user)
          {
               const token=jwt.sign({_id:user.id},process.env.SECRET_KEY)
       res.cookie("token",token,{
           httpOnly:true,
           
           maxAge:24*60*60*1000
       })
       res.json(token)
  
          }
          else{
               const salt= bcrypt.genSalt(10)
     const hashedpassword= bcrypt.hash(email+name,salt)
       const token=jwt.sign({_id:user.id},process.env.SECRET_KEY)
       res.cookie("token",token,{
           httpOnly:true,
           
           maxAge:24*60*60*1000
       })
              const user=new User({
         name:name,
        userName:name,
        email:email,
        password:hashedpassword,
        status:Active,
        confirmationCode:token
    })
    
    const savedUser= user.save()
     
       res.json(token)

}


      }
     
     })
    console.log()
})

router.post('/logout',async(req,res)=>{
     
        res.clearCookie("token")
        res.send("Success")
    })
export default router
