import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id:{
        type:Number,
        required: true,
    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    program_id:{
            type:[Number],
            ref:"program"
    },
    skils:[
        {
            type:String,
            default:true
        }
    ]
},
 { 
    timestamps: true 
});

const task=mongoose.model("task", taskSchema)
export default task;
