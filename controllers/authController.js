import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';

export const register = async (req, res) => {
      // a random value that is added to the password before hashing
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'user created', user });
  };

export const login = async (req, res) => {
      // check if user exists
  // check if password is correct
    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new UnauthenticatedError('invalid credentials')

    const isValidUser = user && (await comparePassword(password, user.password));
    if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

    const isPasswordCorrect = await comparePassword(
        req.body.password,
        user.password
    )

    if (!isPasswordCorrect) 
        throw new UnauthenticatedError('invalid credentials')
    res.send('login route');
    
  };
  
