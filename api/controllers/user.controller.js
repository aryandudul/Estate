import bcryptjs from 'bcryptjs';
import { errorHandler } from '../controllers/utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({
        message: "Api Route Is Working",
    });
};

export const updateUser = async (req, res, next) => {
    try {
        // Check if the user is trying to update their own account
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, 'You can update your own account!'));
        }

        // Hash the password if provided
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // Update user details in the database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                }
            },
            { new: true }
        );

        // Destructure the updatedUser object
        const { password, ...rest } = updatedUser._doc;

        // Send the updated user details in the response
        res.status(200).json(rest);
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};
