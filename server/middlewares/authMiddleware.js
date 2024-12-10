//write auth Middleware
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");


const authMiddleware = async (req, res, next) => {
    console.log(req.cookies)
    try {
        const token = req.cookies.jwt;
        if (!token) {
        return res.status(401).json({ success: false, message: "UnAuthorized" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user = await User.findById(decoded.id);
        console.log(user)
        if (!user) {
        return res.status(401).json({ success: false, message: "UnAuthorized" });
        }
    
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = authMiddleware;
