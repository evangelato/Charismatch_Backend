import mongoose = require('mongoose');
import express = require('express');

const validateObjectId = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Invalid ID.');

    next();
};

export default validateObjectId;
