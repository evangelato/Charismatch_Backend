import express = require('express');

const async = (handler: Function) => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<Function | void> => {
        try {
            await handler(req, res);
        } catch (ex) {
            next(ex);
        }
    };
};

export default async;
