import mongoose,{Schema,models} from "mongoose";

const userSchema=new Schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        fathersName:{
            type:String,
            required:true,
        },
        mothersName:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        pincode:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        }
    },
    {timestamps:true}
);

const User = models.User|| mongoose.model("User",userSchema);
export default User;