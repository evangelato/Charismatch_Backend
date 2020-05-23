import auth from '../middleware/auth';
import bcrypt = require('bcrypt');
import _ = require('lodash');
import { User, validate } from '../models/user';
import express = require('express');
import mongodb = require('mongodb');

interface UserRequestType {
    user: {
        name: string;
        username: string;
        password: string;
        isAdmin: boolean;
        _id: mongodb.ObjectId;
    };
}

const router = express.Router();

// UserRequestType gives me error. TODO fix
router.get('/me', auth, async (req: any, res: express.Response) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).send('This username is in use.');
    }

    user = new User(_.pick(req.body, ['username', 'name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'username']));
});

export default router;
