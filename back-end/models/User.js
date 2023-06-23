import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },  
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirm_password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);