const RegisterModel = require("../models/register")
const SliderModel=require("../models/slidermodel")
const AboutModel=require("../models/about")
const BlogModel=require('../models/blog')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AgentModel = require("../models/agent");
const PropertyModel = require("../models/property");
class FrontController{


static home=async(req,res)=>{
   // console.log('hello')
  const data=await SliderModel.find()
  const homedata=await AboutModel.findOne()
  const property=await PropertyModel.find()
  const adata=await AgentModel.find()
//   console.log(data)
   res.render('home',{sliderdata:data,homeabout:homedata,propertyData:property,agent:adata,
      message:req.flash('message') ,msg:req.flash('msg')  })
}

static about=async(req,res)=>{
   try {
      const data=await AboutModel.find()
      // console.log(data)
      res.render('about',{aboutdata:data})
   } catch (error) {
      
   }
}
static blog=async(req,res)=>{
  
   const data=await BlogModel.find()
   
   res.render('blog',{blog_data:data})
}
static contact=(req,res)=>{
   // console.log('hello')
   res.render('contact',{message:req.flash('msg')})
}
static agent=async(req,res)=>{
   // console.log('hello')
   const data=await AgentModel.find()
   res.render('agent',{agentdata:data})
}

static register=(req,res)=>{
   // console.log('hello')
   res.render('register')
}

static registerinsert=async(req,res)=>{
   // console.log('hello')
   // console.log(req.body)
   try {
      const{name,email,password,cpassword}=req.body
      const admin=await RegisterModel.findOne({email:email})
      if(admin){
         req.flash('error','email already exits')
         res.redirect('register')
      }else{
       if(name && email && password && cpassword){
         if(password==cpassword){
          try {
            const hashpassword=await bcrypt.hash(password,10)
            const result=new RegisterModel({
               name:name,
               email:email,
               password:hashpassword
            })
            await result.save()
            req.flash('success','registertion successfull')
            res.redirect('login')
          } catch (error) {
            console.log(error)
          }
         }else{
            req.flash('error','password and cpasword not match')
            res.redirect('register')
         }
       } else{
         req.flash('error','all field are required')
         res.redirect('register')
       }
      }
   } catch (error) {
      console.log(error)
   }
}

static login=async(req,res)=>{
   // console.log("helo")
   try {
      res.render('login')
   } catch (error) {
      console.log(error)
   }
}

static verify_login=async(req,res)=>{
   // console.log("hello")
   try {
      // console.log(req.body)
      const{email,password}=req.body
     if(email && password){
      const user=await RegisterModel.findOne({email:email})
      // console.log(user)
      if(user!=null){
         const is_match=await bcrypt.compare(password,user.password)
         if((user.email==email)&& is_match){
              if(user.role=='admin'){
                 // token genrate
                 const token = jwt.sign({ user_id: user._id }, 'Amitchaudharyid')
               //   console.log(token)
                 res.cookie('token', token)
                 res.redirect('/admin/dashboard')
              }else{
               const token = jwt.sign({ user_id: user._id }, 'Amitchaudharyid')
               // console.log(token)
               res.cookie('token', token)
               req.flash('msg','login Successfull')
               res.redirect('/')
              }
         }else{
            res.redirect('login')
         }
      }else{
         res.redirect('login')
      }

     }else{
      res.redirect('login')
     }
   } catch (error) {
     console.log(error) 
   }
}

static logout=async(req,res)=>{
   // console.log("log")
   try {
      res.clearCookie('token')

    res.redirect('/login')
} catch (error) {
    console.log(error)
}
}

}
module.exports=FrontController