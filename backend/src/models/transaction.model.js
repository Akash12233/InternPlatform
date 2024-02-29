import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    transactionID: {
        type: String,
        required: true
    },
    ProgramPaid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"program"
    }
},
 { 
    timestamps: true 
});

const transaction=mongoose.model("transaction", transactionSchema);
export default transaction;