import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        clerkID: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

export const User = mongoose.model("User", userSchema);
