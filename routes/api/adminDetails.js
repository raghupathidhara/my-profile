const express= require('express')
const router= express.Router()
const Admin= require("../../models/Admin")


//POST: add admin data
router.post('/', async (req, res)=>{
    try {
        const email='dhararaghu202@gmail.com'
        const {name, adminImage, status, social, contact, website}= req.body
        let admin= await Admin.findOne({email:email})
        if(admin) {
            admin.name=name,
            admin.adminImage=adminImage
            admin.status=status
            admin.social=social
            admin.concat=contact,
            admin.website= website
        }
        else{
            admin= new Admin({name, adminImage, status, social, contact, website})
            
        }

        await admin.save()
        res.status(200).json({message:'Admin details added successfully'})
    } catch (err) {
      
        return res.status(404).json({message:'Error occured'})
    }
})

//GET: get the admin data

router.get('/', async (req, res)=>{
    try{
        const email='dhararaghu202@gmail.com'
        const admin= await Admin.findOne({email: email})
        res.status(200).json(admin)

    }catch(err){
        return res.status(404).json({message:'Error occured'})
    }
})

module.exports= router