import express = require('express');
import helmet = require('helmet');
import compression = require('compression');

const prod = (app: express.Application): void => {
    app.use(helmet());
    app.use(compression());
};

export default prod;
