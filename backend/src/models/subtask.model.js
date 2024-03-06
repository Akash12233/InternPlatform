import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "task"
    }  
}, { 
    timestamps: true 
});

const subtask = mongoose.model("subtask", subtaskSchema);
export default subtask;
