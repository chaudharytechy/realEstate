const PropertyModel = require('../../models/property');
const SliderModel = require('../../models/slidermodel')
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dpnselvgk',
  api_key: '168413136638247',
  api_secret: 'rnJw7csTkm-mOgNrIYRUohJmNJ0',
  // secure: true
});

class HomeController {
  // home slider 
  static slider = async (req, res) => {
    const data = await SliderModel.find()
    console.log(data)
    res.render('admin/home/slider', { sliderdata: data });

  }

  static sliderinsert = async (req, res) => {
    //     const file = req.files.slider_image
    //     console.log(file)
    // console.log(req.body)
    try {
      const file = req.files.slider_image
      // console.log(file)
      const slider_image = await cloudinary.uploader.upload(file.tempFilePath, { folder: "slider Image" })
      // console.log(slider_image)
      const result = new SliderModel({
        slider_image: {
          public_id: slider_image.public_id,
          url: slider_image.secure_url,

        },
        property_name: req.body.property_name,
        state: req.body.state,
        city: req.body.city,
        address: req.body.address,
        descripation: req.body.descripation,
        price: req.body.price,
        area: req.body.area,
        type: req.body.type,
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        garage: req.body.garage,
        amenities: req.body.amenities
      })
      await result.save()
      res.redirect('admin/dashboard/slider')

    } catch (error) {
      console.log(error)
    }

  }

  static sliderview = async (req, res) => {

    try {
      const result = await SliderModel.findById(req.params.id)
      // console.log(result)
      res.render('admin/home/sliderview', { items: result });
    } catch (error) {

    }


  }
  static slideredit = async (req, res) => {
    const data = await SliderModel.findById(req.params.id)
    // console.log(data)
    res.render('admin/home/slideredit', { result: data });
  }

  static upadte = async (req, res) => {

    // console.log(file)
    try {
      if (req.files) {
        const data = await SliderModel.findById(req.params.id)
        const imageId = data.slider_image.public_id
        await cloudinary.uploader.destroy(imageId)

        const file = req.files.slider_image
        const slider_image = await cloudinary.uploader.upload(file.tempFilePath, { folder: "slider Image" })
        // console.log(agent_image)
        const sliderdata = await SliderModel.findByIdAndUpdate(req.params.id, {
          slider_image: {
            public_id: slider_image.public_id,
            url: slider_image.secure_url,

          },
          property_name: req.body.property_name,
          state: req.body.state,
          city: req.body.city,
          address: req.body.address,
          descripation: req.body.descripation,
          price: req.body.price,
          area: req.body.area,
          type: req.body.type,
          bedroom: req.body.bedroom,
          bathroom: req.body.bathroom,
          garage: req.body.garage,
          amenities: req.body.amenities
        })
        await sliderdata.save()
        res.redirect('/admin/dashboard/slider')
      } else {
        const sliderdata = await SliderModel.findByIdAndUpdate(req.params.id, {
          property_name: req.body.property_name,
          state: req.body.state,
          city: req.body.city,
          address: req.body.address,
          descripation: req.body.descripation,
          price: req.body.price,
          area: req.body.area,
          type: req.body.type,
          bedroom: req.body.bedroom,
          bathroom: req.body.bathroom,
          garage: req.body.garage,
          amenities: req.body.amenities
        })
        await sliderdata.save()
        res.redirect('/admin/dashboard/slider')
      }
    } catch (error) {
      console.log(error)
    }


  }


  static sliderdelete = async (req, res) => {
    try {
      const data=await SliderModel.findById(req.params.id)
      const imageId=data.slider_image.public_id
      await cloudinary.uploader.destroy(imageId)
      const deletedata = await SliderModel.findByIdAndDelete(req.params.id)
      res.redirect('/admin/dashboard/slider')
    } catch (error) {

    }
  }


  // home banner
  static banner = async (req, res) => {
    // console.log("banner")
    const data = await PropertyModel.find()
    res.render('admin/home/banner', { bannerdata: data });

  }

  static bannerinsert = async (req, res) => {
    // console.log("hello")
    try {
      // let images = [];

      const imagesLinks = [];
      const file = req.files.images
      // file.lenght=3
      for (let i = 0; i < file.length; i++) {
        const result = await cloudinary.uploader.upload(file[i].tempFilePath, {
          folder: "Property_Image"
        });
        //  console.log(result)
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      const front = req.files.front_image
      // console.log(file)
      const front_image = await cloudinary.uploader.upload(front.tempFilePath, { folder: "Property_Image" })
      // console.log(slider_image)
      // console.log(imagesLinks)
      const { property_name, state, city, address, descripation, price, type, area, bedroom, bathroom, garage,
        amenities, status } = req.body
      const propertydata = new PropertyModel({
        images: imagesLinks,
        front_image: {
          public_id: front_image.public_id,
          url: front_image.secure_url,
        },
        status: status,
        property_name: property_name,
        state: state,
        city: city,
        address: address,
        descripation: descripation,
        price: price,
        area: area,
        type: type,
        bedroom: bedroom,
        bathroom: bathroom,
        garage: garage,
        amenities: amenities
      })
      await propertydata.save()
      res.render('admin/home/banner')
      // console.log(propertydata)
    } catch (error) {
      console.log(error)
    }

  }

  static bannerview = async (req, res) => {
    try {
      console.log('helo view')
      const data = await PropertyModel.findById(req.params.id)
      res.render('admin/home/bannerview', { prop_data: data })
    } catch (error) {

    }
  }

  static banneredit = async (req, res) => {
    // console.log("hello edit")
    try {
      const data = await PropertyModel.findById(req.params.id)
      res.render('admin/home/banneredit', { prop_edit: data })
    } catch (error) {

    }
  }


static banner_imgdelete=async(req,res)=>{
  // console.log("hello delete")
  // console.log(req.params.id)
  const imageId="Property_Image/"+req.params.public_id;
    await cloudinary.uploader.destroy(imageId)
    const data=await PropertyModel.findById(req.params.id)
    const index=data.images.findIndex((img)=>{img.public_id==imageId})
    const removeIndex=data.images.splice(index,1);
    const updateimgLink=data.images;
    console.log(updateimgLink)
    const updateImage=await PropertyModel.findByIdAndUpdate(req.params.id,{
      images:updateimgLink,
    })
    await updateImage.save()
    res.redirect('/admin/dashboard/banneredit/'+req.params.id)
    // console.log(removeIndex)
    // console.log(index)
    // console.log(data)
  // console.log(imageId)
}


  static banner_update = async (req, res) => {
    try {
      
      if (req.files) {
    console.log("helo")
            //  const imagesLinks = [];
      const file = req.files.images
      // const data=file.length;
      console.log(file)
      // file.lenght=3
      for (let i = 0; i < 1; i++) {
        // const result = await cloudinary.uploader.upload(file[i].tempFilePath, {
        //   folder: "Property_Image"
        console.log("5")
        };
       
    
      } else {

        if (req.files) {
          const data = await PropertyModel.findById(req.params.id)
          const imageId = data.front_image.public_id
          await cloudinary.uploader.destroy(imageId)

          const file = req.files.front_image
          const front_image = await cloudinary.uploader.upload(file.tempFilePath, { folder: "Property_Image" })
          // console.log(agent_image)
          const propertydata = await PropertyModel.findByIdAndUpdate(req.params.id, {
            front_image: {
              public_id: front_image.public_id,
              url: front_image.secure_url,
            },
            status:req.body.status,
            property_name:req.body. property_name,
            state: req.body.state,
            city:req.body. city,
            address: req.body.address,
            descripation: req.body.descripation,
            price:req.body.price,
            area:req.body. area,
            type: req.body.type,
            bedroom:req.body. bedroom,
            bathroom: req.body.bathroom,
            garage:req.body. garage,
            amenities: req.body.amenities
          })
          await propertydata.save()
          res.redirect('/admin/dashboard/banner')
        } else {
          const propertydata = await PropertyModel.findByIdAndUpdate(req.params.id, {
            status:req.body.status,
            property_name:req.body. property_name,
            state:req.body. state,
            city:req.body. city,
            address: req.body.address,
            descripation:req.body. descripation,
            price:req.body. price,
            area:req.body. area,
            type: req.body.type,
            bedroom:req.body. bedroom,
            bathroom: req.body.bathroom,
            garage:req.body. garage,
            amenities: req.body.amenities

          })
          await propertydata.save()
          res.redirect('/admin/dashboard/banner')

        }

      }
    } catch (error) {
      console.log(error)
    }
  }


  static bannerdelete = async (req, res) => {
    // console.log("hello delete")
    try {
      const data=await PropertyModel.findById(req.params.id)
      const imageId=data.front_image.public_id
      await cloudinary.uploader.destroy(imageId)

      const deletedata = await PropertyModel.findByIdAndDelete(req.params.id)
      res.redirect('/admin/dashboard/banner')
    } catch (error) {

    }
  }





}
module.exports = HomeController