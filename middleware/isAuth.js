function isAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).send({
            success: false, 
            data: null, 
            error: "Must be logged in.",
        });
    }
    next();
}

module.exports = isAuth;