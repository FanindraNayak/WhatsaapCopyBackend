const mongoose = require("mongoose")

const d = new Date();

const postMessageInGroupSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    }
    
})