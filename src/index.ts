import express = require('express');
import mongoose = require('mongoose');
import logging from './startup/logging';
import cors from './startup/cors';
import routes from './startup/routes';
import db from './startup/db';
import config from './startup/config';
import prod from './startup/prod';

const app = express();

mongoose.set('useCreateIndex', true);

logging();
cors(app);
routes(app);
db();
config();
prod(app);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

module.exports = server;
