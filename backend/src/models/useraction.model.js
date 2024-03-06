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
        type: String,
        default:"",
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    comment:{
        type: String,
        default: ""
    } 

})

useractionSchema.methods.adduseraction = async (user_id, program_id, task_id, subtask_id) => {

    if(!program_id || !user_id || !task_id || !subtask_id){
        return false;
    }
    const addeduseraction = await useraction.create({
        user_id: user_id,
        program_id: program_id,
        task_id: task_id,
        subtask_id: subtask_id
    });

    if(!addeduseraction){
        throw new ApiError(401, "User action not added");
    }

    return true;
    
};

const useraction= mongoose.model("useraction", useractionSchema);

export default useraction;