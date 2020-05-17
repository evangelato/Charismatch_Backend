import winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

const logger = (): void => {
    winston.exceptions.handle(
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
    );

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    // winston.configure({ transports: [new winston.transports.File({ filename: 'logfile.log' })] });
    // winston.add(winston.transports.MongoDB, {
    //   db: 'mongodb://localhost/thehongpage',
    //   level: 'info'
    // });
};

export default logger;
