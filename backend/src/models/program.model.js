import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

const programSchema = new mongoose.Schema({
    heading: {
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
    useropt:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    }],
    keywords:[
        {
            type:String,
            default:true
        }
    ],
    skills:[
        {
            type:String,
            default:true
        }
    ]

}, 

{
    timestamps: true
});


const program = mongoose.model("program", programSchema);

export default program;