//write auth Middleware
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");


const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "UnAuthorized Token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "UnAuthorized" });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "UnAuthorized User" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const PatientAuthMiddleware = async (req, res, next) => {
    console.log(req.user);
    if(req.user.role !== 'Patient'){
        return res.status(401).json({ success: false, message: "UnAuthorized Role" });
    }
    next();
}

const DoctorAuthMiddleware = async (req, res, next) => {
    console.log(req.user);
    if(req.user.role !== 'Doctor'){
        return res.status(401).json({ success: false, message: "UnAuthorized Role" });
    }
    next();
}

module.exports = {
    PatientAuthMiddleware,
    DoctorAuthMiddleware,
    authMiddleware
};
