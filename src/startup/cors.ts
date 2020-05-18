import express = require('express');
import cors = require('cors');

const allowedOrigins = ['http://localhost:3000'];

const corsSetting = (app: express.Application): void => {
    app.use(
        cors({
            origin: (origin, callback) => {
                if (!origin) {
                    return callback(null, true);
                }
                if (allowedOrigins.indexOf(origin) === -1) {
                    const msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            },
        }),
    );
};

export default corsSetting;
