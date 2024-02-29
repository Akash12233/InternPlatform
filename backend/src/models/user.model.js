import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

userSchema.pre("save", async function(next){
    if(!this.modified("password")) return next;

    this.password= await bcrypt.hash(this.password, 10)
    next()
})

userSchema.method.generateAccessToken= function (){
   return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
            firstname:this.firstname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRY
        }

   )
}

userSchema.method.generateAccessToken= function (){
    return  jwt.sign(
         {
             _id:this._id,
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
             expiresIn:REFRESH_TOKEN_EXPIRY
         }
    )
 }

const user = mongoose.model("user", userSchema);

export default user;