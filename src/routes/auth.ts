import Joi = require('joi');
import bcrypt = require('bcrypt');
import { User } from '../models/user';
import express = require('express');
import { ValidationResult } from 'joi';

const router = express.Router();

const validate = (req: express.Request): ValidationResult<express.Request> => {
    const schema = {
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(req, schema);
};

router.post('/', async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).send('Invalid username or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid username or password.');
    }

    const token = user.generateAuthToken();
    res.send(token);
});

export default router;
