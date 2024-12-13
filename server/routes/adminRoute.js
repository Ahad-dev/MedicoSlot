const express = require("express")
const router = express.Router()



const {createDoctor} = require("../controllers/adminControllers")

router.post("/create-doctor",createDoctor)

module.exports = router
