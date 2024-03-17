import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    solutiongiven: {
        type: String,
        required: true
    },
    task_id:{
        type: Number,
        ref: "task"
    }  
}, { 
    timestamps: true 
});

const subtask = mongoose.model("subtask", subtaskSchema);
export default subtask;
