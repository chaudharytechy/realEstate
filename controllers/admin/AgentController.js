const AgentModel=require('../../models/agent')
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dpnselvgk',
    api_key: '168413136638247',
    api_secret: 'rnJw7csTkm-mOgNrIYRUohJmNJ0',
    // secure: true
});
class AgentController{
    static agent=async(req,res)=>{
      const data=await AgentModel.find()
        res.render('admin/agents/agentpage',{agentdata:data})
    }

    static agent_insert=async(req,res)=>{
        // console.log("helo isert")
        try {
            const file=req.files.agent_image
            //  console.log(file)
             const agent_image = await cloudinary.uploader.upload(file.tempFilePath,
                { folder: "agentimage" })
                // console.log(agent_image)
                const aboutdata = new AgentModel({
                    agent_image: {
                        public_id: agent_image.public_id,
                        url: agent_image.secure_url,
    
                    },
                    name: req.body.name,
                    descripation: req.body.descripation,
                    email: req.body.email,
                    phone_number: req.body.phone_number
                })
                // console.log(aboutdata)   
                await aboutdata.save()
                res.redirect('admin/dashboard/agentpage')
        } catch (error) {
            console.log(error)
        }
    }

static agentview=async(req,res)=>{
   
    try {
        const data=await AgentModel.findById(req.params.id)
        res.render('admin/agents/agentview',{agentdata:data})
    } catch (error) {
        
    }
}

static agent_edit=async(req,res)=>{
    // console.log("hello edit")
    try {
        const data= await AgentModel.findById(req.params.id)
        res.render('admin/agents/agentedit',{agentdata:data})
    } catch (error) {
        
    }
}

static upadte=async(req,res)=>{
    // console.log(req.body.files)
    // const file=req.files.agent_image
    // console.log(file)
try {
    if(req.files){
        const data=await AgentModel.findById(req.params.id)
        const imageId=data.agent_image.public_id
        await cloudinary.uploader.destroy(imageId)
    
        const file=req.files.agent_image
        const agent_image=await cloudinary.uploader.upload(file.tempFilePath,{folder:"agentimage"})
        // console.log(agent_image)
        const agentdata = await AgentModel.findByIdAndUpdate(req.params.id,{
            agent_image: {
                public_id: agent_image.public_id,
                url: agent_image.secure_url,
    
            },
            name: req.body.name,
            descripation: req.body.descripation,
            email: req.body.email,
            phone_number: req.body.phone_number
        })
        await agentdata.save()
        res.redirect('/admin/dashboard/agentpage')
     }else{
        const agentdata = await AgentModel.findByIdAndUpdate(req.params.id,{
          
            name: req.body.name,
            descripation: req.body.descripation,
            email: req.body.email,
            phone_number: req.body.phone_number
        })
         await agentdata.save()
        res.redirect('/admin/dashboard/agentpage')
     }
} catch (error) {
    console.log(error)
}
    // console.log(agentdata)   
   
}

static agent_delete=async(req,res)=>{
    // console.log('agent delete ')
    try {
        const data=await AgentModel.findById(req.params.id)
        const imageId=data.agent_image.public_id
        await cloudinary.uploader.destroy(imageId)

        const results=await AgentModel.findByIdAndDelete(req.params.id)
          res.redirect('/admin/dashboard/agentpage')
    } catch (error) {
        
    }
}
}
module.exports=AgentController