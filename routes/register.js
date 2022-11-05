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

    result.catch((reason) => res.json({ statusCode: 4 })) // statusCode 4: 유형성 검사 통과 X(3자 미만이거나 20자 초과이거나 영어나 숫자가 아님)
    
        .then(async () => {
            const exist = await User.findOne({ id });

            if (exist) res.json({ statusCode: 5 }); // statusCode 5: 이미 해당 아이디의 유저가 존재
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