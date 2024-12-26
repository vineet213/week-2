import { clerkClient } from "@clerk/express";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized: You must be logged in" });
        
    }
    next();
};

// Middleware to check if the user is an admin
export const requireAdmin = async (req, res, next) => {
    try {
        // Fetch the current user details
        const currentUser = await clerkClient.users.getUser(req.auth.userId);

        // Check if the user has admin privileges
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({ message: "Forbidden: You do not have admin privileges" });
            
        }

        next();
    } catch (error) {
       next(error); 
    }
};
