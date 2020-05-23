import express = require('express');
import auth from '../routes/auth';
import users from '../routes/users';
import error from '../middleware/error';

const routes = (app: express.Application): void => {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use(error);
};

export default routes;
