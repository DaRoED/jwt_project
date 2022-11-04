import express from "express";
import User from "../public/javascripts/schema";

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { id, pw } = req.body;

    if (!id || !pw) {
        res.status(401);
        return;
    }

    try {
        const user = await User.findOne(id);

        if (!user) {
            res.status(401);
            return;
        }

        const valid = await user.checkPassword(pw);

        if (!valid) {
            res.status(401);
            return;
        }

        const toekn = user.generateToken();

        res.cookie('access_token', toekn, {
            maxAge: 1000 * 60 * 30,
        });
        
    } catch (e) {
        res.status(500).json(e);
    }
});