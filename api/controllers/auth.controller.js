import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "./utils/error.js";

export const signup = async (req, res , next) => {
    try {
        // Extract data from request body
        const { username, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Check if required fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Log the request body for debugging
        console.log('Request Body:', req.body);

        // Create a new User instance
        const newUser = new User({ username, email, hashedPassword });

        // Save the new user to the database
        await newUser.save();

        // Send a JSON response indicating successful user creation
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        next(error);
    }
};
 