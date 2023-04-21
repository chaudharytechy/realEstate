const BlogModel=require('../models/blog')

class BlogdetailController{


    static blogdetail=async(req,res)=>{
        const data=await BlogModel.findById(req.params.id)
        // console.log(data)
          res.render('blogdetail',{blogdata:data})
    }

}
module.exports=BlogdetailController