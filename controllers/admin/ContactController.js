const ContactModel=require('../../models/contact')

class ContactController{

    static contact_page=async(req,res)=>{
        const result=await ContactModel.find()
        // console.log('result')
        res.render('admin/contact/contactpage',{contactdata:result})
    }



// contact submit method
    static contact_insert=async(req,res)=>{
        try {
            // console.log("hello")
            
            const results = new ContactModel({
                name: req.body.name,
                email: req.body.email,
                phone:req.body.phone,
                message:req.body.message
            })
            await results.save()
        req.flash('msg','send successfully')
            res.redirect('/contact',)
        } catch (error) {
           console.log(error) 
        }

    }


    static contact_view=async(req,res)=>{
        try {
            // console.log("hello")
            const data=await ContactModel.findById(req.params.id)

            res.render('admin/contact/contactview',{contactdata:data})
        } catch (error) {
            console.log(error)
        }
    }

   static contact_delete=async(req,res)=>{
    // console.log("delete")
    try {
        const data=await ContactController.findByIdAndDelete(req.params.id)
        res.redirect('/admin/dashboard/contactpage')
        // console.log("helo")
    } catch (error) {
        console.log(error)
    }
}



}
module.exports=ContactController