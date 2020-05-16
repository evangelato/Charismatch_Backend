import winston = require('winston');
import express = require('express');

const error = (err: Error, req: express.Request, res: express.Response): void => {
    winston.error(err.message, err);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    // TODO add handling invalid paths

    res.status(500).send('Something failed.');
};

export default error;
