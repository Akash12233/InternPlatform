import mongoose from "mongoose";

const userPrograms = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    program_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"program"
    }
});

export default mongoose.model("userPrograms", userPrograms)