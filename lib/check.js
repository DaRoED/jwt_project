module.exports = async (req, res, next) => {
    const { user } = req;

    if (!user) {
        res.status(401);
        return;
    }

    req.body = user;
}