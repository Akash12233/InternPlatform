import mongoose from "mongoose";

const useractionSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    program_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"program"
    },
    task_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"task"
    },
    subtask_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"subtask"
    },
    solutionsubmitted:{
        type: File,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    }  

})



const useraction= mongoose.model("useraction", useractionSchema);

export default useraction;