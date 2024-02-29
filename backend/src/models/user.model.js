import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshtoken: {
        type: String
    },
    avatar: {
        type: String,//cloudinary url
    },
    programOpt:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"program"
    }],
    programcompleted:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"program"
    }],
    transactionOpt:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transaction"
    }]
}, 

{
    timestamps: true
});

const user = mongoose.model("user", userSchema);

export default user;