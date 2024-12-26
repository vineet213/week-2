import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({clerkID: {$ne: currentUserId}});//exclude current user from list of users
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}