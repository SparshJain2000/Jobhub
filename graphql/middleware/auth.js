const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    req.isAuth = false;
    req.isEmployer = false;
    if (!authHeader) return next();

    //* Authorization : Bearer *****************************
    const token = authHeader.split(" ")[1];
    if (!token || token === " ") return next();

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.secret);
    } catch (err) {
        return next();
    }
    if (!decodedToken) return next();
    req.isAuth = true;
    req.userId = decodedToken.userId;
    req.isEmployer = decodedToken.isEmployer;
    next();
};
