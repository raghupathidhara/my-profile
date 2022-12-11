const mongoose= require('mongoose')
const {Schema}= mongoose

const adminDetails= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        default:'dhararaghu202@gmail.com'
    },
    adminImage: {
        type:String,
    }, 
    status:{
        type:String
    },
    social:[ {
        type:{
            type:String
        },
        image: String,
        url: String
    }],
    contact:{
        primary: String,
        secondary: String,
    },
    website: String

}, {minimize:false})

module.exports= Admin= mongoose.model('admin', adminDetails)