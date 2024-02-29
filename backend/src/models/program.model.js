import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    tasksopt:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"task"
        }
    ],
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    keywords:[
        {
            type:String,
            default:true
        }
    ],
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

const program = mongoose.model("program", programSchema);

export default program;