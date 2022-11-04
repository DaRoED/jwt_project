// import
import express from 'express';
import Joi from 'joi';
import User from '../public/javascripts/schema';
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

    result.catch((reason) => {
        res.status(400)
            .json(reason);

        return;
    })
        .then(async () => {
            const exist = await User.findOne({ id });

            if (exist) {
                res.status(409)
                    .json('id already exist');

                return;
            }
        });

    const user = new User({ id });
    await user.setPassword(pw);
    await user.save();
});