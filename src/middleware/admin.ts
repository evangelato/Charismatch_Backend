import express = require('express');

interface UserRequestType extends express.Request {
    user: {
        name: string;
        username: string;
        password: string;
        isAdmin: boolean;
    };
}

// TODO: Solve any type
const admin = (req: any, res: express.Response, next: express.NextFunction): void => {
    // 401 Unauthorized
    // 403 Forbidden

    if (!req.user.isAdmin) return res.status(403).send('Access denied.');

    next();
};

export default admin;
