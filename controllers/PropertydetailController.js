const PropertyModel = require("../models/property");
const AgentModel =require('../models/agent')
const CustomerModel=require('../models/propertyenquiry');
const { status } = require("express/lib/response");


class PropertydetailController{
    static property=async(req,res)=>{
        const data=await PropertyModel.findById(req.params.id)
        const data2=await PropertyModel.findById(req.params.id)
        const agent_data=await AgentModel.findOne()
        // const data=await AgentModel.find()
        // console.log(agent_data)
          res.render('property_detail',{hotdata:data2,property_detail:data,agent:agent_data})
    }


    //  customer property enquiry
static customer_insert=async(req,res)=>{
    // console.log("helo customer")
         // console.log("hello")
         const data=await PropertyModel.findById(req.params.id)
       try{     
         const results = new CustomerModel({
            property_name:req.body.property_name,
            address:req.body.address,
            name: req.body.name,
            email: req.body.email,
            phone:req.body.phone,
          
        })
        await results.save()
        req.flash('msg',' successfully send your request see more properties ')
        res.redirect('/buysellrent')
    } catch (error) {
       console.log(error) 
    }
}


static customer=async(req,res)=>{
    try {
        const data=await CustomerModel.find()
        res.render('admin/customer_detail/customer',{customer_data:data})
    } catch (error) {
       console.log(error) 
    }
}


static customer_view=async(req,res)=>{
   try {
    const data= await CustomerModel.findById(req.params.id) 
    res.render('admin/customer_detail/customerview',{customer_data:data})
   } catch (error) {
    console.log(error)
   }
}

static customer_delete=async(req,res)=>{
    // console.log("customer delete")
    try {
        const data= await CustomerModel.findByIdAndDelete(req.params.id)
         res.redirect('/admin/dashboard/customer')
    } catch (error) {
      console.log(error)  
    }
}

}
module.exports=PropertydetailController