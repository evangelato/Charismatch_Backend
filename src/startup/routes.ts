import express = require('express');
import auth from '../routes/auth';
import error from '../middleware/error';

const routes = (app: express.Application): void => {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use(error);
};

export default routes;
