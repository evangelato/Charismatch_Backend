import express = require('express');
import jwt = require('jsonwebtoken');
import config = require('config');

interface UserRequestType extends express.Request {
    user: string | object;
}

// Using UserRequestType gives error in other files. TODO: Check this error
const auth = (req: any, res: express.Response, next: express.NextFunction): void => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

export default auth;
