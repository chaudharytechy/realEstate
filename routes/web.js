const express=require('express')
const router=express.Router()


const FrontController=require('../controllers/FrontController')
const BuysellrentController = require('../controllers/BuysellrentController')
const PropertydetailController = require('../controllers/PropertydetailController')
const BlogdetailController = require('../controllers/BlogdetailController')
const AdminController = require('../controllers/admin/AdminController')
const HomeController=require('../controllers/admin/HomeController')
const AboutControllers = require('../controllers/admin/AboutController')
const BlogController=require('../controllers/admin/BlogController')
const AgentController = require('../controllers/admin/AgentController')
const ContactController = require('../controllers/admin/ContactController')
const SearchController = require('../controllers/SearchController')
const auth_user=require('../Middleware/auth')
// frontcontroller route

router.get('/',FrontController.home)
router.get('/about',FrontController.about)
router.get('/agent',FrontController.agent)
router.get('/contact',FrontController.contact)
router.get('/blog',FrontController.blog)
router.get('/register',FrontController.register)
router.post('/registerinsert',FrontController.registerinsert)
router.get('/login',FrontController.login)
router.post('/verify_login',FrontController.verify_login)
router.get('/logout',FrontController.logout)
// BuysellController
router.get('/buysellrent',BuysellrentController.buy)
// Property_detailController
router.get('/property/:id',PropertydetailController.property)
// blogdetail
router.get('/blogdetail/:id',BlogdetailController.blogdetail)

               //admin;;;;;;;;;;;;;;;;;

router.get('/admin/dashboard',auth_user,AdminController.dashboard)
//  Admin homecontroller
router.get('/admin/dashboard/slider',auth_user,HomeController.slider)
router.post('/propertyinsert',auth_user,HomeController.sliderinsert)
router.get('/admin/dashboard/sliderview/:id',HomeController.sliderview)
router.get('/admin/dashboard/slideredit/:id',HomeController.slideredit)
router.post('/sliderupdate/:id',HomeController.upadte)
router.get('/admin/dashboard/sliderdelete/:id',HomeController.sliderdelete)

  // homecontroller banner
  


 router.get('/admin/dashboard/banner',auth_user,HomeController.banner) 
 router.post('/multiple-upload',HomeController.bannerinsert)
 router.get('/admin/dashboard/bannerview/:id',HomeController.bannerview)      
 router.get('/admin/dashboard/banneredit/:id',HomeController.banneredit)   
router.post('/update/:id',HomeController. banner_update)
router.get('/admin/dashboard/banneredit/Property_Image/:public_id/:id',HomeController.banner_imgdelete)
// /admin/dashboard/banneredit/Property_Image/z0krznsfgjgdrjqjjfuz
// About Admin 
router.get('/admin/dashboard/aboutpage',auth_user,AboutControllers.aboutpage)
router.post('/aboutinsert',AboutControllers.aboutinsert)
router.get('/admin/dashboard/aboutpage',AboutControllers.aboutpage)
router.get('/admin/dashboard/aboutview/:id',AboutControllers.aboutview)
router.get('/admin/dashboard/aboutedit/:id',AboutControllers.aboutedit)
router.post('/aboutupdate/:id',AboutControllers.aboutupdate)
router.get('/admin/dashboard/aboutdelete/:id',AboutControllers.aboutdelete)

// Blog Admin 
router.get('/admin/dashboard/blogpage',auth_user,BlogController.blogpage)
router.post('/bloginsert',BlogController.bloginsert)
router.get('/admin/dashboard/blogview/:id',BlogController.blogview)
router.get('/admin/dashboard/blogedit/:id',BlogController.blogedit)
router.post('/blogupdate/:id',BlogController.update)
router.get('/admin/dashboard/blogdelete/:id',BlogController. blog_delete)

// Agent Admin
router.get('/admin/dashboard/agentpage',auth_user,AgentController.agent)
router.post('/agentinsert',AgentController.agent_insert)
router.get('/admin/dashboard/agentview/:id',AgentController.agentview)
router.get('/admin/dashboard/agentedit/:id',AgentController.agent_edit)
router.post('/agentupdate/:id',AgentController.upadte)
router.get('/admin/dashboard/agentdelete/:id',AgentController.agent_delete)

// Contact Admin
router.get('/admin/dashboard/contactpage',auth_user,ContactController.contact_page)
router.post('/contactinsert',ContactController.contact_insert)
router.get('/admin/dashboard/contactview/:id',ContactController.contact_view)
router.get('/admin/dashboard/contactdelete/:id',ContactController.contact_delete)


  // customer enquiry data
router.get('/admin/dashboard/customer',auth_user,PropertydetailController.customer)
router.post('/customerinsert',PropertydetailController.customer_insert)
router.get('/admin/dashboard/customerview/:id',PropertydetailController.customer_view)
router.get('/admin/dashboard/customerdelete/:id',PropertydetailController.customer_delete)


// Search
router.post('/search_Property',SearchController.search)
router.get('/sort',SearchController.sort)

module.exports=router