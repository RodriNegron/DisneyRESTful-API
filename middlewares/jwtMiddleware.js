const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const user = jwt.decode(req.headers.authorization.replace('Bearer ', ''));
    if (!user) {
        return res.send({ error: "Can't verify the user" });
    }
    req.user = user;
    return next();
}