const express = require('express');
const User = require('../database/schema');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const { id, pw } = req.body;

    console.dir(req.body);

    if (!id || !pw) {
        res.json({ statusCode: 2 }); // statusCode 2: 아이디나 비밀번호를 찾을 수 없습니다.
        return;
    }

    try {
        const user = await User.findOne({ id });

        if (!user) {
            res.json({ statusCode: 0 }); // statusCode 0: 해당 id의 유저를 찾을 수 없습니다.
            return;
        }

        const valid = await user.checkPassword(pw);

        console.log(user.checkPassword);

        if (!valid) {
            res.json({ statusCode: 1 }); // statusCode 1: 비밀번호가 틀립니다.
            return;
        }

        const toekn = user.generateToken();

        res.cookie('access_token', toekn, {
            maxAge: 1000 * 60 * 30,
        });

    } catch (e) {
        console.log(e);
    }
});

module.exports = router;