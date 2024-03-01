import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ofprogram:{
            type:mongoose.Schema.Types.ObjectId,
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
