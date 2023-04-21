const AboutModel = require('../../models/about')

var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dpnselvgk',
    api_key: '168413136638247',
    api_secret: 'rnJw7csTkm-mOgNrIYRUohJmNJ0',
    // secure: true
});

class AboutControllers {

    static aboutpage = async (req, res) => {
        try {
            const data = await AboutModel.find()
            res.render('admin/about/aboutpage', { aboutdata: data })
        } catch (error) {

        }
    }

    static aboutinsert = async (req, res) => {
        try {
            const file = req.files.about_image
            const about_image = await cloudinary.uploader.upload(file.tempFilePath,
                { folder: "aboutimage" })
            // console.log(about_image)
            const aboutdata = new AboutModel({
                about_image: {
                    public_id: about_image.public_id,
                    url: about_image.secure_url,

                },
                heading1: req.body.heading1,
                descripation1: req.body.descripation1,
                heading2: req.body.heading2,
                descripation2: req.body.descripation2
            })
            // console.log(aboutdata)   
            await aboutdata.save()
            res.redirect('admin/dashboard/aboutpage')
        } catch (error) {
            console.log(error)
        }
    }

    static aboutview = async (req, res) => {
        try {
            const data = await AboutModel.findById(req.params.id)

            res.render('admin/about/aboutview', { aboutdata: data })
        } catch (error) {
            console.log(error)
        }
    }

    static aboutedit = async (req, res) => {

        try {
            const data = await AboutModel.findById(req.params.id)

            res.render("admin/about/aboutedit", { aboutdata: data })
        } catch (error) {

        }
    }
    static aboutupdate = async (req, res) => {
        // const file=req.files.about_image
        // console.log(req.files.about_image)

        try {
           
       
           if(req.files){ const about = await AboutModel.findById(req.params.id)
            const imageId = about.about_image.public_id
            await cloudinary.uploader.destroy(imageId)

            const file = req.files.about_image
            const about_image = await cloudinary.uploader.upload(file.tempFilePath, { folder: "aboutimage" })
            // console.log(about_image)
            const results = await AboutModel.findByIdAndUpdate(req.params.id,{
                about_image: {
                    public_id: about_image.public_id,
                    url: about_image.secure_url
                },
                heading1: req.body.heading1,
                descripation1: req.body.descripation1,
                heading2: req.body.heading2,
                descripation2: req.body.descripation2
            })
            await results.save()
            res.redirect("/admin/dashboard/aboutpage")
        }else{
           
            const results = await AboutModel.findByIdAndUpdate(req.params.id,{
               
                heading1: req.body.heading1,
                descripation1: req.body.descripation1,
                heading2: req.body.heading2,
                descripation2: req.body.descripation2
            })
            await results.save()
            res.redirect("/admin/dashboard/aboutpage")
            }

        } catch (error) {
            console.log(error)
        }

    }


    static aboutdelete = async (req, res) => {
        try {
            const data = await AboutControllers.findByIdAndDelete(req.params.id)
            res.redirect('/admin/dashboard/aboutpage')
            // console.log("helo")
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = AboutControllers