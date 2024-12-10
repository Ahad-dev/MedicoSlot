const express = require("express");
const { patientRegister, login,logout } = require("../controllers/authControllers");
const router = express.Router();


router.post('/patient/register',patientRegister);

router.post('/login',login)

router.post('/logout',logout)


module.exports = router;