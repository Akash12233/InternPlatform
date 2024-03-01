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
    solutionsubmitted: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "NotAttempted"],
        default: "NotAttempted"
    },
    oftasks:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "task"
    },
    verified: {
        type: Boolean,
        default: false
    }    
}, { 
    timestamps: true 
});

const Subtask = mongoose.model("Subtask", subtaskSchema);
export default Subtask;
