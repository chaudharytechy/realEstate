const PropertyModel = require("../models/property")

class SearchController{



// search Property by City
static search=async(req,res)=>{
    
  
  try {
    const search=req.body.location
    // const price=req.body.price
    if(search.length>0){
    const data2=await PropertyModel.find().sort({"createdAt":-1}).limit(3)
    const data=await PropertyModel.find({"city":{$regex:search ,$options:'i'}}).limit(12)
    const locate=await PropertyModel.find().limit(1)
    // console.log(locate)
         if(data.length==0){
          req.flash('message','No results found check city')
          res.redirect('/')
         }else{
         res.render("search",{search_data:data,hot_property:data2,loca:locate})
           

          }
    }else{
       res.redirect('/contact')
    }
  } catch (error) {
    console.log(error)
  }

}

static sort=async(req,res)=>{
  console.log("hello sorting work")
  console.log()
  const data=await PropertyModel.find({"city":{$regex:location,$options:'i'}})

  this.search()
 
}

}




module.exports=SearchController