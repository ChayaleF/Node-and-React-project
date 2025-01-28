import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sequelize from "../dataAccess/dataAccess";
import { CustomError } from '../errors/CustomError';
import _ from 'lodash';
import { hasMinimumLetters, isValidEmail, isValidPassword } from '../validators/validators';

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
export async function addUser(user: User) {
    if (!user.userName || !user.userEmail || !user.userPassword) {
        throw new CustomError('Missing required fields', 400);
    }
    if (!isValidEmail(user.userEmail)) {
        throw new CustomError('Invalid email format', 400);
    }
    if (!isValidPassword(user.userPassword)) {
        throw new CustomError('Invalid password format or strength', 400);
    }
    if (!hasMinimumLetters(user.userName)) {
        throw new CustomError('User name must contain at least 2 letters', 400);
    }
    user.userPassword = await bcrypt.hash(user.userPassword, 10);
    const token = jwt.sign(
        { user_id: user.id, email: user.userEmail },
        `${JWT_SECRET}`,
        {
            expiresIn: "2h",
        }
    );

    const existingUser = await User.findOne({
        where: {
            userEmail: user.userEmail,
        }
    });
    if (existingUser) {
        throw new CustomError('User with the same email already exists', 400);
    }

    await sequelize.authenticate()
    await User.sync();
    const newUser = await User.create({
        userName: user.userName,
        userPassword: user.userPassword,
        userEmail: user.userEmail,
        userToken: token
    });

   const result = await User.findByPk(newUser.id);
    const userWithoutPassword = _.omit(result?.dataValues, ['userPassword','userToken','updatedAt','createdAt']);

    return { user: userWithoutPassword, token: result?.userToken };
}
export async function login(loginEmail:string, loginPassword:string) {
    if (!loginEmail || !loginPassword) {
        throw new CustomError('Email and password are required', 400);
    }

    if (!isValidEmail(loginEmail)) {
        throw new CustomError('Invalid email format', 400);
    }
    const foundUser = await User.findOne({
        where: {
            userEmail: loginEmail
        }
    });

    if (!foundUser) {
        throw new CustomError('No user found with the given email', 404);
    }

    const passwordMatch = bcrypt.compareSync(loginPassword, foundUser.userPassword);
    if (!passwordMatch) {
        throw new CustomError('Invalid password', 401);
    }

    const newToken = jwt.sign(
        { user_id: foundUser.id, email: foundUser.userEmail },
        `${JWT_SECRET}`,
        {
            expiresIn: "2h",
        }
    );

    await User.update({ token: newToken }, {
        where: { id: foundUser.id }
    });

    const userWithoutPassword = _.omit(foundUser.dataValues, ['userPassword','userToken','createdAt','updatedAt']);

    return { user: userWithoutPassword, token: newToken };
   
}
