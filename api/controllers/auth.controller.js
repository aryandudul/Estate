import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "./utils/error.js";
import  Jwt  from "jsonwebtoken";

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


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'User Not Found'));
        }

        if (!password) {
            return next(errorHandler(400, 'Password is missing'));
        }

        const validPassword = await bcryptjs.compare(password, validUser.hashedPassword);
        console.log('Password comparison result:', validPassword);

        if (!validPassword) {
            return next(errorHandler(401, 'Wrong Credential'));
        }

        const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const {hashedPassword : pass , ...rest } = validUser._doc;

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        console.error('Error in signin function:', error);
        next(errorHandler(500, 'Internal Server Error'));
    }
};



export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (user) {
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo
        });
        await newUser.save();
        const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET); // Corrected to use newUser
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
          
      }
    } catch (error) {
      next(error);
    }
  };