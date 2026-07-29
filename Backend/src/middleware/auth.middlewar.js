// middlewares/auth.middleware.js

import admin from "../config/firebase.js";
import { User } from "../models/user.model.js"; // Update this path
import { ApiError } from "../utils/ApiError.js";

export const verifyFirebaseUser = async (req, res, next) => {
    try {

        // Get Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized");
        }

        // Extract Firebase ID Token
        const idToken = authHeader.split(" ")[1];

        // Verify Firebase Token
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        // Find user in MongoDB
        let user = await User.findOne({
            firebaseUid: decodedToken.uid,
        });

        // Create user if first login
        if (!user) {
            user = await User.create({
                firebaseUid: decodedToken.uid,
                email: decodedToken.email,
                fullName: decodedToken.name || "User",
                avatar: decodedToken.picture || "",
            });
        }

        // Attach MongoDB user to request
        req.user = user;

        next();

    } catch (error) {

        if (error instanceof ApiError) {
            return next(error);
        }

        return next(
            new ApiError(401, "Invalid or expired Firebase token")
        );
    }
};