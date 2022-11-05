// import
const express = require('express');
const Joi = require('joi');
const User = require('../database/schema');
// router
const router = express.Router();
// Post
router.post('/', async (req, res, next) => {
    const schema = Joi.object().keys({
        id: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),

        pw: Joi.string().required(),
    });

    const result = schema.validateAsync(req.body);
    const { id, pw } = req.body;

    result.catch((reason) => res.status(400).json(reason))
    
        .then(async () => {
            const exist = await User.findOne({ id });

            if (exist) res.status(409)
                .json('id already exist');
        });

    const user = new User({ id });
    const token = user.generateToken();

    await user.setPassword(pw);
    await user.save();

    res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 30,
    });
});

module.exports = router;