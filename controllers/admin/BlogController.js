const BlogModel=require('../../models/blog')

var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dpnselvgk',
    api_key: '168413136638247',
    api_secret: 'rnJw7csTkm-mOgNrIYRUohJmNJ0',
    // secure: true
});

class BlogController{

    static blogpage=async(req,res)=>{
        try {
           const data=await BlogModel.find()
            res.render('admin/blog/blogpage',{blog_data:data})
        } catch (error) {
         console.log(error)
        }
    }

    static bloginsert = async (req, res) => {

        // console.log("hello insert")
        try {
            const file = req.files.blog_image
            const blog_image = await cloudinary.uploader.upload(file.tempFilePath,
                { folder: "blogimage" })
            
            const blogdata = new BlogModel({
                blog_image: {
                    public_id: blog_image.public_id,
                    url: blog_image.secure_url,

                },
                title: req.body.title,
                descripation: req.body.descripation,
                
            })
             
            await blogdata.save()
            console.log(blogdata)  
            res.redirect('admin/dashboard/blogpage')
        } catch (error) {
            console.log(error)
        }
    }
  

    static blogview=async(req,res)=>{
        // console.log('blogview')
        try {
            const data=await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/blogview',{blogdata:data})
        } catch (error) {
            console.log(error)
        }
    }


    static blogedit=async(req,res)=>{
        // console.log("hello edit")
        try {
            const data=await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/blogedit',{blog_edit:data})
        } catch (error) {
            console.log(error)
        }
    }


    static update = async (req, res) => {

        try {
           if(req.files){ const about = await BlogModel.findById(req.params.id)
            const imageId = about.blog_image.public_id
            await cloudinary.uploader.destroy(imageId)

            const file = req.files.blog_image
            const blog_image = await cloudinary.uploader.upload(file.tempFilePath, { folder: "blogimage" })
            // console.log(about_image)
            const results = await BlogModel.findByIdAndUpdate(req.params.id,{
                blog_image: {
                    public_id: blog_image.public_id,
                    url: blog_image.secure_url,

                },
                title: req.body.title,
                descripation: req.body.descripation,
            })
            await results.save()
            res.redirect("/admin/dashboard/blogpage")
        }else{
           
            const results = await BlogModel.findByIdAndUpdate(req.params.id,{
                title: req.body.title,
                descripation: req.body.descripation,
               
            })
            await results.save()
            res.redirect("/admin/dashboard/blogpage")
            }

        } catch (error) {
            console.log(error)
        }

    }


    static blog_delete=async(req,res)=>{
        try {
            const data=await BlogModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/dashboard/blogpage')
        } catch (error) {
          console.log(error)  
        }
    }

}
module.exports=BlogController
