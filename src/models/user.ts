import config = require('config');
import jwt = require('jsonwebtoken');
import Joi = require('joi');
import mongoose = require('mongoose');
import mongodb = require('mongodb');
import { ValidationResult } from 'joi';

interface UserType {
    username: string;
    name: string;
    email: string;
    password: string;
}

interface UserInterface extends mongoose.Document {
    username: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    _id: mongodb.ObjectId;
    generateAuthToken: Function;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function (): string {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model<UserInterface>('User', userSchema);

const validateUser = (user: UserType): ValidationResult<UserType> => {
    const schema = {
        username: Joi.string().min(5).max(255).required(),
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(user, schema);
};

export { UserInterface, User, validateUser as validate };
