const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const createTokenAndSetCookie = (res, user) => {
    const token = jwt.sign({...user}, process.env.JWT_SECRET);

    const cookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    };

    res.cookie("jwt", token, cookieOptions);

    return token;
}

module.exports =  { createTokenAndSetCookie };