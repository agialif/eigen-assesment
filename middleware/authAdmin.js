const jwt = require('jsonwebtoken');
const authAdmin = (req, res, next) => {
    const token = req.cookies.authCookie;
    try{
        if(!token || token == 'null') {
            return res.status(401).json({error: "You need to login"})
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_ADMIN);
        //req.user = verified
        next();
    }
    catch (err) {
        return res.status(500).json({error: "Access Denied"})
    }
}

module.exports = authAdmin;