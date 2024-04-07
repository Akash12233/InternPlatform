import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

const programSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    heading: {
        type: String,
        required: true 
    },
    shortDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
   
    keywords:[
        {
            type:String,
            required:true
        }
    ],
    skills:[
        {
            type:String,
            required:true
        }
    ]

}, 

{
    timestamps: true
});


const program = mongoose.model("program", programSchema);

export default program;